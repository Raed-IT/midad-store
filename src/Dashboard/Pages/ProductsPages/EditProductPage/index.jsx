import {Box, Button, Dialog, DialogContent, DialogTitle, OutlinedInput, TextField, useTheme} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation} from "../../../Data/Api/ProductsApi";
import toast from "react-hot-toast";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import dashboardRoutes from "../../../Data/DashboardRoutes";
import {useLocation, useNavigate} from "react-router-dom";
import {tokens} from "../../../theme";
import Select from 'react-select';
import React, {useEffect, useState} from "react";
import {
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useUpdateCategoryMutation
} from "../../../Data/Api/CategoriesApi";
import UploadAndDisplayImage from "../../../components/ImageHandler";

const EditProductPage = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [updateProductRequest, {isLoading: isAdd, data: ddd}] = useUpdateProductMutation();
    const location = useLocation();
    const [category, setCategory] = useState();
    const [file, setFile] = useState();
    const [categories, setCategories] = useState([]);
    const {data, isLoading} = useGetCategoriesQuery();
    const navicate = useNavigate();

    useEffect(() => {
        if (data && categories.length === 0) {
            const cats = categories;
            data?.data?.forEach((element) => {
                    categories.push({
                        value: element.id,
                        label: element.name
                    })
                }
            );
        }
    }, [isLoading]);
    const handleSeChange = (selectedOption) => {
        setCategory(selectedOption)
    };
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const initValues = {
        name: location.state.name,
        price: location.state.price,
        description: location.state.description,
    };
    useEffect(() => {
        setCategory({value: location.state.category, label: location.state.categoryname})
    }, []);
    const handAddProduct = async (values) => {
        // setIsAddCategory(true);
        if (!category) {
            toast.error('pleas Selecte Category')
            return;
        }
        await updateProductRequest({
            id: location.state.id,
            payload: {
                name: values.name,
                price: values.price,
                category: category.value,
                description: values.description,
            }
        }).unwrap()
            .then((payload) => {
                toast.success(payload.message);
                navicate(dashboardRoutes.products);
            })
            .catch((error) => {
                console.log(error.data)
                toast.error(error?.data.message)
            });
    }
    return (<Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Card sx={{p: 2}} style={{backgroundColor: colors.blueAccent[900]}}>
                <> <Typography component="h1" variant="h5">
                    Edit Product
                </Typography>
                    <Formik
                        onSubmit={handAddProduct}
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
                                <Select
                                    value={category}
                                    onChange={handleSeChange}
                                    options={categories}
                                />

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
                                    value={values.price}
                                    error={!!touched.price && !!errors.price}
                                    helperText={touched.price && errors.price}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="price"
                                    label="Price"
                                    type="number"
                                    id="desc"
                                    autoComplete="category-desc"
                                    color="background"
                                />
                                <TextField
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    error={!!touched.description && !!errors.description}
                                    helperText={touched.description && errors.description}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="description"
                                    label="Describtion"
                                    type="text"
                                    id="desc"
                                    autoComplete="category-desc"
                                    color="background"

                                />
                                <UploadAndDisplayImage
                                    onchange={(file) => {
                                        setFile(file)
                                    }}
                                />
                                <LoadingButton
                                    type="submit"
                                    loading={isAdd}
                                    variant="outlined"
                                    color="success"
                                    fullWidth
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Update Product
                                </LoadingButton>
                            </Box>

                        )}
                    </Formik></>
            </Card>

        </Box>

    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().min(3).required("required"),
    price: yup.number().required("required"),
    description: yup.string().required("required"),

});


export default EditProductPage;