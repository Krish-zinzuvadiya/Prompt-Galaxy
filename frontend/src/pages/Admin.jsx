import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/prompts';

const Admin = () => {
  const [prompts, setPrompts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    platform: 'ChatGPT',
    promptType: 'PROFILE / AVATAR'
  });
  const [status, setStatus] = useState('idle');
  const [imageSource, setImageSource] = useState('url'); // 'url' or 'file'
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'krish' && credentials.password === '1234') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const fetchPrompts = async () => {
    try {
      const res = await axios.get(API_URL);
      setPrompts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'imageUrl' && imageSource === 'url') {
      setImagePreview(e.target.value);
      setImageError('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('PLEASE SELECT A VALID IMAGE FILE');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setImageError('IMAGE MUST BE UNDER 10MB');
      return;
    }

    setImageError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setFormData(prev => ({ ...prev, imageUrl: base64 }));
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleImageSourceToggle = (source) => {
    setImageSource(source);
    setImageError('');
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (prompt) => {
    setEditingId(prompt._id);
    setFormData({
      title: prompt.title,
      content: prompt.content,
      imageUrl: prompt.imageUrl,
      platform: prompt.platform,
      promptType: prompt.promptType || 'PROFILE / AVATAR'
    });
    // Detect if stored image is a data URI or a URL
    if (prompt.imageUrl && prompt.imageUrl.startsWith('data:')) {
      setImageSource('file');
    } else {
      setImageSource('url');
    }
    setImagePreview(prompt.imageUrl || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("ARE YOU SURE YOU TRULY WANT TO DELETE THIS PROMPT?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPrompts();
    } catch (err) {
      console.error(err);
      alert('Error deleting prompt');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: '', content: '', imageUrl: '', platform: 'ChatGPT', promptType: 'PROFILE / AVATAR' });
    setStatus('idle');
    setImageSource('url');
    setImagePreview('');
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      setImageError(imageSource === 'url' ? 'PLEASE ENTER AN IMAGE URL' : 'PLEASE UPLOAD AN IMAGE');
      return;
    }

    setStatus('submitting');
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setStatus('success');
      setFormData({ title: '', content: '', imageUrl: '', platform: 'ChatGPT', promptType: 'PROFILE / AVATAR' });
      setEditingId(null);
      setImageSource('url');
      setImagePreview('');
      setImageError('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchPrompts();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-container" style={{ margin: '0 auto', width: '100%', maxWidth: '400px' }}>
          <h2 className="page-title" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
            ADMIN LOGIN
          </h2>
          <form className="admin-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required 
              />
            </div>
            <button type="submit" className="btn-submit">LOGIN</button>
            {loginError && <div style={{ color: '#F97576', marginTop: '1.5rem', fontWeight: 900, textAlign: 'center' }}>INVALID CREDENTIALS</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h2 className="page-title" style={{ fontSize: '2rem', textAlign: 'center' }}>
          {editingId ? 'EDIT PROMPT' : 'ADD PROMPT'}
        </h2>
        
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="E.G., CYBERPUNK CITYSCAPE"
              required 
            />
          </div>

          <div className="form-group">
            <label>Image</label>
            <div className="image-source-toggle">
              <button
                type="button"
                className={`toggle-btn ${imageSource === 'url' ? 'active' : ''}`}
                onClick={() => handleImageSourceToggle('url')}
              >
                🔗 URL
              </button>
              <button
                type="button"
                className={`toggle-btn ${imageSource === 'file' ? 'active' : ''}`}
                onClick={() => handleImageSourceToggle('file')}
              >
                📁 UPLOAD FILE
              </button>
            </div>

            {imageSource === 'url' ? (
              <input 
                type="url" 
                name="imageUrl" 
                value={formData.imageUrl} 
                onChange={handleChange} 
                placeholder="HTTPS://..."
              />
            ) : (
              <div
                className="file-upload-zone"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('dragover'); }}
                onDragLeave={(e) => { e.currentTarget.classList.remove('dragover'); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('dragover');
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    fileInputRef.current.files = e.dataTransfer.files;
                    handleFileChange({ target: { files: [file] } });
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <div className="upload-icon">⬆️</div>
                <p className="upload-text">CLICK OR DRAG & DROP IMAGE HERE</p>
                <p className="upload-hint">PNG, JPG, WEBP — MAX 10MB</p>
              </div>
            )}

            {imageError && (
              <div style={{ color: '#F97576', marginTop: '0.5rem', fontWeight: 900, fontSize: '0.875rem' }}>
                {imageError}
              </div>
            )}

            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  onError={() => { if (imageSource === 'url') setImagePreview(''); }}
                />
                <button
                  type="button"
                  className="preview-remove"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, imageUrl: '' }));
                    setImagePreview('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Prompt Category</label>
            <select name="promptType" value={formData.promptType} onChange={handleChange}>
              <option value="PROFILE / AVATAR">PROFILE / AVATAR</option>
              <option value="SOCIAL MEDIA POST">SOCIAL MEDIA POST</option>
              <option value="INFOGRAPHIC">INFOGRAPHIC</option>
              <option value="POSTER / FLYER">POSTER / FLYER</option>
            </select>
          </div>

          <div className="form-group">
            <label>Platform Option</label>
            <select name="platform" value={formData.platform} onChange={handleChange}>
              <option value="ChatGPT">CHATGPT</option>
              <option value="Gemini">GEMINI</option>
              <option value="Claude">CLAUDE</option>
              <option value="Midjourney">MIDJOURNEY</option>
              <option value="Featured">FEATURED</option>
              <option value="Other">OTHER</option>
            </select>
          </div>

          <div className="form-group">
            <label>Prompt Content</label>
            <textarea 
              name="content" 
              value={formData.content} 
              onChange={handleChange} 
              placeholder="WRITE THE PROMPT HERE..."
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'SAVING...' : status === 'success' ? 'SUCCESS!' : (editingId ? 'UPDATE PROMPT' : 'PUBLISH PROMPT')}
            </button>
            {editingId && (
              <button type="button" className="btn-cancel" onClick={handleCancel} style={{ width: '100%', marginTop: '1rem' }}>
                CANCEL
              </button>
            )}
          </div>
          
          {status === 'error' && (
            <div style={{ color: 'red', marginTop: '1rem', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase' }}>
              ERROR SAVING PROMPT
            </div>
          )}
        </form>

        <div className="admin-list">
          <h3 style={{ marginBottom: '1rem', fontWeight: 900 }}>EXISTING PROMPTS</h3>
          {prompts.length === 0 ? (
            <p>NO PROMPTS FOUND.</p>
          ) : (
            prompts.map(prompt => (
              <div key={prompt._id} className="admin-prompt-item">
                <div>
                  <h4>{prompt.title}</h4>
                  <p>{prompt.platform}</p>
                </div>
                <div className="admin-prompt-actions">
                  <button onClick={() => handleEdit(prompt)} className="btn-edit">EDIT</button>
                  <button onClick={() => handleDelete(prompt._id)} className="btn-delete">DELETE</button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Admin;
