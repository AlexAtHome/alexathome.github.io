import { FunctionalComponent } from "preact";
import { Braces, Controller, Keyboard, Reddit, TextParagraph } from "react-bootstrap-icons";

export const ProjectList: FunctionalComponent = () =>
	<div className="console__output" aria-label="My projects">
		<ul className="console__list">
			<li>
				<Braces />
				&nbsp;
				<a
					rel="nofollow"
					target="_blank"
					href="https://AlexAtHome.github.io/json"
				>
					JSON Format tool
				</a>
			</li>
			<li>
				<TextParagraph />
				&nbsp;
				<a
					rel="nofollow"
					target="_blank"
					href="https://AlexAtHome.github.io/speech-code"
				>
					Soviet-style text generator
				</a>
			</li>
			<li>
				<Reddit />
				&nbsp;
				<a
					rel="nofollow"
					target="_blank"
					href="https://npmjs.com/package/random-reddit"
				>
					random-reddit npm package
				</a>
			</li>
			<li>
				<Keyboard />
				&nbsp;
				<a
					rel="nofollow"
					target="_blank"
					href="https://AlexAtHome.github.io/keycap"
				>
					keycap - keyboard test web application
				</a>
			</li>
			<li>
				<Controller />
				&nbsp;
				<a
					rel="nofollow"
					target="_blank"
					href="https://AlexAtHome.github.io/minecraft-steve"
				>
          [WIP] 3D model of Steve from Minecraft  in pure CSS
				</a>
			</li>
		</ul>
	</div>
