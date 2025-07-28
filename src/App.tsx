import { ThemeProvider } from "./components/theme-provider"
import { Header } from "./components/header"
import { Dashboard } from "./components/dashboard"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="analytics-dashboard-theme">
      <div className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main className="relative">
          <Dashboard />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
