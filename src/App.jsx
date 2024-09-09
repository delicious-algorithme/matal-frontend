import React from 'react';
import { GlobalStyle } from './styles';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Main, WebMap, StoreDetailPage } from './pages';
import './App.css';

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/webmap" element={<WebMap />} />
                    <Route path="/webmap/storeList/:keyword" element={<WebMap />} />
                    <Route path="/webmap/storeDetail/:id" element={<StoreDetailPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
