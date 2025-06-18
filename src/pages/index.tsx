import styles from "./index.module.scss";
import { FC } from "react";
import Link from "next/link";
import { pagesList } from "../data/pageslist"; // Import the pages list

// list with all pages.
const pages = pagesList;

/**
 * Homepage component.
 */
const Home: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welkom op de Startpagina</h1>
      <div className={styles.list}>
        {pages.map((page) => (
          <Link key={page.name} href={page.href} className={styles.linkItem}>
            <div className={styles.circle}></div>
            <span>{page.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;


