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
import {useUpdateCategoryMutation} from "../../../Data/Api/CategoriesApi";
import dashboardRoutes from "../../../Data/DashboardRoutes";
import {useNavigate, useLocation} from "react-router-dom";

const EditCategoryPage = () => {
    const navicate = useNavigate();
    const location = useLocation();
    const [updateCategoryRequest,] = useUpdateCategoryMutation();
    const [isAddCategory, setIsAddCategory] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const checkoutSchema = yup.object().shape({
        name: yup.string().min(3).required("required"),
        desc: yup.string().required("required"),
    });
    console.log(location)
    const initValues = {
        name: location.state.name,
        desc: location.state.desc
    };
    const handAddCategory = async (values) => {
        setIsAddCategory(true);
        await updateCategoryRequest(
            {
                id: location.state.id,
                payload: {
                    name: values.name,
                    desc: values.desc,
                }
            }
        ).unwrap()
            .then((payload) => {
                setIsAddCategory(false);
                toast.success(payload.message);
                navicate(dashboardRoutes.categories);
            })
            .catch((error) => {
                console.log(error.data)
                toast.error(error?.data.message)
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
                Edit Category
            </Typography>
                <Formik
                    onSubmit={handAddCategory}
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
                                autoComplete="category-name"
                                color="background"
                            />
                            <TextField
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.desc}
                                error={!!touched.desc && !!errors.desc}
                                helperText={touched.desc && errors.desc}
                                margin="normal"
                                required
                                fullWidth
                                name="desc"
                                label="Describtion"
                                type="text"
                                id="desc"
                                autoComplete="category-desc"
                                color="background"

                            />

                            <LoadingButton
                                type="submit"
                                loading={isAddCategory}
                                variant="outlined"
                                color="success"
                                fullWidth
                                sx={{mt: 3, mb: 2}}
                            >
                                Update Category
                            </LoadingButton>
                        </Box>

                    )}
                </Formik></>
        </Card>
    </Box>

        ;
}
export default EditCategoryPage;