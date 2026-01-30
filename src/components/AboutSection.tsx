import type { FC } from 'react'

const principles = [
  'Quality-first testing culture',
  'Storytelling through measurable impact',
  'Cross-stack automation and observability',
]

const strengths = [
  { label: 'Response time', value: '15m' },
  { label: 'Coverage lift', value: '42%' },
  { label: 'Stability wins', value: '0.4% failure' },
]

const AboutSection: FC = () => (
  <section className="px-4 py-16 md:px-8 lg:px-12 bg-gradient-to-b from-transparent via-[#09090b] to-[#0f172a]">
    <div className="max-w-5xl mx-auto text-center space-y-8">
      <p className="text-sm uppercase tracking-[0.5em] text-purple-300">About</p>
      <div className="space-y-4">
        <h2 className="text-4xl sm:text-5xl font-semibold text-white">
          架构级测试 + 服务端测开的前沿实践
        </h2>
        <p className="text-base text-gray-300 leading-relaxed">
          将用户旅程拆解为可量化的质量目标，在算法、体验、服务端多个层面建立闭环反馈，用可观察性驱动优化。
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-2xl shadow-blue-900/20 backdrop-blur-xl">
          <p className="text-sm uppercase text-purple-300 tracking-widest mb-4">Principles</p>
          <ul className="space-y-3 text-gray-200">
            {principles.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {strengths.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-4 text-center shadow-lg shadow-black/40 backdrop-blur-xl"
            >
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-xs tracking-[0.2em] text-gray-400 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default AboutSection
