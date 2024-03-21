import React, { useState } from 'react';
import axios from 'axios';
import { Container, useColorModeValue } from '@chakra-ui/react';
import Header from './components/header';
import { Route, Routes } from "react-router-dom"
import UserInput from './pages/userInput';
import Example from './components/example';
function App() {
 

  return (
    <Container maxW="620px" >
    <Header/>
    
   <Routes>
   <Route path="/" element={<UserInput />}/>
   </Routes>
   <Example />
    </Container>
  
  );
}

export default App;
