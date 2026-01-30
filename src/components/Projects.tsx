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
        <section ref={sectionRef} id="projects" className="min-h-screen bg-[#0b0b12] py-20 px-6">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center space-y-6">
                    <h2 className="text-5xl md:text-6xl font-bold text-white">
                        {view === 'projects' ? (
                            <>
                                项目展示
                                <span className="ml-2 text-2xl font-normal lowercase tracking-[0.2em] text-blue-300">(部分)</span>
                            </>
                        ) : (
                            <>
                                个人简历
                                <span className="ml-2 text-2xl font-normal lowercase tracking-[0.2em] text-blue-300">(部分)</span>
                            </>
                        )}
                    </h2>
                    {view === 'projects' && <div className="h-4"></div>}
                    {view === 'resume' && <div className="h-4"></div>}
                </div>

                {view === 'projects' ? (
                    <>
                        <div className="flex justify-center gap-6 mb-6 flex-wrap">
                            <button
                                onClick={() => setFilter('model_eval')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filter === 'model_eval'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                模型评测
                            </button>
                            <button
                                onClick={() => setFilter('experience')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filter === 'experience'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                体验评测
                            </button>
                            <button
                                onClick={() => setFilter('ai_assisted')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filter === 'ai_assisted'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
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
                        {selectedProject && (
                            <ProjectDetailPanel project={selectedProject} onClose={closeDetail} />
                        )}
                        {processProject && (
                            <ProjectProcessPanel project={processProject} onClose={closeProcess} />
                        )}
                    </>
                ) : (
                    <ResumePage />
                )}
            </div>
        </section>
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
    const isSlideImage = project.id === 1 || project.id === 3 || project.id === 4 || project.id === 5;
    const hasDescriptionNewline = project.description.includes('\n');

    return (
        <div
            className="group relative bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 max-h-[90vh] hover:max-h-[200vh] flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
            onClick={onViewDetail}
        >
            <div
                className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20"
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
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-center font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
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
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-center font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
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
                                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-gray-600 transition-all duration-300"
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
                                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-gray-600 transition-all duration-300"
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
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {project.title}
                </h3>
                <p className={`text-gray-400 mb-4 leading-relaxed ${hasDescriptionNewline ? 'whitespace-pre-line' : 'line-clamp-3 group-hover:line-clamp-none'}`}>
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-700/50 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
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
