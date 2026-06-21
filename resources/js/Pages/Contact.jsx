import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Navigation from "@/Components/Frontend/Navigation";
import PageLayout from "@/Components/Frontend/PageLayout";
import Footer from "@/Components/Frontend/Footer";
import CTA from '@/Components/Frontend/CTA';
import Button from '@/Components/Frontend/atoms/Button';
import axios from 'axios';
import "@css/frontend.css";
import '@css/frontend/contact-page.css';

const emptyForm = (formLoadTime) => ({
  fullName: "",
  residence: "",
  email: "",
  phone: "",
  subject: "",
  room_type: "",
  message: "",
  honeypot: "",
  formLoadTime: formLoadTime || Math.floor(Date.now() / 1000),
});

export default function Contact({ formLoadTime, products = [] }) {
  const { settings } = usePage().props;
  const contactSettings = settings?.contact || {};
  const email   = contactSettings.contact_email   || 'info@skyhousealamsutera.com';
  const phone   = contactSettings.contact_phone   || '+62 21 5088 9900';
  const address = contactSettings.contact_address || 'Jl. Alamsutera Boulevard No.88, Pakulonan Barat, Kelapa Dua, Tangerang, Banten 15810';

  const [data, setData] = useState(emptyForm(formLoadTime));
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const [openFaq, setOpenFaq] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [isLoadingFaqs, setIsLoadingFaqs] = useState(true);

  const handleChange = (field) => (e) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    setSuccessMessage(null);

    try {
      const response = await axios.post('/api/contact', data);
      setSuccessMessage(response.data.message);
      setData(emptyForm(Math.floor(Date.now() / 1000)));
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      if (error.response?.status === 422) {
        const serverErrors = error.response.data.errors ?? {};
        setErrors(serverErrors);
      } else if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Something went wrong. Please try again.' });
      }
    } finally {
      setProcessing(false);
    }
  };

  // Fetch FAQs from backend
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('/api/faqs');
        if (response.data.success) {
          setFaqs(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        // Keep empty array on error
      } finally {
        setIsLoadingFaqs(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>Contact Us - Skyhouse Alamsutera</title>
        <meta name="description" content="Get in touch with Skyhouse Alamsutera. Contact us for inquiries, property information, or schedule a visit to our show units." />
      </Head>

      <PageLayout showBackgroundDefault={true}>
        <main className="main-wrapper">
          {successMessage && (
            <div style={{
              position: 'fixed',
              top: '2rem',
              right: '2rem',
              zIndex: 9999,
              background: '#10b981',
              color: 'white',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              animation: 'slideInRight 0.3s ease-out'
            }}>
              {successMessage}
            </div>
          )}

          {errors.general && (
            <div style={{
              position: 'fixed',
              top: '2rem',
              right: '2rem',
              zIndex: 9999,
              background: '#ef4444',
              color: 'white',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              {errors.general}
            </div>
          )}

          <section className="contact-section">
            <div className="padding-global">
              <div className="contact-container">
                <div className="contact-form-wrapper">
                  <div className="contact-form-sticky">
                    <h1 className="contact-title">
                      Contact Us
                    </h1>

                    <form
                      onSubmit={handleSubmit}
                      className="contact-form"
                    >
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="fullName">
                            Full name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Budi Ramdhan"
                            value={data.fullName}
                            onChange={handleChange('fullName')}
                            required
                          />
                          {errors.fullName && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.fullName}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="residence">
                            Current Residence
                          </label>
                          <input
                            type="text"
                            id="residence"
                            name="residence"
                            placeholder="Kembangan, Jakarta Barat"
                            value={data.residence}
                            onChange={handleChange('residence')}
                            required
                          />
                          {errors.residence && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.residence}</span>}
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="email">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@gmail.com"
                            value={data.email}
                            onChange={handleChange('email')}
                            required
                          />
                          {errors.email && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">
                            Phone number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="0821234567"
                            value={data.phone}
                            onChange={handleChange('phone')}
                            required
                          />
                          {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.phone}</span>}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="subject">
                          Message
                        </label>
                        <div className="form-row">
                          <select
                            id="subject"
                            name="subject"
                            value={data.subject}
                            onChange={handleChange('subject')}
                            required
                          >
                            <option value="">
                              Select subject...
                            </option>
                            <option value="inquiry">
                              General Inquiry
                            </option>
                            <option value="purchase">
                              Purchase Information
                            </option>
                            <option value="visit">
                              Schedule Visit
                            </option>
                            <option value="other">
                              Other
                            </option>
                          </select>
                          <select
                            id="room_type"
                            name="room_type"
                            value={data.room_type}
                            onChange={handleChange('room_type')}
                            required
                          >
                            <option value="">
                              Select unit type...
                            </option>
                            {products.map((product) => (
                              <option key={product.uid} value={product.name}>
                                {product.name}
                              </option>
                            ))}
                            <option value="Other">
                              Other
                            </option>
                          </select>
                        </div>
                        {errors.subject && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.subject}</span>}
                        {errors.room_type && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.room_type}</span>}
                      </div>

                      <div className="form-group">
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Dear Sky House team, I wanna ask about..."
                          rows="5"
                          value={data.message}
                          onChange={handleChange('message')}
                          required
                        ></textarea>
                        {errors.message && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.message}</span>}
                      </div>

                      <input
                        type="text"
                        name="honeypot"
                        value={data.honeypot}
                        onChange={handleChange('honeypot')}
                        style={{
                          position: 'absolute',
                          left: '-9999px',
                          width: '1px',
                          height: '1px',
                          opacity: 0,
                          pointerEvents: 'none',
                        }}
                        tabIndex="-1"
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        disabled={processing}
                      >
                        {processing ? 'Submitting...' : 'Submit'}
                      </Button>
                    </form>
                  </div>
                </div>

                <div className="contact-info-wrapper">
                  <div className="contact-illustration">
                    <div className="illustration-circle illustration-phone">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="illustration-circle illustration-bear">
                      <div className="bear-icon">🐻</div>
                    </div>
                    <div className="illustration-circle illustration-person">
                      <div className="person-icon">👤</div>
                    </div>
                    <div className="illustration-circle illustration-message">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7 9H17V11H7V9Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7 12H14V14H7V12Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="contact-details">
                    <div className="contact-detail-section">
                      <div className="contact-detail-icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="contact-detail-content">
                        <h3>Email</h3>
                        <a href={`mailto:${email}`}>{email}</a>
                      </div>
                    </div>

                    <div className="contact-detail-section">
                      <div className="contact-detail-icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="contact-detail-content">
                        <h3>Phone</h3>
                        <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                      </div>
                    </div>

                    <div className="contact-detail-section">
                      <div className="contact-detail-icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="contact-detail-content">
                        <h3>Sky House HQ Alam Sutera</h3>
                        <p>{address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="faq-section">
                    <h2 className="faq-title">FAQs</h2>
                    <p className="faq-subtitle">
                      Have some questions bubbling up? Take a
                      peek below for all the deets you're
                      curious about!
                    </p>

                    <div className="faq-list">
                      {faqs.map((faq, index) => (
                        <div
                          key={index}
                          className={`faq-item ${
                            openFaq === index
                              ? "is-open"
                              : ""
                          }`}
                        >
                          <button
                            className="faq-question !p-4"
                            onClick={() =>
                              toggleFaq(index)
                            }
                          >
                            <span>{faq.question}</span>
                            <svg
                              className="faq-icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 8V16M8 12H16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                          {openFaq === index && (
                            <div className="faq-answer">
                              <p>{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </PageLayout>
    </>
  );
}
