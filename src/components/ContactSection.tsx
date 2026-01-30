import type { FC, Ref } from 'react'

const ContactSection: FC<{ sectionRef?: Ref<HTMLDivElement>; onWriteClick: () => void }> = ({ sectionRef, onWriteClick }) => (
  <section className="px-4 py-12 bg-[#09090b] border-t border-white/5">
    <div ref={sectionRef} className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-[#1f2937]/80 to-[#0f172a]/90 p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          
          <h3 className="text-3xl font-semibold text-white mt-2">
            如果与贵司的 HC 匹配，请发邮件联系我吧！
          </h3>
          {/* <p className="text-gray-400 mt-2">
            期待与您做进一步的沟通。
          </p> */}
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            onWriteClick()
          }}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:opacity-95 active:opacity-90"
        >
          CONTACT
        </button>
      </div>
    </div>
  </section>
)

export default ContactSection
