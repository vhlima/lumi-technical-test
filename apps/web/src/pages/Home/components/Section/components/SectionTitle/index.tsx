import { Box, Divider, SxProps, Theme, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
  sx?: SxProps<Theme>;
  title: string;
  description?: string;
  disableMargin?: boolean;
}

export const SectionTitle: React.FC<PropsWithChildren<Props>> = (props) => {
  const { sx, title, description, disableMargin, children } = props;
  return (
    <>
      <Box
        sx={{
          ...(!disableMargin ? { marginTop: 4 } : {}),
          ...sx,
        }}
      >
        <Typography variant="h5" gutterBottom={!description}>
          {title}
        </Typography>

        {description && (
          <Typography sx={{ color: "text.secondary" }} gutterBottom>
            {description}
          </Typography>
        )}

        {children}
      </Box>
      
      <Divider />
    </>
  );
};
