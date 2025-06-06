import styles from "./index.module.scss";
import { FC } from "react";
import TextField from "../components/TextField";
import { useFormik } from "formik";

/**
 * Homepage component.
 */
const Home: FC = () => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Bye, World!</h1>
      <h1 className={styles.title}>This is a testing test nightmare!</h1>
      <TextField
        label={"Gebruikersnaam"}
        name={"username"}
        value={values.username}
        onChange={handleChange}
      />
    </form>
  );
};

export default Home;
