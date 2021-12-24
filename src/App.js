import React from "react";
import "./App.css";
import HomePage from "./pages/home/hompage.component";
import { Route, Routes, Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument, db } from "./firebase/firebase.utils";
import { doc, onSnapshot } from "firebase/firestore";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

// const HomePage = (props) => {
//   let navigate = useNavigate();
//   console.log(props);
//   return (
//     <div>
//       <button onClick={() => navigate("topics")}>Topics</button>
//       <button onClick={() => navigate("hats")}>Hats</button>
//       <button onClick={() => navigate("topics/:topicId")}>Topic Details</button>

//       <Link to="topics/13">Link to topic 13</Link>
//       <h1>HOME PAGE</h1>
//     </div>
//   );
// };

// const HatsPage = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <h1>HATS PAGE</h1>
//     </div>
//   );
// };

// const TopicsPage = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <h1>TOPICS PAGE</h1>
//     </div>
//   );
// };

// const TopicsDetailPage = (props) => {
//   const params = useParams();
//   console.log(params);
//   return (
//     <div>
//       <h2>TOPICS DETAIL PAGE {params.topicId} </h2>
//     </div>
//   );
// };

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
          {/* <Route path="/hats" element={<HatsPage />} />
        <Route path="topics/" element={<TopicsPage />} />
        <Route path="topics/:topicId" element={<TopicsDetailPage />} /> */}
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
