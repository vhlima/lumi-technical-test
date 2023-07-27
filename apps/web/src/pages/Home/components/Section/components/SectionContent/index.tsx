import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
  disableMargin?: boolean;
}

export const SectionContent: React.FC<PropsWithChildren<Props>> = (props) => {
  const { disableMargin, children } = props;
  return <Box sx={{
    ...(!disableMargin ? { marginTop: 2 } : {})
  }}>{children}</Box>;
};
