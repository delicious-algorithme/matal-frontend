import React from 'react';
import { GlobalStyle } from './styles';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Main, WebMap } from './pages';
import './App.css';

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/webmap" element={<WebMap />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
