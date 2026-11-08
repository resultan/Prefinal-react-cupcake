
import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../../App";

export default function ProductDetail({
  products,
  cart,
  onAddToCart,
}) {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <section className="empty-state">
        <h2>Product not found</h2>
        <Link to="/">Return to products</Link>
      </section>
    );
  }

  const cartQuantity = cart[product.id] || 0;
  const lowStock = product.quantity < 5;
  const outOfStock = product.quantity === 0;

  return (
    <section className="detail-panel">
      <Link to="/" className="back-link">← Back to the bakery</Link>

      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-info">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-rating">★ {product.rating} / 5</p>
          <h2 className="price">{formatPrice(product.price)}</h2>
          <p>{product.description}</p>

          <h3>Specifications</h3>
          <p>{product.specifications}</p>

          <p className={lowStock ? "stock low-stock" : "stock"}>
            {outOfStock
              ? "Sold out for today"
              : lowStock
                ? `Only ${product.quantity} left today`
                : `Freshly baked · ${product.quantity} available`}
          </p>

          <p>In your box: {cartQuantity}</p>

          <button
            className="button button-primary"
            onClick={() => onAddToCart(product)}
            disabled={outOfStock || cartQuantity >= product.quantity}
          >
            {outOfStock
              ? "Sold Out"
              : cartQuantity >= product.quantity
                ? "Box is Full"
                : "Add to My Box"}
          </button>
        </div>
      </div>
    </section>
  );
}
