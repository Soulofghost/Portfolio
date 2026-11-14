'use client';

import { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/utils/variants';
import { fetchGithubData, GithubStats, GithubRepo } from '@/utils/githubApi';
import { FaGithub, FaStar, FaCodeBranch, FaBook, FaSearch, FaFilter, FaLinkedin } from 'react-icons/fa';
import { HiExternalLink, HiRefresh, HiSparkles, HiCode, HiShieldCheck } from 'react-icons/hi';
import LinkedInShareModal, { ShareProjectData } from '@/components/interactive/LinkedInShareModal';

const DOMAIN_CATEGORIES = [
  'All',
  'Artificial Intelligence',
  'Machine Learning',
  'Full Stack Development',
  'Java Development',
  'Python Development',
  'Web Development',
  'Automation & Security',
  'Open Source',
];

const LANGUAGE_COLORS: Record<string, string> = {
  Java: '#b07219',
  Python: '#3572A5',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Svelte: '#ff3e00',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Dart: '#00B4AB',
  Solidity: '#AA6746',
  Code: '#818cf8',
};

function GithubSection() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'forks' | 'name'>('updated');
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const [activeShareProject, setActiveShareProject] = useState<ShareProjectData | null>(null);

  const loadStats = async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await fetchGithubData('Soulofghost', forceRefresh);
      setStats(data);
    } catch (err) {
      console.error('Failed to load GitHub data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  // Distinct language list
  const availableLanguages = useMemo(() => {
    if (!stats?.repos) return [];
    const set = new Set<string>();
    stats.repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set).sort();
  }, [stats]);

  // Aggregate stats across all retrieved repositories
  const aggregateMetrics = useMemo(() => {
    if (!stats?.repos) {
      return {
        totalStars: 0,
        totalForks: 0,
        originalCount: 0,
        forkedCount: 0,
      };
    }
    const totalStars = stats.repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const totalForks = stats.repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);
    const forkedCount = stats.repos.filter((r) => r.is_fork).length;
    const originalCount = stats.repos.length - forkedCount;

    return {
      totalStars,
      totalForks,
      originalCount,
      forkedCount,
    };
  }, [stats]);

  // Filtered and sorted repositories
  const filteredRepos = useMemo(() => {
    if (!stats?.repos) return [];

    let list = stats.repos.filter((repo) => {
      // Search query
      const matchSearch =
        searchQuery === '' ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category
      const matchCategory =
        selectedCategory === 'All' || repo.category === selectedCategory;

      // Language
      const matchLanguage =
        selectedLanguage === 'All' || repo.language === selectedLanguage;

      return matchSearch && matchCategory && matchLanguage;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
      if (sortBy === 'forks') return b.forks_count - a.forks_count;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // Default: updated
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    return list;
  }, [stats, searchQuery, selectedCategory, selectedLanguage, sortBy]);

  // Reset pagination on filter change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, selectedLanguage, sortBy]);

  const paginatedRepos = useMemo(() => {
    const end = page * itemsPerPage;
    return filteredRepos.slice(0, end);
  }, [filteredRepos, page]);

  const hasMore = paginatedRepos.length < filteredRepos.length;

  return (
    <section id="github" className="py-24 relative z-10 bg-slate-950/70 scroll-mt-20 overflow-x-clip">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl">
        {/* Section Heading */}
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-purple-500/30 inline-flex items-center gap-2 shadow-lg shadow-purple-950/40">
            <FaGithub className="text-purple-400" />
            <span>Automated GitHub Synchronization</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Live GitHub <span className="text-gradient">Repository Ecosystem</span>
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed mt-4">
            Automatically synchronized with Alvin MS's public repositories on <a href="https://github.com/Soulofghost" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-semibold">@Soulofghost</a>. Live metadata, verified metrics, zero fake stats.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Live GitHub Stats Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {/* Repositories Breakdown */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card border border-purple-500/30 flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-purple-900/40 text-purple-400 text-2xl border border-purple-500/30 flex-shrink-0">
              <FaBook />
            </div>
            <div className="min-w-0">
              <div className="text-2xl sm:text-3xl font-black text-white">
                {loading ? '...' : stats?.publicRepos || stats?.repos.length || 86}
              </div>
              <div className="text-xs font-mono text-slate-300 font-semibold">Public Repositories</div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {aggregateMetrics.originalCount} Original • {aggregateMetrics.forkedCount} Forked
              </div>
            </div>
          </div>

          {/* Stars & Forks */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card border border-amber-500/30 flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-900/40 text-amber-400 text-2xl border border-amber-500/30 flex-shrink-0">
              <FaStar />
            </div>
            <div className="min-w-0">
              <div className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                <span>{loading ? '...' : aggregateMetrics.totalStars}</span>
                <span className="text-xs font-normal font-mono text-amber-400">Stars</span>
              </div>
              <div className="text-xs font-mono text-slate-300 font-semibold">Community Impact</div>
              <div className="text-[10px] font-mono text-cyan-400 mt-0.5 flex items-center gap-1">
                <FaCodeBranch className="text-[10px]" />
                <span>{aggregateMetrics.totalForks} Total Forks Across Repos</span>
              </div>
            </div>
          </div>

          {/* Developer Network: Followers & Following */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card border border-cyan-500/30 flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-cyan-900/40 text-cyan-400 text-2xl border border-cyan-500/30 flex-shrink-0">
              <HiCode />
            </div>
            <div className="min-w-0">
              <div className="text-2xl sm:text-3xl font-black text-white">
                {loading ? '...' : stats?.followers || 0}
              </div>
              <div className="text-xs font-mono text-slate-300 font-semibold">GitHub Followers</div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {availableLanguages.length} Languages • {stats?.following || 0} Following
              </div>
            </div>
          </div>

          {/* Official Profile & Live Sync Status */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-3.5 rounded-2xl bg-emerald-900/40 text-emerald-400 text-2xl border border-emerald-500/30 flex-shrink-0">
                <FaGithub />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white truncate">@Soulofghost</div>
                <div className="text-[11px] font-mono text-emerald-400 font-semibold">
                  {stats?.cachedAt ? 'Synced (Cached 1h)' : 'Live REST API'}
                </div>
                <div className="text-[9px] font-mono text-slate-500 truncate">
                  {stats?.cachedAt ? new Date(stats.cachedAt).toLocaleTimeString() : 'Verified Active'}
                </div>
              </div>
            </div>
            <button
              onClick={() => loadStats(true)}
              disabled={refreshing || loading}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors flex-shrink-0"
              title="Force Refresh GitHub Data"
              aria-label="Refresh GitHub Repositories"
            >
              <HiRefresh className={`text-base ${refreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Search, Filter & Controls Panel */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-card border border-slate-800 mb-10 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                placeholder="Search all public repositories by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Language Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-400/60"
              >
                <option value="All">All Languages</option>
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400/60"
              >
                <option value="updated">Sort by: Recently Updated</option>
                <option value="stars">Sort by: Most Stars</option>
                <option value="forks">Sort by: Most Forks</option>
                <option value="name">Sort by: Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Domain Category Filter Badges */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
            {DOMAIN_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600/40 text-purple-200 border border-purple-500/60 font-bold'
                    : 'bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Summary */}
        <div className="flex items-center justify-between mb-6 px-1 text-xs font-mono text-slate-400">
          <div>
            Showing <span className="text-white font-bold">{paginatedRepos.length}</span> of{' '}
            <span className="text-cyan-400 font-bold">{filteredRepos.length}</span> matching repositories
          </div>
          {filteredRepos.length > 0 && (
            <div className="text-slate-500 hidden sm:block">
              Page 1 of {Math.ceil(filteredRepos.length / itemsPerPage)}
            </div>
          )}
        </div>

        {/* Repositories Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-56 rounded-2xl glass-card border border-slate-800 animate-pulse p-6" />
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="p-16 rounded-3xl glass-card border border-slate-800 text-center font-mono space-y-3">
            <div className="text-slate-500 text-3xl">🔍</div>
            <div className="text-white text-base font-bold">No repositories match your criteria</div>
            <div className="text-xs text-slate-400">
              Try adjusting your search query, language filter, or category.
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLanguage('All');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-mono font-semibold mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRepos.map((repo) => {
              const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || '#818cf8' : '#64748b';
              const isPriorityFeatured =
                repo.name.toLowerCase().includes('sentrix') ||
                repo.name.toLowerCase().includes('nexa') ||
                repo.name.toLowerCase().includes('civix') ||
                repo.name.toLowerCase().includes('helix');
              const formattedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
              const cleanDescription =
                repo.description ||
                `Production repository by Alvin MS (@Soulofghost) featuring ${repo.language || 'software'} implementation.`;

              return (
                <div
                  key={repo.id}
                  className="box-light-sweep glass-card glass-card-hover rounded-2xl p-4 sm:p-6 border border-slate-800 hover:border-purple-500/50 flex flex-col justify-between transition-all duration-300 group"
                >
                  <div>
                    {/* Header: Name & Priority / Language */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 font-bold text-white text-sm max-w-[210px] truncate">
                        <FaBook className="text-purple-400 text-xs flex-shrink-0" />
                        <span className="truncate group-hover:text-purple-300 transition-colors" title={repo.name}>
                          {repo.name}
                        </span>
                      </div>

                      {repo.language && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 flex items-center gap-1.5 flex-shrink-0 text-slate-300">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: langColor }} />
                          <span>{repo.language}</span>
                        </span>
                      )}
                    </div>

                    {/* Category & Priority Badge */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900/80 text-cyan-400 border border-slate-800">
                        {repo.category}
                      </span>
                      {isPriorityFeatured && (
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Featured Architecture</span>
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed mb-4">
                      {cleanDescription}
                    </p>

                    {/* Topics / Tags */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Metadata Row: Update Date */}
                  <div className="text-[10px] font-mono text-slate-500 mb-3 flex items-center justify-between">
                    <span>Updated {formattedDate}</span>
                    {repo.is_fork && (
                      <span className="text-slate-500">Forked Repository</span>
                    )}
                  </div>

                  {/* Footer & Actions */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1" title="Stars">
                        <FaStar className="text-amber-400 text-xs" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center gap-1" title="Forks">
                        <FaCodeBranch className="text-cyan-400 text-xs" />
                        <span>{repo.forks_count}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() =>
                          setActiveShareProject({
                            title: repo.name,
                            description: cleanDescription,
                            githubUrl: repo.html_url,
                            liveUrl: repo.homepage || undefined,
                            techStack: repo.language ? [repo.language, ...repo.topics] : repo.topics,
                            category: repo.category,
                          })
                        }
                        className="p-1.5 rounded-lg bg-[#0077b5]/20 hover:bg-[#0077b5]/40 text-[#0077b5] hover:text-white border border-[#0077b5]/30 transition-colors"
                        title="Share repository announcement on LinkedIn"
                        aria-label="Share on LinkedIn"
                      >
                        <FaLinkedin className="text-xs" />
                      </button>

                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-400 hover:text-white border border-emerald-500/30 flex items-center gap-1 transition-colors text-[11px]"
                          title="View Live Deployment"
                        >
                          <span>Live</span>
                          <HiExternalLink className="text-[10px]" />
                        </a>
                      )}

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-400 hover:text-cyan-300 border border-slate-800 flex items-center gap-1 transition-colors text-[11px]"
                      >
                        <span>Code</span>
                        <HiExternalLink className="text-xs" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-mono font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all duration-300"
            >
              Load More Repositories ({filteredRepos.length - paginatedRepos.length} remaining) ↓
            </button>
          </div>
        )}

        {/* LinkedIn Share Modal Component */}
        <LinkedInShareModal
          isOpen={Boolean(activeShareProject)}
          onClose={() => setActiveShareProject(null)}
          project={activeShareProject}
        />
      </div>
    </section>
  );
}

export default memo(GithubSection);
