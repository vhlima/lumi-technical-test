import { useSession } from "../../../../hooks/useSession";
import { Box, Divider, Typography } from "@mui/material";

const ClientSection: React.FC = () => {
  const { client: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5">Welcome {session.fullName}</Typography>
      <Typography sx={{ color: "text.secondary" }} gutterBottom>
        Here you can find out more about your expenses and invoices uploaded to
        our system.
      </Typography>

      <Divider />
    </Box>
  );
};

export default ClientSection;
