import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';    

import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Review from '../Review';
import { commerce } from '../../../library/Commerce';

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    // traverse thrue steps using usestate
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type:'cart' })

                console.log(token);

                setCheckoutToken(token);
            } catch (error) {

            }
        }

        generateToken();

    }, [cart]);

    // functions that move step next and back
    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1);
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);

    // once we get shipping data from address form, we populate with set & use passed in data, then call next step 
    const next = (data) => {
        setShippingData(data);
        nextStep();
    }


    const Review = () => (
        <div> Confirmation </div>
    );

     //pass data to forms
    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken next={next}/>
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/> 
        
    
  return (
    <>
    <div className={classes.toolbar}/> 
    <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography variant="h4" align="center">Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((step) => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? <Review /> : checkoutToken && <Form />}
        </Paper>
    </main>
    </>
  )
}

export default Checkout