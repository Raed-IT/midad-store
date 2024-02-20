import {Box, Button} from "@mui/material";
import {DataGrid, GridActionsCellItem, GridToolbar} from "@mui/x-data-grid";
import {mockDataContacts} from "../../../../data/mockData";
import Header from "../../../components/Header";
import {useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useNavigate} from "react-router-dom";
import dashboardRoutes from "../../../Data/DashboardRoutes";
import {useGetProductsQuery} from "../../../Data/Api/ProductsApi";
import LoadingComponent from "../../../components/Loading";
import {MdOutlineDelete} from "react-icons/md";
import {FaRegEdit} from "react-icons/fa";
import {BiShow} from "react-icons/bi";
import React, {useEffect} from "react";
import toast from "react-hot-toast";

const ProductsPage = () => {
    const {data, error, isLoading} = useGetProductsQuery();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
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
            getActions: (sd) => [
                <GridActionsCellItem icon={<MdOutlineDelete/>} label="Delete"/>,
                <GridActionsCellItem icon={<FaRegEdit/>} label="Edit"/>,
                <GridActionsCellItem icon={<BiShow/>} label="show"/>,
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

        </Box>
    );
};

export default ProductsPage;
