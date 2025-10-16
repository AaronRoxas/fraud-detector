import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModelComparison from './components/ModelComparison';
import TransactionAnalysis from './components/TransactionAnalysis';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <ModelComparison />
        <TransactionAnalysis />
      </main>
      <Footer />
    </div>
  );
}

export default App;
