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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
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

