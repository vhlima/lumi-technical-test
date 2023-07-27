import { PropsWithChildren } from "react";
import { Box, Container, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import lightTheme from "../theme/light";

const Layout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={lightTheme}>
      <Box>
        <Navbar />
        <Container sx={{ marginTop: 4 }}>{children}</Container>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
