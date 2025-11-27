import { motion } from 'framer-motion';

// WHY: Features section to display key features with animations
const FeaturesSection = ({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-50"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We provide the best platform for your career growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              {feature.icon && (
                <motion.div
                  className="text-6xl mb-6 inline-block"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-xl transition-shadow">
                    {feature.icon}
                  </div>
                </motion.div>
              )}
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
