import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";
import { withRouter } from "react-router-dom";
const CartDropdown = ({ cartItems, history }) => {
  // let navigate = useNavigate();

  // function handleClick() {
  //   navigate("/checkout");
  //   toggleCartHidden();
  // }

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span>Cart is empty</span>
        )}
      </div>

      <CustomButton onClick={() => history.push("/checkout")}>
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);
