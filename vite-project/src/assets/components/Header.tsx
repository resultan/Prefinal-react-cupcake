import { Link, NavLink } from "react-router-dom";

export default function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-icon" aria-hidden="true">🧁</span>
          <span>Sweet<span className="brand-light">Crumbs</span></span>
        </Link>

        <nav className="nav">
          <NavLink to="/">Cupcakes</NavLink>
          <NavLink to="/cart">
            My Box <span className="cart-badge">{cartCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}