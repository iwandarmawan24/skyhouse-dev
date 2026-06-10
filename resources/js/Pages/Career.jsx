import React from "react";
import { Head, Link } from "@inertiajs/react";
import PageLayout from "@/Components/Frontend/PageLayout";
import "@css/frontend.css";
import "@css/frontend/news-page.css";

export default function Career({ careers }) {
    const careerList = careers ?? [];
    const pageTitle = "Careers - Skyhouse Alamsutera";
    const pageDescription = "Explore career opportunities at Skyhouse Alamsutera. Join our team and grow with us.";
    const pageImage = window.location.origin + "/images/default-og-image.jpg";
    const pageUrl = window.location.origin + "/careers";

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content="Skyhouse Alamsutera" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />

                <link rel="canonical" href={pageUrl} />
            </Head>

            <PageLayout>
                {/* Top Banner Section */}
                <section className="news-top-banner">
                    <div className="events-banner-wrapper">
                        <div
                            className="events-banner-image"
                            style={{
                                background: "linear-gradient(135deg, #1153BD 0%, #0a3a8a 100%)",
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                        />
                        <div className="events-banner-overlay">
                            <div className="padding-global events-banner-content">
                                <div className="container-large">
                                    <h1 className="events-banner-title">
                                        Careers
                                    </h1>
                                    <p className="events-banner-subtitle">
                                        Join our team and build the future with us
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Career Listings */}
                <section className="padding-section-large">
                    <div className="padding-global">
                        <div className="container-large">
                            <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-0">
                                {/* Left: heading + desc */}
                                <div className="lg:w-5/12 lg:pr-12">
                                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                                        Build Your<br />
                                        <span className="font-bodoni italic" style={{ color: "#1153BD" }}>Dream Career</span>
                                        <br />With Us
                                    </h2>
                                    <br />
                                    <p className="text-gray-500 text-base leading-relaxed">
                                        Be part of a passionate team shaping the future of premium living. We're looking for talented people who are driven, creative, and ready to grow.
                                    </p>
                                </div>

                                {/* Divider — only desktop */}
                                <div className="hidden lg:block w-px bg-gray-200 self-stretch mx-8" />

                                {/* Right: job list */}
                                <div className="lg:flex-1">
                                    {careerList.length > 0 ? careerList.map((career) => (
                                        <Link
                                            key={career.uid}
                                            href={`/careers/${career.uid}`}
                                            className="group flex items-center justify-between px-6 py-4 border border-gray-200 rounded-full mb-3 no-underline font-semibold text-gray-900 bg-white transition-all duration-200 hover:bg-[#1153BD] hover:text-white hover:border-[#1153BD]"
                                        >
                                            <span>{career.title}</span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                    )) : (
                                        <p className="text-gray-400 text-sm py-4">No open positions at the moment. Check back soon.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </PageLayout>
        </>
    );
}
