"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteContent } from "@/actions/content";
import { EditModal } from "@/components/ui/EditModal";

interface Answer {
  text: string;
  resultType: string;
}

interface TestQuestion {
  question: string;
  answers: Answer[];
}

const personalityQuestions: TestQuestion[] = [
  {
    question: "It's Friday night. What sounds most appealing?",
    answers: [
      { text: "A quiet evening with a classic black-and-white film", resultType: "The Classicist" },
      { text: "Marathon a new sci-fi series everyone's talking about", resultType: "The Blockbuster Fan" },
      { text: "Hunt down an obscure foreign film at the indie theater", resultType: "The Indie Explorer" },
      { text: "Rewatch your favorite comfort movie for the hundredth time", resultType: "The Genre Junkie" },
    ],
  },
  {
    question: "You're at a dinner party. Which conversation topic excites you most?",
    answers: [
      { text: "Debating whether Kubrick was a genius or a perfectionist hack", resultType: "The Auteurist" },
      { text: "Recommending hidden gems nobody has heard of", resultType: "The Cinephile" },
      { text: "Arguing about which Marvel movie had the best third act", resultType: "The Blockbuster Fan" },
      { text: "Comparing book adaptations to their source material", resultType: "The Classicist" },
    ],
  },
  {
    question: "Pick a vacation destination:",
    answers: [
      { text: "Cannes during the Film Festival", resultType: "The Auteurist" },
      { text: "Tokyo — anime pilgrimages and ramen", resultType: "The Indie Explorer" },
      { text: "New Zealand — walk through Middle-earth", resultType: "The Blockbuster Fan" },
      { text: "Paris — vintage cinemas and café culture", resultType: "The Classicist" },
    ],
  },
  {
    question: "How do you discover new movies?",
    answers: [
      { text: "Letterboxd lists and festival award winners", resultType: "The Cinephile" },
      { text: "Whatever's trending on streaming platforms", resultType: "The Blockbuster Fan" },
      { text: "Director filmographies — if I love one film, I watch them all", resultType: "The Auteurist" },
      { text: "Friends' recommendations and Reddit threads", resultType: "The Genre Junkie" },
    ],
  },
  {
    question: "Your ideal movie theater snack situation:",
    answers: [
      { text: "No snacks — I need total focus on the screen", resultType: "The Cinephile" },
      { text: "The biggest popcorn bucket and a large soda", resultType: "The Blockbuster Fan" },
      { text: "A glass of wine and something artisanal", resultType: "The Classicist" },
      { text: "Whatever I grabbed on the way — I'm just here for the vibes", resultType: "The Genre Junkie" },
    ],
  },
  {
    question: "Which era of filmmaking do you wish you could have experienced?",
    answers: [
      { text: "1970s New Hollywood — Coppola, Scorsese, Altman", resultType: "The Auteurist" },
      { text: "1940s Golden Age — Hitchcock, Wilder, classic noir", resultType: "The Classicist" },
      { text: "1990s indie explosion — Tarantino, Linklater, Sundance", resultType: "The Indie Explorer" },
      { text: "Right now — the most diverse and accessible era ever", resultType: "The Cinephile" },
    ],
  },
  {
    question: "You have to pick ONE genre for the rest of your life:",
    answers: [
      { text: "Thriller — keep me guessing", resultType: "The Genre Junkie" },
      { text: "Drama — give me depth and emotion", resultType: "The Classicist" },
      { text: "Sci-Fi — the possibilities are endless", resultType: "The Blockbuster Fan" },
      { text: "I refuse — genres are artificial constructs", resultType: "The Auteurist" },
    ],
  },
  {
    question: "How do you feel about subtitles?",
    answers: [
      { text: "Essential — I want the original performance, not dubbing", resultType: "The Cinephile" },
      { text: "I'll deal with them if the film is worth it", resultType: "The Indie Explorer" },
      { text: "Honestly, I'd rather watch it dubbed", resultType: "The Blockbuster Fan" },
      { text: "Don't mind either way", resultType: "The Genre Junkie" },
    ],
  },
];

const recommendationQuestions: TestQuestion[] = [
  {
    question: "How are you feeling right now?",
    answers: [
      { text: "Cozy and nostalgic — take me somewhere warm", resultType: "Comfort Classic" },
      { text: "Restless — I want my mind blown", resultType: "Mind-Bending Thriller" },
      { text: "Adventurous — show me something epic", resultType: "Epic Adventure" },
      { text: "Mushy — I want to feel all the feelings", resultType: "Cozy Romance" },
    ],
  },
  {
    question: "Pick a weekend vibe:",
    answers: [
      { text: "Blanket fort + hot chocolate + familiar favorites", resultType: "Comfort Classic" },
      { text: "Friends over for an intense movie that sparks debates", resultType: "Mind-Bending Thriller" },
      { text: "Epic trilogy marathon — no breaks", resultType: "Epic Adventure" },
      { text: "Rom-com marathon with snacks and zero judgment", resultType: "Cozy Romance" },
    ],
  },
  {
    question: "What time is it?",
    answers: [
      { text: "Late at night — give me something atmospheric", resultType: "Cerebral Drama" },
      { text: "Afternoon — perfect for an adventure", resultType: "Epic Adventure" },
      { text: "Evening — prime movie-watching time, anything goes", resultType: "Adrenaline Rush" },
      { text: "Early morning — ease me in gently", resultType: "Comfort Classic" },
    ],
  },
  {
    question: "What's your energy level?",
    answers: [
      { text: "Low — I just want to be carried by a good story", resultType: "Comfort Classic" },
      { text: "High — give me explosions and car chases", resultType: "Adrenaline Rush" },
      { text: "Medium — I want to think, but not too hard", resultType: "Cozy Romance" },
      { text: "Intellectual — I want a puzzle to solve", resultType: "Mind-Bending Thriller" },
    ],
  },
  {
    question: "Who are you watching with?",
    answers: [
      { text: "Alone — this is ME time", resultType: "Cerebral Drama" },
      { text: "Partner — something we'll both enjoy", resultType: "Cozy Romance" },
      { text: "Friends — bring on the fun", resultType: "Adrenaline Rush" },
      { text: "Family — keep it accessible", resultType: "Epic Adventure" },
    ],
  },
  {
    question: "Pick a snack to go with your movie:",
    answers: [
      { text: "Homemade popcorn with truffle salt", resultType: "Comfort Classic" },
      { text: "Sushi delivery — I'm not looking away from the screen", resultType: "Mind-Bending Thriller" },
      { text: "Pizza — big movie, big appetite", resultType: "Epic Adventure" },
      { text: "Chocolate and wine — the fancy route", resultType: "Cozy Romance" },
    ],
  },
  {
    question: "Which poster catches your eye?",
    answers: [
      { text: "Warm sunset tones with a vintage font", resultType: "Comfort Classic" },
      { text: "Dark, moody, abstract — you can't tell what it's about", resultType: "Mind-Bending Thriller" },
      { text: "A sweeping landscape with tiny figures against the sky", resultType: "Epic Adventure" },
      { text: "Two silhouettes, rain-soaked, eyes locked", resultType: "Cozy Romance" },
    ],
  },
  {
    question: "What do you want to feel when the credits roll?",
    answers: [
      { text: "Warm and satisfied, like a hug", resultType: "Comfort Classic" },
      { text: "Shaken — I need to stare at the ceiling for a while", resultType: "Mind-Bending Thriller" },
      { text: "Pumped — ready to take on the world", resultType: "Adrenaline Rush" },
      { text: "Reflective — something that lingers with me", resultType: "Cerebral Drama" },
    ],
  },
];

const creativeQuestions: TestQuestion[] = [
  {
    question: "You're directing a film. What's the first thing you focus on?",
    answers: [
      { text: "The script — story is king", resultType: "The Storytellers" },
      { text: "The visual style — every frame a painting", resultType: "The Visionary Crew" },
      { text: "The performances — get the actors right", resultType: "The Classics Team" },
      { text: "The technology — push what's possible", resultType: "The Innovators" },
    ],
  },
  {
    question: "Pick a cinematography style:",
    answers: [
      { text: "Long, unbroken takes that let the scene breathe", resultType: "The Visionary Crew" },
      { text: "Fast cuts, handheld, raw energy", resultType: "The Outsiders" },
      { text: "Classic compositions — wide shot, medium, close-up", resultType: "The Classics Team" },
      { text: "Whatever serves the story best", resultType: "The Storytellers" },
    ],
  },
  {
    question: "Which soundtrack approach do you prefer?",
    answers: [
      { text: "An epic orchestral score that carries you", resultType: "The Classics Team" },
      { text: "Licensed songs that become inseparable from the film", resultType: "The Storytellers" },
      { text: "Minimalist sound design — silence is powerful", resultType: "The Visionary Crew" },
      { text: "Experimental electronic — unexpected and bold", resultType: "The Innovators" },
    ],
  },
  {
    question: "How important is visual effects work?",
    answers: [
      { text: "Practical effects always — CGI should be invisible", resultType: "The Classics Team" },
      { text: "Push the envelope — ILM, Weta, groundbreaking VFX", resultType: "The Innovators" },
      { text: "Use whatever tells the story — practical, CG, both", resultType: "The Storytellers" },
      { text: "The less the better — real locations, real light", resultType: "The Visionary Crew" },
    ],
  },
  {
    question: "What kind of endings do you gravitate toward?",
    answers: [
      { text: "Tidy, satisfying, cathartic", resultType: "The Classics Team" },
      { text: "Open-ended, thought-provoking, ambiguous", resultType: "The Storytellers" },
      { text: "Twist endings that reframe everything", resultType: "The Innovators" },
      { text: "Quiet, poetic, lingering", resultType: "The Visionary Crew" },
    ],
  },
  {
    question: "Which collaborator matters most?",
    answers: [
      { text: "The editor — pacing is everything", resultType: "The Technical Masters" },
      { text: "The production designer — build the world", resultType: "The Visionary Crew" },
      { text: "The casting director — the right face changes everything", resultType: "The Storytellers" },
      { text: "The composer — music is the soul of a film", resultType: "The Classics Team" },
    ],
  },
  {
    question: "If you could only use one camera, what would it be?",
    answers: [
      { text: "IMAX — go big or go home", resultType: "The Innovators" },
      { text: "Anamorphic 35mm — nothing beats the texture", resultType: "The Classics Team" },
      { text: "A small mirrorless — flexibility is everything", resultType: "The Outsiders" },
      { text: "Whatever the DP recommends", resultType: "The Technical Masters" },
    ],
  },
  {
    question: "How do you feel about improvisation on set?",
    answers: [
      { text: "Love it — some of the best moments are unplanned", resultType: "The Storytellers" },
      { text: "Every word matters — stick to the script", resultType: "The Classics Team" },
      { text: "Let actors riff within the structure", resultType: "The Visionary Crew" },
      { text: "Rehearse until it's perfect, then let go", resultType: "The Technical Masters" },
    ],
  },
];

const questionBanks: Record<string, TestQuestion[]> = {
  Personality: personalityQuestions,
  Recommendation: recommendationQuestions,
  Creative: creativeQuestions,
};

const resultDescriptions: Record<string, string> = {
  "The Classicist": "You appreciate the timeless craft of cinema. Golden Age Hollywood, literary adaptations, and the careful artistry of filmmakers like Billy Wilder and Alfred Hitchcock speak to your soul. You believe great storytelling never goes out of style.",
  "The Auteurist": "You follow directors like others follow bands. You've watched every Villeneuve film, debated Kubrick's intentions, and can articulate why Wes Anderson's symmetry matters. The director's vision is the heart of cinema for you.",
  "The Blockbuster Fan": "You love the communal magic of event cinema — packed theaters, shared gasps, and stories that unite audiences worldwide. From MCU phases to Star Wars sagas, you believe movies should be an experience.",
  "The Indie Explorer": "You thrive on discovery. Sundance favorites, A24 releases, and foreign gems fill your watchlist. You'd rather be surprised by an unknown filmmaker than comforted by a familiar franchise.",
  "The Cinephile": "Cinema is your religion. You track Sight & Sound polls, attend retrospectives, and have opinions about aspect ratios. Your Letterboxd reviews are essays. Film isn't just entertainment — it's art, philosophy, and life.",
  "The Genre Junkie": "You know what you love and you lean into it. Whether it's horror, rom-com, or noir, you appreciate the craft within genre conventions. Comfort and excitement over pretension, always.",
  "Comfort Classic": "You need something warm, familiar, and guaranteed to make you feel good. Think Amelie, The Princess Bride, or a Miyazaki classic. Tonight is about comfort, not challenge.",
  "Mind-Bending Thriller": "You're in the mood to have your brain twisted into knots. Memento, Primer, or Oldboy — you want a film that makes you question reality and keeps you thinking for days.",
  "Epic Adventure": "You want to be swept away. Lord of the Rings, Mad Max: Fury Road, or Dune — give you spectacle, stakes, and a journey that feels larger than life.",
  "Cozy Romance": "You want warmth, chemistry, and maybe a few tears. Before Sunrise, Pride & Prejudice, or When Harry Met Sally — tonight is about connection and feeling deeply.",
  "Adrenaline Rush": "Speed, tension, and edge-of-your-seat energy. John Wick, Top Gun: Maverick, or Die Hard — you want your pulse racing and your popcorn flying.",
  "Cerebral Drama": "You want something that lingers long after the credits. There Will Be Blood, Parasite, or Manchester by the Sea — you're ready for weight, complexity, and emotional depth.",
  "The Visionary Crew": "You build worlds through imagery. Your dream crew would prioritize visual poetry — think Roger Deakins, Hoyte van Hoytema, and production designers who treat every frame as a canvas.",
  "The Technical Masters": "You respect the craft behind the craft. Editing, sound design, color grading — the invisible artistry that separates good films from great ones is what fascinates you.",
  "The Storytellers": "Character, dialogue, and narrative are your priorities. You'd build a crew around writers, casting directors, and actors who can bring truth to every scene.",
  "The Innovators": "You push boundaries. New camera tech, experimental narratives, genre-defying approaches — your dream crew would challenge every convention and redefine what cinema can be.",
  "The Classics Team": "You value proven excellence. Traditional techniques, master-level actors, and time-tested filmmaking approaches. Why reinvent the wheel when the wheel is already perfect?",
  "The Outsiders": "You operate outside the system and thrive there. Guerrilla filmmaking, non-traditional casting, and raw honesty over polish. Your dream crew breaks every rule beautifully.",
};

function getQuestionsForCategory(category: string): TestQuestion[] {
  return questionBanks[category] ?? questionBanks["Personality"];
}

interface ClientTestProps {
  title: string;
  category: string;
  results: string[];
  testId: number | string;
  isAdmin: boolean;
}

type Phase = "playing" | "results";

export function ClientTest({ title, category, results, testId, isAdmin }: ClientTestProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const allQuestions = getQuestionsForCategory(category);
  const questions = allQuestions;

  const [phase, setPhase] = useState<Phase>("playing");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const r of results) initial[r] = 0;
    return initial;
  });
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = useCallback(
    (answerIndex: number) => {
      if (showFeedback) return;
      setSelected(answerIndex);
      setShowFeedback(true);

      const answer = questions[current].answers[answerIndex];
      setVotes((prev) => ({
        ...prev,
        [answer.resultType]: (prev[answer.resultType] ?? 0) + 1,
      }));

      setTimeout(() => {
        setShowFeedback(false);
        setSelected(null);
        if (current + 1 < questions.length) {
          setCurrent((c) => c + 1);
        } else {
          setPhase("results");
        }
      }, 800);
    },
    [showFeedback, current, questions]
  );

  const handleRetry = useCallback(() => {
    setCurrent(0);
    setSelected(null);
    const initial: Record<string, number> = {};
    for (const r of results) initial[r] = 0;
    setVotes(initial);
    setShowFeedback(false);
    setPhase("playing");
  }, [results]);

  const winningResult = Object.entries(votes).reduce<{ name: string; count: number }>(
    (best, [name, count]) => (count > best.count ? { name, count } : best),
    { name: results[0] ?? "Unknown", count: 0 }
  );

  if (phase === "results") {
    const description = resultDescriptions[winningResult.name] ?? "You have a unique and eclectic taste that defies simple categorization.";

    return (
      <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#451a03] via-[#2a1501] to-[#0d0b1a]" />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-15"
          style={{ background: "rgba(251, 191, 36, 0.3)", right: "10%", bottom: "10%" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #fbbf24 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-6 pt-28 pb-20">
          <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <Link href="/quizzes/tests" className="hover:text-amber-400 transition-colors">Tests</Link>
            <span className="opacity-30">/</span>
            <span className="text-amber-400/70">{title}</span>
          </div>

          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-amber-400/60 mb-3">Your Result</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">{winningResult.name}</h1>

            <div className="bg-white/[0.03] border border-neutral-800/50 rounded-2xl px-8 py-6 mb-8">
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">{description}</p>
            </div>

            <div className="inline-flex items-center gap-4 bg-white/[0.03] border border-neutral-800/50 rounded-2xl px-6 py-4">
              <div>
                <p className="text-2xl font-bold text-amber-400">{winningResult.count}/{questions.length}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mt-1">Matches</p>
              </div>
              <div className="w-px h-10 bg-neutral-800" />
              <div className="text-left">
                <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 mb-1">All Results</p>
                {Object.entries(votes)
                  .filter(([, count]) => count > 0)
                  .sort(([, a], [, b]) => b - a)
                  .map(([name, count]) => (
                    <div key={name} className="flex items-center gap-2 text-xs">
                      <span className="text-neutral-400">{name}:</span>
                      <span className="text-amber-400/70">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleRetry}
              className="px-6 py-3 rounded-xl bg-amber-500/15 border border-amber-500/20 text-amber-300 text-sm font-medium tracking-wide hover:bg-amber-500/25 transition-all duration-300"
            >
              Try Again
            </button>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-4 mt-8 pt-4 border-t border-neutral-800/30">
              <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-600">Admin</span>
              <EditModal type="tests" id={testId as number} accentColor="#fbbf24" fields={[
                { name: "title", label: "Title", type: "text", value: title },
                { name: "category", label: "Category", type: "text", value: category },
                { name: "preview", label: "Preview", type: "textarea", value: "" },
                { name: "questionsCount", label: "Questions Count", type: "number", value: questions.length },
              ]} />
              <button onClick={() => {
                if (!confirm("Are you sure you want to delete this test?")) return;
                setDeleting(true);
                deleteContent("tests", testId as number).then(() => router.push("/quizzes/tests"));
              }} disabled={deleting} className="text-[10px] tracking-[0.15em] uppercase text-red-400/50 hover:text-red-400 transition-colors">{deleting ? "Deleting..." : "Delete"}</button>
            </div>
          )}
        </div>
      </main>
    );
  }

  const q = questions[current];
  const progress = ((current + (showFeedback ? 1 : 0)) / questions.length) * 100;

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#451a03] via-[#2a1501] to-[#0d0b1a]" />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-15"
        style={{ background: "rgba(251, 191, 36, 0.3)", right: "10%", bottom: "10%" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #fbbf24 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link href="/quizzes/tests" className="hover:text-amber-400 transition-colors">Tests</Link>
          <span className="opacity-30">/</span>
          <span className="text-amber-400/70">{title}</span>
        </div>

        <div className="mb-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-amber-400/60 mb-2">{category}</p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{title}</h1>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400/60 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 whitespace-nowrap">
              {current + 1} / {questions.length}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6">{q.question}</h2>

          <div className="space-y-3">
            {q.answers.map((answer, i) => {
              let classes =
                "w-full text-left bg-white/[0.03] border border-neutral-800/50 rounded-xl px-5 py-4 text-sm text-white/80 transition-all duration-300 ";

              if (showFeedback && selected === i) {
                classes = "w-full text-left bg-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-4 text-sm text-amber-300 transition-all duration-300 ";
              } else if (showFeedback) {
                classes = "w-full text-left bg-white/[0.02] border border-neutral-800/30 rounded-xl px-5 py-4 text-sm text-neutral-600 transition-all duration-300 opacity-50 ";
              } else {
                classes += "hover:bg-amber-500/10 hover:border-amber-500/20 hover:text-amber-200 cursor-pointer ";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={showFeedback}
                  className={classes}
                >
                  <span className="flex items-center gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full border border-current/30 flex items-center justify-center text-[10px] font-medium">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {answer.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-4 mt-8 pt-4 border-t border-neutral-800/30">
            <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-600">Admin</span>
            <EditModal type="tests" id={testId as number} accentColor="#fbbf24" fields={[
              { name: "title", label: "Title", type: "text", value: title },
              { name: "category", label: "Category", type: "text", value: category },
              { name: "preview", label: "Preview", type: "textarea", value: "" },
              { name: "questionsCount", label: "Questions Count", type: "number", value: questions.length },
            ]} />
            <button onClick={() => {
              if (!confirm("Are you sure you want to delete this test?")) return;
              setDeleting(true);
              deleteContent("tests", testId as number).then(() => router.push("/quizzes/tests"));
            }} disabled={deleting} className="text-[10px] tracking-[0.15em] uppercase text-red-400/50 hover:text-red-400 transition-colors">{deleting ? "Deleting..." : "Delete"}</button>
          </div>
        )}
      </div>
    </main>
  );
}
