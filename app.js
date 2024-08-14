import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bcrypt from "bcrypt";
import pg from "pg"

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const saltRounds = 10;

//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, '../public'));

// Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// Handle form submission
// Handle form submission
app.post('/login', (req, res) => {
    const { name, email, password } = req.body;
  
    // Perform any server-side processing here
    console.log('Form submission received:', { name, email, password });
  
    // Send a response back to the client
    res.json({ message: 'Thank you for your message!' });
  });
  

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
