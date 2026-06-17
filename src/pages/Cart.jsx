import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, User, Phone, MapPin, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', notes: '' });
  const [status, setStatus] = useState('');
  const [showQR, setShowQR] = useState(() => {
    return localStorage.getItem('facades_show_qr') === 'true';
  });
  const [orderInfo, setOrderInfo] = useState(() => {
    const saved = localStorage.getItem('facades_order_info');
    return saved ? JSON.parse(saved) : null;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Giỏ hàng đang trống!');
    setStatus('Đang xử lý...');
    
    try {
      const res = await axios.post('http://localhost:5000/api/orders', {
        customer: formData,
        items: cart,
        total: total
      });
      const orderData = { id: res.data.orderId, total: total };
      setOrderInfo(orderData);
      localStorage.setItem('facades_order_info', JSON.stringify(orderData));
      
      setStatus(`Đặt hàng thành công! Mã đơn hàng: ${res.data.orderId}. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.`);
      setShowQR(true);
      localStorage.setItem('facades_show_qr', 'true');
      
      clearCart();
      setFormData({ name: '', phone: '', address: '', notes: '' });
    } catch (err) {
      console.error(err);
      setStatus('Đặt hàng thất bại.');
    }
  };

  if (cart.length === 0 && !status) return (
    <div className="cart-empty container fade-in">
      <ShoppingBag size={80} color="var(--primary)" strokeWidth={1} />
      <h2>Giỏ hàng của bạn đang trống</h2>
      <p>Có vẻ như bạn chưa thêm vật liệu cao cấp nào vào giỏ hàng.</p>
      <Link to="/shop" className="primary-btn mt-4">Xem Vật liệu</Link>
    </div>
  );

  return (
    <div className="cart-page container fade-in">
      <header className="cart-header">
        <h1>Thanh toán <span className="highlight">An toàn</span></h1>
        <p>Kiểm tra lại đơn hàng và cung cấp thông tin để hoàn tất.</p>
      </header>

      {status && (
        <div className="status-banner fade-in">
          <CheckCircle2 size={40} color="#10b981" />
          <p>{status}</p>
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-content">
          <div className="cart-items glass">
            <h2>Chi tiết Đơn hàng</h2>
            <div className="items-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>{item.price.toLocaleString()} VNĐ</p>
                  </div>
                  <div className="item-actions">
                    <input 
                      type="number" 
                      min="1" 
                      className="qty-input"
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} 
                    />
                    <button onClick={() => removeFromCart(item.id)} className="delete-btn" aria-label="Remove item">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Tổng cộng dự kiến</h3>
              <span className="total-price">{total.toLocaleString()} VNĐ</span>
            </div>
          </div>

          <form className="checkout-form glass" onSubmit={handleSubmit}>
            <h2>Thông tin Thanh toán</h2>
            
            <div className="form-group">
              <label><User size={18} className="form-icon"/> Họ và Tên</label>
              <input 
                className="form-input" 
                required 
                type="text" 
                placeholder="Nguyễn Văn A"
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            
            <div className="form-group">
              <label><Phone size={18} className="form-icon"/> Số điện thoại</label>
              <input 
                className="form-input" 
                required 
                type="tel" 
                placeholder="090 123 4567"
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
              />
            </div>
            
            <div className="form-group">
              <label><MapPin size={18} className="form-icon"/> Địa chỉ Giao hàng</label>
              <textarea 
                className="form-input" 
                required 
                placeholder="123 Đường Kiến Trúc, Quận 1, TP. HCM"
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})}
              ></textarea>
            </div>
            
            <div className="form-group">
              <label><FileText size={18} className="form-icon"/> Ghi chú (Tùy chọn)</label>
              <textarea 
                className="form-input" 
                placeholder="Hướng dẫn giao hàng đặc biệt..."
                value={formData.notes} 
                onChange={e => setFormData({...formData, notes: e.target.value})}
              ></textarea>
            </div>
            
            <button type="submit" className="primary-btn submit-btn">
              <ShieldCheck size={20} /> Xác nhận & Thanh toán
            </button>
          </form>
        </div>
      )}
      {showQR && orderInfo && (
        <div className="qr-overlay fade-in">
          <div className="qr-modal glass">
            <div className="qr-header">
              <h2>Thanh toán qua <span className="highlight">VietQR</span></h2>
              <button className="close-btn" onClick={() => {
                setShowQR(false);
                localStorage.removeItem('facades_show_qr');
                localStorage.removeItem('facades_order_info');
              }}>&times;</button>
            </div>
            <div className="qr-body">
              <p>Vui lòng quét mã QR dưới đây để thực hiện thanh toán cho đơn hàng <strong>#{orderInfo.id.substring(0, 8)}</strong></p>
              <div className="qr-image-container">
                <img 
                  src={`https://img.vietqr.io/image/VPB-0948737366-compact.png?amount=${orderInfo.total}&addInfo=THANH TOAN DON HANG ${orderInfo.id.substring(0, 8)}&accountName=CONG TY FACADES`} 
                  alt="VietQR Payment"
                />
              </div>
              <div className="qr-details">
                <p><strong>Ngân hàng:</strong> VP Bank</p>
                <p><strong>Số tài khoản:</strong> 0948737366</p>
                <p><strong>Chủ tài khoản:</strong> CONG TY FACADES</p>
                <p><strong>Số tiền:</strong> {orderInfo.total.toLocaleString()} VNĐ</p>
                <p><strong>Nội dung:</strong> THANH TOAN DON HANG {orderInfo.id.substring(0, 8)}</p>
              </div>
            </div>
            <div className="qr-footer">
              <p className="note">Sau khi thanh toán xong, chúng tôi sẽ xác nhận và giao hàng trong vòng 2-3 ngày làm việc.</p>
              <button className="confirm-btn primary-btn" onClick={() => {
                setShowQR(false);
                localStorage.removeItem('facades_show_qr');
                localStorage.removeItem('facades_order_info');
              }}>Tôi đã thanh toán</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
