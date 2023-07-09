import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import InputBase from "@mui/material/InputBase";
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("session");
    navigate("/login");
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <Button variant="light" onClick={handleLogout}>
          <LogoutIcon  /> LOG OUT
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
