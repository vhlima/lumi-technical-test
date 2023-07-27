import { PropsWithChildren } from "react";
import { SessionProvider } from "./useSession";
import { ThemeProvider } from "@mui/material";
import lightTheme from "../theme/light";

export const GlobalHooks: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={lightTheme}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};
