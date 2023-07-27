import { PropsWithChildren } from "react";
import { Box, Container, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import lightTheme from "../theme/light";
import { SessionProvider } from "../hooks/useSession";

const Layout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={lightTheme}>
      <SessionProvider>
        <Box>
          <Navbar />
          <Container sx={{ marginTop: 4 }}>{children}</Container>
        </Box>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Layout;
