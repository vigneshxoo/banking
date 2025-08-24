import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const GeneralQues = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const faqs = [
    {
      q: "How do I create an account?",
      a: 'Click the "Sign Up" button in the top right corner and follow the registration process.'
    },
    {
      q: "I forgot my password. What should I do?",
      a: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.'
    },
    {
      q: "How do I update my profile information?",
      a: 'Go to "My Account" settings and select "Edit Profile" to make changes.'
    },
    {
      q: "How do I contact support?",
      a: 'Send us an email via the "Contact Us" page or use the live chat during working hours.'
    },
    {
      q: "Is my data secure?",
      a: 'Yes, we use industry-standard encryption and security protocols to protect your data.'
    }
  ];

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#000000] via-[#0a0a0a] to-[#1a1a1a] px-4 py-16'>
      
      {/* Title */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h2 className='text-4xl font-bold text-white'>
          General <span className="text-blue-500">Questions</span>
        </h2>
        <div className="mt-2 w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
          Here are some of the most frequently asked questions about your account & features.
        </p>
      </div>

      {/* FAQ Accordions */}
      <div className="w-full max-w-2xl join join-vertical space-y-3" data-aos="fade-up">
        {faqs.map((item, idx) => (
          <div 
            key={idx} 
            className="collapse collapse-arrow join-item border border-gray-700 bg-gray-900/60 rounded-lg shadow-md transition-all duration-300 hover:shadow-blue-500/20"
          >
            <input type="radio" name="faq-accordion" defaultChecked={idx === 0} />
            <div className="collapse-title font-semibold text-white">
              {item.q}
            </div>
            <div className="collapse-content text-sm font-mono text-gray-300 leading-relaxed">
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
