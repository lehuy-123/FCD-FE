import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import './Auth.css';

const Auth = () => {
  const { user, login, register, error, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial state based on pathname or state
  const isRegisterPage = location.pathname === '/register';
  const [isLogin, setIsLogin] = useState(!isRegisterPage);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync state with URL pathname changes
  useEffect(() => {
    setIsLogin(location.pathname !== '/register');
    setFormError('');
    setError(null);
  }, [location.pathname, setError]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormError('');
    setError(null);
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setFormError('Vui lòng nhập Email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Vui lòng nhập địa chỉ email hợp lệ');
      return false;
    }
    if (!isLogin) {
      if (!formData.username.trim()) {
        setFormError('Vui lòng nhập tên người dùng');
        return false;
      }
      if (formData.username.length < 3) {
        setFormError('Tên người dùng phải có ít nhất 3 ký tự');
        return false;
      }
    }
    if (!formData.password) {
      setFormError('Vui lòng nhập mật khẩu');
      return false;
    }
    if (formData.password.length < 6) {
      setFormError('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setFormError('Mật khẩu không khớp');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.username, formData.email, formData.password);
    }
    setLoading(false);

    if (result && result.success) {
      // Handled by useEffect redirect
    }
  };

  return (
    <div className="auth-container container">
      <div className="auth-wrapper glass fade-in">
        <div className="auth-left">
          <div className="brand-badge">
            <ShieldCheck size={20} className="badge-icon" />
            <span>Vật liệu & Mặt dựng Cao cấp</span>
          </div>
          <h1>{isLogin ? 'Chào mừng quay lại' : 'Tham gia FACADES'}</h1>
          <p>
            {isLogin 
              ? 'Truy cập các dự án cá nhân của bạn, xem các vật liệu cao cấp và quản lý đơn hàng một cách liền mạch.' 
              : 'Tạo tài khoản để bắt đầu cấu hình dự án của bạn, đặt hàng vật liệu cao cấp và quản lý hóa đơn.'}
          </p>
          <div className="features-list">
            <div className="feature-item">
              <span className="bullet">✓</span>
              <span>Đặt hàng các thành phần cấu trúc cao cấp & tấm ACP</span>
            </div>
            <div className="feature-item">
              <span className="bullet">✓</span>
              <span>Tạo báo giá theo thời gian thực nâng cao & quản lý giỏ hàng</span>
            </div>
            <div className="feature-item">
              <span className="bullet">✓</span>
              <span>Bảng điều khiển khách hàng chuyên dụng & theo dõi đơn hàng chuyên nghiệp</span>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-toggle">
            <button 
              className={`toggle-tab ${isLogin ? 'active' : ''}`}
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </button>
            <button 
              className={`toggle-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => navigate('/register')}
            >
              Đăng ký
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {(formError || error) && (
              <div className="error-alert">
                <span>{formError || error}</span>
              </div>
            )}

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="username">Tên người dùng</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nhập tên người dùng của bạn"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Địa chỉ Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Nhập mật khẩu của bạn"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="pwd-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <span>{isLogin ? 'Đăng nhập vào tài khoản' : 'Đăng ký tài khoản mới'}</span>
                  <ArrowRight size={18} className="submit-arrow" />
                </>
              )}
            </button>
          </form>

          <p className="auth-footer">
            {isLogin ? (
              <>
                Bạn chưa có tài khoản?{' '}
                <Link to="/register" className="auth-link">Đăng ký ngay</Link>
              </>
            ) : (
              <>
                Bạn đã có tài khoản?{' '}
                <Link to="/login" className="auth-link">Đăng nhập</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
