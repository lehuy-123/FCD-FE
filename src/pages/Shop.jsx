import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import API from '../api/api';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get(`/products?keyword=${keyword}&category=${category}&pageNumber=${page}`);
      setProducts(res.data.products);
      setPages(res.data.pages);
    } catch (err) {
      setError(err.response?.data?.message || "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  if (loading) return <div className="loader">Đang tải Vật liệu...</div>;

  return (
    <div className="shop container">
      <header className="shop-header">
        <h1>Vật liệu <span className="highlight">Xây dựng</span></h1>
        <p>Vật liệu cao cấp cho các dự án xây dựng của bạn.</p>
      </header>

      <div className="shop-controls fade-in">
        <form className="search-box" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Tìm kiếm vật liệu..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">Tìm</button>
        </form>
        
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
          <option value="">Tất cả danh mục</option>
          <option value="Structural">Kết cấu (Structural)</option>
          <option value="Materials">Vật tư (Materials)</option>
          <option value="Interior">Nội thất (Interior)</option>
        </select>
      </div>

      {error ? (
        <div className="error-message glass fade-in">
          <p>{error}</p>
          <button onClick={fetchProducts}>Thử lại</button>
        </div>
      ) : (
        <>
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

          {pages > 1 && (
            <div className="pagination">
              {[...Array(pages).keys()].map((x) => (
                <button 
                  key={x + 1} 
                  className={x + 1 === page ? 'active' : ''}
                  onClick={() => setPage(x + 1)}
                >
                  {x + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
