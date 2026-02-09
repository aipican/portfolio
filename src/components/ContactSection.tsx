import type { FC, Ref } from 'react'

const ContactSection: FC<{ sectionRef?: Ref<HTMLDivElement>; onWriteClick: () => void }> = ({ sectionRef, onWriteClick }) => (
  <section className="px-4 py-14 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] border-t border-[var(--border-medium)]">
    <div ref={sectionRef} className="max-w-5xl mx-auto rounded-3xl border border-[var(--border-medium)] bg-gradient-to-br from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/40 p-8 shadow-2xl shadow-[var(--accent-primary)]/20 backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent mt-2">
            如果与贵司的 HC 匹配，请发邮件联系我吧！
          </h3>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            onWriteClick()
          }}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] px-8 py-4 text-sm font-bold uppercase tracking-[0.28em] text-white transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/40 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
        >
          CONTACT
        </button>
      </div>
    </div>
  </section>
)

export default ContactSection
