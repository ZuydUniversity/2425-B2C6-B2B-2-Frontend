import Link from "next/link";
import styles from "./Navbar.module.scss";
import { pagesList } from "../data/pageslist";
import { FC, useState } from "react"; // Import the pages list

const Navbar: FC = () => {
  const [dropdownHover, setDropdownHover] = useState(false);
  const [listHover, setListHover] = useState(false);

  /**
   * OR gate between the dropdown container being hovered and the dropdown
   * list being hovered
   */
  const isDropdownVisible = dropdownHover || listHover;

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftGroup}>
        <span className={styles.logo}>Logo</span>
        <Link href="/" className={styles.linkButton}>
          Startpagina
        </Link>
        <div className={styles.separator}></div>
        <div
          className={styles.dropdown}
          data-testid={"dropdown"}
          onMouseEnter={() => setDropdownHover(true)}
          onMouseLeave={() => setDropdownHover(false)}
          onFocus={() => setDropdownHover(true)}
          onBlur={() => setDropdownHover(false)}
        >
          <span className={styles.link}>
            Overzichten <span className={styles.arrow}>▼</span>
          </span>
          {isDropdownVisible && (
            <ul
              className={styles.dropdownMenu}
              data-testid={"dropdownMenu"}
              onMouseEnter={() => setListHover(true)}
              onMouseLeave={() => setListHover(false)}
              onFocus={() => setListHover(true)}
              onBlur={() => setListHover(false)}
            >
              {pagesList.map((page) =>
                page ? (
                  <li key={page.href}>
                    <Link href={page.href} className={styles.dropdownLink}>
                      {page.name}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          )}
        </div>
      </div>
      <Link href="/" /*href="/login"*/ className={styles.loginLink}>
        Inloggen
      </Link>
    </nav>
  );
};

export default Navbar;
