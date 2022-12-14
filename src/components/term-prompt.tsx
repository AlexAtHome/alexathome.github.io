import { FunctionComponent } from "preact";

export const TermPrompt: FunctionComponent = ({ children }) =>
	<code className="console__prompt" aria-hidden="true">{children}</code>

export const TermCursor: FunctionComponent = () =>
	<code className="console__prompt console__prompt_cursor" aria-hidden="true"></code>
