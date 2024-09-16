import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../../Context/StoreContext";
import {useNavigate} from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart , getTotalCartAmount} = useContext(StoreContext);
  const navigate= useNavigate();
 

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          // Check if the item is in the cart
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div
                  key={item._id}
                  className="cart-items-title cart-items-item"
                >
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p> {/* Quantity */}
                  <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>{" "}
                  {/* Total price */}
                  <p className="cross" onClick={() => removeFromCart(item._id)}>X</p>
                  {/* <button onClick={() => removeFromCart(item._id)}>Remove</button> */}
                </div>
                <hr />
              </div>
            );
          }
          return null; // Ensure that map returns null if the condition is not met
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Devivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
           
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code , Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text"  placeholder="Promo code"/>
              <button>Submit</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
