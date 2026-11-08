
import { Link } from "react-router-dom";
import { formatPrice } from "../../App";

export default function ProductCard({
  product,
  cartQuantity,
  onAddToCart,
  onChangeQuantity,
}) {
  const subtotal = product.price * cartQuantity;
  const outOfStock = product.quantity === 0;
  const lowStock = product.quantity < 5;

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image">
        <img
          src={product.image}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.style.visibility = "hidden";
          }}
        />
        <span className="category-badge">{product.category}</span>
      </Link>

      <div className="product-info">
        <div className="product-title-row">
          <h3>{product.name}</h3>
          <span className="rating">★ {product.rating}</span>
        </div>

        <p className="product-description">{product.description}</p>
        <strong className="price">{formatPrice(product.price)}</strong>

        <p className={lowStock ? "stock low-stock" : "stock"}>
          {outOfStock
            ? "Sold out for today"
            : lowStock
              ? `Only ${product.quantity} left today`
              : `Freshly baked · ${product.quantity} available`}
        </p>

        <div className="quantity-row">
          <span>In your box</span>
          <div className="quantity-controls">
            <button
              aria-label={`Remove one ${product.name}`}
              onClick={() => onChangeQuantity(-1)}
              disabled={cartQuantity === 0}
            >
              −
            </button>
            <span>{cartQuantity}</span>
            <button
              aria-label={`Add one ${product.name}`}
              onClick={onAddToCart}
              disabled={outOfStock || cartQuantity >= product.quantity}
            >
              +
            </button>
          </div>
        </div>

        <div className="subtotal-row">
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>

        <div className="card-actions">
          <Link className="button button-outline" to={`/product/${product.id}`}>
            Cupcake Details
          </Link>
          <button
            className="button button-primary"
            onClick={onAddToCart}
            disabled={outOfStock || cartQuantity >= product.quantity}
          >
            {outOfStock
              ? "Sold Out"
              : cartQuantity >= product.quantity
                ? "Box is Full"
                : "Add to Box"}
          </button>
        </div>
      </div>
    </article>
  );
}
