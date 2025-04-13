/**
 * FAQ page component that renders common questions.
 * Users can look up FAQs about the platform.
 */

import React, { useEffect } from 'react';

const faqs = [
  {
    question: 'What is the best filament for beginners?',
    answer: 'PLA is generally the easiest filament to print with. It has a low printing temperature and produces predictable results.',
  },
  {
    question: 'How should I store my filament?',
    answer: 'Filament should be stored in a cool, dry place. Use airtight containers with silica gel to reduce moisture exposure.',
  },
  {
    question: 'How can I tell if my filament is moisture-damaged?',
    answer: 'Moisture-damaged filament may cause bubbles, stringing, or popping sounds during printing. Prints might also have a rough or inconsistent surface.',
  },
  {
    question: 'Why is my filament not sticking to the print bed?',
    answer: 'This could be due to an unlevel bed, wrong bed temperature, or dirty surface. Try leveling the bed and cleaning it with isopropyl alcohol.',
  },
];

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="faq-page">
      <div className="faq-inner">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className="faq-card" key={index}>
              <h2 className="faq-question">{faq.question}</h2>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
