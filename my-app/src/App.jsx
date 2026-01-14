import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PodHome from './pages/PodHome';
import Notifications from './pages/Notifications';
import Schedule from './pages/Schedule';
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import './App.css'

function App() {
  
  return (
    <AuthProvider>
      <Router>
        <div>
          <section>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/pods" element={<PodHome/>}/>
              <Route path="/schedule" element={<Schedule/>}/>
              <Route path="/notifications" element={<Notifications/>}/>
            </Routes>
            </section>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
