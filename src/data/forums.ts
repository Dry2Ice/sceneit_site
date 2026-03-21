export interface Discussion {
  id: string;
  title: string;
  author: string;
  avatar: string;
  replies: number;
  likes: number;
  date: string;
  category: string;
  preview: string;
  hot?: boolean;
}

export interface Poll {
  id: string;
  title: string;
  author: string;
  avatar: string;
  totalVotes: number;
  date: string;
  category: string;
  options: { label: string; votes: number }[];
  hot?: boolean;
}

const now = Date.now();
const day = 86400000;

export const discussions: Discussion[] = [
  {
    id: "d1",
    title: "Nolan vs Villeneuve: Who defines modern cinema?",
    author: "CinephileMax",
    avatar: "CM",
    replies: 247,
    likes: 892,
    date: new Date(now - 0.5 * day).toISOString(),
    category: "Director Showdown",
    preview: "Both have redefined blockbuster filmmaking, but their approaches are radically different. Nolan's obsession with time versus Villeneuve's mastery of atmosphere...",
    hot: true,
  },
  {
    id: "d2",
    title: "The worst Best Picture winner of all time — let's settle this",
    author: "OscarHistorian",
    avatar: "OH",
    replies: 412,
    likes: 1203,
    date: new Date(now - 1 * day).toISOString(),
    category: "Rankings",
    preview: "Every year we debate whether the Academy got it right. But some wins are indefensible. I'll start: Crash (2005). Fight me.",
    hot: true,
  },
  {
    id: "d3",
    title: "Why does nobody talk about Wong Kar-wai anymore?",
    author: "NeonDreamer",
    avatar: "ND",
    replies: 156,
    likes: 634,
    date: new Date(now - 1.5 * day).toISOString(),
    category: "Cult Classics",
    preview: "In the Mood for Love changed my life. Fallen Angels is a masterpiece. Yet in 2026, his name barely comes up in best-director conversations...",
  },
  {
    id: "d4",
    title: "Unpopular opinion: Letterboxd has ruined film discourse",
    author: "ContrarianViews",
    avatar: "CV",
    replies: 589,
    likes: 342,
    date: new Date(now - 2 * day).toISOString(),
    category: "Hot Takes",
    preview: "The star-rating system reduces complex art to a number. Hot takes get engagement. Nuanced reviews get ignored. We've gamified criticism.",
    hot: true,
  },
  {
    id: "d5",
    title: "The practical effects Renaissance — is CGI finally dying?",
    author: "PracticalPurist",
    avatar: "PP",
    replies: 198,
    likes: 567,
    date: new Date(now - 2.5 * day).toISOString(),
    category: "Industry",
    preview: "Top Gun: Maverick, Oppenheimer, The Batman — the biggest films of recent years chose practical over digital. Is this a trend or just prestige?",
  },
  {
    id: "d6",
    title: "A24 is overrated. Change my mind.",
    author: "IndieRealist",
    avatar: "IR",
    replies: 723,
    likes: 445,
    date: new Date(now - 3 * day).toISOString(),
    category: "Hot Takes",
    preview: "They've built a brand on 'elevated horror' and vibes. Half their catalog is style over substance. The marketing is better than most of the films.",
  },
  {
    id: "d7",
    title: "Defending Denis Villeneuve's Dune: Part Two changes from the book",
    author: "SpiceMustFlow",
    avatar: "SM",
    replies: 301,
    likes: 788,
    date: new Date(now - 3.5 * day).toISOString(),
    category: "Adaptations",
    preview: "Chani's characterization, Alia's absence, the time compression — every change was deliberate and brilliant. Here's why each one works better on screen...",
  },
  {
    id: "d8",
    title: "The death of the mid-budget film: who's to blame?",
    author: "SilverScreenEcon",
    avatar: "SS",
    replies: 167,
    likes: 521,
    date: new Date(now - 4 * day).toISOString(),
    category: "Industry",
    preview: "Everything is either $200M franchise spectacle or $5M micro-budget. The $40-80M adult drama has vanished. Studios, streamers, or audiences?",
  },
  {
    id: "d9",
    title: "Kubrick would have hated AI filmmaking — or would he?",
    author: "ClockworkOrange",
    avatar: "CO",
    replies: 234,
    likes: 412,
    date: new Date(now - 5 * day).toISOString(),
    category: "Director Showdown",
    preview: "The man who pushed every technical boundary, who invented new lens and lighting techniques, who demanded 100 takes — would he embrace or reject AI?",
  },
  {
    id: "d10",
    title: "Best foreign film debut of the decade — nominations thread",
    author: "WorldCinemaFan",
    avatar: "WC",
    replies: 89,
    likes: 267,
    date: new Date(now - 6 * day).toISOString(),
    category: "Rankings",
    preview: "Past Lives, Anatomy of a Fall, The Zone of Interest, All Quiet on the Western Front — the 2020s have been extraordinary for international cinema.",
  },
  {
    id: "d11",
    title: "Rewatching films vs watching new ones: the eternal dilemma",
    author: "ComfortRewatch",
    avatar: "CR",
    replies: 445,
    likes: 923,
    date: new Date(now - 7 * day).toISOString(),
    category: "Discussions",
    preview: "I have 200 films on my watchlist but I'm rewatching The Big Lebowski for the 40th time. Anyone else trapped in this loop?",
  },
  {
    id: "d12",
    title: "Christopher Nolan's next project — wild predictions",
    author: "NolanVerse",
    avatar: "NV",
    replies: 312,
    likes: 678,
    date: new Date(now - 8 * day).toISOString(),
    category: "Industry",
    preview: "After Oppenheimer's success, he has carte blanche. Musical? Horror? A 70mm silent film? Let's speculate wildly.",
  },
];

export const polls: Poll[] = [
  {
    id: "p1",
    title: "Greatest cinematographer of all time?",
    author: "FrameByFrame",
    avatar: "FF",
    totalVotes: 3842,
    date: new Date(now - 0.3 * day).toISOString(),
    category: "Rankings",
    hot: true,
    options: [
      { label: "Roger Deakins", votes: 1520 },
      { label: "Emmanuel Lubezki", votes: 1104 },
      { label: "Hoyte van Hoytema", votes: 689 },
      { label: "Janusz Kamiński", votes: 529 },
    ],
  },
  {
    id: "p2",
    title: "Best film of 2025?",
    author: "YearInReview",
    avatar: "YR",
    totalVotes: 5210,
    date: new Date(now - 1 * day).toISOString(),
    category: "Rankings",
    hot: true,
    options: [
      { label: "The Brutalist", votes: 1654 },
      { label: "Nosferatu", votes: 1402 },
      { label: "Anora", votes: 1187 },
      { label: "Conclave", votes: 580 },
      { label: "The Substance", votes: 387 },
    ],
  },
  {
    id: "p3",
    title: "Scorsese's best decade?",
    author: "MartyFan",
    avatar: "MF",
    totalVotes: 2891,
    date: new Date(now - 2 * day).toISOString(),
    category: "Director Showdown",
    options: [
      { label: "1970s (Taxi Driver, Mean Streets)", votes: 612 },
      { label: "1980s (Raging Bull, The King of Comedy)", votes: 489 },
      { label: "1990s (Goodfellas, Casino)", votes: 1023 },
      { label: "2000s (The Departed, Gangs of NY)", votes: 445 },
      { label: "2010s-2020s (The Wolf, The Irishman, Killers)", votes: 322 },
    ],
  },
  {
    id: "p4",
    title: "Most overrated franchise in cinema?",
    author: "ControversialTake",
    avatar: "CT",
    totalVotes: 4567,
    date: new Date(now - 2.5 * day).toISOString(),
    category: "Hot Takes",
    options: [
      { label: "Marvel / MCU", votes: 1823 },
      { label: "Star Wars", votes: 1102 },
      { label: "Fast & Furious", votes: 876 },
      { label: "James Bond", votes: 445 },
      { label: "Harry Potter", votes: 321 },
    ],
  },
  {
    id: "p5",
    title: "Which director should make the next Bond film?",
    author: "BondReboot",
    avatar: "BR",
    totalVotes: 2134,
    date: new Date(now - 3 * day).toISOString(),
    category: "Industry",
    options: [
      { label: "Denis Villeneuve", votes: 745 },
      { label: "Chloé Zhao", votes: 523 },
      { label: "Park Chan-wook", votes: 412 },
      { label: "David Fincher", votes: 289 },
      { label: "Greta Gerwig", votes: 165 },
    ],
  },
  {
    id: "p6",
    title: "Best film genre for a first date?",
    author: "DateNightCinema",
    avatar: "DN",
    totalVotes: 1876,
    date: new Date(now - 4 * day).toISOString(),
    category: "Discussions",
    options: [
      { label: "Comedy", votes: 678 },
      { label: "Romance", votes: 445 },
      { label: "Action", votes: 312 },
      { label: "Horror", votes: 267 },
      { label: "Drama", votes: 174 },
    ],
  },
  {
    id: "p7",
    title: "Most beautiful film ever shot?",
    author: "VisualPoetry",
    avatar: "VP",
    totalVotes: 3245,
    date: new Date(now - 5 * day).toISOString(),
    category: "Rankings",
    options: [
      { label: "Blade Runner 2049", votes: 923 },
      { label: "In the Mood for Love", votes: 756 },
      { label: "The Tree of Life", votes: 612 },
      { label: "Barry Lyndon", votes: 534 },
      { label: "1917", votes: 420 },
    ],
  },
  {
    id: "p8",
    title: "Should AI be used in filmmaking?",
    author: "TechEthics",
    avatar: "TE",
    totalVotes: 4123,
    date: new Date(now - 6 * day).toISOString(),
    category: "Industry",
    options: [
      { label: "Never — it threatens artists", votes: 1789 },
      { label: "Only for pre-visualization", votes: 1023 },
      { label: "Yes, as a tool alongside humans", votes: 876 },
      { label: "Fully embrace it", votes: 435 },
    ],
  },
];

export function getThisWeekDiscussions(): Discussion[] {
  const weekAgo = now - 7 * day;
  return discussions.filter((d) => new Date(d.date).getTime() > weekAgo);
}

export function getThisWeekPolls(): Poll[] {
  const weekAgo = now - 7 * day;
  return polls.filter((p) => new Date(p.date).getTime() > weekAgo);
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
