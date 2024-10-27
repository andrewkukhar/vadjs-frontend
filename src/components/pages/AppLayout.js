import React, { Suspense, useState, useEffect } from "react";
import { useParams, Link, useLocation, Route, Routes } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Grid,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DJProfileDetails from "../djs/DJProfileDetails";
import UserProfile from "../users/DJUserProfile";
import AppPages from "./AppPages";
import { CircularProgress } from "@mui/material";
import HomePage from "./Home";
import Navbar from "../auth/Navbar";
import Footer from "./Footer";

const Signup = React.lazy(() => import("../auth/Signup"));
const Login = React.lazy(() => import("../auth/Login"));

function AppLayout() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const DJProfileComponent = () => {
    const { djId } = useParams();
    const [dj, setDj] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      async function fetchDJ() {
        try {
          setIsLoading(true);
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/djs/public/${djId}`
          );
          const data = await response.json();
          if (data.msg) {
            console.log(data.msg);
            throw new Error(data.msg);
          }
          if (!response.ok) {
            throw new Error(`Failed to fetch DJ. Status: ${response.status}`);
          }
          setDj(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchDJ();
    }, [djId]);

    if (!dj)
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      );
    if (dj.error) return <p>DJ not found</p>;
    return <DJProfileDetails dj={dj} isLoading={isLoading} />;
  };

  const renderList = () => (
    <List>
      {AppPages?.map(({ path: pagePath, name, Icon }) => (
        <ListItem
          button
          key={pagePath}
          component={Link}
          className={activeLink === pagePath ? "active" : "nav-link"}
          to={pagePath}
        >
          <ListItemText primary={name} />
        </ListItem>
      ))}
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
              className={activeLink === pagePath ? "active" : "nav-link"}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <CircularProgress />
              </div>
            }
          >
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              {AppPages.map(({ path: pagePath, Component }) => (
                <Route key={pagePath} path={pagePath} element={<Component />} />
              ))}
              <Route path="/dj/:djId" element={<DJProfileComponent />} />
              <Route
                path="/djprofile"
                element={<UserProfile userType="DJ" />}
              />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default AppLayout;
