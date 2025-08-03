'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

export default function SharedLayout() {
  const [activeGame, setActiveGame] = useState<(typeof GAMES)[number] | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setActiveGame(null));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveGame(null);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <AnimatePresence>
        {activeGame ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-10 bg-black/20"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeGame ? (
          <div className="absolute inset-0 z-10 grid place-items-center">
            <motion.div
              layoutId={`card-${activeGame.title}`}
              className="flex h-fit w-[500px] cursor-pointer flex-col items-start gap-4 overflow-hidden bg-white p-4"
              ref={ref}
              style={{ borderRadius: 12 }}
            >
              <div className="flex w-full items-center gap-4">
                <motion.img
                  layoutId={`img-${activeGame.title}`}
                  height={56}
                  width={56}
                  alt=""
                  src={activeGame.image}
                  style={{ borderRadius: 12 }}
                />
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex flex-col p-0">
                    <motion.h2
                      layoutId={`title-${activeGame.title}`}
                      className="text-sm font-medium"
                    >
                      {activeGame.title}
                    </motion.h2>
                    <motion.p
                      layoutId={`desc-${activeGame.title}`}
                      className="text-sm text-gray-600"
                    >
                      {activeGame.description}
                    </motion.p>
                  </div>
                  <motion.button
                    layoutId={`button-${activeGame.title}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-blue-500"
                  >
                    Get
                  </motion.button>
                </div>
              </div>
              <motion.p
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="text-sm text-gray-600"
              >
                {activeGame.longDescription}
              </motion.p>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="relative my-12 flex w-full flex-col items-center p-0">
        {GAMES.map((game, index) => (
          <motion.li
            layoutId={`card-${game.title}`}
            key={game.title}
            onClick={() => setActiveGame(game)}
            className="flex w-96 cursor-pointer items-center gap-4 p-0"
            style={{ borderRadius: 8 }}
          >
            <motion.img
              layoutId={`img-${game.title}`}
              height={56}
              width={56}
              alt=""
              src={game.image}
              style={{ borderRadius: 12 }}
            />
            <div
              className={`flex flex-1 items-center justify-between ${
                index === GAMES.length - 1 ? '' : 'border-b border-gray-300/40'
              }`}
            >
              <div className="flex flex-col py-4">
                <motion.h2 layoutId={`title-${game.title}`} className="text-sm font-medium">
                  {game.title}
                </motion.h2>
                <motion.p layoutId={`desc-${game.title}`} className="text-sm text-gray-600">
                  {game.description}
                </motion.p>
              </div>
              <motion.button
                layoutId={`button-${game.title}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-blue-500"
              >
                Get
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const GAMES = [
  {
    title: 'The Oddysey',
    description: 'Explore unknown galaxies.',
    longDescription:
      'Throughout their journey, players will encounter diverse alien races, each with their own unique cultures and technologies. Engage in thrilling space combat, negotiate complex diplomatic relations, and make critical decisions that affect the balance of power in the galaxy.',
    image:
      'https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/space.png',
  },
  {
    title: 'Angry Rabbits',
    description: 'They are coming for you.',
    longDescription:
      'The rabbits are angry and they are coming for you. You have to defend yourself with your carrot gun. The game is not simple, you have to be fast and accurate to survive.',
    image:
      'https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/rabbit.png',
  },
  {
    title: 'Ghost town',
    description: 'Find the ghosts.',
    longDescription:
      'You are in a ghost town and you have to find the ghosts. But be careful, they are dangerous.',
    image:
      'https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/ghost.webp',
  },
  {
    title: 'Pirates in the jungle',
    description: 'Find the treasure.',
    longDescription:
      'You are a pirate and you have to find the treasure in the jungle. But be careful, there are traps and wild animals.',
    image:
      'https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/pirate.png',
  },
  {
    title: 'Lost in the mountains',
    description: 'Find your way home.',
    longDescription:
      'You are lost in the mountains and you have to find your way home. But be careful, there are dangerous animals and you can get lost.',
    image:
      'https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/boy.webp',
  },
];
