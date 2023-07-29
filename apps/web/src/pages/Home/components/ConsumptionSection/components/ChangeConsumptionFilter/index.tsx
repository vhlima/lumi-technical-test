import { SortRounded } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  filters: Record<string, { label: string }>;
  onChange: (filter: string) => void;
}

export const ChangeConsumptionFilter: React.FC<Props> = (props) => {
  const { filters, onChange } = props;

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement>();

  const handleClose = () => {
    setAnchorElUser(undefined);
  };

  return (
    <Box sx={{ marginLeft: { md: "auto" } }}>
      <Button
        fullWidth
        variant="contained"
        startIcon={<SortRounded />}
        onClick={(e) => setAnchorElUser(e.currentTarget)}
        data-testid="consumption-filter-button"
      >
        Change sort
      </Button>

      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={!!anchorElUser}
        onClose={handleClose}
        data-testid="consumption-filter-dropdown"
      >
        {Object.entries(filters).map(([key, filter]) => (
          <MenuItem
            key={`consumption-filter-${filter.label}`}
            onClick={() => {
              onChange(key);
              handleClose();
            }}
          >
            <Typography textAlign="center">{filter.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ChangeConsumptionFilter;
