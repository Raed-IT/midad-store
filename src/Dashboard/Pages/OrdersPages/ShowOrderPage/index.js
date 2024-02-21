import {useLocation} from "react-router-dom";
import {Typography, Card, CardContent, useTheme} from "@mui/material";
import {CardActionArea} from '@mui/material';
import {tokens} from "../../../theme";
import Grid from "@mui/material/Grid";
import React, {useCallback} from "react";
import Divider from "@mui/material/Divider";
import {Box} from "@mui/material";

const ShowOrdersPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const onBoxSubmit = useCallback(() => {

    }, []);

    console.log(location.state.products)
    return <Grid container spacing={2}>
        {location.state.products.map(product => {
            console.log(product)
            return <Card elevation={3} key={product.id} sx={{maxWidth: 345, m: 2, minWidth: 250}}
                         style={{backgroundColor: colors.blueAccent[900]}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.product_object?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.product_object?.description}
                        </Typography>
                        <Divider sx={{my: 2}}/>
                        <Box sx={{justifyContent: "space-between", display: 'flex'}} onSubmit={onBoxSubmit}>

                            <Typography gutterBottom variant="h6" component="div">
                                {product.product_object?.price}$
                            </Typography>

                            <Typography gutterBottom variant="h6" component="div">
                                {product.qty}
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>

        })
        }
    </Grid>
}
export default ShowOrdersPage;