
import { useMemo, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import initialProducts from "./data/product";
import Header from "./assets/components/Header";
import ProductCard from "./assets/components/ProductCard";
import ProductForm from "./assets/components/ProductForm";
import ProductDetail from "./assets/components/ProductDetail";
import CartPage from "./assets/components/CartPage";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter(
    (product) => category === "All" || product.category === category
  );

  // Convert the cart object into an array for CartPage.
  const cartItems = useMemo(
    () =>
      products
        .filter((product) => (cart[product.id] || 0) > 0)
        .map((product) => ({
          ...product,
          quantity: cart[product.id],
        })),
    [products, cart]
  );

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addProduct(product) {
    setProducts((current) => [...current, product]);
    setShowForm(false);
  }

  function addToCart(product) {
    setCart((current) => {
      const currentQuantity = current[product.id] || 0;

      if (currentQuantity >= product.quantity) {
        return current;
      }

      return {
        ...current,
        [product.id]: currentQuantity + 1,
      };
    });
  }

  // Sets the cart quantity to the requested new quantity.
  function updateCartQuantity(productId, newQuantity) {
    const product = products.find(
      (item) => item.id === productId
    );

    if (!product) return;

    setCart((current) => {
      if (newQuantity <= 0) {
        const updatedCart = { ...current };
        delete updatedCart[productId];
        return updatedCart;
      }

      if (newQuantity > product.quantity) {
        return current;
      }

      return {
        ...current,
        [productId]: newQuantity,
      };
    });
  }

  function removeFromCart(productId) {
    setCart((current) => {
      const updatedCart = { ...current };
      delete updatedCart[productId];
      return updatedCart;
    });
  }

  function changeQuantity(productId, change) {
    const currentQuantity = cart[productId] || 0;
    updateCartQuantity(productId, currentQuantity + change);
  }

  return (
    <>
      <Header cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <main className="container">
              <section className="hero">
                <div className="hero-copy">
                  <span className="eyebrow">
                    SMALL BATCHES, BIG SMILES
                  </span>

                  <h1>A little swirl of happiness.</h1>

                  <p>
                    Handcrafted cupcakes, baked fresh and topped with love.
                    Pick your favorites and make today a little sweeter.
                  </p>

                  <button
                    className="button button-primary"
                    onClick={() => setShowForm((value) => !value)}
                  >
                    {showForm ? "Close Form" : "+ Create a Cupcake"}
                  </button>
                </div>

                <div className="hero-art" aria-hidden="true">
                  <span>🧁</span>
                  <small>BAKED WITH LOVE</small>
                </div>
              </section>

              {showForm && (
                <ProductForm onAddProduct={addProduct} />
              )}

              <section className="section-heading">
                <div>
                  <span className="eyebrow">FRESH FROM OUR OVEN</span>
                  <h2>Today’s cupcakes</h2>
                </div>

                <label className="filter">
                  Flavor
                  <select
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </section>

              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cartQuantity={cart[product.id] || 0}
                    onAddToCart={() => addToCart(product)}
                    onChangeQuantity={(change) =>
                      changeQuantity(product.id, change)
                    }
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <p className="empty-state">
                  No cupcakes in this flavor yet.
                </p>
              )}

              <section className="total-panel">
                <div>
                  <span className="eyebrow">
                    SOMETHING SWEET IS WAITING
                  </span>
                  <h2>Your cupcake box</h2>
                </div>

                <strong>{formatPrice(total)}</strong>

                <Link className="button button-dark" to="/cart">
                  View My Box ({cartCount})
                </Link>
              </section>
            </main>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetail
              products={products}
              cart={cart}
              onAddToCart={addToCart}
            />
          }
        />

       <Route
  path="/cart"
  element={
    <CartPage
      cart={cartItems}
      onUpdateQuantity={updateCartQuantity}
      onRemove={removeFromCart}
    />
  }
/>

        <Route
          path="*"
          element={
            <section className="empty-state">
              <h2>Page not found</h2>
              <Link to="/">Back to the bakery</Link>
            </section>
          }
        />
      </Routes>

      <footer className="footer">
        Baked fresh with love at Sweet Crumbs · A little treat for your day
      </footer>
    </>
  );
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(price);
}
