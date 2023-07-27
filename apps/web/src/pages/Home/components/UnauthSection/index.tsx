import { Box, Typography } from "@mui/material";

export const UnauthSection: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5">
        Welcome to our platform! Begin your journey by uploading your first
        invoice.
      </Typography>
      <Typography sx={{ color: "text.secondary" }} gutterBottom>
        If no user is available at switch accounts, you will need to upload your
        first invoice. After uploading your first invoice you should be
        automatically sign in.
      </Typography>
    </Box>
  );
};

export default UnauthSection;
