import { MotionConfig } from 'framer-motion'
import { useHashRoute } from './hooks/useHashRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

export default function App() {
  const route = useHashRoute()

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg font-sans text-text">
        <Navbar route={route} />
        <main>
          {route === '/' && <Home />}
          {route === '/about' && <About />}
          {route === '/projects' && <Projects />}
          {route === '/contact' && <Contact />}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
