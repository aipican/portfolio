import { type FC, useRef } from 'react'

type HeroProps = {
  onShowProjects: () => void
  onShowResume: () => void
  onShowContact: () => void
  activeView: 'projects' | 'resume' | 'contact'
}

const Hero: FC<HeroProps> = ({ onShowProjects, onShowResume, onShowContact, activeView }) => {
  const nav = [
    { label: 'Projects', action: onShowProjects, view: 'projects' as const },
    { label: 'Resume', action: onShowResume, view: 'resume' as const },
    { label: 'Contact', action: onShowContact, view: 'contact' as const },
  ]

  const heroRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    heroRef.current.style.setProperty('--mouse-x', `${x}px`)
    heroRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative isolate overflow-hidden px-4 py-24 sm:px-8 lg:px-12 sm:py-28 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)] group"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,var(--glow-primary),transparent)]" />

      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[var(--accent-primary)]/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-[var(--accent-secondary)]/[0.12] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[var(--accent-tertiary)]/[0.08] blur-[100px]" />

      {/* Mouse Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.4), transparent 40%)`
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="space-y-10 animate-hero-in">
          <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl xl:text-[3.5rem]">
            <span className="block bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">用户体验</span>
            <span className="bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">＋算法效果评测</span>
          </h1>
          <nav className="flex flex-wrap gap-3 sm:gap-4" aria-label="主导航">
            {nav.map((item, i) => {
              const isActive = activeView === item.view
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className={`hero-pill rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 border uppercase tracking-[0.25em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] active:scale-95 hover:scale-105 ${isActive
                    ? 'border-transparent bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] text-white shadow-2xl shadow-[var(--accent-primary)]/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700'
                    : 'border-[var(--border-medium)] bg-[var(--bg-tertiary)]/40 backdrop-blur-sm text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/40 hover:bg-[var(--bg-tertiary)]/60 hover:text-[var(--text-primary)] hover:shadow-lg hover:shadow-[var(--accent-primary)]/10'}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Hero
