import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/home" element={<HomeScreen />} />
    </Routes>
  );
}

export default App;