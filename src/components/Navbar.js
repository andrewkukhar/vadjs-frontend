import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import { AccountCircle } from '@mui/icons-material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRouteChange = (route) => {
    if (route === 'logout') {
      setToken(null);
      localStorage.removeItem('token');
      navigate('*');
    } else {
      navigate('*');
    }
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            px: '4',
          }}
        >
          <Box display="flex" gap={2}>
            <Stack direction="row" spacing={4}>
              <Avatar
                alt="VanDJs"
                src="../../public/logo.png"
                sx={{ width: 36, height: 36 }}
              />
            </Stack>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hey Van DJs
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!!token ? (
              <>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ p: 0, color: 'grey.500' }}
                  >
                    <AccountCircle fontSize="large" cursor="pointer" />
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
                      <AccountCircle />
                    </ListItemIcon>
                    Account
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
