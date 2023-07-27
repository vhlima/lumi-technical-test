import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export const SectionRoot: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <Box sx={{ marginTop: 4 }}>{children}</Box>;
};
