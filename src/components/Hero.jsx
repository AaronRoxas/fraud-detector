import React from 'react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 dark:text-white text-gray-900">
              Build trust through our fraud detection
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              This demonstrates a machine learning-based fraud detection system that identifies potentially fraudulent 
              transactions in real time. It showcases how data-driven models can support decision-making and improve 
              transaction security.
            </p>
            <button 
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg font-medium text-base hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white"
              aria-label="Try the fraud detection system now"
              onClick={() => {
                const element = document.getElementById('transaction-analysis');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Try Now
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Light mode illustration */}
            <img 
              src="/imgs/illustation.svg" 
              alt="Fraud Detection System" 
              className="w-full h-full object-cover dark:hidden" 
            />
            {/* Dark mode illustration */}
            <img 
              src="/imgs/illustrationDark.svg" 
              alt="Fraud Detection System" 
              className="w-full h-full object-cover hidden dark:block" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

