import "normalize.css"; // Use normalize.css to make styling more reliable
import {Provider} from "react-redux";
import store from "../redux/store";
import {FC} from "react";
import {AppProps} from "next/app";

/**
 * Default app component. This component renders and wraps around every page.
 * Includes normalize.css and the Redux store.
 */
const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
        {/* Wrapping the main content of the page in a main block improves accessibility */}
      <main>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
};

export default App;
