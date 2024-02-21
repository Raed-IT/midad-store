import {useState} from "react";
import {useAuth} from "../../../hooks/useAuth";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
 import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import dashboardRoutes from "../../../Data/DashboardRoutes";
import toast from "react-hot-toast";

export const LoginPage = () => {
    const navigate = useNavigate();

    const {login,token} = useAuth();
    const [isLogin, setIsLogin] = useState(false);


    const checkoutSchema = yup.object().shape({
        email: yup.string().email().required("required"),
        password: yup.string().min(8).required("required")
    });
    const initValues = {
        email: "",
        password: ""
    };


    const handleLogin = async (values) => {
        setIsLogin(true);
        const user = {
            email: values?.email,
            password: values?.password
        };
        await login(user).then(() => {
            if (token){
            toast.success("تم تسجيل الدخول ");
            setTimeout(() => navigate(dashboardRoutes.dashboard), 1000)
            }
        });
            setIsLogin(false)

    };
    return <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Formik
                onSubmit={handleLogin}
                validationSchema={checkoutSchema}
                initialValues={initValues}>
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            error={!!touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="email"
                            type="email"
                            id="email"
                            autoComplete="current-password"
                            color="background"
                        />
                        <TextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            error={!!touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            color="background"

                        />

                        <LoadingButton
                            type="submit"
                            loading={isLogin}
                            variant="outlined"
                            color="success"
                            fullWidth
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </LoadingButton>
                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    <Typography color="secondary"> {"Forget Password"}</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                )}
            </Formik>
        </Box>

    </Container>;
};