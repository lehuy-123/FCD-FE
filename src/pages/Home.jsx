import React, { useState, useEffect } from 'react';
import { ArrowRight, Drill, Hammer, Shovel, Building, Users, ShieldCheck, ChevronRight } from 'lucide-react';
import './Home.css';
import { Link } from 'react-router-dom';

const bannerImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541888052163-f932e673baea?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop'
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div 
          className="hero-bg-container" 
          style={{ backgroundImage: `url(${bannerImages[currentSlide]})` }}
        ></div>
        <div className="hero-overlay"></div>
        <div className="container hero-content fade-in">
          <h1>Xây dựng <span className="highlight">Tương lai</span> với Kính và Nhôm</h1>
          <p>
            Chúng tôi cung cấp giải pháp mặt dựng, nhôm kính và vật liệu ốp ngoại thất với công nghệ chuyển giao Châu Âu, đảm bảo chất lượng, độ bền và tính thẩm mỹ cho công trình.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="primary-btn">Bắt đầu Dự án <ArrowRight size={18} /></Link>
            <Link to="/shop" className="secondary-btn">Xem Vật liệu</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <div className="feature-card glass fade-in">
          <Drill size={40} color="#475569" />
          <h3>Tay nghề Chuyên gia</h3>
          <p>Đội ngũ kỹ sư và thợ xây dựng của chúng tôi mang lại độ chính xác hàng đầu trong mỗi dự án.</p>
        </div>
        <div className="feature-card glass fade-in" style={{ animationDelay: '0.2s' }}>
          <ShieldCheck size={40} color="#475569" />
          <h3>Vật liệu Cao cấp</h3>
          <p>Chúng tôi chỉ sử dụng các vật liệu nhôm và kính tốt nhất để đảm bảo độ bền và tính thẩm mỹ.</p>
        </div>
        <div className="feature-card glass fade-in" style={{ animationDelay: '0.4s' }}>
          <Building size={40} color="#475569" />
          <h3>Mặt dựng Hiện đại</h3>
          <p>Mang đến những góc nhìn đường chân trời ngoạn mục với các thiết kế kết cấu tiên tiến.</p>
        </div>
      </section>

      {/* About / Expertise Section */}
      <section className="about-snippet container">
        <div className="about-text fade-in">
          <h2>Làm chủ Kiến trúc <span className="highlight">Nhôm</span> & Kính</h2>
          <p>Trong hơn một thập kỷ, FACADES luôn đi đầu trong thiết kế tòa nhà hiện đại. Chúng tôi chuyên về cải tạo ngoại thất, hệ thống tường kính và lắp đặt tấm composite nhôm độ bền cao.</p>
          <ul className="expertise-list">
            <li><ChevronRight className="highlight" size={20}/> Hệ thống Tường kính Tiên tiến</li>
            <li><ChevronRight className="highlight" size={20}/> Khung Nhôm định hình</li>
            <li><ChevronRight className="highlight" size={20}/> Kính kết cấu & Mái che</li>
          </ul>
          <Link to="/about" className="text-link">Tìm hiểu thêm về hành trình của chúng tôi <ArrowRight size={16}/></Link>
        </div>
        <div className="about-image glass fade-in" style={{ animationDelay: '0.2s' }}>
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" alt="Kiến trúc Hiện đại" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-overlay"></div>
        <div className="container stats-container">
          <div className="stat-box fade-in">
            <h2>150+</h2>
            <p>Dự án Hoàn thành</p>
          </div>
          <div className="stat-box fade-in" style={{ animationDelay: '0.2s' }}>
            <h2>15<span className="highlight">+</span></h2>
            <p>Năm Kinh nghiệm</p>
          </div>
          <div className="stat-box fade-in" style={{ animationDelay: '0.4s' }}>
            <h2>50<span className="highlight">+</span></h2>
            <p>Giải thưởng Ngành</p>
          </div>
          <div className="stat-box fade-in" style={{ animationDelay: '0.6s' }}>
            <h2><Users size={40} color="var(--primary)" /></h2>
            <p>Kỹ sư Chuyên gia</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section container fade-in">
        <div className="cta-content glass">
          <h2>Sẵn sàng biến đổi tòa nhà của bạn?</h2>
          <p>Liên hệ với các chuyên gia của chúng tôi ngay hôm nay để được tư vấn cao cấp và ước tính kỹ thuật mặt dựng.</p>
          <Link to="/contact" className="primary-btn">Liên hệ ngay <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
