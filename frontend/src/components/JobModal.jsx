import Modal from './Modal';

// WHY: Job modal to display full job details
const JobModal = ({ job, isOpen, onClose, onApply }) => {
  if (!job) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={job.title} size="lg">
      <div className="space-y-6">
        {/* Job Info */}
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-100 text-blue-800">
            📍 {job.location}
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-green-100 text-green-800">
            💼 {job.type}
          </span>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Job Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        {/* Requirements */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Requirements</h3>
          <ul className="list-disc list-inside space-y-2">
            {job.requirements && job.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">{req}</li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={() => {
              onApply(job._id);
              onClose();
            }}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default JobModal;
