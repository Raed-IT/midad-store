import {useDeleteCategoryMutation,} from "../../../Data/Api/CategoriesApi";
import {Box, Button, Dialog, DialogContent, DialogTitle, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {DataGrid, GridActionsCellItem, GridToolbar} from "@mui/x-data-grid";
import {MdOutlineDelete} from "react-icons/md";
import dashboardRoutes from "../../../Data/DashboardRoutes";
import {FaRegEdit} from "react-icons/fa";
import Header from "../../../components/Header";
import LoadingComponent from "../../../components/Loading";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import {useGetOrdersQuery} from "../../../Data/Api/ordersApi";
import {BiShow} from "react-icons/bi";

const OrdersPage = () => {

    const {data, error, isLoading} = useGetOrdersQuery();
    const [deletedCategoryRequest, {isLoading: isDelete}] = useDeleteCategoryMutation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const columns = [
        {field: "id", headerName: "ID"},
        {
            field: "user",
            headerName: "Name",
            flex: 1,
            valueGetter: (params) => params.row?.user?.name
        },
        {field: "total", headerName: "Total ", flex: 1,},
        {
            field: "created_at",
            headerName: "Date", flex: 1,
        },

        {
            field: "product_count",
            headerName: "Products Count", flex: 1,
        },
        {
            field: 'actions',
            type: 'actions', flex: 1,
            getActions: (props) => [
                <GridActionsCellItem onClick={() => {
                    setSelectedCategory(props.row)
                    setIsOpen(!isOpen);
                }} icon={<MdOutlineDelete/>} label="Delete"/>,
                <GridActionsCellItem onClick={() => {
                    navigate(dashboardRoutes.showOrders, {state: props.row});
                }} icon={<BiShow/>} label="show"/>,
            ]
        }
    ];
    return (
        <Box m="20px">
            <Header
                title="Categories"
                subtitle="List of Categoruies in yor Store "
                children={<Button onClick={() => navigate(dashboardRoutes.addCategory)} style={{height: '40px'}}
                                  variant="outlined"
                                  color='success'>
                    Add Category
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
                    rows={data?.orders ?? []}
                    columns={columns}
                    components={{Toolbar: GridToolbar}}
                />}
            </Box>
            <Dialog keepMounted onClose={() => setIsOpen(false)} transitionDuration={10} open={isOpen} color={'red'}>
                <DialogTitle>Delete Order</DialogTitle>
                <DialogContent color={"info"}>
                    Do you wont Delete this Order
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: 5,
                        justifyContent: 'space-between'
                    }}>
                        <LoadingButton loading={isDelete} onClick={async () => {
                            await deletedCategoryRequest(selectedCategory).then(() => {
                                setIsOpen(false);
                                toast.success("don Deleted");
                            })
                        }} variant="outlined" color='error'>
                            Delete
                        </LoadingButton>
                        <Button color='info' variant="outlined" onClick={() => {
                            setIsOpen(false);
                            setSelectedCategory(null);
                        }}>Cancel</Button>
                    </Box>
                </DialogContent>
            </Dialog>

        </Box>
    );
}
export default OrdersPage;