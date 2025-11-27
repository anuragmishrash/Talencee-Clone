import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// WHY: Privacy Policy page
const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20 px-4">
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
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            Last updated: November 2024
          </motion.p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Introduction</h2>
          <p className="text-lg text-gray-600 mb-4">
            Talencee India Pvt. Ltd. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p className="text-lg text-gray-600">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Information We Collect</h2>
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-bold mb-3 text-blue-600">Personal Information</h3>
            <p className="text-gray-600 mb-3">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Register on our website</li>
              <li>Apply for job positions</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us for support or inquiries</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-3 text-blue-600">Automatically Collected Information</h3>
            <p className="text-gray-600">
              When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and cookies installed on your device.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">How We Use Your Information</h2>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>To process your job applications and communicate with you about opportunities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>To send you marketing and promotional communications (with your consent)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>To improve our website and services based on your feedback</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>To comply with legal obligations and protect our rights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>To analyze usage patterns and optimize user experience</span>
              </li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Data Security</h2>
          <p className="text-lg text-gray-600 mb-4">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Rights</h2>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
            <p className="text-gray-600 mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700 font-semibold">Talencee India Pvt. Ltd.</p>
            <p className="text-gray-600">Email: privacy@talencee.in</p>
            <p className="text-gray-600">Phone: +91-80-1234-5678</p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all"
          >
            Back to Home
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default PrivacyPage;
