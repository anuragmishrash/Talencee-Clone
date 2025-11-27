import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useJobs from '../hooks/useJobs';
import JobCard from './JobCard';
import JobDetailModal from './JobDetailModal';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

// WHY: Jobs section to display all job listings with search and filters
const JobsSection = ({ onApply }) => {
  const { data: jobs, loading, error, refetch } = useJobs();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [workModeFilter, setWorkModeFilter] = useState('All');

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleApply = (jobId) => {
    onApply(jobId);
  };

  // WHY: Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = locationFilter === 'All' || job.location.includes(locationFilter);
      const matchesType = typeFilter === 'All' || job.type === typeFilter;
      const matchesWorkMode = workModeFilter === 'All' || job.workMode === workModeFilter;
      
      return matchesSearch && matchesLocation && matchesType && matchesWorkMode;
    });
  }, [jobs, searchQuery, locationFilter, typeFilter, workModeFilter]);

  // WHY: Extract unique locations for filter
  const locations = useMemo(() => {
    if (!jobs) return [];
    const uniqueLocations = [...new Set(jobs.map(job => job.location.split(',')[0]))];
    return ['All', ...uniqueLocations];
  }, [jobs]);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">No jobs available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="jobs-section" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Current Openings at Talencee India
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join our team across Bengaluru, Hyderabad, Pune, and more
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 bg-white p-6 rounded-2xl shadow-lg"
          >
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="🔍 Search by job title or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>📍 {loc}</option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              >
                <option value="All">💼 All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>

              <select
                value={workModeFilter}
                onChange={(e) => setWorkModeFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              >
                <option value="All">🏢 All Work Modes</option>
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center text-gray-600">
              Showing <span className="font-bold text-blue-600">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'position' : 'positions'}
            </div>
          </motion.div>

          {/* Job Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <JobCard
                  job={job}
                  onClick={() => handleJobClick(job)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* No Results Message */}
          {filteredJobs.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 text-lg mb-4">No positions found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLocationFilter('All');
                  setTypeFilter('All');
                  setWorkModeFilter('All');
                }}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <JobDetailModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleApply}
      />
    </>
  );
};

export default JobsSection;
