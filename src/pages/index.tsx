import styles from "./index.module.scss";
import { FC } from "react";

/**
 * Homepage component.
 */
const Home: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Bye, World!</h1>
      <h1 className={styles.title}>This is a testing test nightmare!</h1>
    </div>
  );
};

export default Home;
