import { useState } from 'react';
import useContent from '../hooks/useContent';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import JobsSection from '../components/JobsSection';
import Footer from '../components/Footer';
import CTAModal from '../components/CTAModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

// WHY: Main landing page component
const LandingPage = () => {
  const { data: content, loading, error, refetch } = useContent();
  const [isCTAModalOpen, setIsCTAModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleCTAClick = () => {
    // Scroll to jobs section instead of opening modal
    const jobsSection = document.getElementById('jobs-section');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleApply = (jobId) => {
    setSelectedJobId(jobId);
    setIsCTAModalOpen(true);
  };

  const handleCloseCTA = () => {
    setIsCTAModalOpen(false);
    setSelectedJobId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No content available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {content.hero && (
        <HeroSection
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          buttonText={content.hero.buttonText}
          onCTAClick={handleCTAClick}
        />
      )}

      {/* Services Section */}
      {content.services && <ServicesSection services={content.services} />}

      {/* Features Section */}
      {content.features && <FeaturesSection features={content.features} />}

      {/* Testimonials Section */}
      {content.testimonials && <TestimonialsSection testimonials={content.testimonials} />}

      {/* Jobs Section */}
      <JobsSection onApply={handleApply} />

      {/* Footer */}
      {content.footer && <Footer footerContent={content.footer} />}

      {/* CTA Modal */}
      <CTAModal
        isOpen={isCTAModalOpen}
        onClose={handleCloseCTA}
        jobId={selectedJobId}
        title={content.cta?.modalTitle || 'Apply Now'}
      />
    </div>
  );
};

export default LandingPage;
