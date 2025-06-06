import { ChangeEvent, FC, useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./TextField.module.scss";
import c from "classnames";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: FC<Props> = (props) => {
  const [identity] = useState(() => uuid());
  const [isInFocus, changeIsInFocus] = useState(false);

  return (
    <div className={styles.wrapper}>
      <label htmlFor={identity}>
        {props.label}
        <input
          id={identity}
          className={styles.input}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onFocus={() => changeIsInFocus(true)}
          onBlur={() => changeIsInFocus(false)}
        />
      </label>
      <div className={styles.underline_wrapper}>
        <div
          className={c(styles.underline, {
            [styles.underline_activated]: isInFocus,
          })}
        />
      </div>
    </div>
  );
};

export default TextField;
