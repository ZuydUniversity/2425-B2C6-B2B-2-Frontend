import styles from "./index.module.scss";
import {FC} from "react";

const Home: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Hello, World!</h1>
    </div>
  );
}

export default Home;
