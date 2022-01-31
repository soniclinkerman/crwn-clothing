import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../collection/collection-preview.component";
import "./collections-overview.styles.scss";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors.js";
const CollectionsOverview = ({ collections }) => {
  console.log(collections);
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = () =>
  createStructuredSelector({
    collections: selectCollectionsForPreview,
  });

export default connect(mapStateToProps)(CollectionsOverview);
