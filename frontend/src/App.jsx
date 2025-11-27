import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AdminPage from './pages/AdminPage'
import AboutPage from './pages/AboutPage'
import LifePage from './pages/LifePage'
import PrivacyPage from './pages/PrivacyPage'
import ContactPage from './pages/ContactPage'
import ErrorBoundary from './components/ErrorBoundary'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/life" element={<LifePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
