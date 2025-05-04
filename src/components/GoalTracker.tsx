import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Clock, 
  Users, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  Edit, 
  Trash2, 
  Settings, 
  Bell, 
  Moon, 
  Sun,
  Award,
  TrendingUp,
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data
const mockGoals = [
  {
    id: 1,
    title: "Complete Project Proposal",
    description: "Finalize the Q3 project proposal including budget estimates, timeline, and resource allocation. This needs to be ready for the executive review next month.",
    deadline: "2025-06-15",
    progress: 65,
    category: "professional",
    priority: "high",
    team: "Marketing",
    collaborators: [
      { id: 1, name: "Alex Morgan", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      { id: 2, name: "Sam Wilson", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      { id: 3, name: "Jamie Lee", avatar: "https://randomuser.me/api/portraits/women/57.jpg" }
    ],
    milestones: [
      { id: 1, title: "Research completed", completed: true, date: "2025-05-01" },
      { id: 2, title: "First draft", completed: true, date: "2025-05-10" },
      { id: 3, title: "Peer review", completed: false, date: "2025-05-20" },
      { id: 4, title: "Final submission", completed: false, date: "2025-06-15" }
    ],
    comments: [
      { id: 1, user: { name: "Alex Morgan", avatar: "https://randomuser.me/api/portraits/women/44.jpg" }, text: "I've uploaded the market research documents to the shared folder.", date: "2025-05-02" },
      { id: 2, user: { name: "Sam Wilson", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }, text: "The budget section looks good. I've added some notes on the timeline.", date: "2025-05-12" }
    ]
  },
  {
    id: 2,
    title: "Learn Spanish",
    description: "Reach B1 level proficiency in Spanish. Practice vocabulary, grammar, and conversation skills regularly.",
    deadline: "2025-09-30",
    progress: 30,
    category: "personal",
    priority: "medium",
    team: null,
    collaborators: [
      { id: 4, name: "Maria Rodriguez", avatar: "https://randomuser.me/api/portraits/women/63.jpg" }
    ],
    milestones: [
      { id: 5, title: "Complete beginner course", completed: true, date: "2025-04-15" },
      { id: 6, title: "Read first Spanish book", completed: false, date: "2025-06-30" },
      { id: 7, title: "Hold 10-minute conversation", completed: false, date: "2025-08-15" }
    ],
    comments: [
      { id: 3, user: { name: "Maria Rodriguez", avatar: "https://randomuser.me/api/portraits/women/63.jpg" }, text: "I've found a great language exchange group that meets on Thursdays. Want to join?", date: "2025-04-20" }
    ]
  },
  {
    id: 3,
    title: "Complete Marathon Training",
    description: "Train for and complete a full marathon (26.2 miles). Follow the 16-week training program and focus on nutrition and recovery.",
    deadline: "2025-07-10",
    progress: 45,
    category: "personal",
    priority: "high",
    team: null,
    collaborators: [
      { id: 5, name: "Chris Johnson", avatar: "https://randomuser.me/api/portraits/men/22.jpg" }
    ],
    milestones: [
      { id: 8, title: "Run 5 miles without stopping", completed: true, date: "2025-03-15" },
      { id: 9, title: "Complete half marathon", completed: true, date: "2025-04-30" },
      { id: 10, title: "Run 20 miles", completed: false, date: "2025-06-15" },
      { id: 11, title: "Marathon day", completed: false, date: "2025-07-10" }
    ],
    comments: [
      { id: 4, user: { name: "Chris Johnson", avatar: "https://randomuser.me/api/portraits/men/22.jpg" }, text: "I noticed your pace has improved significantly. Great job keeping up with the training schedule!", date: "2025-05-01" }
    ]
  },
  {
    id: 4,
    title: "Launch New Product Line",
    description: "Coordinate the launch of our new sustainable product line, including marketing, distribution, and sales training.",
    deadline: "2025-08-01",
    progress: 15,
    category: "professional",
    priority: "high",
    team: "Product",
    collaborators: [
      { id: 6, name: "Taylor Kim", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
      { id: 7, name: "Jordan Blake", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
      { id: 8, name: "Casey Smith", avatar: "https://randomuser.me/api/portraits/women/24.jpg" },
      { id: 9, name: "Riley Jones", avatar: "https://randomuser.me/api/portraits/men/59.jpg" }
    ],
    milestones: [
      { id: 12, title: "Market research", completed: true, date: "2025-04-30" },
      { id: 13, title: "Product prototype", completed: false, date: "2025-06-15" },
      { id: 14, title: "Marketing materials", completed: false, date: "2025-07-10" },
      { id: 15, title: "Sales training", completed: false, date: "2025-07-25" },
      { id: 16, title: "Launch event", completed: false, date: "2025-08-01" }
    ],
    comments: [
      { id: 5, user: { name: "Taylor Kim", avatar: "https://randomuser.me/api/portraits/women/12.jpg" }, text: "The focus group feedback is in - they love the eco-friendly packaging!", date: "2025-05-05" },
      { id: 6, user: { name: "Jordan Blake", avatar: "https://randomuser.me/api/portraits/men/41.jpg" }, text: "We need to address the supply chain concerns before moving forward with production.", date: "2025-05-12" }
    ]
  },
  {
    id: 5,
    title: "Renovate Home Office",
    description: "Transform the spare room into a functional and ergonomic home office space with proper lighting, desk setup, and organization systems.",
    deadline: "2025-06-30",
    progress: 10,
    category: "personal",
    priority: "medium",
    team: null,
    collaborators: [
      { id: 10, name: "Harper Wells", avatar: "https://randomuser.me/api/portraits/women/33.jpg" }
    ],
    milestones: [
      { id: 17, title: "Design plan", completed: true, date: "2025-05-15" },
      { id: 18, title: "Purchase furniture", completed: false, date: "2025-06-01" },
      { id: 19, title: "Paint and set up", completed: false, date: "2025-06-30" }
    ],
    comments: [
      { id: 7, user: { name: "Harper Wells", avatar: "https://randomuser.me/api/portraits/women/33.jpg" }, text: "I found some great desk options that would fit perfectly in the space. I'll send you the links.", date: "2025-05-10" }
    ]
  },
  {
    id: 6,
    title: "Implement New CRM System",
    description: "Lead the transition to our new customer relationship management system, including data migration, team training, and process documentation.",
    deadline: "2025-07-31",
    progress: 25,
    category: "professional",
    priority: "high",
    team: "Sales",
    collaborators: [
      { id: 11, name: "Morgan Chen", avatar: "https://randomuser.me/api/portraits/women/49.jpg" },
      { id: 12, name: "Avery Thomas", avatar: "https://randomuser.me/api/portraits/men/17.jpg" },
      { id: 13, name: "Quinn Rodriguez", avatar: "https://randomuser.me/api/portraits/women/77.jpg" }
    ],
    milestones: [
      { id: 20, title: "System selection", completed: true, date: "2025-04-15" },
      { id: 21, title: "Data mapping", completed: true, date: "2025-05-10" },
      { id: 22, title: "Migration plan", completed: false, date: "2025-06-01" },
      { id: 23, title: "User training", completed: false, date: "2025-07-15" },
      { id: 24, title: "Go live", completed: false, date: "2025-07-31" }
    ],
    comments: [
      { id: 8, user: { name: "Morgan Chen", avatar: "https://randomuser.me/api/portraits/women/49.jpg" }, text: "I've scheduled the first training session for next week. Please make sure your team can attend.", date: "2025-05-08" },
      { id: 9, user: { name: "Avery Thomas", avatar: "https://randomuser.me/api/portraits/men/17.jpg" }, text: "The data mapping looks good, but we should revisit the custom fields section.", date: "2025-05-15" }
    ]
  }
];

// Performance data for charts
const performanceData = [
  { name: 'Jan', completed: 4, created: 7 },
  { name: 'Feb', completed: 7, created: 5 },
  { name: 'Mar', completed: 3, created: 9 },
  { name: 'Apr', completed: 8, created: 6 },
  { name: 'May', completed: 5, created: 8 }
];

const categoryData = [
  { name: 'Personal', value: 45 },
  { name: 'Professional', value: 55 }
];

const COLORS = ['#6366f1', '#ec4899'];

// Main component
const GoalTracker = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [goals, setGoals] = useState(mockGoals);
  const [selectedGoal, setSelectedGoal] = useState<{
    id: number;
    title: string;
    description: string;
    deadline: string;
    progress: number;
    category: string;
    priority: string;
    team: string | null;
    collaborators: { id: number; name: string; avatar: string }[];
    milestones: { id: number; title: string; completed: boolean; date: string }[];
    comments: { id: number; user: { name: string; avatar: string }; text: string; date: string }[];
  } | null>(null);
  const [showCreateGoalModal, setShowCreateGoalModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('goals'); // 'goals', 'analytics', 'calendar'
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: '',
    category: 'personal',
    priority: 'medium',
    team: '',
    collaborators: []
  });
  
  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Filter goals based on search query and category filter
  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         goal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || goal.category === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Add new goal
  const handleAddGoal = () => {
    const newGoalObj = {
      id: goals.length + 1,
      ...newGoal,
      progress: 0,
      milestones: [],
      comments: [],
      collaborators: newGoal.collaborators || []
    };
    
    setGoals([...goals, newGoalObj]);
    setShowCreateGoalModal(false);
    setNewGoal({
      title: '',
      description: '',
      deadline: '',
      category: 'personal',
      priority: 'medium',
      team: '',
      collaborators: []
    });
  };
  
  // Add comment to goal
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const updatedGoals = goals.map(goal => {
      if (selectedGoal && goal.id === selectedGoal.id) {
        return {
          ...goal,
          comments: [
            ...goal.comments,
            {
              id: Math.max(0, ...(goal.comments.length > 0 ? goal.comments.map(c => c.id) : [0])) + 1,
              user: {
                name: 'You',
                avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
              },
              text: newComment,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    setSelectedGoal(selectedGoal ? updatedGoals.find(g => g.id === selectedGoal.id) || null : null);
    setNewComment('');
  };
  
  // Update milestone status
  const handleMilestoneToggle = (milestoneId: number) => {
    if (!selectedGoal) return; // Ensure selectedGoal is not null

    const updatedGoals = goals.map(goal => {
      if (goal.id === selectedGoal.id) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });
        
        // Calculate new progress based on completed milestones
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
        
        return {
          ...goal,
          milestones: updatedMilestones,
          progress: newProgress
        };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    setSelectedGoal(updatedGoals.find(g => g.id === selectedGoal.id) || null);
  };
  
  // Delete goal
  const handleDeleteGoal = (goalId: number) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    if (selectedGoal && selectedGoal.id === goalId) {
      setSelectedGoal(null);
    }
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-xl font-bold">GoalTracker</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                onClick={() => setShowSettingsModal(true)}
              >
                <Settings size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
              
              <button
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? (
                  <Sun size={20} className="text-gray-300" />
                ) : (
                  <Moon size={20} className="text-gray-500" />
                )}
              </button>
              
              <div className="relative">
                <button
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                >
                  <Bell size={20} className="text-gray-500 dark:text-gray-400" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/women/68.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="pt-16 pb-6">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex items-center justify-center my-6">
            <div className={`inline-flex rounded-md shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === 'goals' 
                    ? 'bg-indigo-600 text-white' 
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                }`}
                onClick={() => setActiveTab('goals')}
              >
                Goals
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'analytics' 
                    ? 'bg-indigo-600 text-white' 
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                }`}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === 'calendar' 
                    ? 'bg-indigo-600 text-white' 
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                }`}
                onClick={() => setActiveTab('calendar')}
              >
                Calendar
              </button>
            </div>
          </div>
          
          {/* Goals View */}
          {activeTab === 'goals' && (
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold">My Goals</h2>
                  <p className="text-gray-500 dark:text-gray-400">Track and manage your personal and professional goals</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className={`pl-10 pr-4 py-2 rounded-lg ${
                        darkMode 
                          ? 'bg-gray-800 text-white border-gray-700' 
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      } border focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full sm:w-auto`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select 
                      className={`px-4 py-2 rounded-lg ${
                        darkMode 
                          ? 'bg-gray-800 text-white border-gray-700' 
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      } border focus:outline-none focus:ring-2 focus:ring-indigo-300`}
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="personal">Personal</option>
                      <option value="professional">Professional</option>
                    </select>
                    
                    <button
                      onClick={() => setShowCreateGoalModal(true)}
                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Plus size={16} className="mr-2" />
                      <span>New Goal</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`lg:col-span-2 ${selectedGoal ? 'hidden lg:block' : ''}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredGoals.map(goal => (
                      <motion.div
                        key={goal.id}
                        className={`rounded-lg shadow-md overflow-hidden cursor-pointer ${
                          darkMode ? 'bg-gray-800' : 'bg-white'
                        } hover:shadow-lg transition-shadow`}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        onClick={() => setSelectedGoal(goal)}
                      >
                        <div className={`h-2 ${
                          goal.priority === 'high' ? 'bg-red-500' : 
                          goal.priority === 'medium' ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}></div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{goal.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              goal.category === 'personal' 
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                                : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                            }`}>
                              {goal.category}
                            </span>
                          </div>
                          
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                            {goal.description.length > 100 
                              ? goal.description.substring(0, 100) + '...' 
                              : goal.description
                            }
                          </p>
                          
                          <div className="flex items-center justify-between text-sm mb-3">
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1 text-gray-500 dark:text-gray-400" />
                              <span className="text-gray-500 dark:text-gray-400">
                                Due: {new Date(goal.deadline).toLocaleDateString()}
                              </span>
                            </div>
                            
                            {goal.team && (
                              <div className="flex items-center">
                                <Users size={14} className="mr-1 text-gray-500 dark:text-gray-400" />
                                <span className="text-gray-500 dark:text-gray-400">{goal.team}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm font-medium">{goal.progress}%</span>
                          </div>
                          
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                            <div
                              className={`${
                                goal.progress < 25 ? 'bg-red-500' : 
                                goal.progress < 75 ? 'bg-yellow-500' : 
                                'bg-green-500'
                              } h-2 rounded-full`}
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                              {goal.collaborators.slice(0, 3).map((collaborator) => (
                                <div key={collaborator.id} className="w-6 h-6 rounded-full overflow-hidden border-2 border-white dark:border-gray-800">
                                  <img src={collaborator.avatar} alt={collaborator.name} className="w-full h-full object-cover" />
                                </div>
                              ))}
                              {goal.collaborators.length > 3 && (
                                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800">
                                  +{goal.collaborators.length - 3}
                                </div>
                              )}
                            </div>
                          
                            <div className="flex items-center space-x-1">
                              <div className="text-gray-500 dark:text-gray-400 flex items-center">
                                <MessageSquare size={14} className="mr-1" />
                                <span className="text-sm">{goal.comments.length}</span>
                              </div>
                              <div className="text-gray-500 dark:text-gray-400 flex items-center">
                                <CheckCircle size={14} className="mr-1" />
                                <span className="text-sm">
                                  {goal.milestones.filter(m => m.completed).length}/{goal.milestones.length}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {filteredGoals.length === 0 && (
                    <div className={`flex flex-col items-center justify-center p-12 rounded-lg border-2 border-dashed ${
                      darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-500'
                    }`}>
                      <TrendingUp size={48} className="mb-4 opacity-50" />
                      <h3 className="text-xl font-medium mb-2">No goals found</h3>
                      <p className="text-center mb-4">
                        {searchQuery || filter !== 'all' 
                          ? "Try adjusting your search or filters" 
                          : "Get started by creating your first goal"}
                      </p>
                      <button
                        onClick={() => setShowCreateGoalModal(true)}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Plus size={16} className="mr-2" />
                        <span>New Goal</span>
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Goal Detail View */}
                {selectedGoal && (
                  <motion.div 
                    className={`lg:col-span-1 ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    } rounded-lg shadow-md overflow-hidden lg:static fixed inset-0 z-20 lg:z-auto`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`${
                      selectedGoal.priority === 'high' ? 'bg-red-500' : 
                      selectedGoal.priority === 'medium' ? 'bg-yellow-500' : 
                      'bg-green-500'
                    } p-4 flex items-center justify-between`}>
                      <button 
                        className="lg:hidden p-1 rounded-full bg-white bg-opacity-20 text-white"
                        onClick={() => setSelectedGoal(null)}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <h3 className="text-lg font-bold text-white">Goal Details</h3>
                      <div className="flex space-x-2">
                        <button className="p-1 rounded-full bg-white bg-opacity-20 text-white">
                          <Edit size={16} />
                        </button>
                        <button 
                          className="p-1 rounded-full bg-white bg-opacity-20 text-white"
                          onClick={() => handleDeleteGoal(selectedGoal.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-6 overflow-auto max-h-screen lg:max-h-[calc(100vh-13rem)]">
                      <div>
                        <h2 className="text-xl font-bold mb-2">{selectedGoal.title}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{selectedGoal.description}</p>
                        
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center">
                            <Clock size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm">
                              Due: {new Date(selectedGoal.deadline).toLocaleDateString()}
                            </span>
                          </div>
                          
                          {selectedGoal.team && (
                            <div className="flex items-center">
                              <Users size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm">{selectedGoal.team}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              selectedGoal.category === 'personal' 
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                                : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                            }`}>
                              {selectedGoal.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Progress</span>
                            <span className="font-medium">{selectedGoal.progress}%</span>
                          </div>
                          
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                              className={`${
                                selectedGoal.progress < 25 ? 'bg-red-500' : 
                                selectedGoal.progress < 75 ? 'bg-yellow-500' : 
                                'bg-green-500'
                              } h-2.5 rounded-full`}
                              style={{ width: `${selectedGoal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Milestones Section */}
                      <div>
                        <h3 className="font-bold mb-3 flex items-center">
                          <CheckCircle size={16} className="mr-2 text-indigo-500" />
                          Milestones
                        </h3>
                        
                        <div className="space-y-2">
                          {selectedGoal.milestones.map(milestone => (
                            <div 
                              key={milestone.id}
                              className={`flex items-center p-3 rounded-lg ${
                                darkMode ? 'bg-gray-700' : 'bg-gray-100'
                              }`}
                            >
                              <div 
                                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mr-3 cursor-pointer ${
                                  milestone.completed 
                                    ? 'bg-green-500 border-green-500' 
                                    : darkMode ? 'border-gray-500' : 'border-gray-400'
                                }`}
                                onClick={() => handleMilestoneToggle(milestone.id)}
                              >
                                {milestone.completed && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              
                              <div className="flex-grow">
                                <p className={`text-sm font-medium ${
                                  milestone.completed ? 'line-through opacity-70' : ''
                                }`}>
                                  {milestone.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Due: {new Date(milestone.date).toLocaleDateString()}
                                </p>
                              </div>
                              
                              {milestone.completed && (
                                <div className="flex-shrink-0">
                                  <Award size={16} className="text-green-500" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Team Section */}
                      <div>
                        <h3 className="font-bold mb-3 flex items-center">
                          <Users size={16} className="mr-2 text-indigo-500" />
                          Team Members
                        </h3>
                        
                        <div className="space-y-2">
                          {selectedGoal.collaborators.map(collaborator => (
                            <div 
                              key={collaborator.id}
                              className={`flex items-center p-3 rounded-lg ${
                                darkMode ? 'bg-gray-700' : 'bg-gray-100'
                              }`}
                            >
                              <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden mr-3">
                                <img 
                                  src={collaborator.avatar} 
                                  alt={collaborator.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium">{collaborator.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Comments Section */}
                      <div>
                        <h3 className="font-bold mb-3 flex items-center">
                          <MessageSquare size={16} className="mr-2 text-indigo-500" />
                          Comments
                        </h3>
                        
                        <div className="space-y-4 mb-4">
                          {selectedGoal.comments.map(comment => (
                            <div key={comment.id} className={`p-3 rounded-lg ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                  <img 
                                    src={comment.user.avatar} 
                                    alt={comment.user.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{comment.user.name}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(comment.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm">{comment.text}</p>
                            </div>
                          ))}
                          
                          {selectedGoal.comments.length === 0 && (
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                              No comments yet. Be the first to comment!
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            className={`flex-grow px-4 py-2 rounded-lg ${
                              darkMode 
                                ? 'bg-gray-700 text-white border-gray-600' 
                                : 'bg-gray-100 text-gray-800 border-gray-200'
                            } border focus:outline-none focus:ring-2 focus:ring-indigo-300`}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment();
                              }
                            }}
                          />
                          <button
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            onClick={handleAddComment}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
          
          {/* Analytics View */}
          {activeTab === 'analytics' && (
            <div className="p-4 md:p-6">
              <h2 className="text-2xl font-bold mb-6">Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-medium mb-4">Goal Completion Rate</h3>
                  <div className="text-3xl font-bold mb-2 text-indigo-600">67%</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-green-500">↑ 12%</span> from last month
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-medium mb-4">Active Goals</h3>
                  <div className="text-3xl font-bold mb-2 text-indigo-600">{goals.length}</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-green-500">↑ 3</span> from last month
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-medium mb-4">Milestones Achieved</h3>
                  <div className="text-3xl font-bold mb-2 text-indigo-600">
                    {goals.reduce((acc, goal) => acc + goal.milestones.filter(m => m.completed).length, 0)}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-green-500">↑ 8</span> from last month
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-medium mb-4">Goal Performance</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                        <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                        <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                            borderColor: darkMode ? '#374151' : '#e5e7eb',
                            color: darkMode ? '#ffffff' : '#000000'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="completed" 
                          name="Completed Goals" 
                          stroke="#6366f1" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                          activeDot={{ r: 6 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="created" 
                          name="Created Goals" 
                          stroke="#ec4899" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-medium mb-4">Goals by Category</h3>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                            borderColor: darkMode ? '#374151' : '#e5e7eb',
                            color: darkMode ? '#ffffff' : '#000000'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Calendar View */}
          {activeTab === 'calendar' && (
            <div className="p-4 md:p-6">
              <h2 className="text-2xl font-bold mb-6">Goal Calendar</h2>
              
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">May 2025</h3>
                <div className="flex items-center space-x-2">
                  <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                    <ChevronLeft size={20} />
                  </button>
                  <button className="px-4 py-1 rounded-md bg-indigo-600 text-white text-sm">Today</button>
                  <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 text-center border-b dark:border-gray-700">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="py-2 font-medium text-sm">{day}</div>
                  ))}
                </div>
                
                {/* Days Grid */}
                <div className="grid grid-cols-7 grid-rows-5">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const dayGoals = goals.filter(goal => {
                      const goalDate = new Date(goal.deadline);
                      return goalDate.getDate() === day && goalDate.getMonth() === 4; // May is month 4 (0-indexed)
                    });
              
                    return (
                      <div key={day} className={`p-2 h-28 border-b border-r dark:border-gray-700 ${day === 5 ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
                        <div className={`text-sm mb-1 ${day === 5 ? 'font-bold text-indigo-600' : ''}`}>{day}</div>
              
                        {/* Display goals for the day */}
                        {dayGoals.map(goal => (
                          <div key={goal.id} className="px-2 py-1 text-xs mb-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 rounded">
                            {goal.title}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Upcoming Deadlines */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Upcoming Deadlines</h3>
                
                <div className="space-y-3">
                  {goals
                    .filter(goal => new Date(goal.deadline) > new Date())
                    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                    .slice(0, 3)
                    .map(goal => (
                      <motion.div
                        key={goal.id}
                        className={`flex items-center p-4 rounded-lg cursor-pointer ${
                          darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                        } shadow-md`}
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          setActiveTab('goals');
                          setSelectedGoal(goal);
                        }}
                      >
                        <div className={`flex-shrink-0 w-2 h-12 rounded-full mr-4 ${
                          goal.priority === 'high' ? 'bg-red-500' : 
                          goal.priority === 'medium' ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}></div>
                        
                        <div className="flex-grow">
                          <h4 className="font-medium">{goal.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Due: {new Date(goal.deadline).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0 flex items-center">
                          <span className="mr-2 text-sm font-medium">{goal.progress}%</span>
                          <ChevronRight size={16} />
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Create Goal Modal */}
      <AnimatePresence>
        {showCreateGoalModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateGoalModal(false)}
          >
            <motion.div
              className={`w-full max-w-md rounded-lg shadow-xl overflow-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Create New Goal</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 rounded-md border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      placeholder="Enter goal title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      className={`w-full px-3 py-2 rounded-md border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      rows={3}
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      placeholder="Describe your goal"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        className={`w-full px-3 py-2 rounded-md border ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        value={newGoal.category}
                        onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                      >
                        <option value="personal">Personal</option>
                        <option value="professional">Professional</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Priority</label>
                      <select
                        className={`w-full px-3 py-2 rounded-md border ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        value={newGoal.priority}
                        onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Deadline</label>
                    <input
                      type="date"
                      className={`w-full px-3 py-2 rounded-md border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Team (Optional)</label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 rounded-md border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      value={newGoal.team || ''}
                      onChange={(e) => setNewGoal({ ...newGoal, team: e.target.value })}
                      placeholder="Team name (if applicable)"
                    />
                  </div>
                </div>
              </div>
              
              <div className={`px-6 py-4 flex justify-end gap-3 ${
                darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'
              }`}>
                <button
                  className={`px-4 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                  onClick={() => setShowCreateGoalModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  onClick={handleAddGoal}
                  disabled={!newGoal.title || !newGoal.description || !newGoal.deadline}
                >
                  Create Goal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div
              className={`w-full max-w-md rounded-lg shadow-xl overflow-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Toggle between light and dark themes
                      </p>
                    </div>
                    <div 
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                        darkMode ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                      onClick={() => setDarkMode(!darkMode)}
                    >
                      <motion.div 
                        className="bg-white w-4 h-4 rounded-full shadow-md"
                        animate={{ x: darkMode ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notifications</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enable push notifications
                      </p>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 cursor-pointer bg-indigo-600`}>
                      <motion.div 
                        className="bg-white w-4 h-4 rounded-full shadow-md"
                        style={{ x: 24 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Email Notifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="email-daily"
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          checked
                        />
                        <label htmlFor="email-daily" className="ml-2 text-sm">
                          Daily summary
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="email-comments"
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          checked
                        />
                        <label htmlFor="email-comments" className="ml-2 text-sm">
                          New comments
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="email-deadlines"
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          checked
                        />
                        <label htmlFor="email-deadlines" className="ml-2 text-sm">
                          Upcoming deadlines
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`px-6 py-4 flex justify-end gap-3 ${
                darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'
              }`}>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  onClick={() => setShowSettingsModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function GoalTrackerApp() {
  return <GoalTracker />;
}