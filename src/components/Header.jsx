"use client";
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
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
import Button from '@mui/material/Button';
import { useTheme } from '@emotion/react';
import Link from 'next/link';

const drawerWidth = 240;
const navItems = [
    { name: 'Home', url: '/' },
    { name: 'App', url: '#download-app-section' },
    { name: 'AI Tips', url: '#ai-tips-section' },
    { name: 'FAQ', url: '/faq' },
    { name: 'Subscription', url: '/subscription' },
    { name: 'Testimonials', url: '/testimonials' }
];


function Header(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => { setMobileOpen((prevState) => !prevState); };
    const theme = useTheme();

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <img alt='logo' src='assets/images/logo.svg'/>
            <Divider />
            <List style={{ fontFamily : theme.typography.primaryFont }}>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ bgcolor:'white' }}>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: { xs: 'space-between', md: 'flex-start' },
                 }}>
                    <img alt='logo' src='assets/images/logo.svg' className='hidden md:block'/>
                    <img alt='logo' src='assets/images/only-logo.png' className='block md:hidden h-12 my-2'/>
                    <Box sx={{ flexGrow: 1, display: {xs: 'none',md: 'flex'}, justifyContent: 'center', alignItems: 'center' }}>
                        {navItems.map((item) => (
                            <Link href={item.url} key={item.name}><Button style={{ fontFamily : theme.typography.primaryFont }} sx={{ my: 2, color : theme.palette.secondary.main, textTransform: 'capitalize', fontSize : '1rem' }}>{item.name}</Button></Link>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap : '10px' }}>
                        {/* <Button variant="outlined" sx={{ borderRadius : '50%', padding : "0.5rem", minWidth : 'auto!important', color : theme.palette.secondary.main, border:'1px solid #ccc' }}>
                            <AccountCircle/>
                        </Button> */}
                        <Button style={{ fontFamily : theme.typography.primaryFont }} variant="outlined" sx={{ borderRadius : '76px', padding:'8px 20px', color : theme.palette.secondary.main, border:'1px solid #ccc', textTransform: 'capitalize' }}>
                            Login
                        </Button>
                        <Button style={{ fontFamily : theme.typography.primaryFont }} variant="contained" sx={{ borderRadius : '76px', padding:'8px 20px!important', textTransform: 'capitalize' }}>Get Started</Button>
                        <IconButton aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' },  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

Header.propTypes = { window: PropTypes.func };

export default Header;
