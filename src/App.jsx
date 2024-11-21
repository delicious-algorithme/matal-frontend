import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles';
import { MainPage, WebMap, SignUpPage, StoreDetailPage, LoginPage } from './pages';
import { HeaderLayout } from './components/common';
import BookmarkPage from './pages/BookmarkPage';
import { Terms, PrivacyConsent, Privacy } from './document';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
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
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacyConsent" element={<PrivacyConsent />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/webmap/storeList/:item" element={<WebMap />} />
                    </Routes>
                </BrowserRouter>
            </div>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default App;
