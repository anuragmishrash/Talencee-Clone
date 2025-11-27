import { useState } from 'react';
import Modal from './Modal';
import ApplicationForm from './ApplicationForm';
import Toast from './Toast';

// WHY: CTA modal component for application submission
const CTAModal = ({ isOpen, onClose, jobId, title = 'Apply Now' }) => {
  const [toast, setToast] = useState(null);

  const handleSuccess = () => {
    setToast({ type: 'success', message: 'Application submitted successfully!' });
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleError = (message) => {
    setToast({ type: 'error', message });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
        <ApplicationForm
          jobId={jobId}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
};

export default CTAModal;
