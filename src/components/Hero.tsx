import type { FC } from 'react'

type HeroProps = {
  onShowProjects: () => void
  onShowResume: () => void
  onShowContact: () => void
  activeView: 'projects' | 'resume' | 'contact'
}

const Hero: FC<HeroProps> = ({ onShowProjects, onShowResume, onShowContact, activeView }) => {
  return (
    <section className="relative isolate overflow-hidden px-4 py-20 sm:px-8 lg:px-12 bg-[#18181B]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0f172a]/60 via-[#09090b] to-[#080808]/80 opacity-80"></div>
      <div className="pointer-events-none absolute -top-20 right-[-8rem] h-72 w-72 rounded-full bg-blue-600/20 blur-[140px]"></div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            用户体验＋算法效果评测
          </h1>
          <div className="flex flex-wrap gap-6">
            {[
              { label: 'Projects', action: onShowProjects, view: 'projects' as const },
              { label: 'Resume', action: onShowResume, view: 'resume' as const },
              { label: 'Contact', action: onShowContact, view: 'contact' as const },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition border border-transparent uppercase tracking-[0.3em] ${activeView === item.view
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-white/5 text-gray-300 hover:border-blue-500/60 hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
