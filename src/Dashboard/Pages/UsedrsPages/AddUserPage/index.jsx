import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Formik} from "formik";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import {useState} from "react";
import Card from '@mui/material/Card';
import {useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import toast from "react-hot-toast";
import dashboardRoutes from "../../../Data/DashboardRoutes";
import {useNavigate} from "react-router-dom";
import {useAddUserMutation} from "../../../Data/Api/usersApi";

const AddUserPage = () => {
    const navicate = useNavigate();
    const [addUserRequest,] = useAddUserMutation();

    const [isAddUser, setIsAddUser] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const checkoutSchema = yup.object().shape({
        name: yup.string().min(3).required("required"),
        email: yup.string().email().required("required"),
        password: yup.string().min(8).required("required"),
    });
    const initValues = {
        name: '',
        email: "",
        password: ''
    };
    const handAddCustomer = async (values) => {
        setIsAddUser(true);
        await addUserRequest({
            name: values.name,
            email: values.email,
            password: values.password
        }).unwrap()
            .then((payload) => {
                setIsAddUser(false);
                // toast.success(payload.message);
                navicate(dashboardRoutes.users);
            })
            .catch((error) => {
                setIsAddUser(false);

                if (error?.data?.message) {
                    toast.error(error?.data?.message);
                }
                // toast.error(error)
            });
        ;
    }

    return <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Card sx={{p: 2}} style={{backgroundColor: colors.blueAccent[900]}}>
            <> <Typography component="h1" variant="h5">
                Add New Customer
            </Typography>
                <Formik
                    onSubmit={handAddCustomer}
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
                                value={values.name}
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                type="text"
                                id="name"
                                color="background"
                            />
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
                                label="Email"
                                type="email"
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
                                color="background"
                            />
                            <LoadingButton
                                type="submit"
                                loading={isAddUser}
                                variant="outlined"
                                color="success"
                                fullWidth
                                sx={{mt: 3, mb: 2}}
                            >
                                Add Customer
                            </LoadingButton>
                        </Box>

                    )}
                </Formik></>
        </Card>
    </Box>

        ;
}
export default AddUserPage;