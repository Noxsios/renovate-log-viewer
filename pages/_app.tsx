import "@fontsource/fira-code";
import "@fontsource/montserrat";
import "@fontsource/recursive";
import "../styles/globals.css";
import theme from "../styles/theme";
import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <NotificationsProvider position="top-right">
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
