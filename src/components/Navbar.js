import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSnackbar } from 'notistack';

function Navbar() {
  const navigate = useNavigate();
  const { token, handleLogout, username } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);  
  const [hasShownSnackbar, setHasShownSnackbar] = useState(false);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRouteChange = (route) => {
    switch (route) {
      case 'dj':
        navigate('/djprofile');
        break;
      case 'logout':
        handleLogout();
        navigate('/home');
        break;
      default:
        navigate('/home');
        break;
    }
    setAnchorEl(null);
  };
  
  useEffect(() => {
    if (token && !hasShownSnackbar) {
        enqueueSnackbar('User logged in', { variant: 'success' });
        setHasShownSnackbar(true);
    }
    // Reset the state when user logs out (when the token is nullified)
    if (!token) {
        setHasShownSnackbar(false);
    }
  }, [token, enqueueSnackbar, hasShownSnackbar]);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#123456' }}>
      <Toolbar>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            p: 'calc(5px + 1vmin)',
          }}
        >
          <Box display="flex" gap={2} alignItems="center" justifyContent="center">
            <Stack direction="row" spacing={4}>
              <Avatar
                alt="VanDJs"
                src="/logo.png"
                sx={{ width: 'calc(15px + 5vmin)', height: 'calc(15px + 5vmin)' }}
              />
            </Stack>
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontSize: 'calc(10px + 2vmin)',
                  px: 'calc(5px + 2vmin)'
                }}>
                Hey Van DJs
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!!token ? (
              <>
                <Tooltip title="DJs settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ p: 0, color: 'grey.500' }}
                  >
                    <Stack direction="row" spacing={4}>
                      <Avatar
                        alt="DJ"
                        src="/icons/djicon-w.png"
                        sx={{ width: 'calc(25px + 5vmin)', height: 'calc(25px + 5vmin)' }}
                      />
                    </Stack>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <MenuItem onClick={() => handleRouteChange('dj')}>
                    <ListItemIcon>
                      <Stack direction="row" spacing={5}>
                        <Avatar
                          alt="DJ"
                          src="/icons/djprofile.png"
                          sx={{ width: 'calc(20px + 1vmin)', height: 'calc(20px + 1vmin)' }}
                        />
                      </Stack>
                    </ListItemIcon>
                    {username ? username : 'DJ Profile'}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => handleRouteChange('logout')}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="medium" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
