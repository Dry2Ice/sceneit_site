export interface Bracket {
  id: string;
  title: string;
  category: string;
  participants: number;
  totalPlayed: number;
  date: string;
  preview: string;
  items: string[];
  hot?: boolean;
}

export interface Test {
  id: string;
  title: string;
  category: string;
  questionsCount: number;
  resultsCount: number;
  totalPlayed: number;
  date: string;
  preview: string;
  results: string[];
  hot?: boolean;
}

export interface Trivia {
  id: string;
  title: string;
  category: string;
  questionsCount: number;
  totalPlayed: number;
  avgScore: number;
  date: string;
  preview: string;
  hot?: boolean;
}

const now = Date.now();
const day = 86400000;

export const brackets: Bracket[] = [
  {
    id: "b1",
    title: "Greatest Film Director of All Time",
    category: "Directors",
    participants: 64,
    totalPlayed: 12840,
    date: new Date(now - 0.3 * day).toISOString(),
    preview: "64 legendary directors face off. From Kubrick to Nolan, Hitchcock to Villeneuve — only one survives.",
    items: ["Kubrick", "Hitchcock", "Spielberg", "Scorsese", "Nolan", "Villeneuve", "Tarantino", "Coppola"],
    hot: true,
  },
  {
    id: "b2",
    title: "Best Sci-Fi Film Ever Made",
    category: "Films",
    participants: 32,
    totalPlayed: 8920,
    date: new Date(now - 0.8 * day).toISOString(),
    preview: "32 science fiction masterpieces compete. Blade Runner vs 2001. Alien vs The Matrix. The ultimate showdown.",
    items: ["Blade Runner", "2001: A Space Odyssey", "Alien", "The Matrix", "Interstellar", "Arrival"],
    hot: true,
  },
  {
    id: "b3",
    title: "Most Iconic Movie Villain",
    category: "Characters",
    participants: 16,
    totalPlayed: 6540,
    date: new Date(now - 1.5 * day).toISOString(),
    preview: "16 of cinema's most memorable antagonists. Darth Vader, Hannibal Lecter, the Joker — who reigns supreme?",
    items: ["Darth Vader", "Hannibal Lecter", "The Joker", "Anton Chigurh", "Hans Landa", "Agent Smith"],
  },
  {
    id: "b4",
    title: "Best Film Score Composer",
    category: "Music",
    participants: 32,
    totalPlayed: 4230,
    date: new Date(now - 2 * day).toISOString(),
    preview: "From John Williams to Hans Zimmer, Ennio Morricone to Trent Reznor — whose music defines cinema?",
    items: ["John Williams", "Hans Zimmer", "Ennio Morricone", "Trent Reznor", "Howard Shore"],
  },
  {
    id: "b5",
    title: "Greatest Action Film",
    category: "Films",
    participants: 16,
    totalPlayed: 7650,
    date: new Date(now - 3 * day).toISOString(),
    preview: "Pure adrenaline. Die Hard, Mad Max, Terminator, John Wick — which delivers the ultimate action experience?",
    items: ["Die Hard", "Mad Max: Fury Road", "Terminator 2", "John Wick", "The Raid"],
  },
  {
    id: "b6",
    title: "Best Movie Couple",
    category: "Characters",
    participants: 8,
    totalPlayed: 5120,
    date: new Date(now - 4 * day).toISOString(),
    preview: "Cinema's greatest love stories go head to head. Jack & Rose, Bonnie & Clyde, Romeo & Juliet...",
    items: ["Jack & Rose", "Bonnie & Clyde", "Romeo & Juliet", "Jesse & Celine"],
  },
  {
    id: "b7",
    title: "Best Animated Film",
    category: "Films",
    participants: 32,
    totalPlayed: 9340,
    date: new Date(now - 5 * day).toISOString(),
    preview: "From Miyazaki to Pixar, Spider-Verse to classic Disney. Which animated film deserves the crown?",
    items: ["Spirited Away", "Spider-Verse", "WALL-E", "The Lion King", "Toy Story"],
    hot: true,
  },
  {
    id: "b8",
    title: "Most Rewatchable Film",
    category: "Films",
    participants: 16,
    totalPlayed: 11200,
    date: new Date(now - 6 * day).toISOString(),
    preview: "The films you've seen 50 times and would watch again tonight. Comfort cinema at its finest.",
    items: ["The Big Lebowski", "Pulp Fiction", "The Princess Bride", "Groundhog Day", "Back to the Future"],
  },
  {
    id: "b9",
    title: "Best Cinematographer",
    category: "Craft",
    participants: 16,
    totalPlayed: 3180,
    date: new Date(now - 7 * day).toISOString(),
    preview: "The masters of light and composition. Deakins, Lubezki, van Hoytema — who paints the most beautiful frames?",
    items: ["Roger Deakins", "Emmanuel Lubezki", "Hoyte van Hoytema", "Janusz Kamiński"],
  },
  {
    id: "b10",
    title: "Greatest Horror Film",
    category: "Films",
    participants: 32,
    totalPlayed: 6780,
    date: new Date(now - 8 * day).toISOString(),
    preview: "32 nightmares enter the arena. The Shining vs Alien. Hereditary vs The Exorcist. Sweet dreams.",
    items: ["The Shining", "Alien", "Hereditary", "The Exorcist", "Psycho", "The Thing"],
  },
];

export const tests: Test[] = [
  {
    id: "t1",
    title: "Which Tarantino Character Are You?",
    category: "Personality",
    questionsCount: 12,
    resultsCount: 8,
    totalPlayed: 15600,
    date: new Date(now - 0.2 * day).toISOString(),
    preview: "Are you a smooth-talking Jules or a vengeful Beatrix? Answer 12 questions to find your Tarantino alter ego.",
    results: ["Jules Winnfield", "Beatrix Kiddo", "Vincent Vega", "Django", "Hans Landa", "The Bride", "Mr. Blonde", "Ordell Robbie"],
    hot: true,
  },
  {
    id: "t2",
    title: "What Should You Watch Tonight?",
    category: "Recommendation",
    questionsCount: 8,
    resultsCount: 12,
    totalPlayed: 23400,
    date: new Date(now - 0.5 * day).toISOString(),
    preview: "Mood, genre, time, snacks — answer a few questions and we'll find your perfect tonight movie.",
    results: ["Comfort Classic", "Mind-Bending Thriller", "Epic Adventure", "Cozy Romance", "Adrenaline Rush", "Cerebral Drama"],
    hot: true,
  },
  {
    id: "t3",
    title: "What's Your Film Taste Profile?",
    category: "Personality",
    questionsCount: 15,
    resultsCount: 6,
    totalPlayed: 18900,
    date: new Date(now - 1 * day).toISOString(),
    preview: "Cinephile, casual viewer, or something in between? Discover your unique film taste DNA.",
    results: ["The Auteurist", "The Blockbuster Fan", "The Indie Explorer", "The Classicist", "The Genre Junkie", "The Cinephile"],
  },
  {
    id: "t4",
    title: "Which Film Era Matches Your Soul?",
    category: "Personality",
    questionsCount: 10,
    resultsCount: 5,
    totalPlayed: 8760,
    date: new Date(now - 2 * day).toISOString(),
    preview: "Golden Age glamour? 70s grit? 90s cool? Find out which decade of cinema speaks to you.",
    results: ["1940s Golden Age", "1970s New Hollywood", "1990s Indie Boom", "2000s Blockbuster Era", "2020s Streaming Age"],
  },
  {
    id: "t5",
    title: "Build Your Dream Film Crew",
    category: "Creative",
    questionsCount: 10,
    resultsCount: 8,
    totalPlayed: 6230,
    date: new Date(now - 3 * day).toISOString(),
    preview: "Pick your preferences and assemble the ultimate filmmaking team. Director, DP, composer, cast...",
    results: ["The Visionary Crew", "The Technical Masters", "The Storytellers", "The Innovators", "The Classics Team", "The Outsiders"],
  },
  {
    id: "t6",
    title: "Which Movie World Would You Live In?",
    category: "Personality",
    questionsCount: 8,
    resultsCount: 10,
    totalPlayed: 11200,
    date: new Date(now - 4 * day).toISOString(),
    preview: "Hogwarts? The Shire? A galaxy far far away? Answer questions to find your cinematic home.",
    results: ["Middle-earth", "Hogwarts", "The MCU", "Star Wars Galaxy", "Wes Anderson World", "The Wizarding World"],
  },
  {
    id: "t7",
    title: "Your Perfect Movie Marathon",
    category: "Recommendation",
    questionsCount: 6,
    resultsCount: 8,
    totalPlayed: 9870,
    date: new Date(now - 5 * day).toISOString(),
    preview: "Rainy day? Long weekend? We'll curate the perfect triple-feature based on your vibe.",
    results: ["The Epic Journey", "Comedy Gold", "Thriller Night", "Romance Marathon", "Sci-Fi Odyssey", "Horror Fest"],
  },
  {
    id: "t8",
    title: "What Kind of Movie Watcher Are You?",
    category: "Personality",
    questionsCount: 10,
    resultsCount: 6,
    totalPlayed: 14300,
    date: new Date(now - 6 * day).toISOString(),
    preview: "The critic, the crier, the quote-machine — everyone watches differently. What's your style?",
    results: ["The Silent Observer", "The Emotional Reactor", "The Quote Machine", "The Film Critic", "The Snacker", "The Phone Checker"],
  },
];

export const trivias: Trivia[] = [
  {
    id: "tr1",
    title: "Oscar Best Picture Winners: How Many Do You Know?",
    category: "Awards",
    questionsCount: 20,
    totalPlayed: 8920,
    avgScore: 62,
    date: new Date(now - 0.4 * day).toISOString(),
    preview: "20 questions about Best Picture winners from the last 50 years. Can you beat the 62% average?",
    hot: true,
  },
  {
    id: "tr2",
    title: "Name That Film From Its Opening Shot",
    category: "Visual",
    questionsCount: 15,
    totalPlayed: 12400,
    avgScore: 55,
    date: new Date(now - 0.7 * day).toISOString(),
    preview: "One frame. One film. Can you identify 15 iconic movies from their very first shot?",
    hot: true,
  },
  {
    id: "tr3",
    title: "Directors' Filmography Challenge",
    category: "Directors",
    questionsCount: 25,
    totalPlayed: 5670,
    avgScore: 48,
    date: new Date(now - 1 * day).toISOString(),
    preview: "Match the film to the director. 25 questions spanning 8 decades of cinema. Average score: 48%.",
  },
  {
    id: "tr4",
    title: "Can You Finish These Famous Movie Quotes?",
    category: "Quotes",
    questionsCount: 20,
    totalPlayed: 18700,
    avgScore: 74,
    date: new Date(now - 1.5 * day).toISOString(),
    preview: "\"Here's looking at you, ___\" — 20 iconic quotes, one missing word each. The most popular quiz this month.",
    hot: true,
  },
  {
    id: "tr5",
    title: "Cinematography Masters: Identify the DP",
    category: "Craft",
    questionsCount: 15,
    totalPlayed: 3450,
    avgScore: 38,
    date: new Date(now - 2 * day).toISOString(),
    preview: "Can you identify the cinematographer from a single frame? The hardest visual quiz on the platform.",
  },
  {
    id: "tr6",
    title: "Hans Zimmer or John Williams?",
    category: "Music",
    questionsCount: 10,
    totalPlayed: 7890,
    avgScore: 71,
    date: new Date(now - 3 * day).toISOString(),
    preview: "Listen to a few seconds of a score — is it Zimmer or Williams? Deceptively tricky.",
  },
  {
    id: "tr7",
    title: "Foreign Film Masterclass",
    category: "World Cinema",
    questionsCount: 20,
    totalPlayed: 4320,
    avgScore: 42,
    date: new Date(now - 4 * day).toISOString(),
    preview: "From Kurosawa to Bong Joon-ho. 20 questions about the greatest international films ever made.",
  },
  {
    id: "tr8",
    title: "Film Budget Guessing Game",
    category: "Industry",
    questionsCount: 15,
    totalPlayed: 6780,
    avgScore: 51,
    date: new Date(now - 5 * day).toISOString(),
    preview: "Can you guess the production budget of 15 famous films? Some answers will shock you.",
  },
  {
    id: "tr9",
    title: "Horror Film Deep Cuts",
    category: "Horror",
    questionsCount: 20,
    totalPlayed: 5120,
    avgScore: 35,
    date: new Date(now - 6 * day).toISOString(),
    preview: "Beyond the mainstream. 20 questions about horror films only true fans know. Average: 35%.",
  },
  {
    id: "tr10",
    title: "The Ultimate Nolan Quiz",
    category: "Directors",
    questionsCount: 15,
    totalPlayed: 9870,
    avgScore: 67,
    date: new Date(now - 7 * day).toISOString(),
    preview: "Time inversion, practical effects, IMAX obsession — how well do you really know Christopher Nolan's films?",
  },
];

export function getThisWeekBrackets(): Bracket[] {
  const weekAgo = now - 7 * day;
  return brackets.filter((b) => new Date(b.date).getTime() > weekAgo);
}

export function getThisWeekTests(): Test[] {
  const weekAgo = now - 7 * day;
  return tests.filter((t) => new Date(t.date).getTime() > weekAgo);
}

export function getThisWeekTrivias(): Trivia[] {
  const weekAgo = now - 7 * day;
  return trivias.filter((t) => new Date(t.date).getTime() > weekAgo);
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
