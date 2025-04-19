'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaChartLine, 
  FaUsers, 
  FaBook, 
  FaClipboardList, 
  FaBell, 
  FaCog,
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaGraduationCap,
  FaFileAlt,
  FaComments,
  FaSun,
  FaMoon,
  FaTimes,
  FaBars,
  FaTrash,
  FaEdit,
  FaCheck,
  FaQuestionCircle,
  FaListAlt,
  FaSave,
  FaQrcode,
  FaClock,
  FaCopy,
  FaUserCheck,
  FaUserTimes,
  FaUser,
  FaChevronRight,
  FaCheckCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { QRCodeSVG } from 'qrcode.react';

export default function TeacherDashboard() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateQuizModalOpen, setIsCreateQuizModalOpen] = useState(false);
  const [quizForm, setQuizForm] = useState({
    level: '',
    subject: '',
    questions: []
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
  const [attendanceCode, setAttendanceCode] = useState('');
  const [isAttendanceActive, setIsAttendanceActive] = useState(false);
  const [attendanceExpiry, setAttendanceExpiry] = useState(null);
  const [students, setStudents] = useState([
    { id: 20250001, name: 'Ahmed Hassan', present: false },
    { id: 20250002, name: 'Fatima Ali', present: false },
    { id: 20250003, name: 'Mohammed Ahmed', present: false },
    { id: 20250004, name: 'Aisha Omar', present: false },
    { id: 20250005, name: 'Yusuf Ibrahim', present: false },
    { id: 20250006, name: 'Zainab Mohammed', present: false },
    { id: 20250007, name: 'Omar Khalid', present: false },
    { id: 20250008, name: 'Mariam Abdullah', present: false },
    { id: 20250009, name: 'Khalid Hassan', present: false },
    { id: 20250010, name: 'Layla Ahmed', present: false },
    { id: 20250011, name: 'Abdullah Yusuf', present: false },
    { id: 20250012, name: 'Huda Mohammed', present: false },
    { id: 20250013, name: 'Ibrahim Ali', present: false },
    { id: 20250014, name: 'Noor Khalid', present: false },
    { id: 20250015, name: 'Sara Abdullah', present: false }
  ]);
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [groupForm, setGroupForm] = useState({
    name: '',
    selectedStudents: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isViewGroupModalOpen, setIsViewGroupModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentProfileModalOpen, setIsStudentProfileModalOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
    { id: 'students', label: 'Students', icon: <FaUsers /> },
    { id: 'groups', label: 'Groups', icon: <FaUsers /> },
    { id: 'quizzes', label: 'Quizzes', icon: <FaFileAlt /> },
    { id: 'attendance', label: 'Attendance', icon: <FaClipboardList /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> }
  ];

  const teacherStats = [
    { title: 'Total Students', value: '45', icon: <FaUsers className="text-emerald-500" />, change: '+5', color: 'emerald' },
    { title: 'Active Courses', value: '6', icon: <FaBook className="text-teal-500" />, change: '+2', color: 'teal' },
    { title: 'Pending Tasks', value: '12', icon: <FaClipboardList className="text-amber-500" />, change: '-3', color: 'amber' },
    { title: 'Messages', value: '8', icon: <FaComments className="text-cyan-500" />, change: '+2', color: 'cyan' },
  ];

  const recentActivities = [
    { id: 1, title: 'New assignment created', time: '2 minutes ago', type: 'assignment' },
    { id: 2, title: 'Student submission received', time: '1 hour ago', type: 'submission' },
    { id: 3, title: 'Course material updated', time: '3 hours ago', type: 'course' },
    { id: 4, title: 'Attendance marked', time: '5 hours ago', type: 'attendance' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Grade Fiqh Quiz', due: 'Today', priority: 'high' },
    { id: 2, title: 'Prepare Tafsir Lecture', due: 'Tomorrow', priority: 'medium' },
    { id: 3, title: 'Review Student Projects', due: 'In 2 days', priority: 'low' },
  ];

  const subjects = ['Fiqh', 'As-Salah', 'Tafsir', 'Aqeedah', 'Seerah'];

  const handleCreateQuiz = () => {
    setIsCreateQuizModalOpen(true);
  };

  const handleEditQuestion = (index) => {
    setEditingQuestionIndex(index);
    setCurrentQuestion(quizForm.questions[index]);
  };

  const handleSaveQuestion = () => {
    if (currentQuestion.text && currentQuestion.options.every(opt => opt.trim() !== '')) {
      if (editingQuestionIndex !== null) {
        const newQuestions = [...quizForm.questions];
        newQuestions[editingQuestionIndex] = currentQuestion;
        setQuizForm(prev => ({ ...prev, questions: newQuestions }));
        setEditingQuestionIndex(null);
      } else {
        setQuizForm(prev => ({
          ...prev,
          questions: [...prev.questions, currentQuestion]
        }));
      }
      setCurrentQuestion({
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      });
    }
  };

  const handleSaveQuiz = () => {
    if (quizForm.level && quizForm.subject && quizForm.questions.length > 0) {
      // Here you would typically save the quiz to your backend
      console.log('Saving quiz:', quizForm);
      setIsCreateQuizModalOpen(false);
      setQuizForm({
        level: '',
        subject: '',
        questions: []
      });
    }
  };

  const generateAttendanceCode = () => {
    // Generate a random 6-character alphanumeric code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    setAttendanceCode(code);
    setIsAttendanceActive(true);
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 8); // Code expires at the end of the school day
    setAttendanceExpiry(expiry);
  };

  const stopAttendance = () => {
    setIsAttendanceActive(false);
    setAttendanceCode('');
    setAttendanceExpiry(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(attendanceCode);
  };

  const toggleStudentAttendance = (studentId) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, present: !student.present }
          : student
      )
    );
  };

  const getAttendanceStats = () => {
    const presentCount = students.filter(s => s.present).length;
    const totalStudents = students.length;
    return {
      present: presentCount,
      absent: totalStudents - presentCount,
      percentage: Math.round((presentCount / totalStudents) * 100)
    };
  };

  const handleCreateGroup = () => {
    setIsCreateGroupModalOpen(true);
  };

  const handleSaveGroup = () => {
    if (groupForm.name && groupForm.selectedStudents.length > 0) {
      const newGroup = {
        id: Date.now(),
        name: groupForm.name,
        students: groupForm.selectedStudents.map(id => students.find(s => s.id === id)),
        createdAt: new Date().toISOString()
      };
      
      setGroups(prev => [...prev, newGroup]);
      setIsCreateGroupModalOpen(false);
      setGroupForm({
        name: '',
        selectedStudents: []
      });
    }
  };

  const toggleStudentSelection = (studentId) => {
    setGroupForm(prev => ({
      ...prev,
      selectedStudents: prev.selectedStudents.includes(studentId)
        ? prev.selectedStudents.filter(id => id !== studentId)
        : [...prev.selectedStudents, studentId]
    }));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toString().includes(searchQuery)
  );

  const handleViewGroup = (group) => {
    setSelectedGroup(group);
    setIsViewGroupModalOpen(true);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsStudentProfileModalOpen(true);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teacherStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-100'
                  } shadow-sm`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.title}
                      </p>
                      <p className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mt-1`}>
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'} rounded-xl`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {stat.change}
                    </span>
                    <span className={`text-sm ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      from last week
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Upcoming Tasks */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-100'
            } shadow-sm`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Upcoming Tasks
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}
                >
                  <FaPlus className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        task.priority === 'high' ? (isDarkMode ? 'bg-red-900' : 'bg-red-50') :
                        task.priority === 'medium' ? (isDarkMode ? 'bg-amber-900' : 'bg-amber-50') :
                        (isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50')
                      }`}>
                        <FaClipboardList className={`w-5 h-5 ${
                          task.priority === 'high' ? (isDarkMode ? 'text-red-400' : 'text-red-600') :
                          task.priority === 'medium' ? (isDarkMode ? 'text-amber-400' : 'text-amber-600') :
                          (isDarkMode ? 'text-emerald-400' : 'text-emerald-600')
                        }`} />
                      </div>
                      <div>
                        <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {task.title}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Due: {task.due}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-100'
            } shadow-sm`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Recent Activity
                </h3>
                <button className={`text-sm font-medium transition-colors ${
                  isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                }`}>
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center justify-between p-4 ${
                      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    } rounded-lg transition-colors duration-200`}
                  >
                    <div className="flex items-center">
                      <div className={`p-2.5 ${
                        isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'
                      } rounded-lg mr-4`}>
                        {activity.type === 'assignment' && <FaFileAlt className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />}
                        {activity.type === 'submission' && <FaClipboardList className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />}
                        {activity.type === 'course' && <FaBook className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />}
                        {activity.type === 'attendance' && <FaUsers className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />}
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
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'quizzes':
        return (
          <div className="space-y-6">
            {/* Create New Quiz Button */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-100'
            } shadow-sm`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Create New Quiz
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreateQuiz}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  }`}
                >
                  <FaPlus className="inline-block mr-2" />
                  Create Quiz
                </motion.button>
              </div>
            </div>

            {/* Existing Quizzes */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-100'
            } shadow-sm`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Your Quizzes
              </h3>
              <div className="space-y-4">
                {/* Sample Quiz Items */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                      <FaFileAlt className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <div>
                      <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Fiqh Quiz - Chapter 1
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Due: Tomorrow
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      Edit
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
                      View Results
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );

      case 'attendance':
        const stats = getAttendanceStats();
        return (
          <div className="space-y-6">
            {/* Start Attendance Button */}
            {!isAttendanceActive && (
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                    <FaQrcode className={`w-12 h-12 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <h3 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Start Daily Attendance
                  </h3>
                  <p className={`text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md`}>
                    Click the button below to generate a QR code for students to scan and mark their attendance.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateAttendanceCode}
                    className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FaQrcode />
                      <span>Start Attendance</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            )}

            {/* QR Code Display */}
            {isAttendanceActive && (
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                      <FaQrcode className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Scan QR Code
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stopAttendance}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-red-900 text-red-400 hover:bg-red-800'
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    End Attendance
                  </motion.button>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div className={`p-8 rounded-lg ${isDarkMode ? 'bg-white' : 'bg-white'} shadow-lg`}>
                    <QRCodeSVG
                      value={attendanceCode}
                      size={400}
                      level="H"
                      includeMargin={true}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <span className={`font-mono text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {attendanceCode}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className={`p-4 rounded-lg ${
                        isDarkMode ? 'text-emerald-400 hover:bg-gray-500' : 'text-emerald-600 hover:bg-gray-100'
                      }`}
                    >
                      <FaCopy className="w-6 h-6" />
                    </motion.button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaClock className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Expires at {attendanceExpiry.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Attendance Stats */}
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                  <div className="flex items-center space-x-2">
                    <FaUserCheck className={`${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      Present
                    </span>
                  </div>
                  <p className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stats.present}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900' : 'bg-red-50'}`}>
                  <div className="flex items-center space-x-2">
                    <FaUserTimes className={`${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                      Absent
                    </span>
                  </div>
                  <p className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stats.absent}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                  <div className="flex items-center space-x-2">
                    <FaUsers className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Attendance
                    </span>
                  </div>
                  <p className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stats.percentage}%
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Attendance Progress
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stats.present}/{students.length} Students
                  </span>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percentage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${
                      stats.percentage >= 80
                        ? isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400'
                        : stats.percentage >= 50
                        ? isDarkMode ? 'bg-amber-500' : 'bg-amber-400'
                        : isDarkMode ? 'bg-red-500' : 'bg-red-400'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Student List */}
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                  <FaUsers className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Student List
                </h3>
              </div>
              <div className="space-y-2">
                {students.map((student) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg flex items-center justify-between ${
                      isDarkMode ? 'bg-gray-600' : 'bg-white'
                    }`}
                  >
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {student.name}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleStudentAttendance(student.id)}
                      className={`p-2 rounded-lg ${
                        student.present
                          ? isDarkMode ? 'text-emerald-400 hover:bg-gray-500' : 'text-emerald-600 hover:bg-gray-100'
                          : isDarkMode ? 'text-red-400 hover:bg-gray-500' : 'text-red-600 hover:bg-gray-100'
                      }`}
                    >
                      {student.present ? <FaUserCheck /> : <FaUserTimes />}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'groups':
        return (
          <div className="space-y-6">
            {/* Create New Group Button */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-100'
            } shadow-sm`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Create New Group
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreateGroup}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  }`}
                >
                  <FaPlus className="inline-block mr-2" />
                  Create Group
                </motion.button>
              </div>
            </div>

            {/* Existing Groups */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-100'
            } shadow-sm`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Your Groups
              </h3>
              <div className="space-y-4">
                {groups.map((group) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                        <FaUsers className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      </div>
                      <div>
                        <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {group.name}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {group.students.length} Students
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewGroup(group)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Create Group Modal */}
            <AnimatePresence>
              {isCreateGroupModalOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                          <FaUsers className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        </div>
                        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Create New Group
                        </h3>
                      </div>
                      <button
                        onClick={() => setIsCreateGroupModalOpen(false)}
                        className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                      >
                        <FaTimes />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Group Name Input */}
                      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                            <FaUsers className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                          </div>
                          <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Group Name
                          </label>
                        </div>
                        <input
                          type="text"
                          value={groupForm.name}
                          onChange={(e) => setGroupForm(prev => ({ ...prev, name: e.target.value }))}
                          className={`w-full p-3 rounded-lg border ${
                            isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-200 text-gray-900'
                          }`}
                          placeholder="Enter group name"
                        />
                      </div>

                      {/* Search Bar */}
                      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                            <FaSearch className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                          </div>
                          <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Search Students
                          </label>
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={`w-full p-3 rounded-lg border ${
                            isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-200 text-gray-900'
                          }`}
                          placeholder="Search by name or ID"
                        />
                      </div>

                      {/* Student List */}
                      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                            <FaUsers className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                          </div>
                          <h4 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Select Students
                          </h4>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {filteredStudents.map((student) => (
                            <motion.div
                              key={student.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex items-center justify-between p-3 rounded-lg ${
                                isDarkMode ? 'bg-gray-600' : 'bg-white'
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-lg ${
                                  groupForm.selectedStudents.includes(student.id)
                                    ? isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'
                                    : isDarkMode ? 'bg-gray-500' : 'bg-gray-100'
                                }`}>
                                  <input
                                    type="checkbox"
                                    checked={groupForm.selectedStudents.includes(student.id)}
                                    onChange={() => toggleStudentSelection(student.id)}
                                    className="h-4 w-4 text-emerald-600 cursor-pointer"
                                  />
                                </div>
                                <div>
                                  <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {student.name}
                                  </p>
                                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    ID: {student.id}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSaveGroup}
                          disabled={!groupForm.name || groupForm.selectedStudents.length === 0}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isDarkMode
                              ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800 disabled:bg-gray-700 disabled:text-gray-500'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:bg-gray-100 disabled:text-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <FaSave />
                            <span>Create Group</span>
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      // Add other cases for different sections (students, courses, etc.)
      default:
        return (
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-100'
          } shadow-sm`}>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              {navigationItems.find(item => item.id === activeSection)?.label}
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Content for {navigationItems.find(item => item.id === activeSection)?.label} section will be displayed here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Top Navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border-b shadow-sm sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'} flex items-center justify-center mr-3`}>
                  <FaGraduationCap className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>Teacher Dashboard</h1>
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

      {/* Create Quiz Modal */}
      <AnimatePresence>
        {isCreateQuizModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                    <FaFileAlt className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Create New Quiz
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsCreateQuizModalOpen(false);
                    setEditingQuestionIndex(null);
                  }}
                  className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-6">
                {/* Level Selection */}
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                      <FaGraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Select Level
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((level) => (
                      <motion.button
                        key={level}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setQuizForm(prev => ({ ...prev, level: level.toString() }))}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          quizForm.level === level.toString()
                            ? `${isDarkMode ? 'border-emerald-500 bg-emerald-900/20' : 'border-emerald-500 bg-emerald-50'}`
                            : `${isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`
                        }`}
                      >
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Level {level}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Subject Selection */}
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                      <FaBook className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Select Subject
                    </label>
                  </div>
                  <select
                    value={quizForm.subject}
                    onChange={(e) => setQuizForm(prev => ({ ...prev, subject: e.target.value }))}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-200 text-gray-900'
                    }`}
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                {/* Question Form */}
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl space-y-4`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                      <FaQuestionCircle className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <h4 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {editingQuestionIndex !== null ? 'Edit Question' : 'Add New Question'}
                    </h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Question Text
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={currentQuestion.text}
                          onChange={(e) => setCurrentQuestion(prev => ({ ...prev, text: e.target.value }))}
                          className={`w-full p-3 pl-10 rounded-lg border ${
                            isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-200 text-gray-900'
                          }`}
                          placeholder="Enter your question"
                        />
                        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <FaQuestionCircle />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Options
                      </label>
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center space-x-3 p-3 rounded-lg ${
                              isDarkMode ? 'bg-gray-600' : 'bg-white'
                            }`}
                          >
                            <div className={`p-2 rounded-full ${
                              currentQuestion.correctAnswer === index
                                ? isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'
                                : isDarkMode ? 'bg-gray-500' : 'bg-gray-100'
                            }`}>
                              <input
                                type="radio"
                                checked={currentQuestion.correctAnswer === index}
                                onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                                className="h-4 w-4 text-emerald-600 cursor-pointer"
                              />
                            </div>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...currentQuestion.options];
                                newOptions[index] = e.target.value;
                                setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
                              }}
                              className={`flex-1 p-2 rounded-lg border ${
                                isDarkMode ? 'bg-gray-500 border-gray-400 text-white' : 'bg-white border-gray-200 text-gray-900'
                              }`}
                              placeholder={`Option ${index + 1}`}
                            />
                            {currentQuestion.correctAnswer === index && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`p-1 rounded-full ${
                                  isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'
                                }`}
                              >
                                <FaCheck className={`w-4 h-4 ${
                                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                                }`} />
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveQuestion}
                      className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {editingQuestionIndex !== null ? (
                          <>
                            <FaEdit />
                            <span>Update Question</span>
                          </>
                        ) : (
                          <>
                            <FaPlus />
                            <span>Add Question</span>
                          </>
                        )}
                      </div>
                    </motion.button>
                  </div>
                </div>

                {/* Added Questions List */}
                {quizForm.questions.length > 0 && (
                  <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                        <FaListAlt className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      </div>
                      <h5 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Added Questions
                      </h5>
                    </div>
                    <div className="space-y-4">
                      {quizForm.questions.map((question, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`p-4 rounded-lg ${
                            isDarkMode ? 'bg-gray-600' : 'bg-white'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-3 flex-1">
                              <div className="flex items-center space-x-2">
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                                  <FaQuestionCircle className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                                </div>
                                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {question.text}
                                </p>
                              </div>
                              <div className="space-y-2 pl-4">
                                {question.options.map((option, optIndex) => (
                                  <motion.div
                                    key={optIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: optIndex * 0.1 }}
                                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                                      isDarkMode ? 'bg-gray-500' : 'bg-gray-50'
                                    }`}
                                  >
                                    <div className={`w-2 h-2 rounded-full ${
                                      question.correctAnswer === optIndex
                                        ? isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'
                                        : isDarkMode ? 'bg-gray-400' : 'bg-gray-300'
                                    }`} />
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                      {option}
                                    </p>
                                    {question.correctAnswer === optIndex && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={`ml-auto p-1 rounded-full ${
                                          isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'
                                        }`}
                                      >
                                        <FaCheck className={`w-3 h-3 ${
                                          isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                                        }`} />
                                      </motion.div>
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEditQuestion(index)}
                                className={`p-2 rounded-lg ${
                                  isDarkMode ? 'text-emerald-400 hover:bg-gray-500' : 'text-emerald-600 hover:bg-gray-100'
                                }`}
                              >
                                <FaEdit />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  const newQuestions = [...quizForm.questions];
                                  newQuestions.splice(index, 1);
                                  setQuizForm(prev => ({ ...prev, questions: newQuestions }));
                                }}
                                className={`p-2 rounded-lg ${
                                  isDarkMode ? 'text-red-400 hover:bg-gray-500' : 'text-red-600 hover:bg-gray-100'
                                }`}
                              >
                                <FaTrash />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveQuiz}
                    disabled={!quizForm.level || !quizForm.subject || quizForm.questions.length === 0}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-emerald-900 text-emerald-400 hover:bg-emerald-800 disabled:bg-gray-700 disabled:text-gray-500'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:bg-gray-100 disabled:text-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FaSave />
                      <span>Save Quiz</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Group Modal */}
      <AnimatePresence>
        {isViewGroupModalOpen && selectedGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                    <FaUsers className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedGroup.name}
                  </h3>
                </div>
                <button
                  onClick={() => setIsViewGroupModalOpen(false)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-6">
                {/* Group Info */}
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Created On
                      </p>
                      <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {new Date(selectedGroup.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Total Students
                      </p>
                      <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedGroup.students.length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Student List */}
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                      <FaUsers className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <h4 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Group Members
                    </h4>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedGroup.students.map((student) => (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => handleViewStudent(student)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-opacity-80 transition-all duration-200 ${
                          isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                            <FaUser className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                          </div>
                          <div>
                            <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {student.name}
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              ID: {student.id}
                            </p>
                          </div>
                        </div>
                        <FaChevronRight className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Profile Modal */}
      <AnimatePresence>
        {isStudentProfileModalOpen && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                    <FaUser className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Student Profile
                  </h3>
                </div>
                <button
                  onClick={() => setIsStudentProfileModalOpen(false)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-6">
                {/* Student Info */}
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-4 rounded-full ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                      <FaUser className={`w-8 h-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <div>
                      <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedStudent.name}
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        ID: {selectedStudent.id}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Attendance Rate
                      </p>
                      <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        92%
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Last Attendance
                      </p>
                      <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Today
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Groups
                      </p>
                      <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {groups.filter(g => g.students.some(s => s.id === selectedStudent.id)).length}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Status
                      </p>
                      <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Active
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50'}`}>
                      <FaClipboardList className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <h4 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Recent Activity
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className={`flex items-center justify-between p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-600' : 'bg-white'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <FaCheckCircle className={`${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Marked attendance today
                        </p>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        2 hours ago
                      </p>
                    </div>
                    <div className={`flex items-center justify-between p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-600' : 'bg-white'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <FaUsers className={`${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Added to {selectedGroup.name}
                        </p>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Yesterday
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 