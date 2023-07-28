import { Box, Divider, SxProps, Theme, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
  sx?: SxProps<Theme>;
  title: string;
  description?: string;
  disableMargin?: boolean;
  disableGutter?: boolean;
}

export const SectionTitle: React.FC<PropsWithChildren<Props>> = (props) => {
  const { sx, title, description, disableMargin, disableGutter, children } =
    props;
  return (
    <>
      <Box
        sx={{
          ...(!disableMargin ? { marginTop: 4 } : {}),
          ...sx,
        }}
      >
        <Typography sx={{ color: "text.primary" }} variant="h5" gutterBottom={!description && !disableGutter}>
          {title}
        </Typography>

        {description && (
          <Typography
            sx={{ color: "text.secondary" }}
            gutterBottom={!disableGutter}
          >
            {description}
          </Typography>
        )}

        {children}
      </Box>

      <Divider />
    </>
  );
};
