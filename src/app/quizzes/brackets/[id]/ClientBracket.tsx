"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { deleteContent } from "@/actions/content";
import { EditModal } from "@/components/ui/EditModal";

interface ClientBracketProps {
  items: string[];
  title: string;
  bracketId: number;
  isAdmin: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRoundLabel(round: number, totalRounds: number): string {
  if (round === totalRounds) return "Finals";
  if (round === totalRounds - 1) return "Semifinals";
  if (round === totalRounds - 2) return "Quarterfinals";
  return `Round ${round}`;
}

function getTotalRounds(itemCount: number): number {
  return Math.ceil(Math.log2(itemCount));
}

export function ClientBracket({ items, title, bracketId, isAdmin }: ClientBracketProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [rounds, setRounds] = useState<string[][]>(() => [shuffle(items)])
  const [currentRound, setCurrentRound] = useState(0);
  const [picks, setPicks] = useState<Set<number>>(new Set());
  const [pairWinners, setPairWinners] = useState<Map<number, string>>(new Map());
  const [winner, setWinner] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const currentItems = rounds[currentRound];
  const totalRounds = getTotalRounds(items.length);
  const isOdd = currentItems.length % 2 !== 0;

  const pairs = useMemo((): [string, string | null][] => {
    const result: [string, string | null][] = [];
    const pairCount = Math.floor(currentItems.length / 2);
    for (let i = 0; i < pairCount; i++) {
      result.push([currentItems[i * 2], currentItems[i * 2 + 1]]);
    }
    if (isOdd) {
      result.push([currentItems[currentItems.length - 1], null]);
    }
    return result;
  }, [currentItems, isOdd]);

  const pairCount = Math.floor(currentItems.length / 2);

  // Auto-advance bye items
  useEffect(() => {
    if (isOdd && !pairWinners.has(pairCount)) {
      const timer = setTimeout(() => {
        setPicks((prev) => {
          const next = new Set(prev);
          next.add(pairCount);
          return next;
        });
        setPairWinners((prev) => {
          const next = new Map(prev);
          next.set(pairCount, currentItems[currentItems.length - 1]);
          return next;
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOdd, pairCount, pairWinners, currentItems]);

  const handlePick = useCallback(
    (pairIndex: number, item: string) => {
      if (picks.has(pairIndex) || transitioning) return;
      setPicks((prev) => {
        const next = new Set(prev);
        next.add(pairIndex);
        return next;
      });
      setPairWinners((prev) => {
        const next = new Map(prev);
        next.set(pairIndex, item);
        return next;
      });
    },
    [picks, transitioning]
  );

  const allDecided = picks.size === pairs.length;

  const advanceRound = useCallback(() => {
    const winners: string[] = [];
    for (let i = 0; i < pairs.length; i++) {
      const w = pairWinners.get(i);
      if (w) {
        winners.push(w);
      }
    }

    if (winners.length === 1) {
      setWinner(winners[0]);
      setCelebrate(true);
      return;
    }

    setTransitioning(true);
    setTimeout(() => {
      setRounds((prev) => [...prev, winners]);
      setCurrentRound((prev) => prev + 1);
      setPicks(new Set());
      setPairWinners(new Map());
      setTransitioning(false);
    }, 600);
  }, [pairs, pairWinners]);

  const reset = useCallback(() => {
    setRounds([shuffle(items)]);
    setCurrentRound(0);
    setPicks(new Set());
    setPairWinners(new Map());
    setWinner(null);
    setCelebrate(false);
    setTransitioning(false);
  }, [items]);

  if (winner) {
    return (
      <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#451a03] via-[#2a1501] to-[#0d0b1a]" />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-20"
          style={{ background: "rgba(251, 191, 36, 0.4)", left: "50%", top: "30%", transform: "translate(-50%, -50%)" }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center">
          <div
            className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20"
            style={{ animation: "fadeInUp 0.5s ease-out both" }}
          >
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-300">Champion</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4" style={{ animation: "fadeInUp 0.6s 0.1s ease-out both" }}>
            {winner}
          </h1>
          <p className="text-neutral-500 text-sm text-center mb-2" style={{ animation: "fadeInUp 0.6s 0.2s ease-out both" }}>
            Winner of <span className="text-amber-400/70">{title}</span>
          </p>

          {celebrate && (
            <div className="my-10 flex gap-2" style={{ animation: "fadeInUp 0.6s 0.3s ease-out both" }}>
              {["🎉", "🏆", "🎊", "✨", "🎉"].map((emoji, i) => (
                <span
                  key={i}
                  className="text-3xl"
                  style={{
                    animation: `bounce 0.6s ${0.3 + i * 0.1}s ease-out both`,
                    display: "inline-block",
                  }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={reset}
            className="mt-8 px-8 py-3 bg-amber-500/15 border border-amber-500/25 rounded-xl text-amber-300 text-sm font-medium tracking-wide hover:bg-amber-500/25 hover:border-amber-500/40 transition-all duration-300"
            style={{ animation: "fadeInUp 0.6s 0.4s ease-out both" }}
          >
            Play Again
          </button>
        </div>

        <style jsx global>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce {
            0% { transform: scale(0) translateY(0); }
            50% { transform: scale(1.3) translateY(-10px); }
            100% { transform: scale(1) translateY(0); }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#451a03] via-[#2a1501] to-[#0d0b1a]" />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-15"
        style={{ background: "rgba(251, 191, 36, 0.3)", right: "-10%", top: "5%" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fbbf24 1px, transparent 0)", backgroundSize: "40px 40px" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-amber-400/60 mb-2">{title}</p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {getRoundLabel(currentRound + 1, totalRounds)}
          </h1>
          <p className="text-neutral-500 text-sm">
            Pick your favorite from each matchup
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
          {Array.from({ length: totalRounds }, (_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < currentRound
                    ? "bg-amber-500"
                    : i === currentRound
                    ? "bg-amber-400 animate-pulse"
                    : "bg-neutral-800"
                }`}
              />
              {i < totalRounds - 1 && <div className={`w-8 h-px ${i < currentRound ? "bg-amber-500/40" : "bg-neutral-800"}`} />}
            </div>
          ))}
          <span className="ml-3 text-[10px] tracking-[0.15em] uppercase text-neutral-600">
            {currentRound + 1} / {totalRounds}
          </span>
        </div>

        <div
          className={`space-y-4 transition-opacity duration-500 ${transitioning ? "opacity-0" : "opacity-100"}`}
        >
          {pairs.map(([itemA, itemB], pairIndex) => {
            const isPicked = picks.has(pairIndex);
            const isBye = itemB === null;
            const winnerItem = pairWinners.get(pairIndex);

            return (
              <div
                key={`${currentRound}-${pairIndex}`}
                className="bg-white/[0.02] border border-neutral-800/40 rounded-xl p-4 sm:p-5"
                style={{ animation: `fadeInUp 0.4s ${pairIndex * 0.08}s ease-out both` }}
              >
                {isBye ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/90">{itemA}</span>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400/60 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      Bye — Auto-advances
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-3 sm:gap-4">
                    <button
                      onClick={() => handlePick(pairIndex, itemA)}
                      disabled={isPicked}
                      className={`flex-1 py-4 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                        isPicked && winnerItem === itemA
                          ? "bg-amber-500/20 border-2 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/10"
                          : isPicked && winnerItem !== itemA
                          ? "bg-white/[0.02] border border-neutral-800/30 text-neutral-700 line-through opacity-50"
                          : "bg-white/[0.04] border border-neutral-800/50 text-white/90 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-200 cursor-pointer active:scale-[0.98]"
                      }`}
                    >
                      {itemA}
                    </button>

                    <div className="flex items-center justify-center shrink-0">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-700 font-bold">vs</span>
                    </div>

                    <button
                      onClick={() => handlePick(pairIndex, itemB)}
                      disabled={isPicked}
                      className={`flex-1 py-4 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                        isPicked && winnerItem === itemB
                          ? "bg-amber-500/20 border-2 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/10"
                          : isPicked && winnerItem !== itemB
                          ? "bg-white/[0.02] border border-neutral-800/30 text-neutral-700 line-through opacity-50"
                          : "bg-white/[0.04] border border-neutral-800/50 text-white/90 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-200 cursor-pointer active:scale-[0.98]"
                      }`}
                    >
                      {itemB}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allDecided && (
          <div className="flex justify-center mt-10" style={{ animation: "fadeInUp 0.4s ease-out both" }}>
            <button
              onClick={advanceRound}
              className="px-8 py-3 bg-amber-500/15 border border-amber-500/25 rounded-xl text-amber-300 text-sm font-medium tracking-wide hover:bg-amber-500/25 hover:border-amber-500/40 transition-all duration-300 active:scale-[0.98]"
            >
              {pairs.length === 1 && !isOdd ? "Crown the Winner" : `Advance to ${getRoundLabel(currentRound + 2, totalRounds)}`}
            </button>
          </div>
        )}
      </div>

      {isAdmin && (
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/30">
            <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-600">Admin</span>
            <EditModal type="brackets" id={bracketId} accentColor="#fbbf24" fields={[
              { name: "title", label: "Title", type: "text", value: title },
              { name: "category", label: "Category", type: "text", value: "" },
              { name: "preview", label: "Preview", type: "textarea", value: "" },
              { name: "participants", label: "Participants", type: "number", value: items.length },
            ]} />
            <button onClick={() => {
              if (!confirm("Are you sure you want to delete this bracket?")) return;
              setDeleting(true);
              deleteContent("brackets", bracketId).then(() => router.push("/quizzes/brackets"));
            }} disabled={deleting} className="text-[10px] tracking-[0.15em] uppercase text-red-400/50 hover:text-red-400 transition-colors">{deleting ? "Deleting..." : "Delete"}</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
