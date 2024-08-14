import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Team from './Components/Team';
import LoginForm from './Components/LoginForm';
import Content from './Components/Content';
import Navbar from './Components/Navbar';

function App() {

  return (
    <Router>
      <div>
        <Routes>
         
          <Route path="/" element={
            <div style={{display:"flex",flexDirection:"column",justifyContent:"Center",alignItems:"center"}}>
              <Navbar />
              <Home />
            </div>
          }/>

          <Route path="/about" element={
            <>
              <Navbar />
              <About />
            </>
          }/>

          <Route path="/contact" element={
            <>
              <Navbar />
              <Contact />
            </>
          }/>

          <Route path="/team" element={
            <>
              <Navbar />
              <Team />
            </>
          }/>

          <Route path="/login" element={<LoginForm />}/>

          <Route path="/content" element={<Content />}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
