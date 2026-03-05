import React from "react";
import { Head } from "@inertiajs/react";
import PageLayout from "@/Components/Frontend/PageLayout";
import "@css/frontend.css";
import "@css/frontend/news-page.css";

export default function Career({ careers }) {
    const pageTitle = "Careers - Skyhouse Alamsutera";
    const pageDescription = "Explore career opportunities at Skyhouse Alamsutera. Join our team and grow with us.";
    const pageImage = window.location.origin + "/images/default-og-image.jpg";
    const pageUrl = window.location.origin + "/careers";

    const decodeHtml = (html) => {
        if (!html) return '';
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const stripTags = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '');
    };

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
                            {careers && careers.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {careers.map((career) => (
                                        <div
                                            key={career.uid}
                                            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
                                        >
                                            <div className="p-6">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-skyhouse-ocean">
                                                        {career.position}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                    {career.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm line-clamp-3">
                                                    {decodeHtml(stripTags(career.body))}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <svg
                                        className="mx-auto h-16 w-16 text-gray-300 mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <p className="text-xl font-semibold text-gray-500">
                                        No open positions at the moment
                                    </p>
                                    <p className="text-gray-400 mt-2">
                                        Check back later for new opportunities
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </PageLayout>
        </>
    );
}
