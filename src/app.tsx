import { useState } from "preact/hooks";
import "./app.css";
import { CallingCard } from "./components/calling-card";
import { ProjectList } from "./components/project-list";
import { TermCursor, TermPrompt } from "./components/term-prompt";
import { isReducedMotionPreferred } from "./hooks/prefers-reduced-motion";

export function App() {
  const isAnimationDisabled = isReducedMotionPreferred() || localStorage.getItem('front_page_anim') === '1'
  const [visibleSection, setVisibleSection] = useState<Array<'card' | 'list'>>([])
  const markAnimationAsPlayed = () => {
    localStorage.setItem('front_page_anim', '1')
  }

  return (
    <main className="page">
      {isAnimationDisabled ?
        (
          <div className="console page__container">
            <TermPrompt isAnimDisabled={true}>pwd</TermPrompt>
            <CallingCard />
            <TermPrompt isAnimDisabled={true}>ls projects</TermPrompt>
            <ProjectList />
            <TermCursor />
          </div>
        ) : (
          <div className="console page__container">
            <TermPrompt delay={1500} onAnimationEnd={() => setVisibleSection(['card'])}>pwd</TermPrompt>
            {visibleSection.includes('card') && <CallingCard />}
            {visibleSection.includes('card') && <TermPrompt delay={1500} onAnimationEnd={() => {
              setVisibleSection(['card', 'list'])
              markAnimationAsPlayed()
            }}>ls ~/projects</TermPrompt>}

            {visibleSection.includes('list') && <ProjectList />}
            {visibleSection.includes('list') && <TermCursor />}
          </div>
        )}
    </main>
  );
}
