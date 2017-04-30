export default props => {
  if (!props.products) {
    return null;
  }
  const result = props.products.map(product => (
    <div className="grid__col-4 product-list-itemwrap" key={product.id}>
      <div
        id={`product-${product.id}`}
        className="grid__cell grid__cell--padding-md product-list-item bg-white bg-shadow"
      >
        <a href={product.permalink_s}>
          <img src={product.image_s} alt="" />
        </a>
        <div className="Media-content">
          <h3>{product.title}</h3>
          <p>{product.description_s}</p>
          <span className="price">
            <span className="woocommerce-Price-amount amount">
              <span className="woocommerce-Price-currencySymbol">kr</span>
              &nbsp;
              {product.price_f}
            </span>
          </span>
          <a
            rel="nofollow"
            href={`/produktkategori/fukt/?add-to-cart=${product.id}`}
            data-quantity="1"
            data-product_id={product.id}
            data-product_sku={product.sku_s}
            className="button product_type_simple add_to_cart_button ajax_add_to_cart"
          >
            Kjøp
          </a>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="grid">
      {result}
    </div>
  );
};
