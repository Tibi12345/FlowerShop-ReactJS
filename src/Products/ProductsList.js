import React from "react";
import { PropTypes } from "prop-types";
import Product from "./Product";
import { Grid, Cell } from "react-mdl";

const ProductsList = props => {
  const products = props.products.map(product => (
    <Cell col={3} key={product.id}>
      <Product
        {...product}
        onAddToCart={props.onAddToCart}
        editMode={props.editMode}
        onDeleteProduct={props.onDeleteProduct}
      />
    </Cell>
  ));
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <Grid>{products}</Grid>
    </div>
  );
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      photoUrl: PropTypes.string,
      unitPrice: PropTypes.number
    })
  )
};

export default ProductsList;