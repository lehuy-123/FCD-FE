import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (product) {
        document.title = `${product.name} - FACADES Construction`;
    }
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct({
          ...res.data,
          // Fallback specs in case backend doesn't have them
          specs: res.data.specs || {
             "Weight": "50kg",
             "Dimensions": "Standard",
             "Certification": "ISO 9001",
             "Manufacturer": "FACADES Core"
          }
        });
      } catch (err) {
        console.error("Error fetching product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loader">Đang tải chi tiết vật liệu...</div>;
  if (!product) return <div className="loader">Không tìm thấy sản phẩm. <Link to="/shop">Quay lại</Link></div>;

  const handleAddToCart = () => {
    // Basic fix to add multiple sizes or quantities instantly to cart
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng thành công!`);
  };

  return (
    <article className="product-detail container fade-in">
      <nav className="breadcrumbs">
        <Link to="/">Trang chủ</Link> <ChevronRight size={16} />
        <Link to="/shop">Vật liệu</Link> <ChevronRight size={16} />
        <span className="current">{product.name}</span>
      </nav>

      <div className="product-main glass">
        <div className="product-gallery">
          <img src={product.image} alt={product.name} className="main-image" />
          <div className="thumbnail-strip">
             <img src={product.image} alt="Thumb 1" className="active" />
             <div className="thumb-placeholder">Image 2</div>
             <div className="thumb-placeholder">Image 3</div>
          </div>
        </div>
        
        <div className="product-info-box">
          <span className="category-tag-inline">{product.category}</span>
          <h1 className="seo-title">{product.name}</h1>
          <p className="product-id">SKU: FAC-{product.id}</p>
          
          <div className="price-block">
             <p className="price">{product.price.toLocaleString()} VNĐ</p>
             <span className="stock-status"><Check size={16}/> Còn hàng</span>
          </div>

          <p className="short-desc">{product.description}</p>
          
          <div className="action-row">
            <div className="quantity-selector">
               <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
               <input type="number" value={quantity} readOnly />
               <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="primary-btn add-btn flex-1" onClick={handleAddToCart}>
              <ShoppingCart size={20} /> Thêm vào giỏ hàng
            </button>
          </div>

          <div className="benefits-list">
            <div className="benefit-item">
              <ShieldCheck color="var(--primary)" size={24} />
              <div>
                <strong>Chất lượng được Chứng nhận</strong>
                <p>Đáp ứng mọi tiêu chuẩn an toàn quốc tế.</p>
              </div>
            </div>
            <div className="benefit-item">
              <Truck color="var(--primary)" size={24} />
              <div>
                <strong>Giao hàng trực tiếp</strong>
                <p>Giao hàng trực tiếp đến công trường của bạn.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-tabs glass mt-4">
        <div className="tab-headers">
           <button className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>Mô tả</button>
           <button className={activeTab === 'specs' ? 'active' : ''} onClick={() => setActiveTab('specs')}>Thông số kỹ thuật</button>
           <button className={activeTab === 'shipping' ? 'active' : ''} onClick={() => setActiveTab('shipping')}>Thông tin vận chuyển</button>
        </div>
        <div className="tab-content">
           {activeTab === 'description' && (
              <div className="fade-in">
                 <h3>Về vật liệu này</h3>
                 <p>{product.description}</p>
                 <br />
                 <p>Chúng tôi đảm bảo rằng vật liệu của chúng tôi được lấy từ các nhà sản xuất tốt nhất toàn cầu để cung cấp tính toàn vẹn về mặt cấu trúc cho các tòa nhà của bạn. Lý tưởng cho cả dự án dân dụng và thương mại. Đối với các đơn đặt hàng số lượng lớn, vui lòng liên hệ trực tiếp với đội ngũ hỗ trợ của chúng tôi để được báo giá chuyên biệt và lập kế hoạch vận chuyển.</p>
              </div>
           )}
           {activeTab === 'specs' && (
              <div className="fade-in specs-grid">
                 {Object.entries(product.specs).map(([key, val]) => (
                    <div className="spec-item" key={key}>
                       <span className="spec-label">{key}</span>
                       <span className="spec-value">{val}</span>
                    </div>
                 ))}
                 {!product.specs['Fire Rating'] && (
                     <div className="spec-item">
                       <span className="spec-label">Fire Rating</span>
                       <span className="spec-value">Class A</span>
                     </div>
                 )}
              </div>
           )}
           {activeTab === 'shipping' && (
              <div className="fade-in">
                 <h3>Hậu cần và Vận chuyển</h3>
                 <p>Tất cả vật liệu được vận chuyển bằng đội xe chuyên dụng của chúng tôi. Vui lòng đảm bảo công trường của bạn có lối vào thích hợp cho các phương tiện giao hàng lớn.</p>
                 <br/>
                 <ul>
                    <li><strong>Giao hàng Tiêu chuẩn:</strong> 2-4 ngày làm việc</li>
                    <li><strong>Giao hàng Hỏa tốc:</strong> 24 giờ (Tùy thuộc vào tình trạng hàng hóa)</li>
                 </ul>
              </div>
           )}
        </div>
      </div>
    </article>
  );
};

export default ProductDetail;
