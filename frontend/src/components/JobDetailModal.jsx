import { motion } from 'framer-motion';
import Modal from './Modal';

// WHY: Detailed job modal component for Indian job portal
const JobDetailModal = ({ job, isOpen, onClose, onApply }) => {
  if (!job) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={job.title} size="xl">
      <div className="space-y-6">
        {/* Job Header Info */}
        <div className="flex flex-wrap gap-3 pb-4 border-b border-gray-200">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 border border-blue-200"
          >
            📍 {job.location}
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200"
          >
            💼 {job.type}
          </motion.span>
          {job.ctc && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-700 border border-amber-200"
            >
              💰 {job.ctc}
            </motion.span>
          )}
          {job.experience && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200"
            >
              🎯 {job.experience}
            </motion.span>
          )}
          {job.workMode && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 border border-indigo-200"
            >
              🏢 {job.workMode}
            </motion.span>
          )}
        </div>

        {/* Company Overview */}
        {job.companyOverview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">🏢</span> About Talencee India
            </h3>
            <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
              {job.companyOverview}
            </p>
          </motion.div>
        )}

        {/* Job Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold mb-3 text-gray-900 flex items-center gap-2">
            <span className="text-2xl">📋</span> About the Role
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </motion.div>

        {/* Key Responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">✅</span> Key Responsibilities
            </h3>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="text-green-500 mt-1">▶</span>
                  <span>{resp}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold mb-3 text-gray-900 flex items-center gap-2">
            <span className="text-2xl">🎓</span> Required Skills & Qualifications
          </h3>
          <ul className="space-y-2">
            {job.requirements && job.requirements.map((req, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex items-start gap-3 text-gray-700"
              >
                <span className="text-blue-500 mt-1">✓</span>
                <span>{req}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Perks & Benefits */}
        {job.perks && job.perks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl"
          >
            <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">🎁</span> Perks & Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {job.perks.map((perk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-2 text-gray-700 bg-white p-3 rounded-lg shadow-sm"
                >
                  <span className="text-green-500">🌟</span>
                  <span className="text-sm">{perk}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Hiring Process */}
        {job.hiringProcess && job.hiringProcess.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">🚀</span> Hiring Process
            </h3>
            <div className="space-y-3">
              {job.hiringProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Apply Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center pt-6 border-t border-gray-200"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onApply(job._id);
              onClose();
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-3"
          >
            <span>Apply for this Position</span>
            <span>→</span>
          </motion.button>
        </motion.div>

        {/* Why Join Talencee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl text-center"
        >
          <h4 className="font-bold text-xl mb-2">🇮🇳 Why Join Talencee India?</h4>
          <p className="text-blue-100">
            Be part of India's fastest-growing tech company. Work with brilliant minds, solve challenging problems, and grow your career exponentially!
          </p>
        </motion.div>
      </div>
    </Modal>
  );
};

export default JobDetailModal;
