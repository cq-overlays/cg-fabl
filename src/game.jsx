import render from "./render"
import { AnimatePresence, motion } from "framer-motion"
import clsx from "clsx"
import fablLogo from "./FABL_IconLogo.png"
import {
  useCurrentBlock,
  useCurrentColors,
  useCurrentGameScreen,
  useCurrentRound,
  useCurrentScores,
  useCurrentTeams,
} from "./replicants"
import { useState, useEffect, forwardRef } from "react"

const cycle = [50, 10]

function App() {
  const game = useCurrentGameScreen()
  const block = useCurrentBlock()
  const [cyclePhase, setPhase] = useState(1)

  useEffect(() => {
    const timeout = setTimeout(
      () => setPhase(cyclePhase ? 0 : 1),
      cycle[cyclePhase] * 1000
    )
    return () => clearTimeout(timeout)
  }, [cyclePhase])

  return (
    <div class="flex flex-col m-6 gap-6 items-stretch text-white text-2xl">
      <AnimatePresence>{game.showScores && <Scoreboard />}</AnimatePresence>
      <AnimatePresence>{game.showScores && <CurrentRound />}</AnimatePresence>
      <AnimatePresence>
        {game.showScores && game.showCommentators && cyclePhase && (
          <Section
            transition={{
              type: "spring",
              duration: 0.2,
              delay: 0.1,
            }}
            className="relative flex flex-col gap-4"
          >
            <Comm comm={block.value[0]} />
            <Comm comm={block.value[1]} />
            <motion.div
              transition={{
                type: "spring",
                velocity: 2,
                delay: 0.1,
              }}
              initial={{ scale: 0, opacity: 0, "--rotate": "-6deg" }}
              animate={{ scale: 1, opacity: 1, "--rotate": "6deg" }}
              className="absolute bottom-0 right-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-16 translate-y-3 translate-x-6 rotate-[var(--rotate)] text-fabl-indigo-light"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                />
              </svg>
            </motion.div>
          </Section>
        )}
      </AnimatePresence>
    </div>
  )
}

const Scoreboard = () => {
  const teams = useCurrentTeams()
  const score = useCurrentScores()
  const colors = useCurrentColors()

  return (
    <Section className="flex flex-col gap-4 items-stretch">
      <Score team={teams[0].name} score={score[0]} color={colors[0]} />
      <Score team={teams[1].name} score={score[1]} color={colors[1]} />
    </Section>
  )
}

const Score = ({ team, score, color }) => (
  <div className="flex items-center w-full gap-4 font-medium">
    <div className="rounded-md h-10 w-6" style={{ backgroundColor: color }} />
    <div className="mr-auto">{team}</div>
    <div className="font-bold text-center">
      <div className="flex justify-center w-6 text-3xl">{score}</div>
    </div>
  </div>
)

const CurrentRound = () => {
  const round = useCurrentRound()
  return (
    <Section className="font-medium text-center -mt-4 relative">
      {round.name}
      <motion.div
        transition={{
          type: "spring",
          velocity: 2,
        }}
        initial={{ scale: 0, opacity: 0, "--rotate": "6deg" }}
        animate={{ scale: 1, opacity: 1, "--rotate": "-6deg" }}
        className="absolute inset-y-0 left-0"
      >
        <img
          src={fablLogo}
          className="h-16 -translate-x-5 -translate-y-6 rotate-[var(--rotate)]"
        />
      </motion.div>
    </Section>
  )
}

const Comm = ({ comm }) => (
  <div>
    <div className="font-medium">{comm.name}</div>
    <div className="text-xl flex items-baseline gap-4">
      <div className="text-fabl-pink font-semibold">{comm.pronouns}</div>
      <div className="self-stretch shrink-0 rounded-full w-1 bg-fabl-indigo-light"></div>
      <div>{comm.twitter}</div>
    </div>
  </div>
)

const Section = forwardRef(({ className, children }, ref) => (
  <motion.div
    ref={ref}
    layout="position"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -20, opacity: 0 }}
    className={clsx(
      "bg-fabl-indigo-darker rounded-xl p-4 w-full max-w-sm box-content",
      className
    )}
  >
    {children}
  </motion.div>
))

render(App)
