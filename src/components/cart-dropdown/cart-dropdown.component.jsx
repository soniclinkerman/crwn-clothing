import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, toggleCartHidden }) => {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/checkout");
    toggleCartHidden();
  }

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        <div>
          {cartItems.length > 0 ? (
            cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : (
            <span>Cart is empty</span>
          )}
        </div>
        <CustomButton onClick={() => handleClick()}>
          GO TO CHECKOUT
        </CustomButton>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
