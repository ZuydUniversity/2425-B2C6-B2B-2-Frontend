import "normalize.css"; // Use normalize.css to make styling more reliable
import { Provider } from "react-redux";
import store from "../redux/store";
import { FC } from "react";
import { AppProps } from "next/app";
import Layout from '../components/Layout';

/**
 * Default app component. This component renders and wraps around every page.
 * Includes normalize.css and the Redux store.
 */
const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
