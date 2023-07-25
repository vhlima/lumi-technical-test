import {
  Typography,
  Card,
  CardContent,
  Stack,
  SvgIconTypeMap,
  Box,
} from "@mui/material";

import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  title: string;
  description?: string;
  value: string;
}

const InfoCard: React.FC<Props> = (props) => {
  const { icon: Icon, title, value, description } = props;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Icon fontSize="large" />

          <Stack sx={{ marginLeft: 2 }}>
            <Typography variant="h6">{title}</Typography>

            {description && (
              <Typography color="text.secondary">{description}</Typography>
            )}
          </Stack>
        </Box>

        <Typography
          variant="h5"
          sx={{ marginTop: 2, textAlign: "center", marginLeft: "auto" }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
