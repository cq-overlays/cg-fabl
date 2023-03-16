import render from "./render"
import clsx from "clsx"
import fablLogo from "./FABL_IconLogo.png"
import fablText from "./FABL_TextLogo.png"
import fablBg from "./FABL_bg.png"
import mitLogo from "./mit.webp"
import otdLogo from "./otd.svg"
import {
  useCurrentBlock,
  useCurrentBreakScreen,
  useCurrentFlavorText,
  useCurrentMapWinners,
  useCurrentRound,
  useCurrentScores,
  useCurrentTeams,
  useLoadedData,
} from "./replicants"
import { AnimatePresence, motion } from "framer-motion"
import { forwardRef, useEffect, useState } from "react"

const animateContainer = {
  hidden: {
    x: -20,
    opacity: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const animateSection = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
}

function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-fabl-indigo-dark">
      <Main />
      <motion.div
        initial={{ translateX: -398 * 3, translateY: -300 * 1 }}
        animate={{ translateX: 0, translateY: 0 }}
        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none opacity-[5%] bg-fabl-indigo-dark w-[400vw] h-[400vw]"
        style={{
          backgroundImage: `url('${fablBg}')`,
        }}
      />
    </div>
  )
}

const Main = () => {
  const screen = useCurrentBreakScreen()
  const block = useCurrentBlock()
  const text = useCurrentFlavorText()
  const round = useCurrentRound()
  const teams = useCurrentTeams()
  const scores = useCurrentScores()
  const mapWinners = useCurrentMapWinners()
  const data = useLeaderboard()
  const { maps } = useLoadedData()
  const page = getPage(screen)

  return (
    <div className="absolute inset-0 text-white flex flex-col items-center justify-evenly z-10">
      <HeadingSection
        left={
          screen === "brb" ? (
            <Title key="brb" />
          ) : (
            <Score key="!brb" name={teams[0].name} score={scores[0]} />
          )
        }
        right={
          screen === "brb" ? (
            <FlavorText key="brb" text={text} />
          ) : (
            <Score key="!brb" name={teams[1].name} score={scores[1]} reverse />
          )
        }
      />
      {screen === "brb" ? (
        <motion.div
          variants={animateContainer}
          key={screen}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col gap-8 w-full items-center"
        >
          <BreakSections
            left={<Commentator left comm={block.value[0]} />}
            right={<Commentator right comm={block.value[1]} />}
          />
        </motion.div>
      ) : (
        <motion.div
          variants={animateContainer}
          key={screen}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex items-center justify-center h-[36rem] w-full gap-8 p-12"
        >
          {screen === "maplist" &&
            round.value.map((game, i) => (
              <Section className="!w-60 h-full flex items-stretch rounded-xl !p-4 gap-4 flex-col">
                <div className="relative flex-1 rounded-lg bg-fabl-indigo-light flex items-center justify-center">
                  <motion.div
                    animate={{
                      filter: mapWinners?.[i]
                        ? "grayscale(75%) brightness(25%)"
                        : "grayscale(0) brightness(100%)",
                    }}
                    className="absolute inset-0 rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://sendou.ink/static-assets/img/stages/${
                        maps.indexOf(game.map) - 1
                      }.png')`,
                    }}
                  />
                  {maps.indexOf(game.map) - 1 < 0 && (
                    <span className="text-9xl font-bold">?</span>
                  )}
                  {mapWinners?.[i] && (
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-4xl font-medium">
                      <FadeText key={mapWinners[i]}>{mapWinners[i]}</FadeText>
                    </div>
                  )}
                </div>
                <div className="rounded-xl text-3xl h-28">
                  <div className="font-semibold">{game.mode}</div>
                  <div>{game.map}</div>
                </div>
              </Section>
            ))}
          {screen === "rosters" && (
            <>
              <Section
                className={clsx(
                  "flex-1 h-full max-w-xl w-full flex flex-col justify-between text-4xl",
                  "items-start"
                )}
              >
                {teams[0].data?.map((member) => (
                  <Member member={member} />
                ))}
              </Section>
              <motion.div
                variants={animateSection}
                className="text-8xl text-fabl-pink font-bold"
              >
                VS
              </motion.div>
              <Section
                className={clsx(
                  "flex-1 h-full max-w-xl w-full flex flex-col justify-between text-4xl",
                  "items-end"
                )}
              >
                {teams[1].data?.map((member) => (
                  <Member member={member} right />
                ))}
              </Section>
            </>
          )}
          {screen.startsWith("leaderboard") && data && (
            <>
              <Section
                key={"l" + screen}
                className={clsx(
                  "flex-1 h-full max-w-2xl flex flex-col justify-between text-4xl"
                )}
              >
                {data.slice(0 + page * 10, 5 + page * 10).map((v, i) => (
                  <Row
                    placement={i + 1 + page * 10}
                    key={i}
                    weapons={v.weapons}
                    name={v.splashtag}
                    points={v.points}
                  />
                ))}
              </Section>
              <span />
              <Section
                key={"l" + screen}
                className={clsx(
                  "flex-1 h-full max-w-2xl flex flex-col justify-between text-4xl"
                )}
              >
                {data.slice(5 + page * 10, 10 + page * 10).map((v, i) => (
                  <Row
                    placement={i + 6 + page * 10}
                    key={i}
                    weapons={v.weapons}
                    name={v.splashtag}
                    points={v.points}
                  />
                ))}
              </Section>
            </>
          )}
        </motion.div>
      )}
      <AnimatePresence mode="popLayout">
        {screen !== "brb" && (
          <BottomSection comms={<BottomComms block={block} />} />
        )}
      </AnimatePresence>
    </div>
  )
}

const getPage = (screen) => {
  let page = 0
  if (parseInt(screen.charAt(screen.length - 1)) > 0) {
    page = parseInt(screen.charAt(screen.length - 1)) - 1
  }
  return page
}

const BottomSection = forwardRef(({ comms }, ref) => (
  <Section
    ref={ref}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 20, opacity: 0 }}
    className="h-36 max-w-8xl flex items-center gap-8 text-3xl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-16 w-16 text-fabl-indigo-light"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
      />
    </svg>
    <div className="flex flex-col gap-3">{comms}</div>
    <div className="mx-auto" />
    <img src={fablText} className="h-full" />
  </Section>
))

const BottomComms = ({ block }) =>
  block.value.map((comm) => (
    <div className="flex items-center gap-4">
      <div className="text-4xl font-medium">{comm.name}</div>
      <div className="self-stretch shrink-0 rounded-full w-1 bg-fabl-indigo-light"></div>
      <div className="text-fabl-pink font-semibold">{comm.pronouns}</div>
      <div className="self-stretch shrink-0 rounded-full w-1 bg-fabl-indigo-light"></div>
      <div>{comm.twitter}</div>
    </div>
  ))

const Member = ({ right, member }) => (
  <div className={clsx("flex flex-col", right ? "items-end" : "items-start")}>
    <div className="font-medium">{member.splashtag}</div>
    <div className="flex gap-2">
      {member.weapons.map((weapon) => (
        <img
          src={`https://raw.githubusercontent.com/Sendouc/sendou.ink/rewrite/public/static-assets/img/main-weapons-outlined/${weapon.id}.png`}
          className="h-12"
        />
      ))}
    </div>
  </div>
)

const HeadingSection = ({ left, right }) => {
  return (
    <Section
      className="h-36 max-w-8xl flex items-center justify-center gap-8 py-0"
      layout
    >
      <AnimatePresence mode="wait">{left}</AnimatePresence>
      <div className="flex items-center justify-center -translate-y-3">
        <img src={fablLogo} className="h-full" />
      </div>
      <AnimatePresence mode="wait">{right}</AnimatePresence>
    </Section>
  )
}

const Title = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col gap-3 flex-1 items-end min-w-0"
  >
    <div className="inline-flex items-center text-5xl font-semibold">
      <span className="leading-none">Welcome to</span>
      <img src={fablText} className="ml-3 h-12" />
    </div>
    <div className="text-3xl">
      Learn more at{" "}
      <span className="text-fabl-pink font-semibold">fabl.otd.ink</span>
    </div>
  </motion.div>
)

const Score = ({ name, score, reverse }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={clsx(
      "flex gap-8 flex-1 w-full text-5xl justify-between items-center",
      reverse && "flex-row-reverse"
    )}
  >
    <div className="text-5xl font-semibold">
      <FadeText>{name}</FadeText>
    </div>
    <div className="text-5xl font-bold w-8 flex justify-center">
      <FadeText>{score}</FadeText>
    </div>
  </motion.div>
)

const FadeText = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.span
      key={children}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.span>
  </AnimatePresence>
)

const FlavorText = ({ text }) => {
  const [main, sub] = text.split("/")

  return (
    <motion.div
      className="flex flex-col gap-3 flex-1 items-start min-w-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="popLayout">
        {main && (
          <motion.div
            key="main"
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-5xl font-semibold"
          >
            <FadeText>{main}</FadeText>
          </motion.div>
        )}
        {sub && (
          <motion.div
            key="sub"
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-3xl"
          >
            <FadeText>{sub}</FadeText>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const BreakSections = ({ left, right }) => {
  return (
    <>
      <Section className="max-w-5xl flex items-center justify-center gap-4">
        {left}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-16 text-fabl-indigo-light"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
        {right}
      </Section>
      <Section className="max-w-5xl flex flex-col items-stretch gap-8">
        <div className="flex items-center gap-4 justify-center">
          <img
            src={otdLogo}
            className="rounded-full h-20 sm:h-24 w-20 sm:w-24"
            alt="OTD"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-16 text-fabl-indigo-light"
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
        <div className="flex flex-col items-center gap-6">
          <Social
            otd="otd.ink/discord"
            mit="discord.io/MullowayIT"
            logo={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                fill="currentColor"
                class="w-16 h-16"
              >
                <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
              </svg>
            }
          />
          <Social
            otd="@Off_The_Dial"
            mit="@MullowayIT"
            logo={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                class="w-10 h-10"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
            }
          />
          <Social
            otd="twitch.tv/OffTheDial"
            mit="twitch.tv/MullowayIT"
            logo={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <path d="M 5.3632812 2 L 2 6.6367188 L 2 20 L 7 20 L 7 23 L 10 23 L 13 20 L 17 20 L 22 15 L 22 2 L 5.3632812 2 z M 6 4 L 20 4 L 20 13 L 17 16 L 12 16 L 9 19 L 9 16 L 6 16 L 6 4 z M 11 7 L 11 12 L 13 12 L 13 7 L 11 7 z M 16 7 L 16 12 L 18 12 L 18 7 L 16 7 z" />
              </svg>
            }
          />
        </div>
      </Section>
    </>
  )
}

const Social = ({ otd, mit, logo }) => (
  <div className="flex items-center gap-8 text-3xl w-full">
    <div className="flex-1 text-right">{otd}</div>
    <div className="h-10 w-10 flex items-center justify-center text-fabl-indigo-light">
      {logo}
    </div>
    <div className="flex-1">{mit}</div>
  </div>
)

const Section = forwardRef(({ className, children, ...rest }, ref) => (
  <motion.div
    variants={animateSection}
    ref={ref}
    className={clsx("bg-fabl-indigo-darker rounded-xl p-8 w-full", className)}
    {...rest}
  >
    {children}
  </motion.div>
))

const Commentator = ({ left, right, comm }) => (
  <div
    className={clsx(
      "flex flex-col gap-3 flex-1 min-w-0",
      left && "items-end",
      right && "items-start"
    )}
  >
    <div className="text-4xl font-medium">
      <FadeText>{comm.name}</FadeText>
    </div>
    <div
      className={clsx(
        "text-3xl flex items-baseline justify-end gap-4",
        right && "flex-row-reverse"
      )}
    >
      <div>
        <FadeText>{comm.twitter}</FadeText>
      </div>
      <div className="self-stretch shrink-0 rounded-full w-1 bg-fabl-indigo-light"></div>
      <div className="text-fabl-pink font-semibold">
        <FadeText>{comm.pronouns}</FadeText>
      </div>
    </div>
  </div>
)

const Row = ({ placement, name, weapons, points }) => {
  return (
    <div className="flex gap-8 items-center text-4xl max-w-3xl mx-auto w-full justify-between">
      <div
        className={`shrink-0 font-mono text-center text-4xl font-black text-fabl-indigo-light ${
          placement <= 1
            ? "!text-fabl-gold"
            : placement <= 3
            ? "!text-fabl-pink"
            : ""
        }`}
      >
        {placement}
      </div>
      <div className="flex-1 truncate flex items-center gap-3">
        <span>{name}</span>
        <div className="flex shrink-0 items-center gap-1">
          {weapons.map((weapon) => (
            <img
              key={weapon.id}
              src={`https://raw.githubusercontent.com/Sendouc/sendou.ink/rewrite/public/static-assets/img/main-weapons-outlined/${weapon.id}.png`}
              className="h-12 shrink-0"
            />
          ))}
        </div>
      </div>
      <span className="font-bold font-mono">
        {Object.values(points).reduce((a, b) => a + b, 0)}
        <span className="font-sans">p</span>
      </span>
    </div>
  )
}

const useLeaderboard = () => {
  const [data, setData] = useState()

  useEffect(() => {
    fetch(
      "https://us-central1-off-the-dial-26e93.cloudfunctions.net/fabl-standings"
    )
      .then((res) => {
        if (res.ok) return res.json()
      })
      .then((data) => setData(data))
  }, [])

  return data
}

render(App)
