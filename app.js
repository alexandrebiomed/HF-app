import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bcrypt from "bcrypt";
import pg from "pg";
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import LocalStrategy from 'passport-local';

// Load environment variables from .env file
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const saltRounds = 10;

const {Pool} = pg;
const dbUser = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

  
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests that come from localhost:8000
    if (origin && origin.startsWith('http://localhost:8000')) {
        callback(null, true); // Allow the origin
    } else {
        callback(new Error('Not allowed by CORS')); // Reject the origin
    }
},
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 3600,
};

// Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET_KEY, // Change this to a secure random string
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 10 * 1000, // Session expires after 10 seconds
            secure: false } // Set to true if using HTTPS
}));
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });



app.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
 
      if (err) {
        return res.status(500).json({ message: 'Internal server error', valid : false});
      }

      if (!user){
        console.log("User does not exist (backend) !");
        return res.status(401).json({message : 'User Not Found'});
      }
      
      req.logIn(user, (err) => {
          if (err) {
            console.error('Login error:', err); // Log the error for debugging
            return res.status(500).json({ message: 'Could not log in', valid : false});
          }
          // Return user and info if login is successful
          return res.status(200).json({user, info});
      });
  })(req, res, next);
});

app.post('/signup', async (req, res) => {
  //! Maybe we don't need the userId in the res.json() because not used when using axios on the client-side
  console.log("TRYING TO SIGN UP");
  const { username, email, password } = req.body; // Extract the data sent by the user
  let client;

  // Verify Password constraints :
  //    1. At least 10 characters.
  //    2. At least 1 lowercase character.
  //    3. At least 1 uppercase character.
  //    4. At least 1 digit.
  //    5. At least 1 special character.  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{10,}$/;
  if (!passwordRegex.test(password)){
    return res.status(409).json({message : "The password must have at least :  10 characters, one lowercase, one uppercase, one digit and one special character."})
  }


  try{
    // Verify if the user does not already exist 
    client = await dbUser.connect();
    const response = await client.query("SELECT * FROM users WHERE email = $1 OR username = $2", [email,username]); // Search user in database

    if (response.rowCount>0){ // If user found in database
      return res.status(409).json({message : "This user already exists. Try again or Log In."})
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if(err){
        res.status(500).json({ message: 'Could not hash password'});
        console.error("Error Trying to hash password :", err);
      }else{
        try{
          const result = await dbUser.query("INSERT INTO users (email, password, username) VALUES ($1,$2,$3) RETURNING id", [email, hash, username])
          
          const newUser = result.rows[0];

          // Log in the user
          req.login(newUser, (err) => {
            if (err) {
              console.error("Error during login:", err);
              return res.status(500).json({ message: 'Error logging in user.'});
            }
            // Successfully created and logged in
            res.status(201).json({ message: 'User created successfully', userId: newUser.id});
            console.log("User successfully added to database and logged in");
          });

        }catch(error){
          console.error("Error trying to insert user data into database : ", error);
          res.status(500).json({ message: 'An error occurred while creating the user.' });
        }
      }
    })

  }catch(error){
        console.log('Error trying to acces database : ', error);
        res.status(500).json({ message: "Internal server error. Please try again later."});
  }finally{
    if (client){
      client.release();
    }
  }
})


// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let client;
  try{ // Try to connect to user database
    client = await dbUser.connect();
    const response = await client.query("SELECT * FROM users WHERE id = $1", [id]); // Search user in database

    if (response.rowCount===0){ // If user does not exist
      return done(null, false, {message: "Could not retrieve the user object using the stored ID."})
    }
   done(null, response.rows[0]);

  } catch(error){
      return done(error)

  } finally{
      if (client){
        client.release();
    }
  }
});

// Local strategy for username/password
passport.use(new LocalStrategy(
  {
    // Passport Local Strategy Configuration
    // key = name of the field in the request body that will be used to find the user.
    // value = names of the fields that client-side form will use to submit the user's credentials.
    username: 'username',
    password: 'password',  // This will be the password
    passReqToCallback: true,
},
async (req, username, password, done) => {
  
  let client;
  
  console.log("RUNNING LOCAL STRATEGY");

  try{ // Try to connect to user database
    client = await dbUser.connect();

    const email = req.body.email;
    const users = await client.query("SELECT * FROM users WHERE username = $1 AND email = $2", [username, email]); // Search user in database
    
    if (users.rowCount===0){ // If user does not exist
      return done(null, false, {message: "This user does not exist. Try again or Sign up.", valid : false})
    }
    // Compare entered password with stored/real password.
    const user = users.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password); // Assume 'password' is the hashed password field

    const userObjectToReturn = {id : user.id};

    return isValidPassword ? done(null, userObjectToReturn, {message : "User Successfully Authenticated", valid:isValidPassword }) : done(null, false, {message : "Wrong password or username, try again.", valid:isValidPassword }) 
  
  }catch(error){
        console.error('Error trying to acces database : ', error);
        return done(null, false, {message: "Internal Server Error", valid : false})
  }finally {
    if (client) {
      client.release(); // Ensure the client is released back to the pool
    }
  }
}));


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
