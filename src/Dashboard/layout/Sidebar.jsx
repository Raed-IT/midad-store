import {useEffect, useState} from "react";
import {ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {tokens} from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import dashboardRoutes from "../Data/DashboardRoutes";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import {UserSwitchOutlined} from "@ant-design/icons";
import {FaUsersGear} from "react-icons/fa6";

const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    );
};

const Sidebar = () => {
    const location = useLocation();
    const {hash, pathname, search} = location;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    // useEffect(() => {
    //     const currentRouter=pathname.replace('/',"").toUpperCase;
    //     setSelected(currentRouter);
    //     console.log(router)
    // }, [pathname]);
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINIS
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`http://lms.theitsea.com/pluginfile.php/1/core_admin/logo/0x150/1692686692/%D8%B4%D8%B9%D8%A7%D8%B1%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%201000%D9%85%D8%A8%D8%B1%D9%85%D8%AC%20%281%29.png`}
                                    style={{cursor: "pointer", borderRadius: "50%"}}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{m: "10px 0 0 0"}}
                                >

                                    Raed Swan
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    Full Stack Developer
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to={dashboardRoutes.dashboard}
                            icon={<HomeOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Users"
                            to={dashboardRoutes.users}
                            icon={<FaUsersGear/>
                            }
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            Store
                        </Typography>
                        <Item
                            title="Categories"
                            to={dashboardRoutes.categories}
                            icon={<AppRegistrationIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Products"
                            to={dashboardRoutes.products}
                            icon={<StorefrontIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Orders"
                            to={dashboardRoutes.orders}
                            icon={<ElectricMopedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/*<Item*/}
                        {/*    title="Invoices Balances"*/}
                        {/*    to="/invoices"*/}
                        {/*    icon={<ReceiptOutlinedIcon/>}*/}
                        {/*    selected={selected}*/}
                        {/*    setSelected={setSelected}*/}
                        {/*/>*/}

                        {/*<Typography*/}
                        {/*    variant="h6"*/}
                        {/*    color={colors.grey[300]}*/}
                        {/*    sx={{m: "15px 0 5px 20px"}}*/}
                        {/*>*/}
                        {/*    Pages*/}
                        {/*</Typography>*/}
                        {/*<Item*/}
                        {/*    title="Profile Form"*/}
                        {/*    to="/form"*/}
                        {/*    icon={<PersonOutlinedIcon/>}*/}
                        {/*    selected={selected}*/}
                        {/*    setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*    title="Calendar"*/}
                        {/*    to="/calendar"*/}
                        {/*    icon={<CalendarTodayOutlinedIcon/>}*/}
                        {/*    selected={selected}*/}
                        {/*    setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*    title="FAQ Page"*/}
                        {/*    to="/faq"*/}
                        {/*    icon={<HelpOutlineOutlinedIcon/>}*/}
                        {/*    selected={selected}*/}
                        {/*    setSelected={setSelected}*/}
                        {/*/>*/}

                        {/*<Typography*/}
                        {/*    variant="h6"*/}
                        {/*    color={colors.grey[300]}*/}
                        {/*    sx={{m: "15px 0 5px 20px"}}*/}
                        {/*>*/}
                        {/*    Charts*/}
                        {/*</Typography>*/}
                        {/*<Item*/}
                        {/*    title="Bar Chart"*/}
                        {/*    to="/bar"*/}
                        {/*    icon={<BarChartOutlinedIcon/>}*/}
                        {/*    selected={selected}*/}
                        {/*    setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*    title="Pie Chart"*/}
                        {/*    to="/pie"*/}
                        {/*    icon={<PieChartOutlineOutlinedIcon/>}*/}
                        {/*    selected={selected}*/}
                        {/*    setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*    title="Line Chart"*/}
                        {/*    to="/line"*/}
                        {/*    icon={<TimelineOutlinedIcon/>}*/}
                        {/*    selected={selected}*/}
                        {/*    setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*    title="Geography Chart"*/}
                        {/*    to="/geography"*/}
                        {/*    icon={<MapOutlinedIcon/>}*/}
                        {/*    selected={selected}*/}
                        {/*    setSelected={setSelected}*/}
                        {/*/>*/}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
