import React from "react";
import { Head, Link } from "@inertiajs/react";
import PageLayout from "@/Components/Frontend/PageLayout";
import "@css/frontend.css";
import "@css/frontend/news-page.css";
import "@css/frontend/news-detail.css";

export default function CareerDetail({ career }) {
    const pageTitle = `${career.title} - Skyhouse Alamsutera`;
    const pageDescription = career.body?.replace(/<[^>]*>/g, '').substring(0, 155) || "Career opportunity at Skyhouse Alamsutera";
    const pageImage = window.location.origin + "/images/default-og-image.jpg";
    const pageUrl = window.location.origin + `/careers/${career.uid}`;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                <meta property="og:type" content="article" />
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

                {/* Career Detail Content */}
                <section className="padding-section-large">
                    <div className="padding-global">
                        <div className="container-medium">
                            {/* Breadcrumb */}
                            <div className="news-detail-breadcrumb">
                                <Link href="/" className="breadcrumb-link">Home</Link>
                                <span className="breadcrumb-separator">/</span>
                                <Link href="/careers" className="breadcrumb-link">Careers</Link>
                                <span className="breadcrumb-separator">/</span>
                                <span className="breadcrumb-current">{career.title}</span>
                            </div>

                            {/* Career Header */}
                            <div className="news-detail-header">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-skyhouse-ocean">
                                        {career.position}
                                    </span>
                                </div>
                                <h1 className="news-detail-title">{career.title}</h1>
                            </div>

                            {/* Career Body */}
                            <div className="news-detail-content">
                                <div
                                    className="prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{ __html: career.body }}
                                    style={{ lineHeight: '1.8' }}
                                />
                            </div>

                            {/* Back to Careers */}
                            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                                <Link
                                    href="/careers"
                                    style={{
                                        display: 'inline-block',
                                        padding: '1rem 2rem',
                                        background: '#1E3A8A',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        transition: 'background 0.3s',
                                    }}
                                >
                                    ← Back to Careers
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </PageLayout>
        </>
    );
}
