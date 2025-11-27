import { useState, useEffect } from 'react';
import { getContent, updateContent } from '../api/contentApi';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

// WHY: Admin page for content management
const AdminPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const handleAuthenticate = async () => {
    if (!apiKey.trim()) {
      setToast({ type: 'error', message: 'Please enter API key' });
      return;
    }

    setLoading(true);
    try {
      const result = await getContent();
      setContent(result.data || getDefaultContent());
      setIsAuthenticated(true);
      setToast({ type: 'success', message: 'Authenticated successfully' });
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to fetch content' });
    } finally {
      setLoading(false);
    }
  };

  const getDefaultContent = () => ({
    hero: { title: '', subtitle: '', buttonText: '' },
    services: [],
    features: [],
    testimonials: [],
    footer: { links: [], social: [], copyright: '' },
    cta: { buttonText: '', modalTitle: '' }
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContent(content, apiKey);
      setToast({ type: 'success', message: 'Content updated successfully' });
    } catch (error) {
      setToast({ type: 'error', message: error.message || 'Failed to update content' });
    } finally {
      setSaving(false);
    }
  };

  const updateHero = (field, value) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateCTA = (field, value) => {
    setContent(prev => ({
      ...prev,
      cta: { ...prev.cta, [field]: value }
    }));
  };

  const updateFooter = (field, value) => {
    setContent(prev => ({
      ...prev,
      footer: { ...prev.footer, [field]: value }
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAuthenticate()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your API key"
              />
            </div>
            <button
              onClick={handleAuthenticate}
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </div>
        </div>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Content Management</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:bg-gray-400"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Hero Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={content.hero?.title || ''}
                  onChange={(e) => updateHero('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={content.hero?.subtitle || ''}
                  onChange={(e) => updateHero('subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={content.hero?.buttonText || ''}
                  onChange={(e) => updateHero('buttonText', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">CTA Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={content.cta?.buttonText || ''}
                  onChange={(e) => updateCTA('buttonText', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modal Title</label>
                <input
                  type="text"
                  value={content.cta?.modalTitle || ''}
                  onChange={(e) => updateCTA('modalTitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Footer</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Copyright</label>
              <input
                type="text"
                value={content.footer?.copyright || ''}
                onChange={(e) => updateFooter('copyright', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-8">
            Note: For advanced editing (services, features, testimonials), please use the API directly or extend this admin panel.
          </p>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminPage;
