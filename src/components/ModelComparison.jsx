import React from 'react';

const ModelComparison = () => {
  const models = [
    {
      name: 'Random Forest',
      label: 'Model 1',
      accuracy: '99.93%*',
      macroAverage: '89%',
      recall: '97%',
    },
    {
      name: 'Gradient Boosting**',
      label: 'Model 2',
      accuracy: '98.28%',
      macroAverage: '56%',
      recall: '98%',
    },
    {
      name: 'Logistic Regression',
      label: 'Model 3',
      accuracy: '96.15%',
      macroAverage: '52%',
      recall: '95%',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 dark:text-white text-gray-900">
            Model Comparison
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Compare the performance metrics of different machine learning models for fraud detection
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 sm:px-6 font-semibold text-sm sm:text-base dark:text-white text-gray-900">
                    Model
                  </th>
                  <th className="text-left py-4 px-4 sm:px-6 font-semibold text-sm sm:text-base dark:text-white text-gray-900">
                    Accuracy
                  </th>
                  <th className="text-left py-4 px-4 sm:px-6 font-semibold text-sm sm:text-base dark:text-white text-gray-900">
                    Macro Average
                  </th>
                  <th className="text-left py-4 px-4 sm:px-6 font-semibold text-sm sm:text-base dark:text-white text-gray-900">
                    Recall
                  </th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, index) => (
                  <tr 
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors duration-150"
                  >
                    <td className="py-6 px-4 sm:px-6">
                      <div>
                        <div className="font-semibold text-sm sm:text-base dark:text-white text-gray-900">
                          {model.name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-1">
                          {model.label}
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-4 sm:px-6 font-medium text-sm sm:text-base dark:text-white text-gray-900">
                      {model.accuracy}
                    </td>
                    <td className="py-6 px-4 sm:px-6 font-medium text-sm sm:text-base dark:text-white text-gray-900">
                      {model.macroAverage}
                    </td>
                    <td className="py-6 px-4 sm:px-6 font-medium text-sm sm:text-base dark:text-white text-gray-900">
                      {model.recall}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Footnote */}
          <div className="mt-4 px-4 sm:px-6">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
              * Might be biased
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
              ** Model used for the analysis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelComparison;

