import { lazy, Suspense } from 'react';
import { Loading } from './components/common';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles';
import { HeaderLayout } from './components/common';
import { Terms, PrivacyConsent, Privacy } from './document';

const queryClient = new QueryClient();

const MainPage = lazy(() => import('./pages/MainPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const StoreDetailPage = lazy(() => import('./pages/StoreDetailPage'));
const BookmarkPage = lazy(() => import('./pages/BookmarkPage'));
const WebmapPage = lazy(() => import('./pages/WebMapPage'));

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <GlobalStyle />
                <BrowserRouter>
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route element={<HeaderLayout />}>
                                <Route path="/" element={<MainPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/signup" element={<SignUpPage />} />
                                <Route path="/bookmark" element={<BookmarkPage />} />
                            </Route>
                            <Route path="/webmap" element={<WebmapPage />} />
                            <Route path="/webmap/storeDetail/:id" element={<StoreDetailPage />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/privacyConsent" element={<PrivacyConsent />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/webmap/storeList/:item" element={<WebmapPage />} />
                            <Route path="/*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </div>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default App;
