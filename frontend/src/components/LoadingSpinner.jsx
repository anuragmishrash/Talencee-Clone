// WHY: Reusable loading spinner component for async operations
const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  // WHY: Define size classes for different spinner sizes
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  // WHY: Define color classes for different themes
  const colorClasses = {
    primary: 'border-primary border-t-transparent',
    secondary: 'border-secondary border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
