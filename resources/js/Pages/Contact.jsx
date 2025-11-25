import React, { useState } from "react";
import Navigation from "@/Components/Frontend/Navigation";
import Footer from "@/Components/Frontend/Footer";
import { CTA } from "@/Components/Frontend/AllComponents";
import "@css/frontend.css";
// import '@css/frontend/contact-page.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        fullName: "",
        residence: "",
        email: "",
        phone: "",
        subject: "",
        project: "",
        message: "",
    });

    const [openFaq, setOpenFaq] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
    };

    const faqs = [
        {
            question: "Where are the Skyhouse projects located?",
            answer: "Our projects are strategically located in prime areas across Jakarta, Tangerang, and surrounding cities. Each location is carefully selected for accessibility, amenities, and future development potential.",
        },
        {
            question: "Can I get and read Skyhouse projects' e-brochure?",
            answer: "Yes! You can download our project brochures from our website or request a physical copy by contacting our sales team. The brochures contain detailed information about specifications, floor plans, and pricing.",
        },
        {
            question: "Where can I check the house availability?",
            answer: "You can check house availability on our website under each project page, or contact our sales team directly via phone or WhatsApp for real-time availability updates.",
        },
        {
            question: "How can I visit the show unit?",
            answer: "You can schedule a show unit visit by contacting our sales team or booking an appointment through our website. Our show units are open daily from 9 AM to 5 PM.",
        },
        {
            question: "Where can I get the house pricelist?",
            answer: "For the latest pricelist and special promotions, please contact our sales team directly or visit our sales office. Prices are subject to change and may vary based on unit type and availability.",
        },
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="page-wrapper">
            <Navigation />
            <main className="main-wrapper">
                {/* Contact Section */}
                <section className="contact-section">
                    <div className="padding-global">
                        <div className="contact-container">
                            {/* Left Side - Contact Form (Fixed) */}
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
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    required
                                                />
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
                                                    value={formData.residence}
                                                    onChange={handleChange}
                                                    required
                                                />
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
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
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
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                />
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
                                                    value={formData.subject}
                                                    onChange={handleChange}
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
                                                    id="project"
                                                    name="project"
                                                    value={formData.project}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">
                                                        Select project name...
                                                    </option>
                                                    <option value="kinary">
                                                        Kinary House
                                                    </option>
                                                    <option value="other">
                                                        Other Projects
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <textarea
                                                id="message"
                                                name="message"
                                                placeholder="Dear Skyhouse team, I wanna ask about..."
                                                rows="5"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="button is-contact-submit"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Right Side - Scrollable Content */}
                            <div className="contact-info-wrapper">
                                {/* Illustration */}
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

                                {/* Contact Information */}
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
                                                    d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </div>
                                        <div className="contact-detail-content">
                                            <h3>Email</h3>
                                            <a href="mailto:info@skyhousealamsutera.com">
                                                info@skyhousealamsutera.com
                                            </a>
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
                                            <a href="tel:+622150889900">
                                                +62 21 5088 9900
                                            </a>
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
                                            <h3>Skyhouse HQ Alam Sutera</h3>
                                            <p>
                                                Jl. Alamsutera Boulevard No.88,
                                                Pakulonan Barat, Kelapa Dua,
                                                Tangerang, Banten 15810
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Section */}
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
                                                    className="faq-question"
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
            <CTA />
            <Footer />
        </div>
    );
}
