import { useState } from 'react';
import type { FC, Ref } from 'react';
import { projects, type Project } from '../data/projects';
import ResumePage from './Resume';

export type DisplayMode = 'projects' | 'resume';

const Projects: FC<{
    view: DisplayMode;
    sectionRef?: Ref<HTMLDivElement>;
}> = ({ view, sectionRef }) => {
    const [filter, setFilter] = useState<'model_eval' | 'experience' | 'ai_assisted'>('model_eval');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [processProject, setProcessProject] = useState<Project | null>(null);

    const filteredProjects = filter === 'model_eval'
        ? projects.filter(p => p.id === 1 || p.id === 2)
        : filter === 'experience'
            ? projects.filter(p => p.id === 3 || p.id === 4)
            : projects.filter(p => p.id === 5);

    const closeDetail = () => setSelectedProject(null);
    const closeProcess = () => setProcessProject(null);

    return (
        <section ref={sectionRef} id="projects" className="min-h-screen bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] py-20 px-6">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center space-y-6">
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
                        {view === 'projects' ? (
                            <>
                                项目展示
                                <span className="ml-2 text-2xl font-normal lowercase tracking-[0.2em] text-white/50">(部分)</span>
                            </>
                        ) : (
                            <>
                                个人简历
                                <span className="ml-2 text-2xl font-normal lowercase tracking-[0.2em] text-white/50">(部分)</span>
                            </>
                        )}
                    </h2>
                    {view === 'projects' && <div className="h-4"></div>}
                    {view === 'resume' && <div className="h-4"></div>}
                </div>

                {view === 'projects' ? (
                    <>
                        <div className="flex justify-center gap-3 mb-6 flex-wrap">
                            <button
                                onClick={() => setFilter('model_eval')}
                                className={`rounded-full px-6 py-3 text-lg font-semibold transition-all duration-300 border uppercase tracking-[0.25em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] active:scale-95 hover:scale-105 ${filter === 'model_eval'
                                    ? 'border-transparent bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] text-white shadow-2xl shadow-[var(--accent-primary)]/30'
                                    : 'border-[var(--border-medium)] bg-[var(--bg-tertiary)]/40 backdrop-blur-sm text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/40 hover:bg-[var(--bg-tertiary)]/60 hover:text-[var(--text-primary)] hover:shadow-lg hover:shadow-[var(--accent-primary)]/10'}`}
                            >
                                模型评测
                            </button>
                            <button
                                onClick={() => setFilter('experience')}
                                className={`rounded-full px-6 py-3 text-lg font-semibold transition-all duration-300 border uppercase tracking-[0.25em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] active:scale-95 hover:scale-105 ${filter === 'experience'
                                    ? 'border-transparent bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] text-white shadow-2xl shadow-[var(--accent-primary)]/30'
                                    : 'border-[var(--border-medium)] bg-[var(--bg-tertiary)]/40 backdrop-blur-sm text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/40 hover:bg-[var(--bg-tertiary)]/60 hover:text-[var(--text-primary)] hover:shadow-lg hover:shadow-[var(--accent-primary)]/10'}`}
                            >
                                体验评测
                            </button>
                            <button
                                onClick={() => setFilter('ai_assisted')}
                                className={`rounded-full px-6 py-3 text-lg font-semibold transition-all duration-300 border uppercase tracking-[0.25em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] active:scale-95 hover:scale-105 ${filter === 'ai_assisted'
                                    ? 'border-transparent bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] text-white shadow-2xl shadow-[var(--accent-primary)]/30'
                                    : 'border-[var(--border-medium)] bg-[var(--bg-tertiary)]/40 backdrop-blur-sm text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/40 hover:bg-[var(--bg-tertiary)]/60 hover:text-[var(--text-primary)] hover:shadow-lg hover:shadow-[var(--accent-primary)]/10'}`}
                            >
                                AI辅测
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    onViewDetail={() => setSelectedProject(project)}
                                    onViewProcess={() => setProcessProject(project)}
                                />
                            ))}
                        </div>
                        {
                            selectedProject && (
                                <ProjectDetailPanel project={selectedProject} onClose={closeDetail} />
                            )
                        }
                        {
                            processProject && (
                                <ProjectProcessPanel project={processProject} onClose={closeProcess} />
                            )
                        }
                    </>
                ) : (
                    <ResumePage />
                )}
            </div >
        </section >
    );
};

const ProjectCard: FC<{
    project: Project;
    index: number;
    onViewDetail: () => void;
    onViewProcess: () => void;
}> = ({ project, index, onViewDetail, onViewProcess }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isSoutuipingce = project.id === 3;
    const isSlideImage = project.id === 1 || project.id === 2 || project.id === 3 || project.id === 4 || project.id === 5;
    const hasDescriptionNewline = project.description.includes('\n');

    return (
        <div
            className="group relative bg-[var(--bg-tertiary)]/60 rounded-2xl overflow-hidden backdrop-blur-md border border-[var(--border-medium)] hover:border-[var(--accent-primary)]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/20 hover:-translate-y-2 flex flex-col cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
            onClick={onViewDetail}
        >
            <div
                className="relative h-48 overflow-hidden bg-gradient-to-br from-[var(--accent-primary)]/[0.12] to-[var(--accent-secondary)]/[0.12]"
                onClick={(e) => {
                    if (!isSlideImage) return;
                    e.stopPropagation();
                    onViewProcess();
                }}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                        {project.liveUrl && (
                            isSoutuipingce ? (
                                <button
                                    type="button"
                                    className="flex-1 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] text-white px-4 py-2.5 rounded-lg text-center font-bold transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent-primary)]/40 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onViewDetail();
                                    }}
                                >
                                    查看详情
                                </button>
                            ) : (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] text-white px-4 py-2.5 rounded-lg text-center font-bold transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent-primary)]/40 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    查看详情
                                </a>
                            )
                        )}
                        {project.githubUrl && (
                            isSoutuipingce ? (
                                <button
                                    type="button"
                                    className="flex-1 bg-[var(--bg-tertiary)]/60 backdrop-blur-sm border border-[var(--border-medium)] text-white px-4 py-2.5 rounded-lg text-center font-bold transition-all duration-300 hover:bg-[var(--bg-tertiary)]/80 hover:border-[var(--accent-primary)]/40 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onViewProcess();
                                    }}
                                >
                                    框架／流程
                                </button>
                            ) : (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-[var(--bg-tertiary)]/60 backdrop-blur-sm border border-[var(--border-medium)] text-white px-4 py-2.5 rounded-lg text-center font-bold transition-all duration-300 hover:bg-[var(--bg-tertiary)]/80 hover:border-[var(--accent-primary)]/40 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    框架／流程
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className="p-6 flex-1 overflow-auto">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--accent-primary)] group-hover:to-[var(--accent-secondary)] transition-all duration-300">
                    {project.title}
                </h3>
                <p className={`text-[var(--text-muted)] mb-4 leading-relaxed ${hasDescriptionNewline ? 'whitespace-pre-line' : 'line-clamp-3 group-hover:line-clamp-none'}`}>
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className="px-3 py-1.5 bg-[var(--bg-tertiary)]/50 text-[var(--text-secondary)] rounded-full text-sm font-medium border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/30 hover:bg-[var(--bg-tertiary)]/70 transition-all duration-300 cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
    );
};

export default Projects;

const ProjectProcessPanel: FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div
                className="fixed inset-y-0 left-0 z-[60] flex w-full max-w-3xl flex-col bg-[#030712] shadow-2xl shadow-black/60 border border-white/10 p-6 text-sm text-gray-200 animate-slide-left-in"
                onClick={onClose}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-white mt-2">{project.title}</h3>
                    </div>
                    <button
                        type="button"
                        aria-label="Close process"
                        onClick={onClose}
                        className="text-white/70 transition hover:text-white text-2xl leading-none"
                    >
                        x
                    </button>
                </div>
                <div className="mt-6 flex-1 overflow-auto">
                    <img src={project.image} alt={`${project.title} 框架／流程`} className="w-full h-auto rounded-xl border border-white/10" />
                </div>
            </div>
        </>
    );
};

const ProjectDetailPanel: FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div
                className="fixed inset-y-0 left-0 z-50 flex w-full max-w-3xl flex-col bg-[#030712] shadow-2xl shadow-black/60 border border-white/10 p-8 text-sm text-gray-200 animate-slide-left-in"
                onClick={onClose}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-2xl font-semibold text-white mt-2">{project.title}</h3>
                        {project.detailTimeframe && (
                            <p className="text-xs uppercase tracking-[0.3em] text-blue-300 whitespace-pre">
                                {project.detailTimeframe}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        aria-label="Close detail"
                        onClick={onClose}
                        className="text-white/70 transition hover:text-white text-2xl leading-none"
                    >
                        x
                    </button>
                </div>
                <div className="mt-6 space-y-6 overflow-y-auto pr-2">
                    {project.detailSections?.map((section) => (
                        <div key={section.title} className="space-y-2 border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
                            <p className="text-lg font-semibold uppercase tracking-[0.4em] text-white">
                                {section.title}
                            </p>
                            {section.text && (
                                <p className="text-sm leading-relaxed text-gray-200 whitespace-pre-line">{section.text}</p>
                            )}
                            {section.bullets && (
                                <ul className="list-disc space-y-2 pl-5 text-gray-300">
                                    {section.bullets.map((bullet) => {
                                        const colonIndex = bullet.indexOf('：')
                                        const hasSeparator = colonIndex >= 0
                                        const title = hasSeparator ? bullet.slice(0, colonIndex + 1) : ''
                                        const body = hasSeparator ? bullet.slice(colonIndex + 1) : bullet

                                        return (
                                            <li key={bullet} className="text-sm leading-relaxed">
                                                {hasSeparator ? (
                                                    <>
                                                        <strong className="font-semibold text-white">{title}</strong>
                                                        <span className="whitespace-pre-line">{body}</span>
                                                    </>
                                                ) : (
                                                    <span className="whitespace-pre-line">{bullet}</span>
                                                )}
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-6 text-xs uppercase tracking-[0.4em] text-gray-500">
                    点击任意处或按X关闭
                </div>
            </div>
        </>
    );
};
