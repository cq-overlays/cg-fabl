import render from "./render"
import clsx from "clsx"
import fablLogo from "./FABL_IconLogo.png"
import fablText from "./FABL_TextLogo.png"
import mitLogo from "./mit.webp"
import otdLogo from "./otd.svg"
import twitchIcon from "./twitch.png"
import discordIcon from "./discord.png"
import twitterIcon from "./twitter.png"
import { useCurrentBreakScreen } from "./replicants"

function App() {
  const screen = useCurrentBreakScreen()

  return (
    <div class="relative bg-otd-slate h-screen w-screen bg-fabl-indigo-dark text-white">
      {screen === "brb" && (
        <div className="flex flex-col gap-16 h-full w-full items-center justify-center">
          <CommsSection />
          <BreakSections />
          <img src={fablText} className="h-20 -mb-8" />
        </div>
      )}
      <div className="h-full w-full flex flex-col justify-end">
        {screen === "rosters" && <RostersSection />}
        {screen !== "brb" && (
          <div className="flex items-end justify-between flex-row-reverse gap-8 m-8">
            <div className="grow h-36 flex items-center justify-center">
              <img src={fablText} className="h-24" />
            </div>
            <div className="self-center grow">
              <CommsSection sm />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const RostersSection = () => (
  <div className="flex gap-16 h-full items-center justify-center">
    <Roster />
    <div className="text-8xl text-fabl-gold font-bold">VS</div>
    <Roster right />
  </div>
)

const Roster = ({ right }) => (
  <Section
    className={clsx(
      "w-full aspect-square max-w-xl flex flex-col gap-8",
      right && "text-right"
    )}
  >
    <div className="text-5xl font-bold">Team Name Here</div>
    <ul className="text-4xl">
      <li>ヨホ • TheMoo#2868</li>
      <li>ヨホ • TheMoo#2868</li>
      <li>ヨホ • TheMoo#2868</li>
      <li>ヨホ • TheMoo#2868</li>
    </ul>
  </Section>
)

const CommsSection = ({ sm }) => (
  <Section className="h-36 max-w-[1440px] flex items-center justify-center gap-8 p-4">
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

const BreakSections = () => (
  <>
    <Section className="max-w-5xl flex flex-col items-center justify-center gap-4">
      <div className="text-5xl font-bold text-fabl-gold">Up Next</div>
      <div className="text-4xl">The Flying Dutchman vs Chew It's Mafia</div>
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

const Social = ({ otd, mit, logo }) => (
  <div className="flex items-center gap-8 text-3xl w-full">
    <div className="flex-1 text-right">{otd}</div>
    <div className="h-10 w-10 flex items-center justify-center">{logo}</div>
    <div className="flex-1">{mit}</div>
  </div>
)

const Section = ({ className, children }) => (
  <div
    className={clsx("bg-fabl-indigo-darker rounded-xl p-8 w-full", className)}
  >
    {children}
  </div>
)

const Commentator = ({ left, right }) => (
  <div className={clsx("flex flex-col gap-3", left && "text-right")}>
    <div className="text-4xl text-[2.5rem] font-medium">Commentator 1</div>
    <div
      className={clsx(
        "text-3xl flex items-baseline gap-4",
        right && "flex-row-reverse"
      )}
    >
      <div>@commtwitter</div>
      <div className="self-stretch rounded-full w-1 bg-fabl-indigo-light"></div>
      <div className="text-fabl-pink font-semibold">they/them</div>
    </div>
  </div>
)

render(App)
