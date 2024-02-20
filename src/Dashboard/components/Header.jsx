import {Typography, Box, useTheme, Stack} from "@mui/material";
import {tokens} from "./../theme";

const Header = ({title, subtitle, children}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Stack direction="row"    justifyContent="space-between"  spacing={{ xs: 1, sm: 2 }} mb="30px" >
            <Box>
                <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{m: "0 0 5px 0"}}
                >
                    {title}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                    {subtitle}
                </Typography>
            </Box>
            {children}
        </Stack>
    );
};

export default Header;
