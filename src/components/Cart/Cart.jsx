import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'

import useStyles from './styles';

const Cart = ({ cart }) => {
    const classes = useStyles();

       // display different content if cart is empty or not

    // if cart is empty, render EmptyCart 
    const EmptyCart = () => (
        <Typography variant="subtitle1"> Your shopping cart is empty.</Typography>
    ); 

    // if cart has items, render FilledCart
    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <div>{item.name}</div>
                </Grid>
            ))}
        </Grid>
        <div className={classes.cartDetails}>
            <Typography variant="h5"> Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
            </div>

        </div>
        </>
    );

    if(!cart.line_items) return 'Loading...';

  return ( 
    // if cart is empty, show EmptyCart, else show FilledCart (line 43)
    <Container>
       <div className={classes.toolbar}/> 
       <Typography className={classes.title} variant="h4">Shopping Cart</Typography>
       { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
    </Container>
  )
}

export default Cart