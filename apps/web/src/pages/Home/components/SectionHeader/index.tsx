import { Box, Divider, Stack, Typography } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

interface Props {
  title: string;
  header?: ReactNode;
}

const SectionHeader: React.FC<PropsWithChildren<Props>> = (props) => {
  const { title, header, children } = props;

  return (
    <Box sx={{ marginTop: 4 }}>
      <Stack direction={{ md: "row" }} sx={{ alignItems: "center" }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        {header && header}
      </Stack>
      <Divider />

      {children}
    </Box>
  );
};

export default SectionHeader;
