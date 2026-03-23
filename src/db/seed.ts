import { db } from "./index";
import { users, discussions, polls, articles, reviews, longreads, brackets, tests, trivias } from "./schema";
import { randomBytes, scryptSync } from "crypto";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function seed() {
  console.log("Seeding database...");

  // Create admin user
  const adminHash = hashPassword("admin123");
  const adminResult = await db.insert(users).values({
    username: "SceneItAdmin",
    email: "admin@sceneit.com",
    passwordHash: adminHash,
    avatar: "SA",
    isAdmin: true,
  }).onConflictDoNothing().returning();
  const adminId = adminResult[0]?.id || 1;

  // Create test user
  const userHash = hashPassword("test123");
  const userResult = await db.insert(users).values({
    username: "CinephileMax",
    email: "test@sceneit.com",
    passwordHash: userHash,
    avatar: "CM",
    isAdmin: false,
  }).onConflictDoNothing().returning();
  const userId = userResult[0]?.id || 2;

  // Seed discussions
  const discussionsData = [
    { title: "Nolan vs Villeneuve: Who defines modern cinema?", preview: "Both have redefined blockbuster filmmaking, but their approaches are radically different. Nolan's obsession with time versus Villeneuve's mastery of atmosphere makes this the debate of the decade.", category: "Director Showdown", authorId: adminId, likes: 247, replies: 89 },
    { title: "The worst Best Picture winner of all time", preview: "Every year we debate whether the Academy got it right. But some wins are indefensible. I'll start: Crash (2005). Fight me.", category: "Rankings", authorId: userId, likes: 412, replies: 156 },
    { title: "Why does nobody talk about Wong Kar-wai anymore?", preview: "In the Mood for Love changed my life. Fallen Angels is a masterpiece. Yet in 2026, his name barely comes up in best-director conversations.", category: "Cult Classics", authorId: adminId, likes: 156, replies: 67 },
    { title: "A24 is overrated. Change my mind.", preview: "They've built a brand on elevated horror and vibes. Half their catalog is style over substance. The marketing is better than most of the films.", category: "Hot Takes", authorId: userId, likes: 723, replies: 234 },
    { title: "The practical effects Renaissance — is CGI finally dying?", preview: "Top Gun: Maverick, Oppenheimer, The Batman — the biggest films of recent years chose practical over digital. Is this a trend or just prestige?", category: "Industry", authorId: adminId, likes: 198, replies: 78 },
    { title: "Defending Denis Villeneuve's Dune changes from the book", preview: "Chani's characterization, Alia's absence, the time compression — every change was deliberate and brilliant. Here's why each one works better on screen.", category: "Adaptations", authorId: userId, likes: 301, replies: 112 },
    { title: "The death of the mid-budget film: who's to blame?", preview: "Everything is either $200M franchise spectacle or $5M micro-budget. The $40-80M adult drama has vanished. Studios, streamers, or audiences?", category: "Industry", authorId: adminId, likes: 167, replies: 56 },
    { title: "Rewatching vs watching new: the eternal dilemma", preview: "I have 200 films on my watchlist but I'm rewatching The Big Lebowski for the 40th time. Anyone else trapped in this loop?", category: "Discussions", authorId: userId, likes: 445, replies: 178 },
  ];

  for (const d of discussionsData) {
    await db.insert(discussions).values(d).onConflictDoNothing();
  }

  // Seed polls
  const pollsData = [
    { title: "Greatest cinematographer of all time?", category: "Rankings", options: JSON.stringify([{ label: "Roger Deakins", votes: 1520 }, { label: "Emmanuel Lubezki", votes: 1104 }, { label: "Hoyte van Hoytema", votes: 689 }, { label: "Janusz Kamiński", votes: 529 }]), authorId: adminId, totalVotes: 3842 },
    { title: "Best film of 2025?", category: "Rankings", options: JSON.stringify([{ label: "The Brutalist", votes: 1654 }, { label: "Nosferatu", votes: 1402 }, { label: "Anora", votes: 1187 }, { label: "Conclave", votes: 580 }, { label: "The Substance", votes: 387 }]), authorId: userId, totalVotes: 5210 },
    { title: "Scorsese's best decade?", category: "Director Showdown", options: JSON.stringify([{ label: "1970s (Taxi Driver, Mean Streets)", votes: 612 }, { label: "1990s (Goodfellas, Casino)", votes: 1023 }, { label: "2000s (The Departed)", votes: 445 }, { label: "2010s-2020s (Killers of the Flower Moon)", votes: 322 }]), authorId: adminId, totalVotes: 2402 },
    { title: "Most overrated franchise?", category: "Hot Takes", options: JSON.stringify([{ label: "Marvel / MCU", votes: 1823 }, { label: "Star Wars", votes: 1102 }, { label: "Fast & Furious", votes: 876 }, { label: "Harry Potter", votes: 321 }]), authorId: userId, totalVotes: 4122 },
    { title: "Best film genre for a first date?", category: "Discussions", options: JSON.stringify([{ label: "Comedy", votes: 678 }, { label: "Romance", votes: 445 }, { label: "Action", votes: 312 }, { label: "Horror", votes: 267 }]), authorId: adminId, totalVotes: 1702 },
  ];

  for (const p of pollsData) {
    await db.insert(polls).values(p).onConflictDoNothing();
  }

  // Seed articles
  const articlesData = [
    { title: "Cannes 2026 lineup announced: bold choices surprise critics", preview: "The selection committee has taken unprecedented risks this year, programming five debut features in competition. The lineup signals a shift toward auteur-driven cinema.", category: "Festival Coverage", authorId: adminId, likes: 423, comments: 89 },
    { title: "A24 announces $200M production slate for 2027", preview: "The studio that redefined indie cinema is going bigger. New projects from Greta Gerwig, Barry Jenkins headline the ambitious slate.", category: "Industry", authorId: userId, likes: 567, comments: 134 },
    { title: "Christopher Nolan signs exclusive IMAX deal", preview: "Nolan's next three films will be shot exclusively on IMAX film stock, making them the first features designed entirely for the format.", category: "Industry", authorId: adminId, likes: 891, comments: 203 },
    { title: "The rise of analog filmmaking among Gen-Z directors", preview: "Film school applications mentioning analog techniques have surged 340%. Young directors are rejecting digital perfection in favor of grain and light leaks.", category: "Trends", authorId: userId, likes: 289, comments: 156 },
    { title: "Legendary cinematographer Roger Deakins announces retirement", preview: "After five decades and 16 Oscar nominations, the master behind Blade Runner 2049 and 1917 says his next project will be his last.", category: "Industry", authorId: adminId, likes: 1245, comments: 312 },
  ];

  for (const a of articlesData) {
    await db.insert(articles).values(a).onConflictDoNothing();
  }

  // Seed reviews
  const reviewsData = [
    { title: "A visceral masterpiece that redefines the genre", film: "Nosferatu", year: 2024, rating: 92, preview: "Robert Eggers has done the impossible. Every frame drips with dread. Lily-Rose Depp is transcendent.", genre: "Horror", authorId: adminId, likes: 534, comments: 167 },
    { title: "Brutal, beautiful, and absolutely essential", film: "The Brutalist", year: 2024, rating: 95, preview: "Brady Corbet's three-and-a-half-hour epic about an immigrant architect is the kind of ambitious filmmaking that reminds you why cinema matters.", genre: "Drama", authorId: userId, likes: 678, comments: 234 },
    { title: "Messy, provocative, and unforgettable", film: "The Substance", year: 2024, rating: 78, preview: "Coralie Fargeat's body horror satire doesn't hold back. Demi Moore delivers the performance of her career.", genre: "Horror", authorId: adminId, likes: 423, comments: 289 },
    { title: "A quiet triumph of observational filmmaking", film: "All We Imagine as Light", year: 2024, rating: 87, preview: "Payal Kapadia's portrait of three women in Mumbai is luminous cinema. The Grand Prix winner at Cannes proves restraint can be as powerful as spectacle.", genre: "Drama", authorId: userId, likes: 312, comments: 78 },
  ];

  for (const r of reviewsData) {
    await db.insert(reviews).values(r).onConflictDoNothing();
  }

  // Seed longreads
  const longreadsData = [
    { title: "The complete oral history of A24", preview: "Over 50 interviews with directors and producers trace how a tiny New York company became the defining brand of modern independent cinema.", category: "Oral History", readTime: 28, authorId: adminId, likes: 1823, comments: 345 },
    { title: "How IMAX conquered Hollywood: a technical deep-dive", preview: "From museum installations to the default blockbuster format. We trace IMAX's 50-year journey through the lens of engineers and directors.", category: "Technology", readTime: 22, authorId: userId, likes: 934, comments: 167 },
    { title: "The decline and fall of the movie star", preview: "Tom Cruise can still open a movie. Almost nobody else can. What happened to star power, and does it matter?", category: "Essay", readTime: 18, authorId: adminId, likes: 1456, comments: 567 },
  ];

  for (const l of longreadsData) {
    await db.insert(longreads).values(l).onConflictDoNothing();
  }

  // Seed brackets
  const bracketsData = [
    { title: "Greatest Film Director of All Time", category: "Directors", participants: 64, preview: "64 legendary directors face off. From Kubrick to Nolan — only one survives.", items: JSON.stringify(["Kubrick", "Hitchcock", "Spielberg", "Scorsese", "Nolan", "Villeneuve", "Tarantino", "Coppola"]), authorId: adminId, totalPlayed: 12840 },
    { title: "Best Sci-Fi Film Ever Made", category: "Films", participants: 32, preview: "32 science fiction masterpieces compete. Blade Runner vs 2001. Alien vs The Matrix.", items: JSON.stringify(["Blade Runner", "2001: A Space Odyssey", "Alien", "The Matrix", "Interstellar", "Arrival"]), authorId: userId, totalPlayed: 8920 },
    { title: "Most Iconic Movie Villain", category: "Characters", participants: 16, preview: "16 of cinema's most memorable antagonists. Darth Vader, Hannibal Lecter, the Joker — who reigns supreme?", items: JSON.stringify(["Darth Vader", "Hannibal Lecter", "The Joker", "Anton Chigurh", "Hans Landa"]), authorId: adminId, totalPlayed: 6540 },
    { title: "Best Animated Film", category: "Films", participants: 32, preview: "From Miyazaki to Pixar, Spider-Verse to classic Disney. Which animated film deserves the crown?", items: JSON.stringify(["Spirited Away", "Spider-Verse", "WALL-E", "The Lion King", "Toy Story", "Up"]), authorId: userId, totalPlayed: 9340 },
  ];

  for (const b of bracketsData) {
    await db.insert(brackets).values(b).onConflictDoNothing();
  }

  // Seed tests
  const testsData = [
    { title: "Which Tarantino Character Are You?", category: "Personality", questionsCount: 12, preview: "Are you a smooth-talking Jules or a vengeful Beatrix? Answer 12 questions to find your Tarantino alter ego.", results: JSON.stringify(["Jules Winnfield", "Beatrix Kiddo", "Vincent Vega", "Django", "Hans Landa"]), authorId: adminId, totalPlayed: 15600 },
    { title: "What Should You Watch Tonight?", category: "Recommendation", questionsCount: 8, preview: "Mood, genre, time — answer a few questions and we'll find your perfect tonight movie.", results: JSON.stringify(["Comfort Classic", "Mind-Bending Thriller", "Epic Adventure", "Cozy Romance", "Adrenaline Rush"]), authorId: userId, totalPlayed: 23400 },
    { title: "What's Your Film Taste Profile?", category: "Personality", questionsCount: 15, preview: "Cinephile, casual viewer, or something in between? Discover your unique film taste DNA.", results: JSON.stringify(["The Auteurist", "The Blockbuster Fan", "The Indie Explorer", "The Classicist", "The Genre Junkie"]), authorId: adminId, totalPlayed: 18900 },
  ];

  for (const t of testsData) {
    await db.insert(tests).values(t).onConflictDoNothing();
  }

  // Seed trivia
  const triviasData = [
    { title: "Oscar Best Picture Winners: How Many Do You Know?", category: "Awards", questionsCount: 20, preview: "20 questions about Best Picture winners from the last 50 years. Can you beat the 62% average?", authorId: adminId, totalPlayed: 8920, avgScore: 62 },
    { title: "Name That Film From Its Opening Shot", category: "Visual", questionsCount: 15, preview: "One frame. One film. Can you identify 15 iconic movies from their very first shot?", authorId: userId, totalPlayed: 12400, avgScore: 55 },
    { title: "Can You Finish These Famous Movie Quotes?", category: "Quotes", questionsCount: 20, preview: "Here's looking at you, ___ — 20 iconic quotes, one missing word each.", authorId: adminId, totalPlayed: 18700, avgScore: 74 },
    { title: "The Ultimate Nolan Quiz", category: "Directors", questionsCount: 15, preview: "Time inversion, practical effects, IMAX obsession — how well do you really know Christopher Nolan's films?", authorId: userId, totalPlayed: 9870, avgScore: 67 },
  ];

  for (const tr of triviasData) {
    await db.insert(trivias).values(tr).onConflictDoNothing();
  }

  console.log("Seed complete!");
  console.log("Admin: admin@sceneit.com / admin123");
  console.log("User: test@sceneit.com / test123");
}

seed().catch(console.error);
