import React from 'react';
import { GlobalStyle } from './styles';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Main, MapWithDetail, WebMap, MapWithStoreList } from './pages';
import './App.css';

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/webmap" element={<WebMap />} />
                    <Route path="/webmap/storeList/:id" element={<WebMap />} />
                    <Route path="/webmap/storeDetail/:id" element={<MapWithDetail />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
