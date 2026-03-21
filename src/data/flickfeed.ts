export interface Article {
  id: string;
  title: string;
  author: string;
  avatar: string;
  likes: number;
  comments: number;
  date: string;
  category: string;
  preview: string;
  hot?: boolean;
}

export interface Review {
  id: string;
  title: string;
  film: string;
  year: number;
  author: string;
  avatar: string;
  rating: number;
  likes: number;
  comments: number;
  date: string;
  genre: string;
  preview: string;
  hot?: boolean;
}

export interface Longread {
  id: string;
  title: string;
  author: string;
  avatar: string;
  readTime: number;
  likes: number;
  comments: number;
  date: string;
  category: string;
  preview: string;
  hot?: boolean;
}

const now = Date.now();
const day = 86400000;

export const articles: Article[] = [
  {
    id: "a1",
    title: "Cannes 2026 lineup announced: bold choices surprise critics",
    author: "FestivalWire",
    avatar: "FW",
    likes: 423,
    comments: 89,
    date: new Date(now - 0.3 * day).toISOString(),
    category: "Festival Coverage",
    preview: "The selection committee has taken unprecedented risks this year, programming five debut features in competition alongside expected heavyweights. The lineup signals a shift toward auteur-driven cinema.",
    hot: true,
  },
  {
    id: "a2",
    title: "A24 announces $200M production slate for 2027",
    author: "IndieTracker",
    avatar: "IT",
    likes: 567,
    comments: 134,
    date: new Date(now - 0.8 * day).toISOString(),
    category: "Industry",
    preview: "The studio that redefined indie cinema is going bigger. New projects from Greta Gerwig, Barry Jenkins, and a mysterious sci-fi epic from an unnamed director headline the ambitious slate.",
    hot: true,
  },
  {
    id: "a3",
    title: "Christopher Nolan signs exclusive IMAX deal",
    author: "TechCinema",
    avatar: "TC",
    likes: 891,
    comments: 203,
    date: new Date(now - 1.2 * day).toISOString(),
    category: "Industry",
    preview: "Nolan's next three films will be shot exclusively on IMAX film stock, making them the first features designed entirely for the format. The deal includes a custom lens development partnership.",
  },
  {
    id: "a4",
    title: "Streaming wars update: Netflix loses 4M subscribers",
    author: "StreamMetrics",
    avatar: "SM",
    likes: 345,
    comments: 267,
    date: new Date(now - 1.8 * day).toISOString(),
    category: "Industry",
    preview: "The streaming giant's pivot to live events and gaming hasn't stemmed the bleed. Meanwhile, Mubi and Criterion Channel report record growth among cinephile demographics.",
  },
  {
    id: "a5",
    title: "Park Chan-wook's new film wraps production in Seoul",
    author: "AsianCinemaNow",
    avatar: "AC",
    likes: 612,
    comments: 78,
    date: new Date(now - 2.5 * day).toISOString(),
    category: "Production News",
    preview: "Details remain scarce, but sources describe it as a 'revenge thriller with musical elements.' The Korean master's first feature since Decision to Leave is already generating Oscar buzz.",
  },
  {
    id: "a6",
    title: "The rise of analog filmmaking among Gen-Z directors",
    author: "NewWave",
    avatar: "NW",
    likes: 289,
    comments: 156,
    date: new Date(now - 3 * day).toISOString(),
    category: "Trends",
    preview: "Film school applications mentioning analog techniques have surged 340%. Young directors are rejecting digital perfection in favor of grain, light leaks, and the unpredictability of celluloid.",
  },
  {
    id: "a7",
    title: "Oscar rule changes: AI-assisted films now eligible",
    author: "AcademyWatch",
    avatar: "AW",
    likes: 734,
    comments: 445,
    date: new Date(now - 4 * day).toISOString(),
    category: "Awards",
    preview: "The Academy has clarified its position: films using AI in post-production will be eligible for all categories. The announcement has ignited fierce debate across the industry.",
  },
  {
    id: "a8",
    title: "Legendary cinematographer Roger Deakins announces retirement",
    author: "Cinematheque",
    avatar: "CI",
    likes: 1245,
    comments: 312,
    date: new Date(now - 5 * day).toISOString(),
    category: "Industry",
    preview: "After five decades and 16 Oscar nominations, the master behind Blade Runner 2049 and 1917 says his next project will be his last. A career retrospective is planned for the BFI.",
    hot: true,
  },
  {
    id: "a9",
    title: "Bong Joon-ho developing limited series for HBO",
    author: "TVWatch",
    avatar: "TV",
    likes: 456,
    comments: 98,
    date: new Date(now - 6 * day).toISOString(),
    category: "Industry",
    preview: "The Parasite director is making his first foray into prestige television. The eight-episode series is described as a 'class satire set in near-future Seoul.'",
  },
  {
    id: "a10",
    title: "Venice Film Festival to feature VR competition for first time",
    author: "FestivalWire",
    avatar: "FW",
    likes: 178,
    comments: 67,
    date: new Date(now - 7 * day).toISOString(),
    category: "Festival Coverage",
    preview: "The oldest film festival in the world embraces immersive media. A new competition section will showcase 12 VR experiences, signaling a potential paradigm shift for cinema.",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    title: "A visceral masterpiece that redefines the genre",
    film: "Nosferatu",
    year: 2024,
    author: "CriticalLens",
    avatar: "CL",
    rating: 9.2,
    likes: 534,
    comments: 167,
    date: new Date(now - 0.5 * day).toISOString(),
    genre: "Horror",
    preview: "Robert Eggers has done the impossible: he's made a Dracula adaptation that feels genuinely dangerous. Every frame drips with dread. Lily-Rose Depp is transcendent.",
    hot: true,
  },
  {
    id: "r2",
    title: "Brutal, beautiful, and absolutely essential",
    film: "The Brutalist",
    year: 2024,
    author: "DeepCut",
    avatar: "DC",
    rating: 9.5,
    likes: 678,
    comments: 234,
    date: new Date(now - 1 * day).toISOString(),
    genre: "Drama",
    preview: "Brady Corbet's three-and-a-half-hour epic about an immigrant architect is the kind of ambitious, uncompromising filmmaking that reminds you why cinema matters. Adrien Brody is staggering.",
    hot: true,
  },
  {
    id: "r3",
    title: "Messy, provocative, and unforgettable",
    film: "The Substance",
    year: 2024,
    author: "BodyHorror",
    avatar: "BH",
    rating: 7.8,
    likes: 423,
    comments: 289,
    date: new Date(now - 1.5 * day).toISOString(),
    genre: "Horror",
    preview: "Coralie Fargeat's body horror satire doesn't hold back. Demi Moore delivers the performance of her career in a film that's equal parts repulsive and riveting. Not for the faint-hearted.",
  },
  {
    id: "r4",
    title: "A quiet triumph of observational filmmaking",
    film: "All We Imagine as Light",
    year: 2024,
    author: "WorldCinema",
    avatar: "WC",
    rating: 8.7,
    likes: 312,
    comments: 78,
    date: new Date(now - 2 * day).toISOString(),
    genre: "Drama",
    preview: "Payal Kapadia's portrait of three women in Mumbai is luminous cinema. The Grand Prix winner at Cannes proves that restraint and empathy can be as powerful as any spectacle.",
  },
  {
    id: "r5",
    title: "Style triumphs over substance — barely",
    film: "Furiosa",
    year: 2024,
    author: "ActionReel",
    avatar: "AR",
    rating: 6.5,
    likes: 234,
    comments: 345,
    date: new Date(now - 3 * day).toISOString(),
    genre: "Action",
    preview: "George Miller delivers jaw-dropping set pieces, but the prequel structure drains tension. Anya Taylor-Joy does her best with a underwritten role. Good, but not Fury Road.",
  },
  {
    id: "r6",
    title: "The definitive Conclave review",
    film: "Conclave",
    year: 2024,
    author: "PapalCinema",
    avatar: "PC",
    rating: 8.1,
    likes: 389,
    comments: 123,
    date: new Date(now - 4 * day).toISOString(),
    genre: "Thriller",
    preview: "Edward Berger turns a papal election into a white-knuckle thriller. Ralph Fiennes commands every frame. The final twist will divide audiences but I found it inspired.",
  },
  {
    id: "r7",
    title: "A gorgeous meditation on grief",
    film: "The Room Next Door",
    year: 2024,
    author: "AlmodovarFan",
    avatar: "AF",
    rating: 8.4,
    likes: 267,
    comments: 89,
    date: new Date(now - 5 * day).toISOString(),
    genre: "Drama",
    preview: "Pedro Almodóvar's English-language debut is restrained by his standards but no less emotionally devastating. Tilda Swinton and Julianne Moore share extraordinary chemistry.",
  },
  {
    id: "r8",
    title: "Overhyped but undeniably entertaining",
    film: "Anora",
    year: 2024,
    author: "IndieVoice",
    avatar: "IV",
    rating: 7.2,
    likes: 456,
    comments: 198,
    date: new Date(now - 6 * day).toISOString(),
    genre: "Comedy-Drama",
    preview: "Sean Baker's Palme d'Or winner is a wild ride powered by Mikey Madison's fearless performance. The tonal shifts are jarring but somehow it all works. A crowd-pleaser with teeth.",
  },
];

export const longreads: Longread[] = [
  {
    id: "l1",
    title: "The complete oral history of A24: from scrappy distributor to cultural force",
    author: "DeepDive",
    avatar: "DD",
    readTime: 28,
    likes: 1823,
    comments: 345,
    date: new Date(now - 0.2 * day).toISOString(),
    category: "Oral History",
    preview: "Over 50 interviews with directors, producers, and executives trace how a tiny New York company became the defining brand of modern independent cinema. Exclusive revelations about unmade projects and internal power struggles.",
    hot: true,
  },
  {
    id: "l2",
    title: "How IMAX conquered Hollywood: a technical deep-dive",
    author: "TechCinema",
    avatar: "TC",
    readTime: 22,
    likes: 934,
    comments: 167,
    date: new Date(now - 1 * day).toISOString(),
    category: "Technology",
    preview: "From museum installations to the default blockbuster format. We trace IMAX's 50-year journey through the lens of the engineers, projectionists, and directors who shaped it. Includes never-before-seen technical diagrams.",
  },
  {
    id: "l3",
    title: "The decline and fall of the movie star",
    author: "CulturalCritique",
    avatar: "CC",
    readTime: 18,
    likes: 1456,
    comments: 567,
    date: new Date(now - 1.5 * day).toISOString(),
    category: "Essay",
    preview: "Tom Cruise can still open a movie. Almost nobody else can. What happened to star power, and does it matter? A sweeping analysis of celebrity, IP, and the attention economy.",
    hot: true,
  },
  {
    id: "l4",
    title: "Inside the Korean cinema revolution: from Oldboy to Parasite and beyond",
    author: "AsianCinemaNow",
    avatar: "AC",
    readTime: 25,
    likes: 867,
    comments: 189,
    date: new Date(now - 2 * day).toISOString(),
    category: "Retrospective",
    preview: "A comprehensive look at how South Korea became the world's most exciting film industry. From the screen quota battles to the streaming boom, with exclusive interviews with Bong, Park, and Lee.",
  },
  {
    id: "l5",
    title: "Why practical effects are making a comeback",
    author: "PracticalPurist",
    avatar: "PP",
    readTime: 15,
    likes: 623,
    comments: 134,
    date: new Date(now - 3 * day).toISOString(),
    category: "Technology",
    preview: "The VFX industry is in crisis. Studios are overworked and underpaid. Meanwhile, filmmakers are rediscovering latex, pyrotechnics, and miniatures. Is this a permanent shift or a pendulum swing?",
  },
  {
    id: "l6",
    title: "The letterboxd effect: how an app changed film culture",
    author: "DigitalCulture",
    avatar: "DC",
    readTime: 20,
    likes: 1234,
    comments: 456,
    date: new Date(now - 4 * day).toISOString(),
    category: "Essay",
    preview: "From niche logging tool to mainstream tastemaker. How Letterboxd rewired how we discover, discuss, and evaluate cinema — for better and worse. Data analysis of 10 million user reviews.",
  },
  {
    id: "l7",
    title: "Cinema in the age of AI: threat or tool?",
    author: "FutureScreen",
    avatar: "FS",
    readTime: 24,
    likes: 789,
    comments: 312,
    date: new Date(now - 5 * day).toISOString(),
    category: "Technology",
    preview: "AI can write scripts, generate storyboards, and de-age actors. Should it? We interview 12 directors, 8 VFX supervisors, and 5 screenwriters about the technology reshaping their craft.",
  },
  {
    id: "l8",
    title: "The lost films of the 2020s: projects that never were",
    author: "UnmadeCinema",
    avatar: "UC",
    readTime: 16,
    likes: 534,
    comments: 123,
    date: new Date(now - 7 * day).toISOString(),
    category: "Retrospective",
    preview: "Fincher's Steve Jobs. Villeneuve's Cleopatra. Gerwig's Barbie sequel that became something else entirely. A chronicle of the decade's most tantalizing abandoned projects.",
  },
];

export function getThisWeekArticles(): Article[] {
  const weekAgo = now - 7 * day;
  return articles.filter((a) => new Date(a.date).getTime() > weekAgo);
}

export function getThisWeekReviews(): Review[] {
  const weekAgo = now - 7 * day;
  return reviews.filter((r) => new Date(r.date).getTime() > weekAgo);
}

export function getThisWeekLongreads(): Longread[] {
  const weekAgo = now - 7 * day;
  return longreads.filter((l) => new Date(l.date).getTime() > weekAgo);
}

export function formatDate(dateStr: string): string {
  const diff = now - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
