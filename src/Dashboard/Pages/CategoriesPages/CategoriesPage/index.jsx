import {Box, Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
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
import React, {useState} from "react";
import {useGetCategoriesQuery, userDeleteCategory} from "../../../Data/Api/CategoriesApi";
import LoadingButton from '@mui/lab/LoadingButton';

const CategoriesPage = () => {
    const {data, error, isLoading} = useGetCategoriesQuery();
    // const [res, {isLoading: isDelteing}] = useDeleteCategory();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});

    const columns = [
        {field: "id", headerName: "ID"},
        {
            field: "image",
            headerName: "Image",
            flex: 1,
            renderCell: (params) => <img src={params.row.image} alt={'no image found'}/>
        },
        {field: "name", headerName: "Category Name "},
        {
            field: "created_at",
            headerName: "Date", flex: 1,
        },
        {
            field: 'actions',
            type: 'actions', flex: 1,
            getActions: (props) => [
                <GridActionsCellItem onClick={() => {
                    setSelectedCategory(props.row)
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
                title="Categories"
                subtitle="List of Categoruies in yor Store "
                children={<Button onClick={() => navigate(dashboardRoutes.addCtegory)} style={{height: '40px'}}
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
                    rows={data.data}
                    columns={columns}
                    components={{Toolbar: GridToolbar}}
                />}
            </Box>
            <Dialog transitionDuration={10} open={isOpen}>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent>
                    Do you wont Delete the ` {selectedCategory?.name} `
                    <LoadingButton loading variant="outlined">
                        Delete
                    </LoadingButton>
                    <Button onClick={() => {
                        setIsOpen(false);
                        setSelectedCategory(null);
                    }}>Cancel</Button>

                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default CategoriesPage;
