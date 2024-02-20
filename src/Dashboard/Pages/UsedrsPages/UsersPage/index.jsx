import {Box, Button, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import {DataGrid, GridActionsCellItem, GridToolbar} from "@mui/x-data-grid";
import Header from "../../../components/Header";
import {useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useNavigate} from "react-router-dom";
import dashboardRoutes from "../../../Data/DashboardRoutes";
import LoadingComponent from "../../../components/Loading";
import {MdOutlineDelete} from "react-icons/md";
import {FaRegEdit} from "react-icons/fa";
import {BiShow} from "react-icons/bi";
import React, {useEffect, useState} from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import {useDeleteUserMutation, useGetUsersQuery} from "../../../Data/Api/usersApi";
import {Chip} from "@mui/joy";
import {MdOutlineDoneOutline} from "react-icons/md";
import Container from "@mui/material/Container";
import toast from "react-hot-toast";

function DoneIcon() {
    return null;
}

const UsersPage = () => {
    const {data, isLoading} = useGetUsersQuery();
    const [deleteUserRequest, {isLoading: isDelete}] = useDeleteUserMutation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    useEffect(() => console.log(data), [isLoading]);
    const columns = [
        {field: "id", headerName: "ID"},
        {
            field: "name",
            headerName: "User Name",
            flex: 1,
        },
        {
            field: "email", headerName: "Email ",
            flex: 1,

        },
        {
            field: "is_admin", headerName: "صلاحية ",
            flex: 1,
            renderCell: (params) => <Typography color={params?.row?.is_admin === 1 ? 'info' : 'green'}>
                {params?.row?.is_admin === 1 ? "مدير" : "مستخدم"}
            </Typography>
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
                    setSelectedUser(props.row)
                    setIsOpen(!isOpen);
                }} icon={<MdOutlineDelete/>} label="Delete"/>,
                <GridActionsCellItem icon={<FaRegEdit/>} label="Edit"/>,
                <GridActionsCellItem icon={<BiShow/>} label="show"/>,
            ]
        }
    ];

    return (
        <Box m="20px">
            <Header
                title="Customer"
                subtitle="List of Customer in yor Store "
                children={<Button onClick={() => navigate(dashboardRoutes.addUsers)} style={{height: '40px'}}
                                  variant="outlined"
                                  color='success'>
                    Add Customer
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
                    rows={data ?? []}
                    columns={columns}
                    components={{Toolbar: GridToolbar}}
                />}
            </Box>
            <Dialog keepMounted onClose={() => setIsOpen(false)} transitionDuration={10} open={isOpen} color={'red'}>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent color={"info"}>
                    Do you wont Delete the ` {selectedUser?.name} `
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: 5,
                        justifyContent: 'space-between'
                    }}>
                        <LoadingButton loading={isDelete} onClick={async () => {
                            await deleteUserRequest(selectedUser)
                                .unwrap()
                                .then((payload) => {

                                    setIsOpen(false);
                                    toast.success("don Deleted");
                                })
                                .catch((error) =>console.log(error.data));


                        }} variant="outlined" color='error'>
                            Delete
                        </LoadingButton>
                        <Button color='info' variant="outlined" onClick={() => {
                            setIsOpen(false);
                            setSelectedUser(null);
                        }}>Cancel</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default UsersPage;
