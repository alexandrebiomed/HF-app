import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bcrypt from "bcrypt";
import pg from "pg";
import dotenv from 'dotenv';
import session from 'express-session'

// Load environment variables from .env file
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const saltRounds = 10;

const {Client} = pg;

const db = new Client({
  user: import.meta.env.VITE_PG_USER,
  host: import.meta.env.VITE_PG_HOST,
  database: import.meta.env.VITE_PG_DATABASE,
  password: import.meta.env.VITE_PG_PASSWORD,
  port: import.meta.env.VITE_PG_PORT,
});

  

//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, '../public'));

// Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: import.meta.env.VITE_SESSION_SECRET_KEY, // Change this to a secure random string
  resave: false,
  saveUninitialized: true
}));
app.use(morgan("tiny"));

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// Handle form submission
app.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    try{
      await db.connect();
      const response = await db.query("SELECT * FROM users WHERE email = $1 AND username = $2", [email,username]);
      if (response.rowCount===0){
        res.json({message : "This user does not exist. Try again or Sign up."})
      }else{
        const {password:storedHashedPassword} = response.rows[0];
        await bcrypt.compare(password, storedHashedPassword, (err,validity) => {
          if(err){
            console.log("Error while validating password : ", err);
          }else{
            res.json({message : validity?"User Successfully Authenticated":"Wrong password or username, try again.", valid:validity});
          }
        })
      }
    }catch(error){
          console.log('Error trying to acces database : ', error);
    }
  })


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
