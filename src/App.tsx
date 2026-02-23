import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Loader2 } from 'lucide-react';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const ProblemList = lazy(() => import('./pages/ProblemList'));
const Solve = lazy(() => import('./pages/Solve'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const isSolvePage = location.pathname.startsWith('/problems/') && location.pathname.split('/').length > 2;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="h-[calc(100vh-64px)] flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problems/:id" element={<Solve />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </main>
      {!isSolvePage && <Footer />}
    </div>
  );
}

export default App;
