import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// WHY: About Talencee India page
const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
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
            About Talencee India
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100"
          >
            Building the future of talent management in India
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
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
          <p className="text-lg text-gray-600 mb-4">
            Founded in 2020, Talencee India Pvt. Ltd. has rapidly grown to become one of India's leading technology companies in the recruitment and talent management space. With offices across Bengaluru, Hyderabad, Gurugram, Pune, Mumbai, Chennai, and Noida, we serve millions of users across the country.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Our mission is to revolutionize how companies find, hire, and manage talent in India. We leverage cutting-edge technology, data science, and AI to create seamless experiences for both employers and job seekers.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Innovation First</h3>
              <p className="text-gray-600">
                We constantly push boundaries and embrace new technologies to solve complex problems.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">People Centric</h3>
              <p className="text-gray-600">
                Our employees are our greatest asset. We invest in their growth and well-being.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Integrity</h3>
              <p className="text-gray-600">
                We operate with transparency, honesty, and ethical practices in everything we do.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every project, product, and interaction.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-xl">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Team Members</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-8 rounded-xl">
              <div className="text-4xl font-bold mb-2">10M+</div>
              <div className="text-purple-100">Users Served</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-8 rounded-xl">
              <div className="text-4xl font-bold mb-2">7</div>
              <div className="text-green-100">Cities</div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Join Our Journey</h2>
          <p className="text-lg text-gray-600 mb-8">
            We're always looking for talented individuals to join our team and help us build the future of work in India.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all"
          >
            View Open Positions
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;
