import React, { useEffect, useState } from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import {Link} from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import {useNavigate} from 'react-router-dom';
import axios from './axios';
import {db} from './firebase';

function Payment() {
  let navigate = useNavigate();


  const [{basket,user},dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

    useEffect(()=>{
        //generate the special stripe which allows us to charge a customer
        
        const getClientSecret = async () => {
             const response = await axios({
               method: 'post',
               //Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
             });

             setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket])

    console.log('THE SECRET IS >>>', clientSecret)

  const handleSubmit = async(event) => {
    // do all the fancy stripe stuff
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card:elements.getElement(CardElement)
      }
    }).then(({paymentIntent})=>
       { //paymentIntent = payment confirmation
        
        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })


        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: 'EMPTY_BASKET'
        })

        //just putting history gives error

        //window.history.replace('/orders')
        //navigate("/some/where", { replace: true })
        //https://reach.tech/router/api/navigate
        //https://stackoverflow.com/questions/68694012/history-replace-in-react-router-dom-v6#:~:text=If%20you%20need%20to%20replace,%2C%20%7B%20replace%3A%20true%20%7D)%20.

        navigate("/orders", { replace: true })
      
      })
  }

  const handleChange = event => {
      //Listen for changes in the cardElement
      // and display any errors as the customer types their card details
      setDisabled(event.empty);
      setError(event.error?event.error.message :"")
  }

  return (
    <div className='payment'>
        <div className='payment__container'>
          <h1>
              Checkout (
                <Link to ="/checkout">{basket?.length} items</Link>
                )
          </h1>
          {/* Payment section - delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>
                      <p>{user?.email}</p>
                      <p>123 React Lane</p>
                      <p>Los Angeles, CA</p>
                    </p>

                </div>
            </div>
              {/* Payment section - review items */}
              <div className='payment__section'>
              <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                  {basket.map(item =>(
                    <CheckoutProduct
                        id = {item.id}
                        title = {item.title}
                        image = {item.image}
                        price = {item.price}
                        rating = {item.rating}
                    />
                  ))}

                </div>
            </div>
              {/* Payment section - payment method */}
              <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                          {/* Stripe magic will go */}
                          <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>
                                <div className='payment__priceContainer'>
                                      <CurrencyFormat
                                          renderText={(value) =>(
                                            <h3>Order Total : {value}</h3>
                                          )}
                                          decimalScale = {2}
                                          value = {getBasketTotal(basket)}
                                          displayType = {"text"}
                                          thousandSeparator = {true}
                                          prefix = {"₹"}
                                      />
                                      <button disabled = {processing || disabled ||
                                      succeeded}>
                                          <span>{processing?<p>Processing</p>:
                                          "Buy Now"}</span>
                                      </button>
                                </div>
                                {/* Error */}
                                {error && <div>{error}</div>}
                          </form>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Payment