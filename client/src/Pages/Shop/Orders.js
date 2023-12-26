import React from "react";

export default function Orders({ cart, user , setOrder}) {

const ordername = 'ORDER_NO'
let num = Math.floor(Math.random() * (1001)) + Math.floor(Math.random() * 101)
const order_id = ordername.concat(num)

console.log(cart)
const order = cart.map((item) =>  {
  const newOrder = {
    "order_id":order_id,
    "item_id":item.id,
    "customer_id": user.id,
    "price":item.price,
    "status":"confirmed"
  }
  setOrder(newOrder)

  return (
    <div className="item-list"  key={item.id}>
    <img src={item.imageUrl} alt="item"/>
      <span>
        {item.name}
      </span>
      <span>
      <b>Kshs. </b>{item.price}
    </span>
    </div>
)
})
  return(
  <div className="order-details">
      <div className="orders-list">
        {order}
      </div>
    </div>
  )
}
