"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Scene = {
  id: string;
  duration: number;
  background: string;
  location: string;
  caption: string;
  manLine?: string;
  wifeLines?: string[];
  tone?: string;
};

const SCENE_DATA: Scene[] = [
  {
    id: "porch-intro",
    duration: 6500,
    background: "scene-porch",
    location: "Blue Ridge porch • Sunrise haze",
    caption:
      "The old man rocks slowly, eyes steady, a smirk hinting at the punchline he has lived.",
    manLine: `"Going with wife on vacation... is just a change of location."`,
    tone: "sage",
  },
  {
    id: "beach",
    duration: 5200,
    background: "scene-beach",
    location: "Tropical shoreline • Midday glare",
    caption:
      "Palms sway, but her commands keep the waves in formation as he balances the beach bag.",
    wifeLines: [
      `"Hold the umbrella straight! It's crooked!"`,
      `"Did you double-check the sunscreen times?"`,
    ],
    tone: "directive",
  },
  {
    id: "mountains",
    duration: 5200,
    background: "scene-mountain",
    location: "Highland overlook • Thin mountain air",
    caption:
      "The horizon stretches, yet the itinerary grows longer with every breathless step.",
    wifeLines: [
      `"You're walking too slow—this is the leisurely trail!"`,
      `"Map says turn left; why aren't we already there?"`,
    ],
    tone: "urgent",
  },
  {
    id: "city",
    duration: 5200,
    background: "scene-city",
    location: "Urban lights • Evening rush",
    caption:
      "Skyscrapers glitter, but her schedule outshines every marquee in town.",
    wifeLines: [
      `"No, not that café—check the list!"`,
      `"Tickets go on sale in two minutes; refresh again!"`,
    ],
    tone: "meticulous",
  },
  {
    id: "porch-outro",
    duration: 6400,
    background: "scene-porch-night",
    location: "Same porch • Fireflies returning",
    caption:
      "The rocking chair welcomes him home; the only itinerary now is the rhythm of the crickets.",
    manLine: `"Home sweet home."`,
    tone: "relief",
  },
];

export default function Home() {
  const scenes = useMemo(() => SCENE_DATA, []);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const currentScene = scenes[index];

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (index < scenes.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        setPlaying(false);
      }
    }, currentScene.duration);

    return () => clearTimeout(timer);
  }, [currentScene.duration, index, playing, scenes.length]);

  const playFromStart = () => {
    setIndex(0);
    setPlaying(true);
  };

  const progressTarget = (index + 1) / scenes.length * 100;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
      <div className="flex w-full max-w-5xl flex-col gap-6 px-6 pb-16 pt-12">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
              A porch-side short story
            </p>
            <h1 className="text-balance text-4xl font-semibold text-slate-50 md:text-5xl">
              Passport to Nowhere
            </h1>
          </div>
          <button
            onClick={playFromStart}
            className="relative hidden rounded-full border border-slate-700/70 px-5 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white md:inline-flex"
          >
            Replay
          </button>
        </header>

        <section className="relative aspect-video w-full overflow-hidden rounded-[2.75rem] border border-slate-800/70 bg-slate-900/60 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.9)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0.15, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className={`scene-frame ${currentScene.background}`}
            >
              <div className="scene-overlay" />
              <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 md:p-12">
                <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em] text-slate-300 md:text-sm">
                  <span>{currentScene.location}</span>
                  <span className="text-slate-400/90">
                    {currentScene.tone ? `${currentScene.tone} tempo` : ""}
                  </span>
                </div>

                <div className="space-y-6">
                  <p className="max-w-2xl text-pretty text-base text-slate-100/90 md:text-lg">
                    {currentScene.caption}
                  </p>

                  {currentScene.manLine ? (
                    <motion.blockquote
                      key={`${currentScene.id}-man`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="rounded-3xl bg-slate-950/60 px-6 py-5 text-lg font-semibold italic leading-relaxed text-white shadow-[0_25px_80px_-60px_rgba(148,163,184,0.6)] md:text-xl"
                    >
                      {currentScene.manLine}
                    </motion.blockquote>
                  ) : null}

                  {currentScene.wifeLines ? (
                    <motion.div
                      key={`${currentScene.id}-wife`}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        visible: {
                          transition: { staggerChildren: 0.4 },
                        },
                      }}
                      className="flex flex-col gap-3"
                    >
                      {currentScene.wifeLines.map((line, idx) => (
                        <motion.p
                          key={line}
                          variants={{
                            hidden: { opacity: 0, x: 40 },
                            visible: {
                              opacity: 1,
                              x: 0,
                              transition: {
                                duration: 0.6,
                                ease: "easeOut",
                                delay: idx * 0.05,
                              },
                            },
                          }}
                          className="self-end rounded-2xl bg-amber-200/90 px-4 py-3 text-right text-sm font-semibold text-amber-900 shadow-[0_20px_60px_-45px_rgba(253,230,138,1)] md:max-w-md md:text-base"
                        >
                          {line}
                        </motion.p>
                      ))}
                    </motion.div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <div className="space-y-3">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-800/60">
            <motion.div
              key={`${currentScene.id}-progress`}
              initial={{ width: `${(index / scenes.length) * 100}%` }}
              animate={{ width: `${Math.min(progressTarget, 100)}%` }}
              transition={{
                duration: currentScene.duration / 1000,
                ease: "linear",
              }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 shadow-[0_10px_35px_-25px_rgba(248,196,113,0.9)]"
            />
          </div>
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-500">
            <span>{index + 1 < 10 ? `0${index + 1}` : index + 1} / 05</span>
            <button
              onClick={playFromStart}
              className="rounded-full border border-slate-800 px-4 py-1.5 font-medium text-slate-300 transition hover:border-slate-600 hover:text-white md:hidden"
            >
              Replay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
