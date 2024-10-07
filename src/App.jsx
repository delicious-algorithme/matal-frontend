import React from 'react';
import { GlobalStyle } from './styles';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { MainPage, WebMap, StoreDetailPage, SignUpPage } from './pages';
import './App.css';

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<SignUpPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/webmap" element={<WebMap />} />
                    <Route path="/webmap/storeList/:item" element={<WebMap />} />
                    <Route path="/webmap/storeDetail/:id" element={<StoreDetailPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
