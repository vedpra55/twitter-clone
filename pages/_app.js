import "../styles/globals.css";

import { AuthStateContext } from "../context/authContext";

import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <AuthStateContext>
      <Toaster />
      <Component {...pageProps} />;
    </AuthStateContext>
  );
}

export default MyApp;
