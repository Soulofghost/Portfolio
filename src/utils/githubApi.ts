export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at?: string;
  is_fork?: boolean;
  category: string;
}

export interface GithubStats {
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string;
  bio: string;
  location: string;
  hireable: boolean;
  repos: GithubRepo[];
  rateLimitRemaining?: number;
  cachedAt?: string;
  isFallback?: boolean;
}

export async function fetchGithubData(username: string = 'Soulofghost', forceRefresh = false): Promise<GithubStats> {
  try {
    // 1. Try fetching via internal cached API route
    const res = await fetch(`/api/github/repos${forceRefresh ? '?refresh=true' : ''}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: forceRefresh ? 'no-store' : 'default',
    });

    if (res.ok) {
      const data = await res.json();
      return {
        publicRepos: data.user.public_repos || data.repos.length,
        followers: data.user.followers || 0,
        following: data.user.following || 0,
        avatarUrl: data.user.avatar_url || '/profile.jpg',
        bio: data.user.bio || 'Computer Science & AI Student | Java & Full Stack Developer',
        location: data.user.location || 'Trivandrum, Kerala, India',
        hireable: true,
        repos: data.repos || [],
        rateLimitRemaining: data.rateLimitRemaining,
        cachedAt: data.cachedAt,
        isFallback: data.isFallback,
      };
    }
  } catch (err) {
    console.warn('Internal GitHub API route unreachable, attempting direct GitHub fetch:', err);
  }

  // 2. Direct fallback to GitHub API
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
    ]);

    const userData = userRes.ok ? await userRes.json() : null;
    const reposData = reposRes.ok ? await reposRes.json() : [];

    const repos: GithubRepo[] = Array.isArray(reposData)
      ? reposData.map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          homepage: r.homepage || null,
          stargazers_count: r.stargazers_count || 0,
          forks_count: r.forks_count || 0,
          language: r.language || 'Code',
          topics: Array.isArray(r.topics) ? r.topics : [],
          updated_at: r.updated_at,
          category: r.language === 'Java' ? 'Java Development' : 'Web Development',
        }))
      : [];

    return {
      publicRepos: userData?.public_repos || repos.length,
      followers: userData?.followers ?? 13,
      following: userData?.following ?? 22,
      avatarUrl: userData?.avatar_url || '/profile.jpg',
      bio: userData?.bio || 'Computer Science & AI Student | Java & Full Stack Developer',
      location: userData?.location || 'Trivandrum, Kerala, India',
      hireable: true,
      repos,
    };
  } catch (error) {
    console.error('Failed to fetch from GitHub directly:', error);
    return {
      publicRepos: 86,
      followers: 13,
      following: 22,
      avatarUrl: '/profile.jpg',
      bio: 'Computer Science & AI Student | Java & Full Stack Developer',
      location: 'Trivandrum, Kerala, India',
      hireable: true,
      repos: [],
      isFallback: true,
    };
  }
}
