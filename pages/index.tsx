import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect } from "react";
import Nav from "../components/nav";

const Home: NextPage = () => {
  useEffect(() => {
    axios.get("http://localhost:8080/photography/all").then((response) => {
      console.log(response);
    });
  });

  return (
    <div className={styles.container}>
      <Nav />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <Link href="/photography">Photographers</Link>
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  );
};

export default Home;
