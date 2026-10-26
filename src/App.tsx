import { MotionConfig } from 'framer-motion'
import { useHashRoute } from './hooks/useHashRoute'
import GridBackground from './components/GridBackground'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import JourneyPage from './pages/Journey'
import Contact from './pages/Contact'

export default function App() {
  const route = useHashRoute()

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-bg font-sans text-text">
        <GridBackground />
        <div className="relative z-10">
          <Navbar route={route} />
          <main>
            {route === '/' && <Home />}
            {route === '/about' && <About />}
            {route === '/projects' && <Projects />}
            {route === '/journey' && <JourneyPage />}
            {route === '/contact' && <Contact />}
          </main>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  )
}
