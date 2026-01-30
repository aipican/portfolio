import { useState } from 'react';
import type { FC } from 'react';

type ResumeSection = {
    company: string;
    period: string;
    title: string;
    summary: string;
    tasks: string[];
    outcomes: string[];
};

const resumeSections: ResumeSection[] = [
    {
        company: '新创团队',
        period: '2023.01 - 2025.12',
        title: '测试开发',
        summary: '团队承建政企客户的网站(含 APP)，本人负责从需求到交付的质量保障工作，并借助AI辅助测试',
        tasks: [
            '保障 AI 开发的质量：AI 开发阶段 QA 协助 RD 细化单测，提测时加强冒烟（范围和颗粒度等），提测后保证质量前提下加速测试',
            '评测左移(提示/单测)：核查 RD prompt/spec 的逻辑约束和预设流程等对需求/场景的覆盖度，单测所覆盖逻辑/函数的有效出入参和边界等',
            '集成测试：编写优化各步提示词模板和样例（步骤、规则、预期、边界等）；拆解需求/技术文档，更新 RAG 和图谱，判断需求/技术/代码变更的影响；\n\u3000依次生成方案/测试点→用例→代码，执行并自分析失败原因，评测/监控各步生成质量',
            '人工复核：复核AI辅测的质量，复核测试范围，核对业务/技术的关键路径、核心模块和复杂逻辑，持续沉淀优化策略规则、RAG 和提示词模板等',
        ],
        outcomes: [
            '开发协同：新旧功能的冒烟有效（打回率远高于传统开发），BUG 数随开发的迭代持续收敛，测试周期与开发周期匹配。',
            'AI 辅测：持续迭代优化 RAG、图谱、rule/spec，测试点、用例&自动化等的生成准确率从约 60% 提升至约 95%，约省 90% 人力。',
        ],
    },
    {
        company: '某手机厂商 · 商业化广告',
        period: '2020.07 – 2022.12',
        title: '广告策略测试开发',
        summary: '负责 oCPC 广告策略（预算和流量的分配）、策略中台的测试，评测广告算法和调价策略，构建 Qry-Ad 相关性评测体系',
        tasks: [
            '策略测试：梳理、采样并扩增数据，遍历逻辑及公式分支，以解决数据多样且偏统计、逻辑繁杂、效果看实验等难点',
            '联查日志/埋点/DB/缓存中字段属性的增减，验证索引检索、召回融合、扶持打压等有效，拦截逻辑偏差或遗漏风险',
            '问题自分析：解耦策略链路(调价-排序-召回-检索），追踪解析日志、定位代码段，定制 Mock 并 Debug、分析问题原因',
            'A/B Mock：用 pb2tarsgo 做 json-map-struct 映射，试验链路加 mock、写逻辑公式，动态改数、调策略，比对对照组',
            'CTR/CVR 评测：校验埋点入库和归因准确性，评估预估类算法预估值与归因后验值的误差，提升策略及出价有效性',
            'AI 辅助测试：应用 NLP/OCR/向量等技术，提取广告文图音视频特征，构建“关键词-广告-特征”索引库和检索服务，辅测广告质量/创意生成/投放效果/搜推相关性/用户体验/竞品跟踪等，落地准确性和稳定性优于人工，降本约 80%',
        ],
        outcomes: [
            '落地准确性和稳定性优于人工，降本约 80%。',
        ],
    },
    {
        company: '某 K12 教育 · AI 工程院',
        period: '2018.05 - 2020.07',
        title: '算法测试 Leader',
        summary: '构建算法评测体系，包括搭团队，定流程、方法，定义评估方案、策略、指标、数据集，构建工具链、搭建平台…',
        tasks: [
            '构建评测标准：主导构建覆盖【 CV、NLP、语音 】三大领域的通用评测体系。针对【 50余类 】算法定义了标准化的数据集构建规范、评估策略及验收指标，实现了从单点测试到标准化体系的转型。',
            '解决指标与实际差异问题：\n\u3000【数据质量】：构建符合落地业务场景的评估数据集；\n\u3000【定量】：除精准召/F1/AUC等常规指标外，定义/选择更贴近业务的新评估标准；\n\u3000【定性】： 结合主观观感评分与 Good/Bad Case 分析；\n\u3000【泛化分析】：准实时采样回流数据，模型＋人工快速判断。',
            '竞品对标与赋能：统一封装自研算法和若干竞品的推理接口/SDK，实现了异构模型的数据接入与结果标准化管理，大幅降低了新算法接入评测的开发成本。\n\u3000建立了包含【10余家】头部竞品的动态基准库，通过纵横向深度对比，为算法团队提供了有效的调优方向，不仅发现了若干模型结构性缺陷，还明确了产品的行业水位。',
            '构建测管平台：集成数据-模型-结果管理，打通了模型编译 -> GPU调度 ->推理 ->性能评估 ->可视化报表的自动化流水线，解决了流程碎片化问题。',
        ],
        outcomes: [
            '较之前碎片化的评测方式，测管平台落地后，模型评测的端到端耗时缩短了约【 90% 】',
            '带领团队完成了【 200+ 】场景的模型效果评测，评测结论被研发采纳率达【 100% 】。',
        ],
    },
];

const ResumePage: FC = () => {
    const [openCompany, setOpenCompany] = useState<string | null>(null);
    const [compactCompany, setCompactCompany] = useState<string | null>(null);
    const [scrollEnabledCompany, setScrollEnabledCompany] = useState<string | null>(null);

    const renderBracketBold = (text: string) =>
        text.split(/【([^】]+)】/g).map((part, idx) =>
            idx % 2 === 1 ? (
                <strong key={`b-${idx}`} className="font-semibold text-white">
                    {part}
                </strong>
            ) : (
                part
            )
        );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 landscape:grid-cols-2 gap-8">
            {resumeSections.map((section) => {
                const isOpen = openCompany === section.company;
                const isCompact = compactCompany === section.company;
                const scrollEnabled = scrollEnabledCompany === section.company;

                return (
                    <div
                        key={section.company}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            setOpenCompany(isOpen ? null : section.company);
                            if (isOpen) {
                                setCompactCompany(null);
                                setScrollEnabledCompany(null);
                            } else {
                                setScrollEnabledCompany(null);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setOpenCompany(isOpen ? null : section.company);
                                if (isOpen) {
                                    setCompactCompany(null);
                                    setScrollEnabledCompany(null);
                                } else {
                                    setScrollEnabledCompany(null);
                                }
                            }
                        }}
                        onScroll={(e) => {
                            if (!isOpen) return;
                            const top = (e.currentTarget as HTMLDivElement).scrollTop;
                            if (compactCompany === section.company) {
                                if (top < 4) setCompactCompany(null);
                            } else {
                                if (top > 16) setCompactCompany(section.company);
                            }
                        }}
                        onTransitionEnd={(e) => {
                            if (e.target !== e.currentTarget) return;
                            if (e.propertyName !== 'max-height') return;
                            if (openCompany === section.company) setScrollEnabledCompany(section.company);
                        }}
                        className={`bg-gray-800/60 rounded-2xl border border-gray-700 p-6 landscape:p-4 shadow-xl shadow-purple-500/20 backdrop-blur-sm cursor-pointer select-none will-change-[max-height] transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-screen landscape:max-h-[90vh]' : 'max-h-[50vh] landscape:max-h-[70vh]'} ${scrollEnabled ? 'overflow-auto' : 'overflow-hidden'}`}
                    >
                        <div
                            className={`sticky -top-6 landscape:-top-4 z-10 bg-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.35)] -mx-6 -mt-6 px-6 landscape:-mx-4 landscape:-mt-4 landscape:px-4 transition-[padding] duration-200 ease-out ${isCompact ? 'py-2' : 'py-3'}`}
                        >
                            <div className={`origin-left transition-transform duration-200 ease-out ${isCompact ? 'scale-90' : 'scale-100'}`}>
                                <h3 className="text-2xl font-bold text-white">{section.company}</h3>
                            </div>
                            <div className={`flex items-center justify-between text-purple-300 origin-left transition-[transform,margin,font-size] duration-200 ease-out ${isCompact ? 'mt-0.5 text-xs scale-95' : 'mt-1 text-sm scale-100'}`}>
                                <span>{section.period}</span>
                                <span className="text-blue-300">{section.title}</span>
                            </div>
                        </div>
                        <p className="text-gray-400 mt-3 mb-4 leading-relaxed whitespace-pre-wrap">{renderBracketBold(section.summary)}</p>
                        <p className="text-purple-300 font-semibold mb-1">工作内容</p>
                        <ul className="text-gray-300 list-disc list-inside mb-4 space-y-1">
                            {section.tasks.map((task) => (
                                <li key={task}>
                                    {(() => {
                                        const colonIndex = task.indexOf('：');
                                        if (colonIndex < 0) return <span className="whitespace-pre-wrap">{renderBracketBold(task)}</span>;
                                        const title = task.slice(0, colonIndex + 1);
                                        const body = task.slice(colonIndex + 1);

                                        return (
                                            <>
                                                <strong className="font-semibold text-white">{title}</strong>
                                                <span className="whitespace-pre-wrap">{renderBracketBold(body)}</span>
                                            </>
                                        );
                                    })()}
                                </li>
                            ))}
                        </ul>
                        <p className="text-purple-300 font-semibold mb-1">价值产出</p>
                        <ul className="text-gray-300 list-disc list-inside space-y-1">
                            {section.outcomes.map((outcome) => (
                                <li key={outcome}>
                                    <span className="whitespace-pre-wrap">{renderBracketBold(outcome)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default ResumePage;
