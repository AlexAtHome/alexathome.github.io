import { Github, TextParagraph, Reddit, Keyboard } from "react-bootstrap-icons";
import "./app.css";

export function App() {
  return (
    <main className="page">
      <div className="console page__container">
        <code className="console__prompt" aria-hidden="true">
          pwd
        </code>
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
        <code className="console__prompt" aria-hidden="true">
          ls ~/projects
        </code>
        <div className="console__output" aria-label="My projects">
          <ul className="console__list">
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
          </ul>
        </div>
        <code
          aria-hidden="true"
          className="console__prompt console__prompt_cursor"
        ></code>
      </div>
    </main>
  );
}
