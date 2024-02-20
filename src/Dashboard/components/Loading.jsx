import {Box, useTheme} from "@mui/material";
import {Bars} from "react-loading-icons";
import {tokens} from "../theme";

const LoadingComponent = ({icon}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return <Box sx={{mx: 'auto', width: 200}}> {icon ??
        <Bars width={50} speed={"200%"} fill={colors.blueAccent[100]}/>} </Box>;
}
export default LoadingComponent;