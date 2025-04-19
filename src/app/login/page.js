'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaFacebook, FaBook, FaMosque, FaUserGraduate, FaChalkboardTeacher, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';

export default function LoginPage() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    studentId: '',
    cprId: '',
    password: '',
    confirmPassword: ''
  });
  const [selectedRole, setSelectedRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (selectedRole === 'student') {
      // Validate Student ID (should be numeric)
      if (!/^\d+$/.test(formData.studentId)) {
        setError('Student ID must contain only numbers');
        return false;
      }

      // Validate CPR/ID (should be 9 digits)
      if (!/^\d{9}$/.test(formData.cprId)) {
        setError('CPR/ID Number must be 9 digits');
        return false;
      }
    } else if (selectedRole === 'teacher') {
      // Validate CPR/ID (should be 9 digits)
      if (!/^\d{9}$/.test(formData.cprId)) {
        setError('CPR/ID Number must be 9 digits');
        return false;
      }
    }

    // Validate Password (minimum 6 characters)
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate based on role
      if (selectedRole === 'student') {
        if (!formData.studentId || !formData.cprId || !formData.password) {
          setError('Please fill in all required fields');
          setIsLoading(false);
          return;
        }
      } else if (selectedRole === 'teacher') {
        if (!formData.cprId || !formData.password) {
          setError('Please fill in all required fields');
          setIsLoading(false);
          return;
        }
      }

      // Validate input values
      if (!validateInputs()) {
        setIsLoading(false);
        return;
      }

      // Store the user role in localStorage
      localStorage.setItem('userRole', selectedRole);
      localStorage.setItem('isAuthenticated', 'true');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect based on role
      if (selectedRole === 'teacher') {
        router.push('/teacher');
      } else {
        router.push('/students');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Only allow numbers for studentId and cprId
    if ((name === 'studentId' || name === 'cprId') && !/^\d*$/.test(value)) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Animated Background Elements */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      >
        <FaMosque className="w-64 h-64 text-emerald-400/20" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md relative z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className={`bg-emerald-900/30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-emerald-400/20 ${
          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-700 p-8 text-center relative overflow-hidden">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-900/10 rounded-full"
            />
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-900/10 rounded-full"
            />
            <div className="relative z-10">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <FaBook className="w-12 h-12 text-emerald-400" />
              </motion.div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {isLogin ? 'Log in' : 'Create Account'}
              </h1>
              <p className={`text-emerald-100 mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isLogin ? 'Log in in to continue' : 'Join us today'}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Select Role
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole('student')}
                    className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedRole === 'student'
                        ? `${isDarkMode ? 'border-emerald-500 bg-emerald-900/20' : 'border-emerald-500 bg-emerald-50'}`
                        : `${isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'}`
                    }`}
                  >
                    <FaUserGraduate className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Student</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole('teacher')}
                    className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedRole === 'teacher'
                        ? `${isDarkMode ? 'border-emerald-500 bg-emerald-900/20' : 'border-emerald-500 bg-emerald-50'}`
                        : `${isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'}`
                    }`}
                  >
                    <FaChalkboardTeacher className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Teacher</span>
                  </motion.button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {selectedRole === 'student' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-emerald-900/20 border border-emerald-400/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-emerald-300 ${
                          isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                        }`}
                        placeholder="Student ID"
                        required={selectedRole === 'student'}
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="cprId"
                        value={formData.cprId}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-emerald-900/20 border border-emerald-400/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-emerald-300 ${
                          isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                        }`}
                        placeholder="CPR/ID Number"
                        required={selectedRole === 'student'}
                      />
                    </div>
                  </motion.div>
                )}

                {selectedRole === 'teacher' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="cprId"
                        value={formData.cprId}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-emerald-900/20 border border-emerald-400/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-emerald-300 ${
                          isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                        }`}
                        placeholder="CPR/ID Number"
                        required={selectedRole === 'teacher'}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-emerald-900/20 border border-emerald-400/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-emerald-300 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Password"
                  required
                />
              </div>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-emerald-900/20 border border-emerald-400/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-emerald-300 ${
                          isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                        }`}
                        placeholder="Confirm Password"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-emerald-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-emerald-100">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-emerald-200 hover:text-white transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-sm ${
                    isDarkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-50 text-red-600'
                  }`}
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl ${
                  isLoading
                    ? `${isDarkMode ? 'bg-emerald-900/50 text-emerald-400/50' : 'bg-emerald-50 text-emerald-600/50'}`
                    : ''
                }`}
              >
                {isLoading ? 'Signing in...' : isLogin ? 'Sign In' : 'Sign Up'}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-emerald-200 hover:text-white font-medium transition-colors"
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 