import {Box, Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {DataGrid, GridActionsCellItem, GridToolbar} from "@mui/x-data-grid";
import {mockDataContacts} from "../../../../data/mockData";
import Header from "../../../components/Header";
import {useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useNavigate} from "react-router-dom";
import dashboardRoutes from "../../../Data/DashboardRoutes";
import {useDeleteProductMutation, useGetProductsQuery} from "../../../Data/Api/ProductsApi";
import LoadingComponent from "../../../components/Loading";
import {MdOutlineDelete} from "react-icons/md";
import {FaRegEdit} from "react-icons/fa";
import {BiShow} from "react-icons/bi";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";

const ProductsPage = () => {
    const {data, error, isLoading} = useGetProductsQuery();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [deletedProductRequest, {isLoading: isDelete}] = useDeleteProductMutation();

    const [selectedProduct, setSelectedProduct] = useState();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (error) {
            toast.error(error?.error);
        }
    }, [error])

    const columns = [
        {field: "id", headerName: "ID"},
        {
            field: "image",
            headerName: "Image",
            flex: 1,
            renderCell: (params) => <img src={params.row.image} alt={'no image found'}/>
        },
        {field: "name", headerName: "Product Name "},
        {
            field: "price",
            headerName: "Price",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "categoryname",
            headerName: "Category Name",
            flex: 1,
        },
        {
            field: "created_at",
            headerName: "Date", flex: 1,
        },
        {
            field: 'actions',
            type: 'actions', flex: 1,
            getActions: (props) => [
                <GridActionsCellItem onClick={() => {
                    setSelectedProduct(props.row);
                    setIsOpen(true)
                }} icon={<MdOutlineDelete/>} label="Delete"/>,
                <GridActionsCellItem onClick={() => {
                    navigate(dashboardRoutes.editProduct, {state: props.row});
                }} icon={<FaRegEdit/>} label="Edit"/>,
            ]
        }
    ];

    return (
        <Box m="20px">
            <Header
                title="Products"
                subtitle="List of Products in yor Store "
                children={<Button onClick={() => navigate(dashboardRoutes.addProduct)} style={{height: '40px'}}
                                  variant="outlined"
                                  color='success'>
                    Add Product
                </Button>}
            />

            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                {isLoading ? <LoadingComponent/> : <DataGrid
                    rows={data?.data ?? []}
                    columns={columns}
                    components={{Toolbar: GridToolbar}}
                />}
            </Box>
            <Dialog keepMounted onClose={() => setIsOpen(false)} transitionDuration={10} open={isOpen}>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent color={"info"}>
                    Do you wont Delete the ` {selectedProduct?.name} `
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: 5,
                        justifyContent: 'space-between'
                    }}>
                        <LoadingButton loading={isDelete} onClick={async () => {
                            await deletedProductRequest(selectedProduct).then(() => {
                                setIsOpen(false);
                                toast.success("don Deleted");
                            })
                        }} variant="outlined" color='error'>
                            Delete
                        </LoadingButton>
                        <Button color='info' variant="outlined" onClick={() => {
                            setIsOpen(false);
                            setSelectedProduct(null);
                        }}>Cancel</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            <Dialog keepMounted onClose={() => setIsOpen(false)} transitionDuration={10} open={isOpen} color={'red'}>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent color={"info"}>
                    Do you wont Delete the ` {selectedProduct?.name} `
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: 5,
                        justifyContent: 'space-between'
                    }}>
                        <LoadingButton loading={isDelete} onClick={async () => {
                            await deletedProductRequest(selectedProduct).then(() => {
                                setIsOpen(false);
                                toast.success("don Deleted");
                            })
                        }} variant="outlined" color='error'>
                            Delete
                        </LoadingButton>
                        <Button color='info' variant="outlined" onClick={() => {
                            setIsOpen(false);
                            setSelectedProduct(null);
                        }}>Cancel</Button>
                    </Box>
                </DialogContent>
            </Dialog>

        </Box>
    );
};

export default ProductsPage;
