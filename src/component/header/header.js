import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "./header.css"

export const Header = () => {
    const [mobileOpen, setmobileOpen] = useState(false)
    const drawerWidth = 240;


    const handleDrawerToggle = () => {
        setmobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />

            <List>
                <ListItemButton disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link to="/characters">character</Link>
                    </ListItemButton>
                </ListItemButton>
                <ListItemButton disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                    <Link to="/episode">Episode</Link>
                    </ListItemButton>
                </ListItemButton>
                
            </List>
        </Box>
    );




    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav" style={{ position: 'inherit' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            style={{ textAlign: 'start' }}
                        >
                            Rick and Morty
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button sx={{ color: '#fff' }} className="link_buttons">
                                <Link to="/characters">character</Link>
                            </Button>
                            <Button sx={{ color: '#fff' }} className="link_buttons">
                                <Link to="/episode">Episode</Link>
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>

            </Box>
        </div>
    )
}

export default Header;
