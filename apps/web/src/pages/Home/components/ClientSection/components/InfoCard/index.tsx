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
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Icon sx={{ color: "grey.600" }} fontSize="large" />

          <Stack sx={{ marginLeft: 2 }}>
            <Typography variant="h6" data-testid="info-card-title">
              {title}
            </Typography>

            {description && (
              <Typography
                color="text.secondary"
                data-testid="info-card-description"
              >
                {description}
              </Typography>
            )}
          </Stack>
        </Box>

        <Typography
          variant="h5"
          sx={{ marginTop: 2, textAlign: "center", marginLeft: "auto" }}
          data-testid="info-card-value"
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
