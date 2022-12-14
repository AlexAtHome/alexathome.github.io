import { useState } from "preact/hooks";
import "./app.css";
import { CallingCard } from "./components/calling-card";
import { ProjectList } from "./components/project-list";
import { TermCursor, TermPrompt } from "./components/term-prompt";
import { isReducedMotionPreferred } from "./hooks/prefers-reduced-motion";

export function App() {
	const isAnimationDisabled = isReducedMotionPreferred()
	const [visibleSection, setVisibleSection] = useState<Array<'card' | 'list'>>([])
	if (isAnimationDisabled && !visibleSection.length) {
		setVisibleSection(['card', 'list'])
	}
	return (
		<main className="page">
			<div className="console page__container">
				<TermPrompt delay={1500} onAnimationEnd={() => setVisibleSection(['card'])}>pwd</TermPrompt>
				{visibleSection.includes('card') && <CallingCard />}
				{visibleSection.includes('card') && <TermPrompt delay={1500} onAnimationEnd={() => setVisibleSection(['card' ,'list'])}>ls ~/projects</TermPrompt>}

				{visibleSection.includes('list') && <ProjectList />}
				{visibleSection.includes('list') && <TermCursor />}
			</div>
		</main>
	);
}
