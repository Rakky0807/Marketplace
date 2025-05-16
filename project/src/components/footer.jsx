import React, { useState } from 'react';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (modalId) => {
    setActiveModal(modalId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const modalContent = {
    contactUs: (
      <div className="p-2">
        <h3 className="text-2xl font-bold mb-6 text-blue-700 border-b pb-2">Contact Us</h3>
        <p className="mb-6 text-lg">We're here to help! Get in touch with our team.</p>
        <form className="space-y-5">
          <div>
            <label className="block text-base font-medium mb-2">Name</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
              placeholder="Your name" 
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-2">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
              placeholder="Your email" 
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-2">Message</label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-lg h-36 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <button 
            type="button" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    ),
    faqs: (
      <div className="p-2">
        <h3 className="text-2xl font-bold mb-6 text-blue-700 border-b pb-2">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">How do I purchase items?</h4>
            <p className="text-gray-600">Browse our marketplace, add items to your cart, and proceed to checkout. You can pay using various payment methods including credit cards and PayPal.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Are the templates customizable?</h4>
            <p className="text-gray-600">Yes, all our templates and themes are fully customizable to suit your specific needs and brand identity.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Do you offer refunds?</h4>
            <p className="text-gray-600">We offer a 30-day money-back guarantee if you're not satisfied with your purchase. Please see our Returns policy for more details.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Can I sell my own templates?</h4>
            <p className="text-gray-600">Yes! You can become a vendor and sell your own templates on our marketplace. Visit the Become a Seller page for more information.</p>
          </div>
        </div>
      </div>
    ),
    shipping: (
      <div className="p-2">
        <h3 className="text-2xl font-bold mb-6 text-blue-700 border-b pb-2">Shipping Information</h3>
        <p className="mb-6 text-lg">As a digital marketplace, most of our products are delivered instantly after purchase.</p>
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Digital Products</h4>
            <p className="text-gray-600">Templates, themes, and other digital products are available for immediate download after payment is confirmed.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Email Delivery</h4>
            <p className="text-gray-600">Download links will be sent to your registered email address and will also appear in your account dashboard.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Access Period</h4>
            <p className="text-gray-600">You will have access to download your purchased items for a period of 1 year from the date of purchase.</p>
          </div>
        </div>
      </div>
    ),
    returns: (
      <div className="p-2">
        <h3 className="text-2xl font-bold mb-6 text-blue-700 border-b pb-2">Returns Policy</h3>
        <p className="mb-6 text-lg">We want you to be completely satisfied with your purchase. Here's our return policy:</p>
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">30-Day Money Back Guarantee</h4>
            <p className="text-gray-600">If you're not satisfied with your purchase, contact us within 30 days for a full refund.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Refund Conditions</h4>
            <p className="text-gray-600">To be eligible for a refund, you must provide proof of purchase and explain why the product didn't meet your expectations.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Exceptions</h4>
            <p className="text-gray-600">Custom-made or personalized items cannot be returned unless there is a significant defect.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">How to Request a Refund</h4>
            <p className="text-gray-600">Send an email to support@marketplace.com with your order number and reason for return.</p>
          </div>
        </div>
      </div>
    )
  };

  return (
    <footer className="bg-gray-900 text-white mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-5 border-b border-gray-700 pb-2">About Us</h3>
            <p className="text-gray-400">Your trusted marketplace for quality products and amazing deals.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-5 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Deals</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-5 border-b border-gray-700 pb-2">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleOpenModal('contactUs')} 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleOpenModal('faqs')} 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleOpenModal('shipping')} 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  Shipping Info
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleOpenModal('returns')} 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  Returns
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-5 border-b border-gray-700 pb-2">Connect With Us</h3>
            <ul className="space-y-3">
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">Facebook</a></li>
              <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">Twitter/X</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">Instagram</a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; 2025 Marketplace. All rights reserved.</p>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div 
            className="bg-white text-gray-800 rounded-xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl transform transition-all duration-300 ease-in-out"
            style={{ animation: 'fadeInScale 0.3s ease-out' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div></div>
              <button 
                onClick={handleCloseModal} 
                className="text-gray-500 hover:text-gray-800 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {modalContent[activeModal]}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;