
import './App.css';
import Login from './Pages/Login/Login';
import CrearPerfil from './Pages/Crearperfil/CrearPerfil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/Profile/CreateProfile' element={<CrearPerfil/>}/>
          <Route path='/Home' element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
