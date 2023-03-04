import Head from "next/head";
import { VariablePreview } from "../components/VariablePreview";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Flex Enough</title>
        <meta name="description" content="Roboto Flex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <VariablePreview text="Hello World" />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
