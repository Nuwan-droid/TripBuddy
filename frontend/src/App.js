import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.js'; // Adjust path if needed
import Destinations from './pages/Destinations.js';
import Home from './pages/Home.js';
import LoginRegister from 'components/LoginRegister/LoginRegister.jsx';

function App() {
    return (

        <LoginRegister/>
        // <Router>
        //     <div className="App">
        //         <Navigation />
        //         <Routes>
        //             <Route path="/" element={<Home />} />
        //             <Route path="/destinations" element={<Destinations />} />
        //         </Routes>
        //     </div>
        // </Router>
    );
}

export default App;
