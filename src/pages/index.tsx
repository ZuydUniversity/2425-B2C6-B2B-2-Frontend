import TestComponent from "../components/TestComponent";
import styles from "./index.module.scss";
import { FC } from "react";

/**
 * Homepage component.
 */
const Home: FC = () => {
  return (
    <div className={styles.wrapper}>
      <TestComponent />
      <h1 className={styles.title}>Hello, World </h1>
      <h1 className={styles.title}>This is a testing nightmare!</h1>
    </div>
  );
};

export default Home;
