import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, ShoppingBag, LogOut, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Layout className="logo-icon" />
          <span>FACADES</span>
        </Link>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Trang chủ</Link>
          <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>Giới thiệu</Link>
          <Link to="/projects" className="nav-link" onClick={() => setMenuOpen(false)}>Dự án</Link>
          <Link to="/shop" className="nav-link" onClick={() => setMenuOpen(false)}>Vật liệu</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Liên hệ</Link>
          
          {user && user.role === 'admin' && (
            <Link to="/admin" className="nav-link admin-btn" onClick={() => setMenuOpen(false)}>Quản trị</Link>
          )}

          {user ? (
            <div className="user-menu-item">
              <span className="user-name">
                <UserIcon size={16} />
                <span>{user.username}</span>
              </span>
              <button onClick={logout} className="logout-btn" title="Đăng xuất">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link login-btn" onClick={() => setMenuOpen(false)}>Đăng nhập</Link>
          )}

          <Link to="/cart" className="cart-btn" onClick={() => setMenuOpen(false)}>
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>
        <button
          className={`mobile-toggle ${menuOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
