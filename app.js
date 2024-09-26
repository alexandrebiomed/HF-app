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

// Load environment variables from .env file
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
// const saltRounds = 10;

const {Client} = pg;

const dbUser = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

  
const corsOptions = {
  origin: 'http://localhost:8000',
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


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
