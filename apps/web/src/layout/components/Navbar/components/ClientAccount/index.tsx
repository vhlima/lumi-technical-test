import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { useSession } from "../../../../../hooks/useSession";

const ClientAccount: React.FC = () => {
  const { signOut } = useSession();

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement>();

  const handleClose = () => {
    setAnchorElUser(undefined);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          size="large"
          color="inherit"
          onClick={(e) => setAnchorElUser(e.currentTarget)}
          data-testid="client-account-button"
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>

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
        data-testid="client-account-menu"
      >
        <MenuItem
          onClick={() => {
            signOut();
            handleClose();
          }}
          data-testid="sign-out-button"
        >
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default ClientAccount;
