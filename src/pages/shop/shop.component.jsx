import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component.jsx";

import { Route } from "react-router-dom";
import CollectionPage from "../../pages/collection/collection.component";
import { firestore } from "firebase-admin";
import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  collection,
  setDoc,
  query,
} from "firebase/firestore";
import {
  convertCollectionsSnapshotToMap,
  db,
} from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions.js";
import WithSpinner from "../../components/withSpinner/withSpinner.component.jsx";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  state = {
    loading: true,
  };
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionsRef = collection(db, "collections");

    // this.unsubscribeFromSnapshot = onSnapshot(
    //   collectionsRef,
    //   async (snapShot) => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
    //     updateCollections(collectionsMap);
    //     this.setState({ loading: false });
    //     console.log(snapShot);
    //   }
    // );

    //FETCH RESPONSE
    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/zaltick-clothing-db/databases/(default)/documents/collections"
    // )
    //   .then((response) => response.json())
    //   .then((collection) => console.log(collection));

    //PROMISE CHAINING
    getDocs(query(collectionsRef)).then((snapShot) => {
      const x = convertCollectionsSnapshotToMap(snapShot);
      updateCollections(x);
      this.setState({ loading: false });
      console.log("REFRESHED");
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
// <Routes>
//   <Route path="/" element={<CollectionsOverview />} />
//   <Route path=":collectionId" element={<CollectionPage />} />
// </Routes>
