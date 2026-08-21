'use client';

import React, { useState } from 'react';
import { User, Mail, Send, CheckCircle2, AlertCircle, Loader2, MessageCircle, RefreshCw } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/infoj.j143@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: 'New Contact Form Submission - WaqtNama',
          _template: 'table',
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true)) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Failed to send message. Please try again or email us directly.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage('An unexpected error occurred. Please check your internet connection or email us directly.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div className="bg-slate-50 border border-emerald-200 p-6 sm:p-8 rounded-2xl text-center flex flex-col items-center justify-center space-y-4 shadow-sm animate-fade-in">
        <div className="bg-emerald-100 text-emerald-700 p-4 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900">Message Sent Successfully!</h3>
        <p className="text-gray-700 text-sm sm:text-base max-w-md">
          Thank you for reaching out to <span className="font-semibold text-emerald-800">WaqtNama</span>. We have received your message and will get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 px-5 rounded-xl transition-all text-sm shadow-md mt-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-emerald-100 p-6 sm:p-8 rounded-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-emerald-600" />
        Send Us a Message
      </h2>

      {status === 'error' && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 text-sm">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Submission Error</p>
            <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Muhammad Ali"
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-gray-900 text-sm outline-none transition-all ${
                errors.name
                  ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="yourname@example.com"
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-gray-900 text-sm outline-none transition-all ${
                errors.email
                  ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message, feedback, or prayer time correction details here..."
            className={`w-full p-3.5 bg-white border rounded-xl text-gray-900 text-sm outline-none transition-all resize-y ${
              errors.message
                ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                : 'border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            }`}
          ></textarea>
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
