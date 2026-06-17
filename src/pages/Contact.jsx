import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact container">
      <header className="contact-header">
        <h1>Liên <span className="highlight">hệ</span></h1>
        <p>Sẵn sàng bắt đầu dự án tiếp theo của bạn? Chúng tôi ở đây để giúp đỡ.</p>
      </header>

      <div className="contact-content">
        <div className="contact-info glass fade-in">
          <h2>Thông tin Liên hệ</h2>
          <p className="info-desc">Liên hệ với đội ngũ của chúng tôi để được giải đáp, báo giá hoặc hỗ trợ.</p>

          <div className="info-item">
            <div className="info-icon"><MapPin size={24} /></div>
            <div>
              <h3>CÔNG TY TNHH THƯƠNG MẠI GIẢI PHÁP FACADE</h3>
              <p>(FACADE SOLUTIONS TRADING Co., Ltd)</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><MapPin size={24} /></div>
            <div>
              <h3>Địa chỉ</h3>
              <p>Số 115C Nguyễn Ảnh Thủ, Tổ 63, Khu phố 6, P. Trung Mỹ Tây, Q.12, Tp.HCM</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><Phone size={24} /></div>
            <div>
              <h3>Điện thoại / Fax</h3>
              <p>Điện thoại: (+84) 283.636.2370<br/>Fax: (+84) 283.636.2371</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><Mail size={24} /></div>
            <div>
              <h3>Email</h3>
              <p>info@facades.vn</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><Clock size={24} /></div>
            <div>
              <h3>Mã số thuế</h3>
              <p>0313990323</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><MapPin size={24} /></div>
            <div>
              <h3>Tài khoản ngân hàng</h3>
              <p>Số tài khoản: 060134420653 tại Ngân hàng Sacombank – CN Quận 12</p>
            </div>
          </div>
        </div>

        <form className="contact-form glass fade-in" style={{ animationDelay: '0.2s' }}>
          <h2>Gửi tin nhắn</h2>

          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" placeholder="Họ và tên" />
          </div>

          <div className="form-group">
            <label>Địa chỉ</label>
            <input type="text" placeholder="Địa chỉ của bạn" />
          </div>

          <div className="form-group">
            <label>Điện thoại</label>
            <input type="tel" placeholder="Số điện thoại" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="email@ví dụ.com" />
          </div>

          <div className="form-group">
            <label>Tiêu đề</label>
            <input type="text" placeholder="Tiêu đề" />
          </div>

          <div className="form-group">
            <label>Nội dung</label>
            <textarea placeholder="Nội dung tin nhắn..."></textarea>
          </div>

          <button type="button" className="primary-btn submit-btn">GỬI</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
