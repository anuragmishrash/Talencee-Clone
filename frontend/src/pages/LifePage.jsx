import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// WHY: Life at Talencee page
const LifePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 px-4">
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
            Life at Talencee
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-purple-100"
          >
            Where work meets passion and innovation
          </motion.p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Our Culture</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            At Talencee, we believe in creating an environment where everyone can thrive, innovate, and make a real impact. Our culture is built on collaboration, continuous learning, and celebrating success together.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Perks & Benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Health & Wellness</h3>
              <p className="text-gray-600">
                Comprehensive health insurance for you and your family, mental wellness programs, and gym memberships.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Work-Life Balance</h3>
              <p className="text-gray-600">
                Flexible working hours, hybrid work options, and generous leave policies to maintain work-life harmony.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Learning & Growth</h3>
              <p className="text-gray-600">
                ₹50,000 annual learning budget, conference sponsorships, and mentorship from industry leaders.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🍕</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Food & Snacks</h3>
              <p className="text-gray-600">
                Free lunch, unlimited snacks and beverages, and monthly team dinners at premium restaurants.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Travel & Events</h3>
              <p className="text-gray-600">
                Annual company retreats, team outings, and opportunities to attend tech conferences worldwide.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Competitive Pay</h3>
              <p className="text-gray-600">
                Industry-leading salaries, performance bonuses, ESOPs, and annual increments based on merit.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Offices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-blue-700">🏢 Modern Workspaces</h3>
              <p className="text-gray-700">
                State-of-the-art offices with ergonomic furniture, standing desks, breakout zones, and gaming areas.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-purple-700">🎮 Recreation Zones</h3>
              <p className="text-gray-700">
                PlayStation, table tennis, foosball, and dedicated relaxation areas to unwind during breaks.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white p-12 rounded-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Explore exciting opportunities and become part of the Talencee family
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all"
          >
            View Open Positions
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default LifePage;
