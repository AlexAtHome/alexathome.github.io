import { FunctionalComponent } from "preact";
import { Github } from "react-bootstrap-icons";

export const CallingCard: FunctionalComponent = () =>
	<div className="console__output">
		<picture>
			<source srcset="pfp.png, pfp-2x.png 2x" type="image/png" />
			<img
				src="pfp.avif"
				srcset="pfp-2x.avif 2x"
				className="console__image"
				loading="lazy"
				type="image/avif"
				alt="Me"
			/>
		</picture>
		<h1 aria-label="Alexander Bolotskov">
			<span aria-hidden="true">/home/</span>Alexander Bolotskov
		</h1>
		<p>
			I do frontend for living and also for fun sometimes. I specialise on
			Angular framework, but I also use React in my pet projects.
		</p>
		<nav>
			<ul className="console__list">
				<li>
					<Github aria-label="Github" />
					&nbsp;
					<a rel="nofollow" href="https://github.com/AlexAtHome">
						AlexAtHome
					</a>
				</li>
			</ul>
		</nav>
	</div>
