import ResourceGallery from './components/ResourceGallery';
import './App.css';
import Footer from './components/footer';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />




      <Route path="/home" element={<ProtectedRoutes><div className="min-h-screen bg-white">
        <ResourceGallery />
        <Footer />
      </div>
      </ProtectedRoutes>} />


    </Routes>

  );
}

export default App;