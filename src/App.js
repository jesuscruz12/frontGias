import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Savings from './pages/Savings';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import TermsDetail from './components/TermsDetail';
import DisclaimerDetail from './components/DisclaimerDetail';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuditLogs from './components/AuditLogs';
import PasswordChangeLogs from './components/PasswordChangeLogs';
import ContactEdit from './components/ContactEdit';
import PolicyDetail from './components/PolicyDetail';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsAuthenticated(!!user);
    setIsAdmin(user?.role === 'admin');

    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="App">
        {/* Utilizar el Header en todas las páginas */}
        <Header
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          onLogout={handleLogout}
        />

        <ToastContainer position="top-right" autoClose={5000} />
        
        <main>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/terminos/:id" element={<TermsDetail />} />
            <Route path="/deslinde/:id" element={<DisclaimerDetail />} />

            {/* Rutas protegidas para usuarios autenticados */}
            <Route
              path="/profile"
              element={
                <PrivateRoute allowedRoles={['user', 'admin']}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/savings"
              element={
                <PrivateRoute allowedRoles={['user', 'admin']}>
                  <Savings />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/password-change-logs" element={<PasswordChangeLogs />} />
            <Route path="/contact-edit" element={<ContactEdit />} />
            <Route path="/politicas/:id" element={<PolicyDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
