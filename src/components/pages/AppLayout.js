import React, { Suspense, useState, useEffect  } from 'react';
import { useParams, Link, Route, Routes } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, useMediaQuery, Grid, Tooltip, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DJProfileDetails from '../djs/DJProfileDetails';
import UserProfile from '../users/DJUserProfile';
import AppPages from './AppPages';
import { CircularProgress } from '@mui/material';

const Signup = React.lazy(() => import('../auth/Signup'));
const Login = React.lazy(() => import('../auth/Login'));

function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const DJProfileComponent = () => {
    const { djId } = useParams();
    const [dj, setDj] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // New state for loading
  
    useEffect(() => {
      async function fetchDJ() {
        try {
          setIsLoading(true);  // Set loading to true before fetching
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/djs/public/${djId}`);
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
          setIsLoading(false);  // Set loading to false after fetching
        }
      }
  
      fetchDJ();
    }, [djId]);

    if (!dj) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>;
    if (dj.error) return <p>DJ not found</p>;
    return <DJProfileDetails dj={dj} isLoading={isLoading} />;
  };
  
  
  const renderList = () => (
    <List>
      {AppPages.map(({ path: pagePath, name, Icon }) => (
        <ListItem button key={pagePath} component={Link} to={pagePath}>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );

  const renderIconGrid = () => (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      {AppPages.map(({ path: pagePath, name, Icon }) => (
        <Grid item key={pagePath}>
          <Tooltip title={name}>
            <IconButton component={Link} to={pagePath}>
              <Icon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
      <Box display="flex" flex="1" overflow="hidden">
        <Box 
          width="calc(15% + 2vmin)" 
          bgcolor="darkgrey" 
          p={2} 
          position="sticky" 
          top={0}
          bottom={0}
          pt="calc(30px + 5vmin)"
          overflow="auto"
        >
          {matches ? renderIconGrid() : renderList()}
        </Box>
        <Box 
          width="calc(85% - 2vmin)" 
          bgcolor="white" 
          p={2}
          pt="calc(25px + 5vmin)"
          pb="calc(150px + 15vmin)"
          overflow="auto"
        >
          <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>}>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              {AppPages.map(({ path: pagePath, Component }) => (
                <Route key={pagePath} path={pagePath} element={<Component />} />
              ))}
              <Route path="/dj/:djId" element={<DJProfileComponent />} />
              <Route path="/djprofile" element={<UserProfile userType="DJ" />} />
            </Routes>
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
