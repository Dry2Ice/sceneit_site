"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteContent } from "@/actions/content";
import { EditModal } from "@/components/ui/EditModal";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const questionBanks: Record<string, Question[]> = {
  Awards: [
    {
      question: "Which film won the Academy Award for Best Picture in 2020?",
      options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
      correct: 2,
    },
    {
      question: "Who is the youngest person to win Best Director at the Oscars?",
      options: ["Damien Chazelle", "Steven Spielberg", "Sam Mendes", "John Singleton"],
      correct: 0,
    },
    {
      question: "Which film holds the record for most Oscar wins (tied at 11)?",
      options: ["Titanic", "Ben-Hur", "The Lord of the Rings: The Return of the King", "All of the above"],
      correct: 3,
    },
    {
      question: "Which actress has won the most Academy Awards for acting?",
      options: ["Meryl Streep", "Katharine Hepburn", "Ingrid Bergman", "Jodie Foster"],
      correct: 1,
    },
    {
      question: "What was the first animated film nominated for Best Picture?",
      options: ["Shrek", "Toy Story", "Beauty and the Beast", "The Lion King"],
      correct: 2,
    },
  ],
  Visual: [
    {
      question: "A man wakes up in a dystopian future where humans are harvested as energy by machines. Which film?",
      options: ["Blade Runner", "The Matrix", "Dark City", "eXistenZ"],
      correct: 1,
    },
    {
      question: "A lonely man befriends a volleyball stranded on a desert island. Which film?",
      options: ["The Beach", "Cast Away", "Life of Pi", "Swiss Family Robinson"],
      correct: 1,
    },
    {
      question: "A young girl enters a spirit world and works in a bathhouse for supernatural beings. Which film?",
      options: ["My Neighbor Totoro", "Princess Mononoke", "Spirited Away", "Howl's Moving Castle"],
      correct: 2,
    },
    {
      question: "A clownfish crosses the ocean to find his missing son. Which film?",
      options: ["Shark Tale", "Finding Nemo", "Moana", "The Little Mermaid"],
      correct: 1,
    },
    {
      question: "A psychiatrist treats a patient who claims to see dead people. Which film?",
      options: ["The Sixth Sense", "Insidious", "The Others", "Stir of Echoes"],
      correct: 0,
    },
  ],
  Directors: [
    {
      question: "Who directed 'Pulp Fiction' (1994)?",
      options: ["Martin Scorsese", "Quentin Tarantino", "David Fincher", "The Coen Brothers"],
      correct: 1,
    },
    {
      question: "Who directed 'Schindler's List' (1993)?",
      options: ["Steven Spielberg", "Ridley Scott", "Stanley Kubrick", "Roman Polanski"],
      correct: 0,
    },
    {
      question: "Who directed 'The Shining' (1980)?",
      options: ["Alfred Hitchcock", "Stanley Kubrick", "Brian De Palma", "David Lynch"],
      correct: 1,
    },
    {
      question: "Who directed 'Pan's Labyrinth' (2006)?",
      options: ["Pedro Almodóvar", "Alejandro González Iñárritu", "Guillermo del Toro", "Alfonso Cuarón"],
      correct: 2,
    },
    {
      question: "Who directed 'In the Mood for Love' (2000)?",
      options: ["Ang Lee", "Zhang Yimou", "Wong Kar-wai", "Park Chan-wook"],
      correct: 2,
    },
  ],
  Quotes: [
    {
      question: "'Here's looking at you, kid.' — Complete the origin:",
      options: ["The Maltese Falcon", "Casablanca", "Gone with the Wind", "Citizen Kane"],
      correct: 1,
    },
    {
      question: "'I'm going to make him an offer he can't refuse.' — Which film?",
      options: ["Goodfellas", "Scarface", "The Godfather", "Carlito's Way"],
      correct: 2,
    },
    {
      question: "'You talking to me? You talking to me?' — Which film?",
      options: ["Raging Bull", "Goodfellas", "Taxi Driver", "Mean Streets"],
      correct: 2,
    },
    {
      question: "'May the Force be with you.' — First spoken in which film?",
      options: ["The Empire Strikes Back", "Return of the Jedi", "Star Wars (1977)", "The Phantom Menace"],
      correct: 2,
    },
    {
      question: "'I see dead people.' — Which film?",
      options: ["The Others", "The Sixth Sense", "Ghost", "Poltergeist"],
      correct: 1,
    },
  ],
  Music: [
    {
      question: "Who composed the score for 'Interstellar' (2014)?",
      options: ["Hans Zimmer", "John Williams", "Howard Shore", "Thomas Newman"],
      correct: 0,
    },
    {
      question: "Who composed the iconic 'Star Wars' theme?",
      options: ["Jerry Goldsmith", "John Williams", "James Horner", "Danny Elfman"],
      correct: 1,
    },
    {
      question: "Who composed the score for 'The Lord of the Rings' trilogy?",
      options: ["Howard Shore", "Hans Zimmer", "James Newton Howard", "Harry Gregson-Williams"],
      correct: 0,
    },
    {
      question: "Who composed the score for 'Blade Runner' (1982)?",
      options: ["Vangelis", "Tangerine Dream", "John Carpenter", "Giorgio Moroder"],
      correct: 0,
    },
    {
      question: "Who composed the score for 'The Good, the Bad and the Ugly'?",
      options: ["Bernard Herrmann", "Ennio Morricone", "Nino Rota", "Luis Bacalov"],
      correct: 1,
    },
  ],
  "World Cinema": [
    {
      question: "Which country produced the film 'City of God' (2002)?",
      options: ["Mexico", "Argentina", "Brazil", "Colombia"],
      correct: 2,
    },
    {
      question: "'Seven Samurai' (1954) was directed by which Japanese filmmaker?",
      options: ["Yasujirō Ozu", "Akira Kurosawa", "Kenji Mizoguchi", "Hayao Miyazaki"],
      correct: 1,
    },
    {
      question: "Which French film won the Palme d'Or in 2013 and depicted love in an elderly couple?",
      options: ["The Intouchables", "Amour", "Blue Is the Warmest Colour", "The Artist"],
      correct: 2,
    },
    {
      question: "Which South Korean film won the Palme d'Or and Best Picture Oscar in 2020?",
      options: ["Oldboy", "The Handmaiden", "Parasite", "Burning"],
      correct: 2,
    },
    {
      question: "Which Iranian director won the Oscar for Best Foreign Language Film with 'A Separation'?",
      options: ["Abbas Kiarostami", "Asghar Farhadi", "Majid Majidi", "Jafar Panahi"],
      correct: 1,
    },
  ],
  Industry: [
    {
      question: "What is the highest-grossing film of all time (unadjusted for inflation)?",
      options: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars: The Force Awakens"],
      correct: 1,
    },
    {
      question: "Which studio produced 'The Lion King' (1994)?",
      options: ["Pixar", "DreamWorks", "Walt Disney Animation", "Blue Sky Studios"],
      correct: 2,
    },
    {
      question: "What does 'CGI' stand for in filmmaking?",
      options: ["Computer Generated Imagery", "Cinema Graphics Interface", "Computer Graphics Integration", "Created Graphic Imaging"],
      correct: 0,
    },
    {
      question: "Which film had the largest opening weekend at the domestic box office?",
      options: ["Avengers: Endgame", "Spider-Man: No Way Home", "Avengers: Infinity War", "Star Wars: The Force Awakens"],
      correct: 0,
    },
    {
      question: "What aspect ratio is commonly referred to as 'CinemaScope'?",
      options: ["1.85:1", "2.35:1", "1.33:1", "16:9"],
      correct: 1,
    },
  ],
  Horror: [
    {
      question: "In 'The Exorcist' (1973), what is the name of the possessed girl?",
      options: ["Emily", "Regan", "Carrie", "Rosemary"],
      correct: 1,
    },
    {
      question: "Which horror film features a killer who uses a puppet named Billy?",
      options: ["Hellraiser", "Child's Play", "Saw", "Puppet Master"],
      correct: 2,
    },
    {
      question: "Who directed 'Get Out' (2017)?",
      options: ["Jordan Peele", "Ari Aster", "Robert Eggers", "Mike Flanagan"],
      correct: 0,
    },
    {
      question: "In 'A Nightmare on Elm Street', what is the name of the killer?",
      options: ["Michael Myers", "Freddy Krueger", "Jason Voorhees", "Pinhead"],
      correct: 1,
    },
    {
      question: "Which horror film is based on a novel by Stephen King about a haunted hotel?",
      options: ["It", "Pet Sematary", "The Shining", "Carrie"],
      correct: 2,
    },
  ],
};

function getQuestionsForCategory(category: string): Question[] {
  return questionBanks[category] ?? questionBanks["Awards"];
}

interface ClientTriviaProps {
  title: string;
  category: string;
  totalQuestions: number;
  triviaId: number | string;
  isAdmin: boolean;
}

type Phase = "playing" | "results";

export function ClientTrivia({ title, category, totalQuestions, triviaId, isAdmin }: ClientTriviaProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const allQuestions = getQuestionsForCategory(category);
  const questions = allQuestions.slice(0, Math.min(totalQuestions, allQuestions.length));

  const [phase, setPhase] = useState<Phase>("playing");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = useCallback(
    (index: number) => {
      if (showFeedback) return;
      setSelected(index);
      setShowFeedback(true);

      const updated = [...answers];
      updated[current] = index;
      setAnswers(updated);

      setTimeout(() => {
        setShowFeedback(false);
        setSelected(null);
        if (current + 1 < questions.length) {
          setCurrent((c) => c + 1);
        } else {
          setPhase("results");
        }
      }, 1200);
    },
    [showFeedback, answers, current, questions.length]
  );

  const handleRetry = useCallback(() => {
    setCurrent(0);
    setSelected(null);
    setAnswers(questions.map(() => null));
    setShowFeedback(false);
    setPhase("playing");
  }, [questions]);

  const correctCount = answers.reduce<number>((sum, ans, i) => (ans === questions[i].correct ? sum + 1 : sum), 0);
  const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  if (phase === "results") {
    const wrongQuestions = questions
      .map((q, i) => ({ question: q, given: answers[i], index: i }))
      .filter((item) => item.given !== item.question.correct);

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
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="opacity-30">/</span>
            <Link href="/quizzes/trivia" className="hover:text-amber-400 transition-colors">
              Trivia
            </Link>
            <span className="opacity-30">/</span>
            <span className="text-amber-400/70">{title}</span>
          </div>

          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-amber-400/60 mb-3">Quiz Complete</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">{title}</h1>

            <div className="inline-flex items-center gap-6 bg-white/[0.03] border border-neutral-800/50 rounded-2xl px-8 py-6">
              <div>
                <p className="text-4xl sm:text-5xl font-bold text-amber-400">
                  {correctCount}/{questions.length}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mt-1">Correct</p>
              </div>
              <div className="w-px h-12 bg-neutral-800" />
              <div>
                <p className="text-4xl sm:text-5xl font-bold text-amber-400">{percentage}%</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mt-1">Score</p>
              </div>
            </div>
          </div>

          {wrongQuestions.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.2em] uppercase text-red-400/60 mb-4">
                Missed Questions ({wrongQuestions.length})
              </p>
              <div className="space-y-3">
                {wrongQuestions.map((item) => (
                  <div
                    key={item.index}
                    className="bg-white/[0.02] border border-red-500/10 rounded-xl p-4"
                  >
                    <p className="text-sm text-white/80 mb-2">{item.question.question}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-red-400/70">Your answer:</span>
                      <span className="text-red-400">
                        {item.given !== null ? item.question.options[item.given] : "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span className="text-emerald-400/70">Correct:</span>
                      <span className="text-emerald-400">
                        {item.question.options[item.question.correct]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {wrongQuestions.length === 0 && (
            <div className="text-center mb-8">
              <p className="text-emerald-400 text-sm font-medium">Perfect score! You got every question right.</p>
            </div>
          )}

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
              <EditModal type="trivias" id={triviaId as number} accentColor="#fbbf24" fields={[
                { name: "title", label: "Title", type: "text", value: title },
                { name: "category", label: "Category", type: "text", value: category },
                { name: "preview", label: "Preview", type: "textarea", value: "" },
                { name: "questionsCount", label: "Questions Count", type: "number", value: totalQuestions },
              ]} />
              <button onClick={() => {
                if (!confirm("Are you sure you want to delete this trivia?")) return;
                setDeleting(true);
                deleteContent("trivias", triviaId as number).then(() => router.push("/quizzes/trivia"));
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
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span className="opacity-30">/</span>
          <Link href="/quizzes/trivia" className="hover:text-amber-400 transition-colors">
            Trivia
          </Link>
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
            {q.options.map((option, i) => {
              let classes =
                "w-full text-left bg-white/[0.03] border border-neutral-800/50 rounded-xl px-5 py-4 text-sm text-white/80 transition-all duration-300 ";

              if (showFeedback && selected !== null) {
                if (i === q.correct) {
                  classes = "w-full text-left bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-4 text-sm text-emerald-300 transition-all duration-300 ";
                } else if (i === selected && i !== q.correct) {
                  classes = "w-full text-left bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-sm text-red-300 transition-all duration-300 ";
                } else {
                  classes = "w-full text-left bg-white/[0.02] border border-neutral-800/30 rounded-xl px-5 py-4 text-sm text-neutral-600 transition-all duration-300 opacity-50 ";
                }
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
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-4 mt-8 pt-4 border-t border-neutral-800/30">
            <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-600">Admin</span>
            <EditModal type="trivias" id={triviaId as number} accentColor="#fbbf24" fields={[
              { name: "title", label: "Title", type: "text", value: title },
              { name: "category", label: "Category", type: "text", value: category },
              { name: "preview", label: "Preview", type: "textarea", value: "" },
              { name: "questionsCount", label: "Questions Count", type: "number", value: totalQuestions },
            ]} />
            <button onClick={() => {
              if (!confirm("Are you sure you want to delete this trivia?")) return;
              setDeleting(true);
              deleteContent("trivias", triviaId as number).then(() => router.push("/quizzes/trivia"));
            }} disabled={deleting} className="text-[10px] tracking-[0.15em] uppercase text-red-400/50 hover:text-red-400 transition-colors">{deleting ? "Deleting..." : "Delete"}</button>
          </div>
        )}
      </div>
    </main>
  );
}
