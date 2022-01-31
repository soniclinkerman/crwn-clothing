import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component.jsx";

import { Route } from "react-router-dom";
import CollectionPage from "../../pages/collection/collection.component";
const ShopPage = ({ match }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        component={CollectionPage}
      />
    </div>
  );
};

export default ShopPage;
// <Routes>
//   <Route path="/" element={<CollectionsOverview />} />
//   <Route path=":collectionId" element={<CollectionPage />} />
// </Routes>
