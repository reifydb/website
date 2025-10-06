import React, { useState } from 'react';
import Layout from '@theme/Layout';
import PageHeader from '../components/PageHeader';
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mkgzdryl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Contact" description="Get in touch with ReifyDB">
      <div className={styles.contactContainer}>
        <PageHeader 
          title="GET IN TOUCH"
          subtitle="Whether you need technical guidance, architecture advice, or want to explore features, ReifyDB is here to help you succeed."
        />

        <div className={styles.contentWrapper}>
          <div className={styles.benefitsSection}>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🚀</div>
              <h3>Quick Start Guidance</h3>
              <p>Get up and running quickly with personalized onboarding and best practice tailored to your use case.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🏗️</div>
              <h3>Architecture Review</h3>
              <p>Design optimal database schema and query pattern for your application.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>⚡</div>
              <h3>Performance Optimization</h3>
              <p>Learn advanced technique to maximize query performance and minimize resource usage.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🔧</div>
              <h3>Migration Assistance</h3>
              <p>Get help migrating from another database with minimal downtime and data integrity.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🏢</div>
              <h3>Enterprise Solution</h3>
              <p>Explore enterprise feature, support plan, and custom deployment option for your organization.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>📚</div>
              <h3>Training & Documentation</h3>
              <p>Access comprehensive documentation and training material to accelerate your expertise.</p>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send a Message</h2>
              <p className={styles.formDescription}>
                You will receive a reply within 24 hours
              </p>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  <span className={styles.successIcon}>✓</span>
                  Thank you for reaching out
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠️</span>
                  Something went wrong. Please try again or email hello@reifydb.com
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder="Your name"
                    disabled={isSubmitting}
                  />
                  {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    What do you need? <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    rows={6}
                    placeholder="New project, technical requirements, or any questions you might have..."
                    disabled={isSubmitting}
                  />
                  {errors.message && <span className={styles.fieldError}>{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.alternativeContact}>
          <h2>Other Ways to Connect</h2>
          <div className={styles.contactOptions}>
            <div className={styles.contactOption}>
              <h3>📧 Email</h3>
              <p><a href="mailto:hello@reifydb.com">hello@reifydb.com</a></p>
            </div>
            <div className={styles.contactOption}>
              <h3>💬 Community</h3>
              <p>Join the <a href="https://discord.gg/RYN5cHwVuc" target="_blank" rel="noopener noreferrer">Discord server</a></p>
              <p>Follow on <a href="https://twitter.com/reifydb" target="_blank" rel="noopener noreferrer">Twitter</a></p>
            </div>
            <div className={styles.contactOption}>
              <h3>🐛 Issues</h3>
              <p>Report bugs on <a href="https://github.com/reifydb/reifydb/issues" target="_blank" rel="noopener noreferrer">GitHub</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}