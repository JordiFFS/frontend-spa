import { useMemo, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useAuthStore } from "../../hooks"
import { AuthLayout } from "../layout";
import login from '/img/foto6.webp';
import {
    Alert,
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Link,
    TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';

export const LoginPages = () => {
    const {
        status,
        errorMessage,
        startLogin
    } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onLogin = async (values) => {

        const result = await startLogin({
            email: values.email.trim(), // Eliminar espacios
            password: values.password.trim()
        });

        console.log('🔄 Resultado del login:', result);
    };

    return (
        <AuthLayout title="Iniciar Sesión" imgSrc={login}>
            <Box sx={{ mt: 2 }}>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        onLogin(values).finally(() => {
                            setSubmitting(false);
                        });
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>

                            {/* EMAIL */}
                            <Field
                                as={TextField}
                                autoComplete="email"
                                type="email"
                                fullWidth
                                variant="standard"
                                margin="normal"
                                label="Correo Electrónico"
                                placeholder="Correo Electrónico"
                                name="email"
                                error={errors.email && touched.email}
                                helperText={errors.email && touched.email && errors.email}
                            />

                            {/* PASSWORD */}
                            <FormControl sx={{ width: '100%', mb: 2 }} variant="standard">
                                <InputLabel error={!!touched.password && !!errors.password} htmlFor="password">
                                    Contraseña
                                </InputLabel>
                                <Field
                                    as={Input}
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Ingrese su contraseña"
                                    autoComplete="current-password"
                                    variant="standard"
                                    error={touched.password && Boolean(errors.password)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <ErrorMessage name="password">
                                    {(msg) => <FormHelperText sx={{ color: 'error.main' }}>{msg}</FormHelperText>}
                                </ErrorMessage>
                            </FormControl>

                            {/* Error Message */}
                            {errorMessage?.show && (
                                <Grid container className="animate__animated animate__fadeIn" sx={{ mt: 1 }}>
                                    <Alert sx={{ width: '100%' }} severity={errorMessage.variant || 'error'}>
                                        {errorMessage.message}
                                    </Alert>
                                </Grid>
                            )}

                            {/* LOG IN BUTTON */}
                            <Button
                                disabled={isAuthenticating || isSubmitting}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, borderRadius: 4, background: '#4a6572' }}
                            >
                                {isAuthenticating ? 'Ingresando...' : 'Ingresar'}
                            </Button>

                            {/* LINKS TO */}
                            <Grid container>
                                <Grid item xs>
                                    <Link
                                        component={RouterLink}
                                        color='#4a6572'
                                        to="/auth/password-recovery"
                                        sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link
                                        color='#4a6572'
                                        href="https://www.erassoluciones.com"
                                        sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
                                    >
                                        Contáctanos
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </AuthLayout>
    )
}

//Validaciones
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Ingrese un correo electrónico válido')
        .required('Ingrese su correo electrónico'),
    password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('Ingrese su contraseña'),
});