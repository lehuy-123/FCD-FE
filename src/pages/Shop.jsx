import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="loader">Đang tải Vật liệu...</div>;

  return (
    <div className="shop container">
      <header className="shop-header">
        <h1>Vật liệu <span className="highlight">Xây dựng</span></h1>
        <p>Vật liệu cao cấp cho các dự án xây dựng của bạn.</p>
      </header>

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card glass fade-in">
            <Link to={`/shop/${product.id}`} className="product-image">
              <img src={product.image} alt={product.name} />
              <span className="category-tag">{product.category}</span>
            </Link>
            <div className="product-info">
              <Link to={`/shop/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
              <p>{product.description}</p>
              <div className="product-footer">
                <span className="price">{product.price.toLocaleString()} VNĐ</span>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
