import React from "react";
import { addItem } from "../../redux/cart/cart.action";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem: { name, quantity, price, imageUrl } }) => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">{quantity}</span>
      <span className="price">{price}</span>
      <div className="remove-button">&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
