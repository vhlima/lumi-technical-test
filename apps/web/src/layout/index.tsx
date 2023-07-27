import { PropsWithChildren } from "react";
import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar";

const Layout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <Box>
      <Navbar />
      <Container sx={{ marginTop: 4 }}>{children}</Container>
    </Box>
  );
};

export default Layout;
