// AppLayout.js
import React, { Suspense, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Grid,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../auth/Navbar";
import Footer from "./Footer";
import AppPages from "./AppPages";

function AppLayout() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const renderList = () => (
    <List>
      {AppPages?.map(({ path: pagePath, name, Icon }) => {
        const to = pagePath === "" ? "/" : `/${pagePath}`;
        return (
          <ListItem
            button
            key={pagePath}
            component={Link}
            className={activeLink === to ? "active" : "nav-link"}
            to={pagePath}
          >
            <ListItemText primary={name} />
          </ListItem>
        );
      })}
    </List>
  );

  const renderIconGrid = () => (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {AppPages?.map(({ path: pagePath, name, Icon }) => (
        <Grid item key={pagePath}>
          <Tooltip title={name}>
            <IconButton
              component={Link}
              to={pagePath}
              className={activeLink === `/${pagePath}` ? "active" : "nav-link"}
            >
              <Icon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box className="app-container">
      <Navbar className="navbar" />
      <Box className="app-body">
        <Box className="sidebar">
          {matches ? renderIconGrid() : renderList()}
        </Box>
        <Box className="main-content">
          <Suspense
            fallback={
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
              >
                <CircularProgress />
              </Box>
            }
          >
            <Outlet />
          </Suspense>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default AppLayout;
