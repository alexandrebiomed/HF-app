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

// Load environment variables from .env file
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const saltRounds = 10;

const dbUser = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

  
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests that come from localhost:8000
    if (origin.startsWith('http://localhost:8000')) {
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
  saveUninitialized: true
}));
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// Handle form submission
app.post('/login', async (req, res) => {
    console.log("TRYING TO LOG IN");
    const { username, email, password } = req.body; // Extract the data sent by the user
    let client; 

    try{ // Try to connect to user database
      client = await dbUser.connect();
      const response = await client.query("SELECT * FROM users WHERE email = $1 AND username = $2", [email,username]); // Search user in database

      if (response.rowCount===0){ // If user does not exist
        return res.json({message : "This user does not exist. Try again or Sign up.", valid:false})
      }

      const {password:storedHashedPassword} = response.rows[0];

      // Compare entered password with stored/real password.
      const validity = await bcrypt.compare(password, storedHashedPassword)
      res.json({message : validity?"User Successfully Authenticated":"Wrong password or username, try again.", valid:validity});

    }catch(error){
          console.log('Error trying to acces database : ', error);
          res.status(500).json({ message: "Internal server error. Please try again later.", valid: false });
    } finally {
        if (client) {
            client.release(); // Ensure the client is released back to the pool
        }
      }
  })

app.post('/signup', async (req, res) => {
  console.log("TRYING TO SIGN UP");
  const { username, email, password } = req.body; // Extract the data sent by the user
  let client; 

  try{
    // Verify if the user does not already exist 
    client = await dbUser.connect();
    const response = await client.query("SELECT * FROM users WHERE email = $1 OR username = $2", [email,username]); // Search user in database

    if (response.rowCount>0){ // If user found in database
      return res.status(409).json({message : "This user already exists. Try again or Log In.", valid:false})
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if(err){
        console.error("Error Trying to hash password :", err);
      }else{
        try{
          const result = await dbUser.query("INSERT INTO users (email, password, username) VALUES (?,?,?)", [username,email,hash])
          res.status(201).json({ message: 'User created successfully', userId: result.insertId });
          console.log("User successfully added to database");
        }catch(error){
          console.error("Error trying to insert user data into database : ", error);
          res.status(500).json({ message: 'An error occurred while creating the user.' });
        }
      }
    })

  }catch(error){
        console.log('Error trying to acces database : ', error);
        res.status(500).json({ message: "Internal server error. Please try again later.", valid: false });
  } finally {
      if (client) {
          client.release(); // Ensure the client is released back to the pool
      }
    }
})


// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Fetch user by ID from the database
  // done(null, user);
});

// Local strategy for username/password
passport.use(new LocalStrategy((username, password, done) => {
  // Authenticate user against the database
  // done(null, user) if successful, or done(null, false) if failed
}));







app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
