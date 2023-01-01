import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dolu</title>
        <meta name="description" content="Dolu's homepage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div>
          <h1>Dolu</h1>
          <small>temporary homepage</small>
        </div>

        <ul className={styles.links}>
          <li className={styles.link}>
            <a href="https://github.com/dolu89">Github</a>
          </li>
          <li className={styles.link}>
            <a href="https://twitter.com/dolu_web">Twitter</a>
          </li>
          <li className={styles.link}>
            <a href="https://blog.dolu.dev">Blog</a>
          </li>
        </ul>

        <div>
          I'm a fullstack web developer in freelance, with a preference for backend
          development. I primarily work on open source applications for Bitcoin/Lightning
          network, and Nostr.
        </div>

        <h2>My main projects</h2>
        <ul>
          <li className={styles.project}>
            <a href="https://zerologin.co">Zerologin.co</a> a passwordless
            authentication server (using LNURL-auth)
          </li>
          <li className={styles.project}>
            <a href="https://bips.xyz">Bips.xyz</a> the easiest way to view and
            share BIPs
          </li>
          <li className={styles.project}>
            <a href="https://github.com/blc-org/una">Una</a> Universal
            (Lightning) Node Api
          </li>
          <li className={styles.project}>
            <a href="https://github.com/blc-org/una-connect">Una-connect</a>{" "}
            Connect any application to your LN node without disclosing your
            credentials
          </li>
          <li className={styles.project}>
            <a href="https://github.com/dolu89/ligess">Ligess</a> personal
            Lightning address server
          </li>
        </ul>

        <h2>Contact</h2>
        <div>
          <div>
            <a href="https://twitter.com/dolu_web">Twitter @Dolu_web</a>
          </div>
          <div>
            Nostr
            59b96df8d8b5e66b3b95a3e1ba159750a6edd69bcbba1857aeb652a5b208bd59
          </div>
        </div>
      </main>
    </>
  );
}
