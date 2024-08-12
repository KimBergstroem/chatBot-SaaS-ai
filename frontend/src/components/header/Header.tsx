import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../shared/Logo";
import { useAuth } from "../../context/AuthContext";
import NavLink from "../shared/NavLink";
import { Box } from "@mui/material";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            alignItems: "center",
          }}>
          {auth?.isLoggedIn ? (
            <>
              <NavLink bg="#F88379" to="/chat" text="Chat" textColor="white" />
              <NavLink
                bg="#fff"
                to="/"
                text="Logout"
                textColor="black"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavLink
                bg="#F88379"
                to="/login"
                text="Login"
                textColor="white"
              />
              <NavLink bg="#fff" to="/signup" text="Signup" textColor="black" />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
