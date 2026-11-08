import { useState } from "react";

const emptyForm = {
  image: "",
  name: "",
  category: "",
  description: "",
  specifications: "",
  rating: "",
  price: "",
  quantity: "",
};

export default function ProductForm({ onAddProduct }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (Object.values(form).some((value) => !value.trim())) {
      setError("Please fill in every field.");
      return;
    }

    const rating = Number(form.rating);
    const price = Number(form.price);
    const quantity = Number(form.quantity);

    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      setError("Rating must be between 0 and 5.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {
      setError("Quantity must be a whole number of zero or more.");
      return;
    }

    try {
      new URL(form.image);
    } catch {
      setError("Please enter a valid cupcake photo URL.");
      return;
    }

    onAddProduct({
      id: Date.now(),
      ...form,
      rating,
      price,
      quantity,
    });

    setForm(emptyForm);
  }

  return (
    <section className="form-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A NEW BAKERY FAVORITE</span>
          <h2>Create a cupcake</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Cupcake Photo URL
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/cupcake.jpg"
              required
            />
          </label>

          <label>
            Cupcake Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Raspberry Rose"
              required
            />
          </label>

          <label>
            Flavor
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Chocolate"
              required
            />
          </label>

          <label>
            Rating (0–5)
            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={handleChange}
              required
            />
          </label>

          <label className="full-width">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </label>

          <label className="full-width">
            Cake & frosting
            <textarea
              name="specifications"
              value={form.specifications}
              onChange={handleChange}
              rows="2"
              required
            />
          </label>

          <label>
            Price (PHP)
            <input
              name="price"
              type="number"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Baked today
            <input
              name="quantity"
              type="number"
              min="0"
              step="1"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {error && <p className="error-message" role="alert">{error}</p>}

        <button className="button button-primary" type="submit">
          Add to today’s menu
        </button>
      </form>
    </section>
  );
}