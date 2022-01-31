import React from "react";
import StripeCheckout from "react-stripe-checkout";
import CrownSVG from "../../assets/crown.svg";
const StripeCheckoutButton = ({ price }) => {
  const stripePrice = price * 100;
  const publishableKey =
    "pk_test_51KNzJlBqxMWCHrV3OycpO25M9QZIldeOazOsEiG4Q86l3rsbm5tg8M7SEu9VhpDI34I4JCIlM8KZteCOWodQiNLb00AwwrGzdY";
  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing."
      billingAddress
      shippingAddress
      image={CrownSVG}
      description={`Your total is $${price}`}
      amount={stripePrice}
      panelLabel="Pay Now"
      token={onToken}
      currency="USD"
      stripeKey={publishableKey}
    />
  );
};
export default StripeCheckoutButton;
