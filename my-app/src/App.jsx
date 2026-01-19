import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PodHome from './pages/PodHome';
import PodPage from './pages/PodPage';
import Notifications from './pages/Notifications';
import Schedule from './pages/Schedule';
import NewPodPost from './pages/NewPodPost';
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
              <Route path="/podpage/:podId" element={<PodPage/>}/>
              <Route path="/newpost/:podId" element={<NewPodPost/>}/>
            </Routes>
            </section>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
