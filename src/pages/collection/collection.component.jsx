import React from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop.selectors";
import { changeShopParams } from "../../redux/shop/shop.actions";

import "./collection.styles.scss";
import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  // console.log(match.params.collectionId);
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeParams: (item) => dispatch(changeShopParams(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);