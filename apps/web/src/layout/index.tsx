import { PropsWithChildren } from "react";
import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import { useSession } from "../hooks/useSession";
import { AddressProvider } from "../hooks/useAddress";

const Layout: React.FC<PropsWithChildren> = (props) => {
  const { client: session } = useSession();

  const { children } = props;

  const layout = (
    <Box>
      <Navbar />
      <Container sx={{ marginTop: 4 }}>{children}</Container>
    </Box>
  );

  if (!session) {
    return layout;
  }

  return (
    <AddressProvider address={session.addresses[0]}>{layout}</AddressProvider>
  );
};

export default Layout;
