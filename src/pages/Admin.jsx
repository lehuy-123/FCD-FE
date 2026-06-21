import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { 
  PlusCircle, Package, Image as ImageIcon, Tag, DollarSign, FileText, 
  LayoutDashboard, ShoppingBag, Trash2, Edit, X, ClipboardList, CheckCircle, Clock, Truck,
  Building, MapPin, User as UserIcon, Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Dashboard navigation tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // Products, Orders, and Projects data
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form data for adding a product
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    images: '', // Comma separated string
    specs: [{ key: 'Weight', value: '' }, { key: 'Dimensions', value: '' }]
  });

  // Form data for adding a project
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    category: '',
    image: '',
    location: '',
    client: '',
    completion_date: '',
    description: ''
  });

  // Editing state for products
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    images: '',
    specs: []
  });

  // Editing state for projects
  const [editingProject, setEditingProject] = useState(null);
  const [editProjectFormData, setEditProjectFormData] = useState({
    title: '',
    category: '',
    image: '',
    location: '',
    client: '',
    completion_date: '',
    description: ''
  });

  const handleSpecChange = (index, field, value, isEdit = false) => {
    const setter = isEdit ? setEditFormData : setFormData;
    const data = isEdit ? editFormData : formData;
    const newSpecs = [...data.specs];
    newSpecs[index][field] = value;
    setter({ ...data, specs: newSpecs });
  };

  const addSpecField = (isEdit = false) => {
    const setter = isEdit ? setEditFormData : setFormData;
    const data = isEdit ? editFormData : formData;
    setter({ ...data, specs: [...data.specs, { key: '', value: '' }] });
  };

  const removeSpecField = (index, isEdit = false) => {
    const setter = isEdit ? setEditFormData : setFormData;
    const data = isEdit ? editFormData : formData;
    const newSpecs = data.specs.filter((_, i) => i !== index);
    setter({ ...data, specs: newSpecs });
  };

  // Block access to non-admins
  if (!user || user.role !== 'admin') {
    return (
      <div className="admin container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="glass fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px', borderRadius: '16px' }}>
          <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Truy cập bị từ chối</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Bạn không có quyền quản trị cần thiết để truy cập bảng điều khiển này.</p>
          <button onClick={() => navigate('/')} style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600' }}>
            Quay lại Trang chủ
          </button>
        </div>
      </div>
    );
  }

  // Fetch products, orders, and projects
  const fetchData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      // Use higher pageSize for admin management
      const prodRes = await API.get('/products?pageSize=100');
      setProducts(prodRes.data.products || []);

      const orderRes = await API.get('/orders');
      setOrders(orderRes.data || []);

      const projectRes = await API.get('/projects?pageSize=100');
      setProjects(projectRes.data.projects || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setErrorMsg('Không thể tải dữ liệu từ máy chủ. Vui lòng kiểm tra quyền truy cập.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter(order => order.status !== 'Cancelled')
    .reduce((sum, order) => sum + order.total, 0);

  // Submit handler for adding a product
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setStatus('Đang thêm...');
    
    // Process specs array to object
    const specsObj = {};
    formData.specs.forEach(s => {
      if (s.key && s.value) specsObj[s.key] = s.value;
    });

    // Process images
    const imagesArray = formData.images ? formData.images.split(',').map(s => s.trim()) : [formData.image];

    try {
      const res = await API.post('/products', {
        ...formData,
        price: Number(formData.price),
        images: imagesArray,
        specs: specsObj
      });
      setStatus('Thêm sản phẩm thành công!');
      setFormData({ 
        name: '', description: '', price: '', category: '', image: '', images: '',
        specs: [{ key: 'Weight', value: '' }, { key: 'Dimensions', value: '' }]
      });
      setProducts(prev => [...prev, res.data]);
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setStatus('Lỗi khi thêm sản phẩm.');
    }
  };

  // Open edit modal for a product
  const startEditProduct = (product) => {
    // Process specs object back to array for easier editing
    const specsArray = product.specs ? Object.entries(product.specs).map(([key, value]) => ({ key, value })) : [];
    
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      images: product.images ? product.images.join(', ') : product.image,
      specs: specsArray.length > 0 ? specsArray : [{ key: '', value: '' }]
    });
  };

  // Submit handler for updating a product
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setStatus('Đang lưu thay đổi...');
    
    // Process specs array to object
    const specsObj = {};
    editFormData.specs.forEach(s => {
      if (s.key && s.value) specsObj[s.key] = s.value;
    });

    // Process images
    const imagesArray = editFormData.images ? editFormData.images.split(',').map(s => s.trim()) : [editFormData.image];

    try {
      const res = await API.put(`/products/${editingProduct.id}`, {
        ...editFormData,
        price: Number(editFormData.price),
        images: imagesArray,
        specs: specsObj
      });
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? res.data : p));
      setEditingProduct(null);
      setStatus('Cập nhật sản phẩm thành công!');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setStatus('Lỗi khi lưu thay đổi sản phẩm.');
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này không?')) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      setStatus('Xóa sản phẩm thành công.');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error(err);
      alert('Xóa sản phẩm thất bại.');
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (id, newStatus) => {
    try {
      const res = await API.put(`/orders/${id}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: res.data.status } : o));
    } catch (err) {
      console.error(err);
      alert('Cập nhật trạng thái đơn hàng thất bại.');
    }
  };

  // Delete order
  // Project Handlers
  const handleAddProjectSubmit = async (e) => {
    e.preventDefault();
    setStatus('Đang thêm dự án...');
    try {
      const res = await API.post('/projects', projectFormData);
      setStatus('Thêm dự án thành công!');
      setProjectFormData({
        title: '', category: '', image: '', location: '', client: '', completion_date: '', description: ''
      });
      setProjects(prev => [res.data, ...prev]);
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setStatus('Lỗi khi thêm dự án.');
    }
  };

  const startEditProject = (project) => {
    setEditingProject(project);
    setEditProjectFormData({
      title: project.title,
      category: project.category,
      image: project.image,
      location: project.location,
      client: project.client,
      completion_date: project.completion_date,
      description: project.description
    });
  };

  const handleEditProjectSubmit = async (e) => {
    e.preventDefault();
    setStatus('Đang cập nhật dự án...');
    try {
      const res = await API.put(`/projects/${editingProject.id}`, editProjectFormData);
      setProjects(prev => prev.map(p => p.id === editingProject.id ? res.data : p));
      setEditingProject(null);
      setStatus('Cập nhật dự án thành công!');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setStatus('Lỗi khi cập nhật dự án.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa dự án này không?')) return;
    try {
      await API.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
      setStatus('Xóa dự án thành công.');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error(err);
      alert('Xóa dự án thất bại.');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa bản ghi đơn hàng này không?')) return;
    try {
      await API.delete(`/orders/${id}`);
      setOrders(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      console.error(err);
      alert('Xóa đơn hàng thất bại.');
    }
  };

  return (
    <div className="admin container">
      <header className="admin-header">
        <h1>Bảng điều khiển <span className="highlight">Quản trị</span></h1>
        <p>Quản lý kho hàng, đơn hàng và các tham số kinh doanh.</p>
      </header>

      {errorMsg && (
        <div className="error-alert" style={{ marginBottom: '2rem' }}>
          {errorMsg}
        </div>
      )}

      {status && (
        <div className="status-toast" style={{ marginBottom: '2rem' }}>
          {status}
        </div>
      )}

      <div className="admin-layout">
        {/* Sidebar Nav */}
        <aside className="admin-sidebar glass">
          <button 
            className={`sidebar-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} />
            <span>Tổng quan</span>
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'add-product' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-product')}
          >
            <PlusCircle size={18} />
            <span>Thêm vật liệu</span>
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'manage-products' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage-products')}
          >
            <Package size={18} />
            <span>Quản lý sản phẩm</span>
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'manage-orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage-orders')}
          >
            <ClipboardList size={18} />
            <span>Quản lý đơn hàng</span>
            {orders.filter(o => o.status === 'Pending').length > 0 && (
              <span className="badge-pending">
                {orders.filter(o => o.status === 'Pending').length}
              </span>
            )}
          </button>
          
          <div className="sidebar-divider" style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1rem 0' }}></div>
          
          <button 
            className={`sidebar-tab ${activeTab === 'add-project' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-project')}
          >
            <PlusCircle size={18} />
            <span>Thêm dự án</span>
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'manage-projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage-projects')}
          >
            <Building size={18} />
            <span>Quản lý dự án</span>
          </button>
        </aside>

        {/* Content Pane */}
        <main className="admin-content-pane">
          {loading ? (
            <div className="loader">Đang tải dữ liệu bảng điều khiển...</div>
          ) : (
            <>
              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="tab-pane overview-pane fade-in">
                  <div className="stats-grid">
                    <div className="stat-card glass">
                      <div className="stat-icon-wrapper prod-icon">
                        <Package size={24} />
                      </div>
                      <div className="stat-details">
                        <h3>Tổng số vật liệu</h3>
                        <p className="stat-number">{totalProducts}</p>
                      </div>
                    </div>
                    <div className="stat-card glass">
                      <div className="stat-icon-wrapper order-icon">
                        <ShoppingBag size={24} />
                      </div>
                      <div className="stat-details">
                        <h3>Tổng số đơn hàng</h3>
                        <p className="stat-number">{totalOrders}</p>
                      </div>
                    </div>
                    <div className="stat-card glass">
                      <div className="stat-icon-wrapper rev-icon">
                        <DollarSign size={24} />
                      </div>
                      <div className="stat-details">
                        <h3>Tổng doanh thu</h3>
                        <p className="stat-number">{totalRevenue.toLocaleString()} VNĐ</p>
                      </div>
                    </div>
                  </div>

                  <div className="recent-orders glass" style={{ marginTop: '2.5rem', padding: '2rem' }}>
                    <h2>Hoạt động gần đây</h2>
                    {orders.length === 0 ? (
                      <p className="empty-text">Chưa có hoạt động đơn hàng nào.</p>
                    ) : (
                      <div className="activity-list">
                        {orders.slice(0, 5).map(o => (
                          <div key={o.id} className="activity-item">
                            <span className={`status-dot ${o.status.toLowerCase()}`}></span>
                            <div className="activity-desc">
                              <strong>Đơn hàng {o.id.substring(0, 8)}...</strong> đặt bởi <em>{o.customer.name}</em> với giá trị <strong>{o.total.toLocaleString()} VNĐ</strong>
                            </div>
                            <span className="activity-time">{new Date(o.createdAt).toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Add Product */}
              {activeTab === 'add-product' && (
                <div className="tab-pane fade-in">
                  <form className="admin-form glass" onSubmit={handleAddSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2><PlusCircle size={24} /> Thêm vật liệu mới</h2>
                    
                    <div className="form-group">
                      <label><Package size={18} /> Tên sản phẩm</label>
                      <input 
                        type="text" 
                        placeholder="VD: Thép kết cấu" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label><DollarSign size={18} /> Giá (VNĐ)</label>
                        <input 
                          type="number" 
                          placeholder="0" 
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label><Tag size={18} /> Category</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          required
                        >
                          <option value="">Chọn danh mục</option>
                          <option value="Materials">Vật liệu</option>
                          <option value="Structural">Kết cấu</option>
                          <option value="Tools">Công cụ</option>
                          <option value="Interior">Nội thất</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label><ImageIcon size={18} /> Ảnh đại diện (Main Image URL)</label>
                      <input 
                        type="text" 
                        placeholder="https://images.unsplash.com/..." 
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label><ImageIcon size={18} /> Ảnh bổ sung (Gallery URLs - Phân cách bằng dấu phẩy)</label>
                      <textarea 
                        placeholder="url1, url2, url3..." 
                        value={formData.images}
                        onChange={(e) => setFormData({...formData, images: e.target.value})}
                        rows="2"
                      ></textarea>
                      <p className="field-hint">Nhập các địa chỉ ảnh khác để làm bộ sưu tập chi tiết.</p>
                    </div>

                    <div className="form-group">
                      <label><ClipboardList size={18} /> Thông số kỹ thuật</label>
                      <div className="specs-builder">
                        {formData.specs.map((spec, index) => (
                          <div key={index} className="spec-input-row">
                            <input 
                              type="text" 
                              placeholder="Tên thông số (VD: Độ dày)" 
                              value={spec.key} 
                              onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                            />
                            <input 
                              type="text" 
                              placeholder="Giá trị (VD: 10mm)" 
                              value={spec.value} 
                              onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                            />
                            <button type="button" onClick={() => removeSpecField(index)} className="remove-spec-btn"><X size={14}/></button>
                          </div>
                        ))}
                        <button type="button" onClick={() => addSpecField()} className="add-spec-btn">+ Thêm thông số</button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label><FileText size={18} /> Mô tả tổng quan</label>
                      <textarea 
                        placeholder="Mô tả chi tiết về vật liệu..." 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="submit-btn primary-btn">Đăng sản phẩm</button>
                  </form>
                </div>
              )}

              {/* Tab 3: Manage Products */}
              {activeTab === 'manage-products' && (
                <div className="tab-pane fade-in">
                  <div className="glass table-wrapper" style={{ padding: '2rem' }}>
                    <h2>Kho sản phẩm ({products.length})</h2>
                    {products.length === 0 ? (
                      <p className="empty-text">Không có sản phẩm nào trong kho.</p>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Tên</th>
                            <th>Danh mục</th>
                            <th>Giá</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(p => (
                            <tr key={p.id}>
                              <td>
                                <img src={p.image} alt={p.name} className="table-img" />
                              </td>
                              <td className="bold">{p.name}</td>
                              <td><span className={`tag-${p.category.toLowerCase()} category-pill`}>{p.category}</span></td>
                              <td>{p.price.toLocaleString()} VNĐ</td>
                              <td>
                                <div className="action-buttons">
                                  <button onClick={() => startEditProduct(p)} className="edit-btn" title="Chỉnh sửa">
                                    <Edit size={16} />
                                  </button>
                                  <button onClick={() => handleDeleteProduct(p.id)} className="delete-btn" title="Xóa">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 4: Manage Orders */}
              {activeTab === 'manage-orders' && (
                <div className="tab-pane fade-in">
                  <div className="glass table-wrapper" style={{ padding: '2rem' }}>
                    <h2>Danh sách đơn hàng ({orders.length})</h2>
                    {orders.length === 0 ? (
                      <p className="empty-text">Không tìm thấy bản ghi đơn hàng nào.</p>
                    ) : (
                      <div className="orders-cards-list">
                        {orders.map(o => (
                          <div key={o.id} className="order-detail-card glass">
                            <div className="order-card-header">
                              <div>
                                <span className="order-id">MÃ ĐƠN HÀNG: {o.id}</span>
                                <span className="order-date">{new Date(o.createdAt).toLocaleString()}</span>
                              </div>
                              <div className="order-actions">
                                <select 
                                  value={o.status} 
                                  onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                                  className={`status-select ${o.status.toLowerCase()}`}
                                >
                                  <option value="Pending">Chờ xử lý</option>
                                  <option value="Processing">Đang xử lý</option>
                                  <option value="Shipped">Đã giao hàng</option>
                                  <option value="Completed">Hoàn thành</option>
                                  <option value="Cancelled">Đã hủy</option>
                                </select>
                                <button onClick={() => handleDeleteOrder(o.id)} className="delete-btn" title="Xóa bản ghi">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="order-card-body">
                              <div className="customer-info">
                                <h4>Chi tiết khách hàng</h4>
                                <p><strong>Tên:</strong> {o.customer.name}</p>
                                <p><strong>Số điện thoại:</strong> {o.customer.phone}</p>
                                <p><strong>Địa chỉ:</strong> {o.customer.address}</p>
                                {o.customer.notes && <p><strong>Ghi chú:</strong> {o.customer.notes}</p>}
                              </div>

                              <div className="ordered-items">
                                <h4>Chi tiết sản phẩm</h4>
                                <div className="ordered-items-list">
                                  {o.items.map((item, idx) => (
                                    <div key={idx} className="ordered-item">
                                      <img src={item.image} alt={item.name} />
                                      <div className="ordered-item-desc">
                                        <p className="bold">{item.name}</p>
                                        <p>{item.price.toLocaleString()} VNĐ x {item.quantity}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="order-card-footer">
                              <span>Tổng số tiền đã thanh toán:</span>
                              <span className="order-total">{o.total.toLocaleString()} VNĐ</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 5: Add Project */}
              {activeTab === 'add-project' && (
                <div className="tab-pane fade-in">
                  <form className="admin-form glass" onSubmit={handleAddProjectSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2><PlusCircle size={24} /> Thêm dự án mới</h2>
                    
                    <div className="form-group">
                      <label><Building size={18} /> Tên dự án</label>
                      <input 
                        type="text" 
                        placeholder="VD: Cao ốc Skyline" 
                        value={projectFormData.title}
                        onChange={(e) => setProjectFormData({...projectFormData, title: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label><Tag size={18} /> Danh mục</label>
                        <select 
                          value={projectFormData.category}
                          onChange={(e) => setProjectFormData({...projectFormData, category: e.target.value})}
                          required
                        >
                          <option value="">Chọn danh mục</option>
                          <option value="Thương mại">Thương mại</option>
                          <option value="Dân dụng">Dân dụng</option>
                          <option value="Công nghiệp">Công nghiệp</option>
                          <option value="Hạ tầng">Hạ tầng</option>
                          <option value="Bán lẻ">Bán lẻ</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label><MapPin size={18} /> Vị trí</label>
                        <input 
                          type="text" 
                          placeholder="VD: Quận 1, TP. HCM" 
                          value={projectFormData.location}
                          onChange={(e) => setProjectFormData({...projectFormData, location: e.target.value})}
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label><UserIcon size={18} /> Khách hàng</label>
                        <input 
                          type="text" 
                          placeholder="Tên công ty hoặc cá nhân" 
                          value={projectFormData.client}
                          onChange={(e) => setProjectFormData({...projectFormData, client: e.target.value})}
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label><Calendar size={18} /> Ngày hoàn thành</label>
                        <input 
                          type="text" 
                          placeholder="VD: Tháng 12, 2024" 
                          value={projectFormData.completion_date}
                          onChange={(e) => setProjectFormData({...projectFormData, completion_date: e.target.value})}
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label><ImageIcon size={18} /> Image URL</label>
                      <input 
                        type="text" 
                        placeholder="https://images.unsplash.com/..." 
                        value={projectFormData.image}
                        onChange={(e) => setProjectFormData({...projectFormData, image: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label><FileText size={18} /> Mô tả dự án</label>
                      <textarea 
                        placeholder="Mô tả chi tiết về dự án..." 
                        value={projectFormData.description}
                        onChange={(e) => setProjectFormData({...projectFormData, description: e.target.value})}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="submit-btn primary-btn">Đăng dự án</button>
                  </form>
                </div>
              )}

              {/* Tab 6: Manage Projects */}
              {activeTab === 'manage-projects' && (
                <div className="tab-pane fade-in">
                  <div className="glass table-wrapper" style={{ padding: '2rem' }}>
                    <h2>Danh sách dự án ({projects.length})</h2>
                    {projects.length === 0 ? (
                      <p className="empty-text">Không có dự án nào.</p>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Tên dự án</th>
                            <th>Danh mục</th>
                            <th>Vị trí</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map(p => (
                            <tr key={p.id}>
                              <td>
                                <img src={p.image} alt={p.title} className="table-img" />
                              </td>
                              <td className="bold">{p.title}</td>
                              <td><span className="category-pill">{p.category}</span></td>
                              <td>{p.location}</td>
                              <td>
                                <div className="action-buttons">
                                  <button onClick={() => startEditProject(p)} className="edit-btn" title="Chỉnh sửa">
                                    <Edit size={16} />
                                  </button>
                                  <button onClick={() => handleDeleteProject(p.id)} className="delete-btn" title="Xóa">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Edit Modal Dialog */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content glass fade-in">
            <div className="modal-header">
              <h2>Chỉnh sửa vật liệu</h2>
              <button onClick={() => setEditingProduct(null)} className="close-modal">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="admin-form" style={{ padding: '1rem 0 0 0', width: '100%', maxWidth: 'none' }}>
              <div className="form-group">
                <label><Package size={18} /> Tên sản phẩm</label>
                <input 
                  type="text" 
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><DollarSign size={18} /> Giá (VNĐ)</label>
                  <input 
                    type="number" 
                    value={editFormData.price}
                    onChange={(e) => setEditFormData({...editFormData, price: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label><Tag size={18} /> Category</label>
                  <select 
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                    required
                  >
                    <option value="Materials">Vật liệu</option>
                    <option value="Structural">Kết cấu</option>
                    <option value="Tools">Công cụ</option>
                    <option value="Interior">Nội thất</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label><ImageIcon size={18} /> Ảnh đại diện (Main Image URL)</label>
                <input 
                  type="text" 
                  value={editFormData.image}
                  onChange={(e) => setEditFormData({...editFormData, image: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <label><ImageIcon size={18} /> Ảnh bổ sung (Gallery URLs - Phân cách bằng dấu phẩy)</label>
                <textarea 
                  placeholder="url1, url2, url3..." 
                  value={editFormData.images}
                  onChange={(e) => setEditFormData({...editFormData, images: e.target.value})}
                  rows="2"
                ></textarea>
              </div>

              <div className="form-group">
                <label><ClipboardList size={18} /> Thông số kỹ thuật</label>
                <div className="specs-builder">
                  {editFormData.specs.map((spec, index) => (
                    <div key={index} className="spec-input-row">
                      <input 
                        type="text" 
                        placeholder="Tên thông số" 
                        value={spec.key} 
                        onChange={(e) => handleSpecChange(index, 'key', e.target.value, true)}
                      />
                      <input 
                        type="text" 
                        placeholder="Giá trị" 
                        value={spec.value} 
                        onChange={(e) => handleSpecChange(index, 'value', e.target.value, true)}
                      />
                      <button type="button" onClick={() => removeSpecField(index, true)} className="remove-spec-btn"><X size={14}/></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addSpecField(true)} className="add-spec-btn">+ Thêm thông số</button>
                </div>
              </div>

              <div className="form-group">
                <label><FileText size={18} /> Mô tả tổng quan</label>
                <textarea 
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                  required
                ></textarea>
              </div>

              <div className="modal-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setEditingProduct(null)} className="submit-btn" style={{ background: '#94a3b8' }}>Hủy</button>
                <button type="submit" className="submit-btn primary-btn">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="modal-overlay">
          <div className="modal-content glass fade-in">
            <div className="modal-header">
              <h2>Chỉnh sửa dự án</h2>
              <button onClick={() => setEditingProject(null)} className="close-modal">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditProjectSubmit} className="admin-form" style={{ padding: '1rem 0 0 0', width: '100%', maxWidth: 'none' }}>
              <div className="form-group">
                <label><Building size={18} /> Tên dự án</label>
                <input 
                  type="text" 
                  value={editProjectFormData.title}
                  onChange={(e) => setEditProjectFormData({...editProjectFormData, title: e.target.value})}
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><Tag size={18} /> Danh mục</label>
                  <select 
                    value={editProjectFormData.category}
                    onChange={(e) => setEditProjectFormData({...editProjectFormData, category: e.target.value})}
                    required
                  >
                    <option value="Thương mại">Thương mại</option>
                    <option value="Dân dụng">Dân dụng</option>
                    <option value="Công nghiệp">Công nghiệp</option>
                    <option value="Hạ tầng">Hạ tầng</option>
                    <option value="Bán lẻ">Bán lẻ</option>
                  </select>
                </div>
                <div className="form-group">
                  <label><MapPin size={18} /> Vị trí</label>
                  <input 
                    type="text" 
                    value={editProjectFormData.location}
                    onChange={(e) => setEditProjectFormData({...editProjectFormData, location: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><UserIcon size={18} /> Khách hàng</label>
                  <input 
                    type="text" 
                    value={editProjectFormData.client}
                    onChange={(e) => setEditProjectFormData({...editProjectFormData, client: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label><Calendar size={18} /> Ngày hoàn thành</label>
                  <input 
                    type="text" 
                    value={editProjectFormData.completion_date}
                    onChange={(e) => setEditProjectFormData({...editProjectFormData, completion_date: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label><ImageIcon size={18} /> Image URL</label>
                <input 
                  type="text" 
                  value={editProjectFormData.image}
                  onChange={(e) => setEditProjectFormData({...editProjectFormData, image: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <label><FileText size={18} /> Mô tả dự án</label>
                <textarea 
                  value={editProjectFormData.description}
                  onChange={(e) => setEditProjectFormData({...editProjectFormData, description: e.target.value})}
                  required
                ></textarea>
              </div>

              <div className="modal-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setEditingProject(null)} className="submit-btn" style={{ background: '#94a3b8' }}>Hủy</button>
                <button type="submit" className="submit-btn primary-btn">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
