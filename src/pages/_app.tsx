import {Provider} from "react-redux";
import store from "../redux/store";
import {FC} from "react";
import {AppProps} from "next/app";

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <main>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
};

export default App;
