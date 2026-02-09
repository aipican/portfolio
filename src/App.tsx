import { useRef, useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import ContactSection from './components/ContactSection'
import type { DisplayMode } from './components/Projects'
import './App.css'

type HeroView = DisplayMode | 'contact'

function App() {
  const [view, setView] = useState<DisplayMode>('projects')
  const [heroView, setHeroView] = useState<HeroView>('projects')
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const openContactEmail = () => {
    window.location.href = 'mailto:orienjoy@163.com'
  }

  const handleViewChange = (mode: DisplayMode) => {
    setView(mode)
    requestAnimationFrame(scrollToProjects)
  }

  const showProjects = () => {
    setHeroView('projects')
    handleViewChange('projects')
  }
  const showResume = () => {
    setHeroView('resume')
    handleViewChange('resume')
  }
  const showContact = () => {
    setHeroView('contact')
    scrollToContact()
    openContactEmail()
  }

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] text-[var(--text-primary)] relative"
      onMouseMove={handleMouseMove}
    >
      {/* Global Mouse Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`
        }}
      />

      <Hero
        onShowProjects={showProjects}
        onShowResume={showResume}
        onShowContact={showContact}
        activeView={heroView}
      />
      <Projects view={view} sectionRef={projectsRef} />
      <ContactSection sectionRef={contactRef} onWriteClick={openContactEmail} />
    </div>
  )
}

export default App

