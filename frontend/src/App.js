import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import AddItem from './components/Admin/AddItem';
import Header from './components/Header/Header';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </>

  );
}

export default App;