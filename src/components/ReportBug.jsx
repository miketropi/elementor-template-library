import React, { useState, useEffect } from 'react';
import { __send_bug_report } from '../until/libs';

export default function ReportBug() {
  const [formData, setFormData] = useState({
    bug_type: '', // required
    bug_title: '', // required
    bug_description: '', // required
    browser: '', // required
    device: '', // required
    priority: '', // required
    contact_email: '', // optional
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.bug_type.trim()) {
      newErrors.bug_type = 'Bug type is required';
    }

    if (!formData.bug_title.trim()) {
      newErrors.bug_title = 'Bug title is required';
    } else if (formData.bug_title.trim().length < 5) {
      newErrors.bug_title = 'Bug title must be at least 5 characters';
    }

    if (!formData.bug_description.trim()) {
      newErrors.bug_description = 'Detailed description is required';
    } else if (formData.bug_description.trim().length < 5) {
      newErrors.bug_description = 'Description must be at least 5 characters';
    }

    if (!formData.browser.trim()) {
      newErrors.browser = 'Browser information is required';
    }

    if (!formData.device.trim()) {
      newErrors.device = 'Device information is required';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority level is required';
    }

    // Email validation (optional field)
    if (formData.contact_email && !isValidEmail(formData.contact_email)) {
      newErrors.contact_email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // send bug report
      const response = await __send_bug_report(formData);
      
      // check response.success false
      if (response.success === false) {
        console.error('Response:', response.data);
        return;
      }
      
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          bug_type: '',
          bug_title: '',
          bug_description: '',
          browser: '',
          device: '',
          priority: '',
          contact_email: '',
        });
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldClassName = (fieldName) => {
    const baseClasses = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
    return errors[fieldName] 
      ? `${baseClasses} border-red-500 focus:ring-red-500 focus:border-red-500` 
      : `${baseClasses} border-gray-300`;
  };

  if (submitSuccess) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h2>
          <p className="text-gray-600">Thank you for your bug report. We'll review it and get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Report a Bug</h2>
        <p className="text-gray-600">Help us improve by reporting any issues you encounter</p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Bug Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bug Type <span className="text-red-500">*</span>
          </label>
          <select 
            name="bug_type"
            value={formData.bug_type}
            onChange={handleChange}
            className={getFieldClassName('bug_type')}
          >
            <option value="">Select bug type</option>
            <option value="ui">UI/UX Issue</option>
            <option value="functionality">Functionality Problem</option>
            <option value="performance">Performance Issue</option>
            <option value="compatibility">Compatibility Issue</option>
            <option value="other">Other</option>
          </select>
          {errors.bug_type && (
            <p className="mt-1 text-sm text-red-600">{errors.bug_type}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bug Title <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="bug_title"
            value={formData.bug_title}
            onChange={handleChange}
            placeholder="Brief description of the issue"
            className={getFieldClassName('bug_title')}
          />
          {errors.bug_title && (
            <p className="mt-1 text-sm text-red-600">{errors.bug_title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea 
            rows={4}
            name="bug_description"
            value={formData.bug_description}
            onChange={handleChange}
            placeholder="Please provide detailed steps to reproduce the issue..."
            className={`${getFieldClassName('bug_description')} resize-none`}
          />
          {errors.bug_description && (
            <p className="mt-1 text-sm text-red-600">{errors.bug_description}</p>
          )}
        </div>

        {/* Environment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Browser <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="browser"
              value={formData.browser}
              onChange={handleChange}
              placeholder="e.g., Chrome 120.0"
              className={getFieldClassName('browser')}
            />
            {errors.browser && (
              <p className="mt-1 text-sm text-red-600">{errors.browser}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Device <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="device"
              value={formData.device}
              onChange={handleChange}
              placeholder="e.g., Desktop, Mobile, Tablet"
              className={getFieldClassName('device')}
            />
            {errors.device && (
              <p className="mt-1 text-sm text-red-600">{errors.device}</p>
            )}
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority Level <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {['Low', 'Medium', 'High', 'Critical'].map((priority) => (
              <label key={priority} className="flex items-center">
                <input 
                  type="radio" 
                  name="priority" 
                  value={priority.toLowerCase()}
                  onChange={handleChange}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{priority}</span>
              </label>
            ))}
          </div>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority}</p>
          )}
        </div>

        {/* Contact Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email (Optional)
          </label>
          <input 
            type="email" 
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={getFieldClassName('contact_email')}
          />
          {errors.contact_email && (
            <p className="mt-1 text-sm text-red-600">{errors.contact_email}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 text-white rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors font-medium ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : (
              'Submit Report'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 