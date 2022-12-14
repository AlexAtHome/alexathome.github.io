import { FunctionComponent } from "preact";
import { useRef } from "preact/hooks";
import { isReducedMotionPreferred } from "../hooks/prefers-reduced-motion";
import { useTypeWriter } from "../hooks/typewriter";

interface Props {
	onAnimationEnd?: () => void
	delay?: number
}

export const TermPrompt: FunctionComponent<Props> = ({ onAnimationEnd, delay, children }) => {
	const promptRef = useRef<HTMLElement>(null)
	const onEnd = () => {
		onAnimationEnd?.()
		promptRef.current?.classList.remove('console__prompt_cursor')
	}
	const output = isReducedMotionPreferred() ? `${children}` : useTypeWriter({ text: `${children}`, onEnd, delay })
	return <code className="console__prompt console__prompt_cursor" ref={promptRef} aria-hidden="true">{output}</code>
}

export const TermCursor: FunctionComponent = () =>
	<code className="console__prompt console__prompt_cursor" aria-hidden="true"></code>
