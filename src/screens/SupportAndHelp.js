import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaQuestionCircle, FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';
import { showSuccess } from '../utils/errorHandler';

const SupportAndHelp = () => {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showSuccess('Message sent successfully! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: 'How do I create a match?',
      answer: 'Go to the Create Match section and fill in the required details including teams, venue, and time.'
    },
    {
      question: 'How do I join a tournament?',
      answer: 'Browse available tournaments in the Tournaments section and click on "Join Tournament" to register.'
    },
    {
      question: 'How do I book a venue?',
      answer: 'Visit the Venues section, select your preferred venue, and use the booking form to reserve your slot.'
    },
    {
      question: 'How do I update my profile?',
      answer: 'Go to your Profile section and click on the edit button to update your information.'
    }
  ];

  const supportOptions = [
    {
      title: 'FAQ',
      subtitle: 'Find answers to common questions',
      icon: FaQuestionCircle,
      action: () => console.log('FAQ clicked')
    },
    {
      title: 'Email Support',
      subtitle: 'Send us an email',
      icon: FaEnvelope,
      action: () => console.log('Email clicked')
    },
    {
      title: 'Phone Support',
      subtitle: 'Call us directly',
      icon: FaPhone,
      action: () => console.log('Phone clicked')
    },
    {
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      icon: FaComments,
      action: () => console.log('Chat clicked')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Support & Help</h1>
              <p className="text-sm text-gray-500">Get help and contact support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Support Options */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">How can we help you?</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  onClick={option.action}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{option.title}</h4>
                      <p className="text-sm text-gray-500">{option.subtitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportAndHelp;
