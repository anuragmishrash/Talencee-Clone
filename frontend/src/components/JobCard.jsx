import { motion } from 'framer-motion';

// WHY: Job card component to display job summary with Indian details
const JobCard = ({ job, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-100 group relative overflow-hidden h-full flex flex-col"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
          {job.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200"
          >
            📍 {job.location}
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200"
          >
            💼 {job.type}
          </motion.span>
          {job.workMode && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200"
            >
              🏢 {job.workMode}
            </motion.span>
          )}
        </div>

        {/* CTC Badge */}
        {job.ctc && (
          <div className="mb-3">
            <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-2 border-amber-200">
              💰 {job.ctc}
            </span>
          </div>
        )}

        {/* Experience */}
        {job.experience && (
          <div className="mb-3 text-sm text-gray-600">
            <span className="font-semibold">Experience:</span> {job.experience}
          </div>
        )}
        
        <p className="text-gray-600 line-clamp-2 mb-4 leading-relaxed flex-1">
          {job.description}
        </p>
        
        <motion.button
          whileHover={{ x: 5 }}
          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center gap-2 group-hover:gap-3 transition-all mt-auto"
        >
          View Full Details 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobCard;
