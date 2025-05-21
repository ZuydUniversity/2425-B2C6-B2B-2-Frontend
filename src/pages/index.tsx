import styles from "./index.module.scss";
import { FC } from "react";

/**
 * Homepage component.
 */
const Home: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Hello, World!</h1>
      <h1 className={styles.title}>This is a test page!</h1>
      <h1 className={styles.title}>Isn't it amazing that we have to learn a whole new language for the last term 0.0</h1>
    </div>
  );
};

export default Home;
