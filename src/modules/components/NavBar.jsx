import { AppBar, Toolbar, Typography } from '@mui/material';

export const NavBar = () => {
    return (
        <AppBar position="static" sx={{ bgcolor: '#0d47a1' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                   todos los modulos que quieras tener aqui
                </Typography>
            </Toolbar>
        </AppBar>
    );
};