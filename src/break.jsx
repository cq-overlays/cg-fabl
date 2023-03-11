import render from "./render"
import clsx from "clsx"
import fablLogo from "./FABL_IconLogo.png"
import fablText from "./FABL_TextLogo.png"
import fablBg from "./FABL_bg.png"
import mitLogo from "./mit.webp"
import otdLogo from "./otd.svg"
import twitchIcon from "./twitch.png"
import discordIcon from "./discord.png"
import twitterIcon from "./twitter.png"
import {
  useCurrentBlock,
  useCurrentBreakScreen,
  useCurrentFlavorText,
  useCurrentRound,
  useCurrentScores,
  useCurrentTeams,
} from "./replicants"
import { AnimatePresence, motion } from "framer-motion"
import { maps } from "./utils"

function App() {
  const screen = useCurrentBreakScreen()

  return (
    <div class="relative bg-otd-slate h-screen w-screen bg-fabl-indigo-dark text-white bg-pan overflow-hidden -z-20">
      <motion.div
        initial={{
          translateX: -398 * 3,
          translateY: -900 * 1,
        }}
        animate={{
          translateX: 0,
          translateY: 0,
        }}
        transition={{ ease: "linear", duration: 60, repeat: Infinity }}
        className="absolute opacity-30 inset-0 bg-fabl-indigo-dark -z-10 w-[400vw] h-[400vw]"
        style={{
          backgroundImage: `url('${fablBg}')`,
        }}
      />
      <AnimatePresence>
        {screen === "brb" && (
          <motion.div className="flex flex-col gap-16 h-full w-full items-center justify-center">
            <CommsSection />
            <BreakSections />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-full w-full flex flex-col items-center justify-end">
        <AnimatePresence>
          {screen !== "brb" && (
            <>
              <motion.div className="flex flex-col gap-16 w-full h-full max-w-8xl justify-center p-8">
                <Scoreboard />
                <motion.div className="flex gap-16 h-full items-center justify-center">
                  <AnimatePresence>
                    {screen === "maplist" && <MaplistSection />}
                    {screen === "rosters" && <RostersSection />}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
              <div className="flex justify-center w-full gap-8 p-8">
                <CommsSection />
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const Scoreboard = () => {
  const teams = useCurrentTeams()
  const scores = useCurrentScores()
  return (
    <Section className="w-auto flex items-center gap-8 justify-center">
      <div className="flex-1 text-5xl text-right">{teams[0].name}</div>
      <div className="text-5xl font-bold">
        {scores[0]} - {scores[1]}
      </div>
      <div className="flex-1 text-5xl">{teams[1].name}</div>
    </Section>
  )
}

const MaplistSection = () => {
  const round = useCurrentRound()
  return round.value.map((game, i) => (
    <Section
      key={i}
      className="h-full w-64 flex items-stretch rounded-xl !p-6 gap-6 flex-col"
    >
      <div
        className="flex-1 rounded-xl bg-cover bg-center bg-fabl-indigo-light flex items-center justify-center"
        style={{
          backgroundImage: `url('https://sendou.ink/static-assets/img/stages/${maps.indexOf(
            game.map
          )}.png')`,
        }}
      >
        {maps.indexOf(game.map) === -1 && (
          <span className="text-9xl font-bold">?</span>
        )}
      </div>
      <div className="rounded-xl text-3xl h-28">
        <div className="font-semibold">{game.mode}</div>
        <div>{game.map}</div>
      </div>
    </Section>
  ))
}

const RostersSection = () => (
  <>
    <Roster />
    <div className="text-8xl text-fabl-pink font-bold">VS</div>
    <Roster right />
  </>
)

const Roster = ({ right }) => {
  const teams = useCurrentTeams()
  console.log(teams)
  let i = right ? 1 : 0
  return (
    <Section
      className={clsx(
        "w-full h-full flex-1 flex flex-col justify-between text-4xl",
        right ? "items-start" : "items-start"
      )}
    >
      {teams[i].data?.map((member) => (
        <Member weapons={member.weapons} right={right}>
          {member.splashtag}
        </Member>
      ))}
    </Section>
  )
}

const Member = ({ right, weapons, children }) => (
  <li className={clsx("flex flex-col", right ? "items-start" : "items-start")}>
    <div>{children}</div>
    <div className="flex gap-2">
      {weapons.map((weapon) => (
        <img
          src={`https://raw.githubusercontent.com/Sendouc/sendou.ink/rewrite/public/static-assets/img/main-weapons-outlined/${weapon.id}.png`}
          className="h-16 w-16"
        />
      ))}
    </div>
  </li>
)

const CommsSection = ({ sm }) => (
  <Section className="h-36 max-w-8xl flex items-center justify-center gap-8 p-4">
    <Commentator left />
    <div
      className={clsx(
        "flex items-center justify-center",
        sm ? "h-48 -translate-y-1.5" : "-translate-y-3"
      )}
    >
      <img src={fablLogo} className="h-full" />
    </div>
    <Commentator right />
  </Section>
)

const BreakSections = () => {
  const text = useCurrentFlavorText()
  return (
    <>
      <Section className="max-w-5xl flex flex-col items-center justify-center gap-4">
        <div className="text-5xl font-bold text-fabl-gold">Up Next</div>
        <div className="text-4xl">{text}</div>
      </Section>
      <Section className="max-w-5xl flex flex-col items-stretch gap-8">
        <div className="flex items-center gap-8 justify-center">
          <img
            src={otdLogo}
            className="rounded-full h-20 sm:h-24 w-20 sm:w-24"
            alt="OTD"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="currentColor"
            className="w-6 sm:w-9 h-6 sm:h-9 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <img
            src={mitLogo}
            className="rounded-full h-20 sm:h-24 w-20 sm:w-24"
            alt="MIT"
          />
        </div>
        <div className="flex flex-col items-center gap-5">
          <Social
            otd="otd.ink/discord"
            mit="discord.io/MullowayIT"
            logo={<img src={discordIcon} />}
          />
          <Social
            otd="@Off_The_Dial"
            mit="@MullowayIT"
            logo={<img src={twitterIcon} />}
          />
          <Social
            otd="twitch.tv/OffTheDial"
            mit="twitch.tv/MullowayIT"
            logo={<img src={twitchIcon} className="translate-y-1" />}
          />
        </div>
      </Section>
    </>
  )
}

const Social = ({ otd, mit, logo }) => (
  <div className="flex items-center gap-8 text-3xl w-full">
    <div className="flex-1 text-right">{otd}</div>
    <div className="h-10 w-10 flex items-center justify-center opacity-50">
      {logo}
    </div>
    <div className="flex-1">{mit}</div>
  </div>
)

const Section = ({ className, children }) => (
  <AnimatePresence>
    <motion.div
      transition={{
        velocity: 0.2,
      }}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      className={clsx("bg-fabl-indigo-darker rounded-xl p-8 w-full", className)}
    >
      {children}
    </motion.div>
  </AnimatePresence>
)

const Commentator = ({ left, right }) => {
  const block = useCurrentBlock()
  let i
  if (left) i = 0
  if (right) i = 1

  return (
    <div className={clsx("flex flex-col gap-3 flex-1", left && "text-right")}>
      <div className="text-4xl text-[2.5rem] font-medium">
        {block.value[i].name}
      </div>
      <div
        className={clsx(
          "text-3xl flex items-baseline justify-end gap-4",
          right && "flex-row-reverse"
        )}
      >
        <div>{block.value[i].twitter}</div>
        <div className="self-stretch rounded-full w-1 bg-fabl-indigo-light"></div>
        <div className="text-fabl-pink font-semibold">
          {block.value[i].pronouns}
        </div>
      </div>
    </div>
  )
}

render(App)
