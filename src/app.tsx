import { Github, TextParagraph, Reddit, Keyboard } from "react-bootstrap-icons";
import "./app.css";
import { CallingCard } from "./components/calling-card";
import { ProjectList } from "./components/project-list";
import { TermCursor, TermPrompt } from "./components/term-prompt";

export function App() {
	return (
		<main className="page">
			<div className="console page__container">
				<TermPrompt>pwd</TermPrompt>
				<CallingCard />

				<TermPrompt>ls ~/projects</TermPrompt>
				<ProjectList />

				<TermCursor />
			</div>
		</main>
	);
}
