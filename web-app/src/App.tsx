// App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Authentication/SignUp.tsx';
import Login from './components/Authentication/Login.tsx';
import MinApp from './components/EditProfile/src/container/MinApp.tsx';

import './App.css';
import Home from './pages/Home.jsx';
import ManagementLanding from './pages/ManagementLanding.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<SignUp />} />
        {/* You can add more routes here */}
        <Route path="/login" element={<Login />} /> 
         <Route path="/" element={<Home />} /> 
         <Route path="/ManagementLanding" element={<ManagementLanding />} />
         <Route path="/ProfileDash" element={<MinApp />} /> 

          
      </Routes>
    </Router>
  );
}

export default App;
