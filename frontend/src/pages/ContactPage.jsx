import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// WHY: Contact Us page
const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate('/')}
            className="mb-6 text-white/80 hover:text-white flex items-center gap-2"
          >
            ← Back to Home
          </motion.button>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-green-100"
          >
            Get in touch with us for opportunities and collaborations
          </motion.p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  placeholder="What is this regarding?"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Head Office</h3>
                    <p className="text-gray-600">
                      Talencee India Pvt. Ltd.<br />
                      Koramangala, Bengaluru<br />
                      Karnataka 560034, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Email</h3>
                    <p className="text-gray-600">
                      General: info@talencee.in<br />
                      Careers: careers@talencee.in<br />
                      Support: support@talencee.in
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Phone</h3>
                    <p className="text-gray-600">
                      Main: +91-80-1234-5678<br />
                      HR: +91-80-8765-4321<br />
                      Mon-Fri: 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-green-700">Other Offices</h3>
                <div className="text-gray-700 space-y-2">
                  <p>🏢 Hyderabad | Gurugram | Pune</p>
                  <p>🏢 Mumbai | Chennai | Noida</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map or Additional Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-gradient-to-r from-green-600 to-teal-600 text-white p-12 rounded-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Looking for Career Opportunities?</h2>
          <p className="text-xl mb-8 text-green-100">
            Check out our current job openings and join the Talencee family
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all"
          >
            View Open Positions
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default ContactPage;
