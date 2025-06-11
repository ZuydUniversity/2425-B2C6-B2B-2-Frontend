import Link from "next/link";
import styles from "./navbar.module.scss";
import { pagesList } from "../data/pageslist"; // Import the pages list

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftGroup}>
        <span className={styles.logo}>Logo</span>
        <Link href="/" className={styles.linkButton}>
          Startpagina
        </Link>
        <div className={styles.separator}></div>
        <div className={styles.dropdown}>
          <span className={styles.link}>
            Overzichten <span className={styles.arrow}>▼</span>
          </span>
          <ul className={styles.dropdownMenu}>
            {pagesList.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className={styles.dropdownLink}>
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link href="/" /*href="/login"*/ className={styles.loginLink}>
        Inloggen
      </Link>
    </nav>
  );
};

export default Navbar;
