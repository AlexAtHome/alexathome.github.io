import { FunctionComponent } from "preact";
import clsx from "clsx";
import { useRef } from "preact/hooks";
import { useTypeWriter } from "../hooks/typewriter";

interface Props {
	onAnimationEnd?: () => void
	delay?: number
  isAnimDisabled?: boolean
}

export const TermPrompt: FunctionComponent<Props> = ({ onAnimationEnd, delay, children, isAnimDisabled }) => {
	const promptRef = useRef<HTMLElement>(null)
  const css = clsx({
    'console__prompt': true,
    'console__prompt_cursor': !isAnimDisabled,
  })
	const onEnd = () => {
		onAnimationEnd?.()
		promptRef.current?.classList.remove('console__prompt_cursor')
	}
	const output = isAnimDisabled ? `${children}` : useTypeWriter({ text: `${children}`, onEnd, delay })
	return <code className={css} ref={promptRef} aria-hidden="true">{output}</code>
}

export const TermCursor: FunctionComponent = () =>
	<code className="console__prompt console__prompt_cursor" aria-hidden="true"></code>

