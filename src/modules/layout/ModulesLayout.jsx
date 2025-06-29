import { Box, Container } from '@mui/material';
import { NavBar } from '../components';

export const ModulesLayout = ({ children, autenticado = true }) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg,rgb(38, 0, 0) 0%, #c2cefb 50%, #000000 100%)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Navbar superior */}
            {autenticado && <NavBar autenticado={autenticado} />}

            {/* Contenido principal */}
            <Container
                maxWidth="xl"
                sx={{
                    flexGrow: 1,
                    paddingTop: 4,
                    paddingBottom: 4,
                }}
            >
                {children}
            </Container>
        </Box>
    );
};
