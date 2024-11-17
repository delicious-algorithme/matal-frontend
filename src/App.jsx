import React from 'react';
import { GlobalStyle } from './styles';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { MainPage, WebMap, SignUpPage, StoreDetailPage, LoginPage } from './pages';
import './App.css';
import { HeaderLayout } from './components/common';
import BookmarkPage from './pages/BookmarkPage';

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route element={<HeaderLayout />}>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/bookmark" element={<BookmarkPage />} />
                        <Route path="/webmap/storeDetail/:id" element={<StoreDetailPage />} />
                    </Route>
                    <Route path="/webmap" element={<WebMap />} />
                    <Route path="/webmap/storeList/:item" element={<WebMap />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
