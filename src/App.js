import React from "react";
import "./App.css";
import HomePage from "./pages/home/hompage.component";
import { Route, Routes, Link, Redirect, Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument, db } from "./firebase/firebase.utils";
import { doc, onSnapshot } from "firebase/firestore";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import CheckoutPage from "./pages/checkout/checkoutpage.component";
import ContactPage from "./pages/contact/contactpage.component";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentUser: null,
  //   };
  // }

  unsubScribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubScribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);
        onSnapshot(doc(db, `users/${userAuth.uid}`), (snapShot) => {
          setCurrentUser(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            },
            () => {
              console.log(this.state);
            }
          );
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }
  componentWillUnmount() {
    this.unsubScribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Route exact path={"/"} component={HomePage} />
        <Route path={"/shop"} component={ShopPage} />
        <Route exact path={"/checkout"} component={CheckoutPage} />

        {/* <Route path="/" element={<HomePage />} />
          <Route path="shop/*" element={<ShopPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="/signin"
            element={
              this.props.currentUser ? (
                <Navigate to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          /> */}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
