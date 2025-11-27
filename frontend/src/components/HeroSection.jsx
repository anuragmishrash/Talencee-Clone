import { motion } from 'framer-motion';

// WHY: Hero section component to display main landing page header with animations
const HeroSection = ({ title, subtitle, buttonText, onCTAClick }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl lg:text-2xl mb-10 text-blue-50 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onCTAClick}
          className="bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl"
        >
          {buttonText} →
        </motion.button>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 hidden lg:block"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg rotate-12"></div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-10 hidden lg:block"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
