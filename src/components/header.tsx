import { BarChart3, Bell, Search, User, Menu, X, Settings, LogOut, HelpCircle, Download, Filter, Calendar, MoreVertical } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { useState, useRef, useEffect } from "react"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: 'info' | 'warning' | 'success' | 'error'
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Campaign Performance Alert',
    message: 'Your "Summer Sale" campaign has exceeded budget by 15%',
    time: '5 min ago',
    type: 'warning',
    read: false
  },
  {
    id: '2',
    title: 'Monthly Report Ready',
    message: 'July analytics report is ready for download',
    time: '1 hour ago',
    type: 'success',
    read: false
  },
  {
    id: '3',
    title: 'Low Conversion Rate',
    message: 'Facebook Ads campaign showing 2.1% conversion rate',
    time: '3 hours ago',
    type: 'info',
    read: true
  },
  {
    id: '4',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tomorrow 2-4 AM EST',
    time: '1 day ago',
    type: 'info',
    read: true
  }
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  
  const searchRef = useRef<HTMLInputElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setIsActionsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      alert(`🔍 Searching for: "${searchQuery}"\n\nThis would filter the dashboard data and show relevant campaigns, metrics, and insights.`)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
    searchRef.current?.focus()
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setIsNotificationsOpen(false)
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning': return '⚠️'
      case 'success': return '✅'
      case 'error': return '❌'
      default: return 'ℹ️'
    }
  }

  const getNotificationBg = (type: Notification['type']) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'error': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      default: return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    }
  }

  const handleExportData = () => {
    console.log('Exporting data...')
    alert('📊 Data Export\n\nChoose format:\n• CSV - For spreadsheet analysis\n• PDF - For reports\n• JSON - For developers')
  }

  const handleFilterData = () => {
    console.log('Opening filters...')
    alert('🔍 Advanced Filters\n\nAvailable filters:\n• Date Range\n• Campaign Types\n• Performance Metrics\n• Traffic Sources\n• Conversion Rates')
  }

  const handleDateRange = () => {
    console.log('Opening date range picker...')
    alert('📅 Date Range Picker\n\nSelect from:\n• Last 7 days\n• Last 30 days\n• Last 3 months\n• Custom range')
  }

  const handleProfile = () => {
    console.log('Opening profile...')
    alert('👤 Profile Settings\n\nManage:\n• Personal Information\n• Account Preferences\n• Security Settings\n• Notification Preferences')
  }

  const handleSettings = () => {
    console.log('Opening settings...')
    alert('⚙️ Dashboard Settings\n\nConfigure:\n• Display Preferences\n• Data Refresh Rates\n• Chart Types\n• Export Formats\n• API Integrations')
  }

  const handleHelp = () => {
    console.log('Opening help...')
    alert('❓ Help & Support\n\nGet help with:\n• Dashboard Navigation\n• Understanding Metrics\n• Troubleshooting\n• Contact Support')
  }

  const handleLogout = () => {
    console.log('Logging out...')
    if (confirm('🚪 Are you sure you want to log out?\n\nYou will need to sign in again to access the dashboard.')) {
      alert('✅ Logout successful!\n\nRedirecting to login page...')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                ADmyBRAND Insights
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                Analytics Dashboard
              </p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                ADmyBRAND
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search campaigns, metrics..."
                className={`w-64 pl-10 pr-10 py-2 text-sm border border-input bg-background/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${isSearchFocused ? 'w-80' : ''}`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </form>

            {/* Quick Actions */}
            <div className="relative" ref={actionsRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsActionsOpen(!isActionsOpen)}
                className="hover:bg-accent/50 transition-colors"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Quick Actions</span>
              </Button>
              
              {isActionsOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50">
                  <div className="p-1">
                    <button
                      onClick={handleExportData}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </button>
                    <button
                      onClick={handleFilterData}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Advanced Filters
                    </button>
                    <button
                      onClick={handleDateRange}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Date Range
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative hover:bg-accent/50 transition-colors"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-primary-foreground font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  </span>
                )}
                <span className="sr-only">Notifications</span>
              </Button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Notifications</h3>
                      <div className="flex space-x-2">
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-primary hover:underline"
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          onClick={clearAllNotifications}
                          className="text-xs text-muted-foreground hover:text-destructive"
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markNotificationAsRead(notification.id)}
                          className={`p-3 border-b border-border last:border-b-0 cursor-pointer hover:bg-accent/50 transition-colors ${
                            !notification.read ? 'bg-primary/5' : ''
                          } ${getNotificationBg(notification.type)}`}
                        >
                          <div className="flex items-start space-x-3">
                            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium truncate">{notification.title}</p>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="hover:bg-accent/50 transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="sr-only">Profile</span>
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">John Doe</p>
                        <p className="text-xs text-muted-foreground">john@admybrand.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={handleProfile}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile Settings
                    </button>
                    <button
                      onClick={handleSettings}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </button>
                    <button
                      onClick={handleHelp}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help & Support
                    </button>
                    <div className="border-t border-border my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative hover:bg-accent/50 transition-colors"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-[8px] text-primary-foreground font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </span>
              )}
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-accent/50 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search campaigns, metrics..."
                  className="w-full pl-10 pr-10 py-2 text-sm border border-input bg-background/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </form>

              {/* Mobile Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={handleExportData}
                  className="flex items-center justify-center space-x-2 py-2 px-3 text-sm bg-background border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleFilterData}
                  className="flex items-center justify-center space-x-2 py-2 px-3 text-sm bg-background border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>

              {/* Mobile Notifications */}
              {isNotificationsOpen && (
                <div className="mb-3 p-3 bg-background border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Notifications</h4>
                    <button
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markNotificationAsRead(notification.id)}
                        className={`p-2 rounded-md cursor-pointer transition-colors ${
                          !notification.read ? 'bg-primary/10' : 'bg-muted/50'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{notification.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {notifications.length > 3 && (
                      <button className="w-full text-xs text-primary hover:underline">
                        View all {notifications.length} notifications
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Profile Actions */}
              <div className="space-y-1">
                <button
                  onClick={handleProfile}
                  className="flex items-center w-full space-x-3 py-2 px-3 text-sm hover:bg-accent rounded-lg transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={handleSettings}
                  className="flex items-center w-full space-x-3 py-2 px-3 text-sm hover:bg-accent rounded-lg transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleDateRange}
                  className="flex items-center w-full space-x-3 py-2 px-3 text-sm hover:bg-accent rounded-lg transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Date Range</span>
                </button>
                <button
                  onClick={handleHelp}
                  className="flex items-center w-full space-x-3 py-2 px-3 text-sm hover:bg-accent rounded-lg transition-colors"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Help & Support</span>
                </button>
                <div className="border-t border-border my-2"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full space-x-3 py-2 px-3 text-sm hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
