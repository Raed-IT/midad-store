import {Box, Button, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import UploadAndDisplayImage from "../../../components/ImageHandler";

const AddProductPage = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
        <Box m="20px">
            <Header title="CREATE NEW PRODUCT" subtitle="Create a New Product"/>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Product Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.productName}
                                name="productName"
                                error={!!touched.productName && !!errors.productName}
                                helperText={touched.productName && errors.productName}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.price}
                                name="price"
                                error={!!touched.price && !!errors.price}
                                helperText={touched.price && errors.price}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Quantity"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.qty}
                                name="qty"
                                error={!!touched.qty && !!errors.qty}
                                helperText={touched.qty && errors.qty}
                                sx={{gridColumn: "span 4"}}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address 1"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address1}
                                name="address1"
                                error={!!touched.address1 && !!errors.address1}
                                helperText={touched.address1 && errors.address1}
                                sx={{gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address 2"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address2}
                                name="address2"
                                error={!!touched.address2 && !!errors.address2}
                                helperText={touched.address2 && errors.address2}
                                sx={{gridColumn: "span 4"}}
                            />

                            <TextField
                                minRows={2}
                                fullWidth
                                variant="filled"
                                type=""
                                label="Address 2"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address2}
                                name="address2"
                                error={!!touched.address2 && !!errors.address2}
                                helperText={touched.address2 && errors.address2}
                                sx={{gridColumn: "span 4"}}
                            />
                            <UploadAndDisplayImage/>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Product
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    productName: yup.string().required("required"),
    price: yup.number().required("required"),
    info: yup.string().required("required"),
    qty: yup.number().required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
});
const initialValues = {
    productName: "",
    price: "",
    info: "",
    qty: "",
    image: "",
    address1: "",
    address2: "",
};

export default AddProductPage;