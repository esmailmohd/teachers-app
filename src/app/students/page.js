'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaChartLine, 
  FaUsers, 
  FaBook, 
  FaClipboardList, 
  FaBell, 
  FaCog,
  FaQrcode,
  FaCheckCircle,
  FaTimesCircle,
  FaSun,
  FaMoon,
  FaTimes,
  FaBars,
  FaUser,
  FaGraduationCap,
  FaQuestionCircle,
  FaComments,
  FaKey,
  FaCrown,
  FaIdCard,
  FaEnvelope,
  FaWhatsapp,
  FaUserFriends,
  FaCalendarAlt,
  FaClock,
  FaCheck,
  FaCamera,
  FaExclamationTriangle,
  FaHashtag
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Webcam from 'react-webcam';

// Splash Screen Component
function SplashScreen({ onComplete }) {
  const { isDarkMode } = useTheme();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a short delay
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Complete splash screen after animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-4xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
        >
          Assalamu Alaikum
        </motion.div>
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`mt-4 text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          Welcome to your dashboard
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={`mt-8 p-4 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'} inline-block`}
        >
          <FaUser className={`w-12 h-12 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function StudentDashboard() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [attendanceCode, setAttendanceCode] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const scannerRef = useRef(null);
  const qrScannerRef = useRef(null);
  const webcamRef = useRef(null);

  // Add quizzes data
  const quizzes = {
    completed: [
      {
        id: 1,
        title: 'Quran Basics Quiz',
        subject: 'Quran',
        date: '2024-03-15',
        score: 85,
        total: 100,
        timeSpent: '15 minutes'
      },
      {
        id: 2,
        title: 'Fiqh Fundamentals',
        subject: 'Fiqh',
        date: '2024-03-10',
        score: 92,
        total: 100,
        timeSpent: '20 minutes'
      }
    ],
    pending: [
      {
        id: 3,
        title: 'Hadith Studies',
        subject: 'Hadith',
        date: '2024-03-20',
        duration: '30 minutes',
        totalQuestions: 20
      },
      {
        id: 4,
        title: 'Islamic History',
        subject: 'History',
        date: '2024-03-22',
        duration: '45 minutes',
        totalQuestions: 25
      }
    ],
    missed: [
      {
        id: 5,
        title: 'Arabic Grammar',
        subject: 'Arabic',
        date: '2024-03-05',
        status: 'Missed'
      },
      {
        id: 6,
        title: 'Tajweed Rules',
        subject: 'Quran',
        date: '2024-03-08',
        status: 'Missed'
      }
    ]
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
    { id: 'courses', label: 'Courses', icon: <FaBook /> },
    { id: 'quizzes', label: 'Quizzes', icon: <FaQuestionCircle /> },
    { id: 'attendance', label: 'Attendance', icon: <FaClipboardList /> },
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> }
  ];

  const studentInfo = {
    personal: {
      name: 'Esmail Mohammad',
      nameAr: 'اسماعیل محمد',
      studentId: '240001',
      studentIdAr: 'طالب علم کا آئی ڈی',
      email: 'esmailshabbir576@gmail.com',
      emailAr: 'ای میل',
      whatsapp: '+97337121297',
      whatsappAr: 'واٹس ایپ نمبر',
      level: 'Level 1',
      levelAr: 'اندراج شدہ سطح',
      joinedAt: '2024-01-01'
    },
    group: {
      name: 'BAH-M-GROUP-1',
      nameAr: 'گروپ نام',
      leader: 'Arif Mahmood',
      leaderAr: 'گروپ لیڈر'
    }
  };

  const stats = [
    { title: 'Quran Progress', value: '75%', icon: <FaBook className="text-emerald-500" />, change: '+5%', color: 'emerald' },
    { title: 'Course Completion', value: '60%', icon: <FaGraduationCap className="text-teal-500" />, change: '+8%', color: 'teal' },
    { title: 'Quiz Score', value: '85%', icon: <FaQuestionCircle className="text-amber-500" />, change: '+3%', color: 'amber' },
    { title: 'Attendance', value: '92%', icon: <FaClipboardList className="text-cyan-500" />, change: '+2%', color: 'cyan' },
  ];

  const recentActivities = [
    { id: 1, title: 'Completed Surah Al-Fatiha', time: '2 minutes ago', type: 'quran' },
    { id: 2, title: 'New quiz available', time: '1 hour ago', type: 'quiz' },
    { id: 3, title: 'Course update available', time: '3 hours ago', type: 'course' },
    { id: 4, title: 'New feedback received', time: '5 hours ago', type: 'feedback' },
  ];

  const courses = [
    {
      id: 'fiqh',
      name: 'Fiqh',
      progress: 75,
      totalMarks: 100,
      currentMarks: 75,
      lastUpdated: '2 days ago',
      status: 'In Progress',
      description: 'Islamic Jurisprudence and Legal Rulings'
    },
    {
      id: 'tafsir',
      name: 'Tafsir',
      progress: 60,
      totalMarks: 100,
      currentMarks: 60,
      lastUpdated: '1 week ago',
      status: 'In Progress',
      description: 'Quranic Exegesis and Interpretation'
    },
    {
      id: 'aqeedah',
      name: 'Aqeedah',
      progress: 90,
      totalMarks: 100,
      currentMarks: 90,
      lastUpdated: '3 days ago',
      status: 'Completed',
      description: 'Islamic Creed and Theology'
    }
  ];

  const videoConstraints = {
    facingMode: "environment",
    aspectRatio: 1
  };

  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop().catch(console.error);
        qrScannerRef.current.clear();
      }
    };
  }, []);

  const handleScan = (decodedText, decodedResult) => {
    if (decodedText) {
      setScanResult(decodedText);
      if (qrScannerRef.current) {
        qrScannerRef.current.stop().catch(console.error);
      }
      setShowScanner(false);
      setShowSuccessAnimation(true);
      setTimeout(() => {
        setShowSuccessAnimation(false);
      }, 3000);
    }
  };

  const handleError = (error) => {
    console.error('QR Scanner Error:', error);
    setCameraError('Failed to access camera. Please check your camera permissions.');
    setIsCameraLoading(false);
  };

  const handleScanAttendance = async () => {
    try {
      setCameraError(null);
      setIsCameraLoading(true);
      
      // Check if camera is available
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      if (videoDevices.length === 0) {
        setCameraError('No camera found on your device.');
        setIsCameraLoading(false);
        return;
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment",
          aspectRatio: 1
        } 
      });
      
      if (stream) {
        setShowScanner(true);
        setIsCameraLoading(false);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setCameraError('Camera access denied. Please allow camera access to scan QR codes.');
      setIsCameraLoading(false);
    }
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
    setIsScanning(false);
    setCameraError(null);
    if (webcamRef.current) {
      const stream = webcamRef.current.video.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleManualAttendance = () => {
    if (manualCode.length === 6) {
      setShowSuccessAnimation(true);
      setTimeout(() => {
        setShowSuccessAnimation(false);
      }, 3000);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
            <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`p-3 rounded-xl ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}
                  >
                    <FaUser className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </motion.div>
                        <div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Welcome, {studentInfo.personal.name}!
                    </h2>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {studentInfo.personal.level}
                          </p>
                        </div>
                </div>
                <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection('attendance')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isDarkMode
                        ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    <FaQrcode className="w-4 h-4" />
                    <span>Record Attendance</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    View Profile
                        </motion.button>
                      </div>
                    </div>
            </div>

              {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                        {stat.icon}
                      </div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {stat.change}
                    </span>
                    </div>
                  <h3 className={`text-lg font-semibold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.title}
                  </p>
                  </motion.div>
                ))}
              </div>

            {/* Courses Progress */}
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Your Courses
                </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                  View All
                  </motion.button>
                </div>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}
                  >
                    <div className="flex items-center justify-between">
                        <div>
                        <h4 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {course.name}
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {course.description}
                        </p>
                        </div>
                      <div className="text-right">
                        <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {course.progress}%
                        </span>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {course.status}
                        </p>
                        </div>
                      </div>
                    <div className={`mt-2 h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-500' : 'bg-gray-200'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full rounded-full ${
                          course.progress >= 80
                            ? isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400'
                            : course.progress >= 50
                            ? isDarkMode ? 'bg-amber-500' : 'bg-amber-400'
                            : isDarkMode ? 'bg-red-500' : 'bg-red-400'
                        }`}
                      />
                        </div>
                  </motion.div>
                ))}
                        </div>
                      </div>

            {/* Recent Activities */}
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Activities
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-500' : 'bg-gray-100'}`}>
                          {activity.type === 'quran' && <FaBook className="text-emerald-500" />}
                          {activity.type === 'quiz' && <FaQuestionCircle className="text-amber-500" />}
                          {activity.type === 'course' && <FaBook className="text-teal-500" />}
                          {activity.type === 'feedback' && <FaComments className="text-cyan-500" />}
                      </div>
                        <div>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {activity.title}
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
                    </div>
                    </div>
        );

      case 'attendance':
          return (
          <div className="relative space-y-6">
            {/* Attendance Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Classes</p>
                    <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      24
                    </h3>
                    </div>
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
                    <FaCalendarAlt className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                </div>
              </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Present</p>
                    <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      22
                    </h3>
                      </div>
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                    <FaCheckCircle className={`w-8 h-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      </div>
                    </div>
                    <div className="mt-4">
                  <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full rounded-full ${isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Absent</p>
                    <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      2
                    </h3>
                      </div>
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-red-900' : 'bg-red-50'}`}>
                    <FaTimesCircle className={`w-8 h-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '8%' }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className={`h-full rounded-full ${isDarkMode ? 'bg-red-500' : 'bg-red-400'}`}
                    />
                      </div>
                    </div>
                  </motion.div>
            </div>

            {/* Success Animation - Positioned absolutely to appear in front */}
            <AnimatePresence>
              {showSuccessAnimation && (
                  <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="fixed inset-0 flex items-center justify-center z-50"
                >
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    className={`relative p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
                  >
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <motion.div
                        className={`p-6 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}
                      >
                        <FaCheckCircle className={`w-16 h-16 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      </motion.div>
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`text-2xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                      >
                        Attendance Recorded Successfully!
                      </motion.h3>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        Your attendance has been recorded for today.
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Attendance Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* QR Code Scanner Section */}
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl shadow-lg`}>
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className={`p-6 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'} shadow-lg`}>
                    <FaQrcode className={`w-16 h-16 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <h3 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Scan Attendance QR Code
                  </h3>
                  <p className={`text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md`}>
                    Point your camera at the QR code displayed by your teacher to record your attendance.
                  </p>
                  {cameraError && (
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/50' : 'bg-red-50'} text-center`}>
                      <p className={`text-sm ${isDarkMode ? 'text-red-200' : 'text-red-600'}`}>
                        {cameraError}
                        </p>
                      </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleScanAttendance}
                    disabled={isCameraLoading}
                    className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                      isCameraLoading
                        ? `${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} cursor-not-allowed`
                        : isDarkMode
                        ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    } shadow-lg`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {isCameraLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                        />
                      ) : (
                        <FaCamera />
                      )}
                      <span>{isCameraLoading ? 'Opening Camera...' : 'Open Camera'}</span>
                      </div>
                  </motion.button>
                    </div>
              </div>

              {/* Manual Code Entry Section */}
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl shadow-lg`}>
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className={`p-6 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'} shadow-lg`}>
                    <FaKey className={`w-16 h-16 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <h3 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Enter Attendance Code
                  </h3>
                  <p className={`text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md`}>
                    If you can't scan the QR code, enter the 6-digit code provided by your teacher.
                  </p>
                  <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
                    <input
                      type="text"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      maxLength={6}
                      className={`w-full p-4 rounded-lg border ${
                        isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-200 text-gray-900'
                      } text-center text-xl font-mono shadow-sm`}
                      placeholder="Enter code"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleManualAttendance}
                      disabled={manualCode.length !== 6}
                      className={`w-full px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                        manualCode.length === 6
                          ? isDarkMode
                            ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          : isDarkMode
                          ? 'bg-gray-600 text-gray-400'
                          : 'bg-gray-100 text-gray-400'
                      } shadow-lg`}
                    >
                      Submit Code
                    </motion.button>
                      </div>
                      </div>
                    </div>
                </div>

            {/* QR Scanner Modal */}
            {showScanner && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <div className={`relative p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl max-w-lg w-full mx-4`}>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                      <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                          facingMode: "environment",
                          aspectRatio: 1
                        }}
                        className="w-full h-full object-cover"
                      />
                      {/* Scanning Guide Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-64 h-64">
                          {/* Outer Border */}
                          <div className="absolute inset-0 border-4 border-emerald-400 rounded-lg opacity-50" />
                          
                          {/* Corner Markers */}
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />
                          
                          {/* Scanning Line Animation */}
                      <motion.div
                            animate={{ y: [0, 256, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute left-0 w-full h-1 bg-emerald-400"
                          />
                        </div>
                      </div>
                      
                      {/* Scanning Status */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <div className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} shadow-lg`}>
                          <div className="flex items-center space-x-2">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`}
                            />
                            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              Looking for QR code...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-2">
                      <p className={`text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Position the QR code within the frame
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCloseScanner}
                        className={`px-6 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-gray-700 text-white hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        Close Camera
                      </motion.button>
                          </div>
                          </div>
                        </div>
                  </div>
            )}
                </div>
        );

      case 'quizzes':
        return (
          <div className="space-y-8">
            {/* Quiz Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                  <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Completed</p>
                    <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {quizzes.completed.length}
                    </h3>
                  </div>
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'} shadow-lg`}>
                    <FaCheck className={`w-8 h-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
              </div>
                <div className="mt-4">
                  <div className={`h-1 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full rounded-full ${isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                    />
                  </div>
                </div>
              </motion.div>

                <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pending</p>
                    <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {quizzes.pending.length}
                    </h3>
                    </div>
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-amber-900' : 'bg-amber-50'} shadow-lg`}>
                    <FaClock className={`w-8 h-8 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                    </div>
                  </div>
                  <div className="mt-4">
                  <div className={`h-1 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className={`h-full rounded-full ${isDarkMode ? 'bg-amber-500' : 'bg-amber-400'}`}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Missed</p>
                    <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {quizzes.missed.length}
                    </h3>
                    </div>
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-red-900' : 'bg-red-50'} shadow-lg`}>
                    <FaExclamationTriangle className={`w-8 h-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <div className={`h-1 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className={`h-full rounded-full ${isDarkMode ? 'bg-red-500' : 'bg-red-400'}`}
                    />
                    </div>
                  </div>
              </motion.div>
                </motion.div>

            {/* Completed Quizzes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Completed Quizzes
                </h3>
                <div className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'} shadow-sm`}>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {quizzes.completed.length} Quizzes
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizzes.completed.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-600' : 'bg-white'} shadow-lg`}
                  >
                    <div className="flex items-start justify-between">
                    <div>
                        <h4 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {quiz.title}
                        </h4>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {quiz.subject} • {quiz.date}
                      </p>
                    </div>
                      <div className={`p-3 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'} shadow-sm`}>
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          {quiz.score}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Score: {quiz.score}/{quiz.total}
                        </span>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {quiz.timeSpent}
                        </span>
                      </div>
                      <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-500' : 'bg-gray-200'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(quiz.score / quiz.total) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full rounded-full ${
                            quiz.score >= 80
                              ? isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400'
                              : quiz.score >= 50
                              ? isDarkMode ? 'bg-amber-500' : 'bg-amber-400'
                              : isDarkMode ? 'bg-red-500' : 'bg-red-400'
                          }`}
                        />
                    </div>
                  </div>
                </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pending Quizzes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Pending Quizzes
                </h3>
                <div className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-amber-900' : 'bg-amber-50'} shadow-sm`}>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                    {quizzes.pending.length} Quizzes
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizzes.pending.map((quiz, index) => (
                    <motion.div
                      key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-600' : 'bg-white'} shadow-lg`}
                  >
                    <div className="flex items-start justify-between">
                        <div>
                        <h4 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {quiz.title}
                        </h4>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {quiz.subject} • Due: {quiz.date}
                          </p>
                        </div>
                      <div className={`p-3 rounded-full ${isDarkMode ? 'bg-amber-900' : 'bg-amber-50'} shadow-sm`}>
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                          {quiz.duration}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {quiz.totalQuestions} questions
                        </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          } shadow-sm`}
                      >
                          Start Quiz
                      </motion.button>
                      </div>
                      <div className={`h-1 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-200'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full rounded-full ${isDarkMode ? 'bg-amber-500' : 'bg-amber-400'}`}
                        />
                      </div>
                    </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            {/* Missed Quizzes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Missed Quizzes
                </h3>
                <div className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-red-900' : 'bg-red-50'} shadow-sm`}>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                    {quizzes.missed.length} Quizzes
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizzes.missed.map((quiz, index) => (
                    <motion.div
                      key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-600' : 'bg-white'} shadow-lg`}
                  >
                    <div className="flex items-start justify-between">
                        <div>
                        <h4 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {quiz.title}
                        </h4>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {quiz.subject} • Due: {quiz.date}
                          </p>
                        </div>
                      <div className={`p-3 rounded-full ${isDarkMode ? 'bg-red-900' : 'bg-red-50'} shadow-sm`}>
                        <FaExclamationTriangle className={`w-6 h-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className={`h-1 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-200'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full rounded-full ${isDarkMode ? 'bg-red-500' : 'bg-red-400'}`}
                        />
                      </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
          </div>
        );

      case 'courses':
          return (
          <div className="space-y-8">
            {/* Course Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Courses</p>
                    <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      6
                    </h3>
                    </div>
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'} shadow-lg`}>
                    <FaBook className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                </div>
              </motion.div>

                    <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
              >
                <div className="flex items-center justify-between">
                          <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>In Progress</p>
                    <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      3
                            </h3>
                          </div>
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-amber-900' : 'bg-amber-50'} shadow-lg`}>
                    <FaClock className={`w-8 h-8 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                        </div>
                        </div>
              </motion.div>

                          <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Completed</p>
                    <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      2
                    </h3>
                        </div>
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'} shadow-lg`}>
                    <FaCheck className={`w-8 h-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      </div>
                        </div>
              </motion.div>

              <motion.div 
                          whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Average Grade</p>
                    <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      85%
                    </h3>
                      </div>
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-purple-900' : 'bg-purple-50'} shadow-lg`}>
                    <FaGraduationCap className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Course List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Your Courses
                </h3>
                  <div className="flex items-center space-x-4">
                  <div className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'} shadow-sm`}>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Sort by: Progress
                    </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    } shadow-sm`}
                  >
                    View All
                    </motion.button>
                  </div>
                </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: 1,
                    title: 'Quran Recitation',
                    instructor: 'Sheikh Ahmed',
                    progress: 75,
                    status: 'In Progress',
                    nextLesson: 'Surah Al-Baqarah (1-20)',
                    lastUpdated: '2 days ago',
                    totalLessons: 24,
                    completedLessons: 18,
                    color: 'emerald'
                  },
                  {
                    id: 2,
                    title: 'Fiqh Fundamentals',
                    instructor: 'Sheikh Mohammed',
                    progress: 90,
                    status: 'In Progress',
                    nextLesson: 'Prayer Times',
                    lastUpdated: '1 day ago',
                    totalLessons: 30,
                    completedLessons: 27,
                    color: 'blue'
                  },
                  {
                    id: 3,
                    title: 'Hadith Studies',
                    instructor: 'Sheikh Ali',
                    progress: 60,
                    status: 'In Progress',
                    nextLesson: 'Sahih Al-Bukhari',
                    lastUpdated: '3 days ago',
                    totalLessons: 20,
                    completedLessons: 12,
                    color: 'amber'
                  },
                  {
                    id: 4,
                    title: 'Arabic Grammar',
                    instructor: 'Sheikh Hassan',
                    progress: 100,
                    status: 'Completed',
                    nextLesson: 'Course Completed',
                    lastUpdated: '1 week ago',
                    totalLessons: 15,
                    completedLessons: 15,
                    color: 'purple'
                  },
                  {
                    id: 5,
                    title: 'Islamic History',
                    instructor: 'Sheikh Omar',
                    progress: 45,
                    status: 'In Progress',
                    nextLesson: 'The Rightly Guided Caliphs',
                    lastUpdated: '4 days ago',
                    totalLessons: 25,
                    completedLessons: 11,
                    color: 'cyan'
                  },
                  {
                    id: 6,
                    title: 'Tajweed Rules',
                    instructor: 'Sheikh Yusuf',
                    progress: 100,
                    status: 'Completed',
                    nextLesson: 'Course Completed',
                    lastUpdated: '2 weeks ago',
                    totalLessons: 18,
                    completedLessons: 18,
                    color: 'rose'
                  }
                ].map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-600' : 'bg-white'} shadow-lg`}
                  >
                    <div className="flex items-start justify-between mb-4">
                          <div>
                        <h4 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {course.title}
                        </h4>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {course.instructor}
                            </p>
                          </div>
                      <div className={`p-3 rounded-full ${isDarkMode ? `bg-${course.color}-900` : `bg-${course.color}-50`} shadow-sm`}>
                        <FaBook className={`w-6 h-6 ${isDarkMode ? `text-${course.color}-400` : `text-${course.color}-600`}`} />
                        </div>
                      </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Progress: {course.progress}%
                          </span>
                          <span className={`text-sm font-medium ${
                            course.status === 'Completed'
                              ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                              : isDarkMode ? 'text-amber-400' : 'text-amber-600'
                          }`}>
                            {course.status}
                          </span>
                        </div>
                        <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-500' : 'bg-gray-200'}`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`h-full rounded-full ${
                              course.progress === 100
                                ? isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400'
                                : isDarkMode ? `bg-${course.color}-500` : `bg-${course.color}-400`
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Next Lesson</p>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {course.nextLesson}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last Updated</p>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {course.lastUpdated}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Lessons: {course.completedLessons}/{course.totalLessons}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isDarkMode
                              ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          } shadow-sm`}
                        >
                          Continue
                        </motion.button>
                      </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
          </div>
        );

      case 'profile':
          return (
          <div className="space-y-6">
            {/* Profile Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl shadow-lg`}
              >
                  <div className="flex items-center space-x-4">
                <motion.div
                      whileHover={{ scale: 1.05 }}
                  className={`w-20 h-20 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'} flex items-center justify-center shadow-lg`}
                >
                  <FaUser className={`w-10 h-10 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </motion.div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {studentInfo.personal.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {studentInfo.personal.level} • {studentInfo.group.name}
                  </p>
                  </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
                    <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl shadow-lg`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                    <FaUser className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Personal Information
                  </h4>
                </div>
                <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <FaIdCard className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                        </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Name / نام</p>
                      <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {studentInfo.personal.name}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {studentInfo.personal.nameAr}
                          </p>
                        </div>
                      </div>

                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <FaHashtag className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Student ID / {studentInfo.personal.studentIdAr}
                      </p>
                      <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {studentInfo.personal.studentId}
                      </p>
                    </div>
                      </div>

                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <FaEnvelope className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                    </div>
                        <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Email / {studentInfo.personal.emailAr}
                      </p>
                      <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {studentInfo.personal.email}
                          </p>
                        </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <FaWhatsapp className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                        </div>
                        <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        WhatsApp / {studentInfo.personal.whatsappAr}
                      </p>
                      <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {studentInfo.personal.whatsapp}
                          </p>
                        </div>
                      </div>
                      </div>
                    </motion.div>

              {/* Group Information */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl shadow-lg`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
                    <FaUsers className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Group Information
                  </h4>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <FaUserFriends className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Group Name / {studentInfo.group.nameAr}
                      </p>
                      <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {studentInfo.group.name}
                      </p>
                </div>
              </div>

                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <FaCrown className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                    </div>
                  <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Group Leader / {studentInfo.group.leaderAr}
                      </p>
                      <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {studentInfo.group.leader}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <FaGraduationCap className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                  </div>
                  <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Level / {studentInfo.personal.levelAr}
                      </p>
                      <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {studentInfo.personal.level}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <FaCalendarAlt className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                  </div>
                  <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Joined At
                      </p>
                      <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {new Date(studentInfo.personal.joinedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                  </div>
                  </div>
              </div>
            </motion.div>
            </div>
          </div>
        );

      // Add other cases for different sections
      default:
        return (
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
            <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {navigationItems.find(item => item.id === activeSection)?.label}
              </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Content for {navigationItems.find(item => item.id === activeSection)?.label} section will be displayed here.
              </p>
          </div>
        );
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Top Navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border-b shadow-sm sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'} flex items-center justify-center mr-3`}>
                  <FaUsers className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>Student Dashboard</h1>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-12 flex items-baseline space-x-1">
                  {navigationItems.map((item) => (
                      <motion.button
                      key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection(item.id)}
                        className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeSection === item.id
                            ? `${isDarkMode ? 'bg-emerald-900 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`
                            : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                        }`}
                      >
                        <span className="mr-2 text-lg">{item.icon}</span>
                        {item.label}
                              </motion.button>
                            ))}
                          </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2.5 rounded-lg ${isDarkMode ? 'text-emerald-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
              >
                {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/login')}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-white' 
                    : 'bg-red-500/10 hover:bg-red-500/20 text-white'
                }`}
              >
                Logout
              </motion.button>
              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2.5 rounded-lg ${isDarkMode ? 'text-emerald-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
              >
                {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item) => (
                    <motion.button
                    key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                      setActiveSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeSection === item.id
                          ? `${isDarkMode ? 'bg-emerald-900 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`
                          : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                      }`}
                    >
                      <span className="mr-2 text-lg">{item.icon}</span>
                      {item.label}
                          </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
} 