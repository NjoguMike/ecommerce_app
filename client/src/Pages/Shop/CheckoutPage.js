import React from "react";
import Orders from "./Orders";

function CheckoutPage({ order , cart, user , setOrder }){

    const ordersURL = "http://127.0.0.1:5555/orders";

    console.log(cart)
    // console.log(order)

    function Checkout() {
       order.map((item)=> {
        // console.log(item)
            fetch(ordersURL,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                    },
                body:JSON.stringify(item)
            })
            .then(response => response.json())
            .then(data => console.log(data))
        })
      }

    return(
        <>
        <div className="checkout">
            <h2>Checkout</h2>
            <div className="order">
                <div>
                    {<Orders cart={cart} user={user} setOrder={setOrder}/>}
                </div>
                <div className="orderdetails">
                    <h4>Order Summary</h4>
                    <div className="order-summary">
                        <span>Number of Items: <p>{cart.length}</p></span>
                        <span>Total Price: <p>{cart.reduce((total,value)=>{
                            return total + value.price
                        },0)}</p>
                        </span>
                    </div>
                </div>
                <div>
                    <button onClick={()=>Checkout()}>Checkout</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default CheckoutPage;