import { Link } from "react-router-dom";

function CartPage({ cart, onUpdateQuantity, onRemove }) {
  const formatPrice = (price) =>
    `₱${Number(price).toFixed(2)}`;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="container">
        <h1>My Box 🧁</h1>
        <div className="empty-cart">
          <h2>Your box is empty!</h2>
          <p>Add your favorite cupcakes to see them here.</p>
          <Link to="/" className="btn">
            Browse Cupcakes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>My Box 🧁</h1>
      <p>Your selected cupcakes are here!</p>

      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              className="cart-image"
            />

            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>{formatPrice(item.price)} each</p>

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    onUpdateQuantity(
                      item.id,
                      item.quantity - 1
                    )
                  }
                  disabled={item.quantity <= 1}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    onUpdateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  }
                >
                  +
                </button>
              </div>

              <p>
                Subtotal:{" "}
                <strong>
                  {formatPrice(item.price * item.quantity)}
                </strong>
              </p>

              <button
                className="remove-btn"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Order Summary</h2>
        <h3>Total: {formatPrice(total)}</h3>

        <Link to="/" className="btn">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default CartPage;
