import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, ShoppingBag, LogOut, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Layout className="logo-icon" />
          <span>FACADES</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Trang chủ</Link>
          <Link to="/about" className="nav-link">Giới thiệu</Link>
          <Link to="/projects" className="nav-link">Dự án</Link>
          <Link to="/shop" className="nav-link">Vật liệu</Link>
          <Link to="/contact" className="nav-link">Liên hệ</Link>
          
          {user && user.role === 'admin' && (
            <Link to="/admin" className="nav-link admin-btn">Quản trị</Link>
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
            <Link to="/login" className="nav-link login-btn">Đăng nhập</Link>
          )}

          <Link to="/cart" className="cart-btn">
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
