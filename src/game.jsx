import render from "./render"
import { AnimatePresence, motion } from "framer-motion"
import clsx from "clsx"
import {
  useCurrentBlock,
  useCurrentColors,
  useCurrentRound,
  useCurrentScores,
  useCurrentTeams,
} from "./replicants"

function App() {
  return (
    <AnimatePresence>
      <div class="flex flex-col m-6 gap-6 items-stretch text-white text-2xl">
        <Scoreboard />
        <CurrentRound />
        {/* <BlockSection /> */}
      </div>
    </AnimatePresence>
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
    <div
      className="rounded-md h-10 w-6 border-2 border-fabl-indigo-light"
      style={{ backgroundColor: color }}
    />
    <div className="mr-auto">{team}</div>
    <div className="font-bold text-center">
      <div className="flex justify-center w-6 text-3xl">{score}</div>
    </div>
  </div>
)

const CurrentRound = () => {
  const round = useCurrentRound()
  return (
    <Section className="font-medium text-center -mt-3">{round.name}</Section>
  )
}

const BlockSection = () => {
  const block = useCurrentBlock()
  return (
    <motion.div>
      <Section className="flex flex-col gap-4">
        <Comm comm={block.value[0]} />
        <Comm comm={block.value[1]} />
      </Section>
    </motion.div>
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

const Section = ({ className, children }) => (
  <motion.div
    transition={{
      velocity: 0.5,
    }}
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 20, opacity: 0 }}
    className={clsx(
      "bg-fabl-indigo-darker rounded-xl p-4 w-full max-w-sm box-content",
      className
    )}
  >
    {children}
  </motion.div>
)

render(App)
