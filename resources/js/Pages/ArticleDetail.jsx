import React from "react";
import { Head, Link } from "@inertiajs/react";
import Navigation from "@/Components/Frontend/Navigation";
import Footer from "@/Components/Frontend/Footer";
import { CTA } from "@/Components/Frontend/AllComponents";
import "@css/frontend.css";
import "@css/frontend/article-detail.css";
import { Calendar, User, Eye, Tag, ArrowLeft } from "lucide-react";

export default function ArticleDetail({ article, relatedArticles, seo }) {
    // Generate structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        image: article.featured_image,
        datePublished: article.published_at_iso,
        dateModified: article.updated_at_iso,
        author: {
            "@type": "Person",
            name: article.author.name,
        },
        publisher: {
            "@type": "Organization",
            name: "Skyhouse Alamsutera",
            logo: {
                "@type": "ImageObject",
                url: window.location.origin + "/images/logo.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": seo.url,
        },
    };

    return (
        <>
            <Head>
                {/* Basic Meta Tags */}
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="keywords" content={seo.keywords} />
                <meta name="author" content={seo.author} />

                {/* Open Graph Tags */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:image" content={seo.image} />
                <meta property="og:url" content={seo.url} />
                <meta property="og:site_name" content="Skyhouse Alamsutera" />
                <meta
                    property="article:published_time"
                    content={seo.published_time}
                />
                <meta
                    property="article:modified_time"
                    content={seo.modified_time}
                />
                <meta property="article:author" content={seo.author} />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seo.title} />
                <meta name="twitter:description" content={seo.description} />
                <meta name="twitter:image" content={seo.image} />

                {/* Canonical URL */}
                <link rel="canonical" href={seo.url} />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Head>

            <div className="page-wrapper">
                <Navigation />
                <main className="main-wrapper">
                    {/* Article Hero with Featured Image Background */}
                    <section className="article-hero-section">
                        <div className="article-hero-image-wrapper">
                            {article.featured_image && (
                                <img
                                    src={article.featured_image}
                                    alt={article.title}
                                    className="article-hero-image"
                                />
                            )}
                            <div className="article-hero-overlay"></div>
                        </div>
                        <div className="article-hero-content">
                            <div className="padding-global">
                                <div className="container-medium">
                                    {/* Breadcrumb */}
                                    <div className="article-breadcrumb">
                                        <Link
                                            href="/"
                                            className="breadcrumb-link-item"
                                        >
                                            Home
                                        </Link>
                                        <span className="breadcrumb-separator">
                                            /
                                        </span>
                                        <Link
                                            href="/news"
                                            className="breadcrumb-link-item"
                                        >
                                            News
                                        </Link>
                                        <span className="breadcrumb-separator">
                                            /
                                        </span>
                                        <span className="breadcrumb-current">
                                            Article
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h1 className="article-hero-title">
                                        {article.title}
                                    </h1>

                                    {/* Meta Info */}
                                    <div className="article-hero-meta">
                                        <div className="article-meta-item">
                                            <Calendar className="w-4 h-4" />
                                            <span>{article.published_at}</span>
                                        </div>
                                        {article.category.name && (
                                            <>
                                                <span className="meta-separator">
                                                    |
                                                </span>
                                                <div className="article-meta-item">
                                                    <Tag className="w-4 h-4" />
                                                    <span>
                                                        {article.category.name}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Article Content */}
                    <section className="article-content-section">
                        <div className="padding-global">
                            <div className="container-medium">
                                <div className="article-content-wrapper">
                                    {/* Main Content */}
                                    <div
                                        className="article-content"
                                        dangerouslySetInnerHTML={{
                                            __html: article.content,
                                        }}
                                    />

                                    {/* Video */}
                                    {article.video_url && (
                                        <div className="article-video">
                                            <div className="video-wrapper">
                                                <iframe
                                                    src={article.video_url}
                                                    title={article.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {article.tags &&
                                        article.tags.length > 0 && (
                                            <div className="article-tags">
                                                <div className="tags-header">
                                                    <Tag className="w-4 h-4" />
                                                    <span>Tags:</span>
                                                </div>
                                                <div className="tags-list">
                                                    {article.tags.map(
                                                        (tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="tag"
                                                            >
                                                                {tag}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Related Articles */}
                    {relatedArticles && relatedArticles.length > 0 && (
                        <section className="related-articles-section background-color-cream">
                            <div className="padding-global">
                                <div className="container-large">
                                    <div className="padding-section-medium">
                                        <h2 className="section-heading">
                                            Related Articles
                                        </h2>
                                        <div className="related-articles-grid">
                                            {relatedArticles.map((related) => (
                                                <Link
                                                    key={related.uid}
                                                    href={`/articles/${related.slug}`}
                                                    className="related-article-card"
                                                >
                                                    {related.image && (
                                                        <div className="related-article-image">
                                                            <img
                                                                src={
                                                                    related.image
                                                                }
                                                                alt={
                                                                    related.title
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="related-article-content">
                                                        <div className="related-article-meta">
                                                            <span className="related-article-date">
                                                                {
                                                                    related.published_at
                                                                }
                                                            </span>
                                                            {related.category && (
                                                                <>
                                                                    <span className="meta-separator">
                                                                        |
                                                                    </span>
                                                                    <span className="related-article-category">
                                                                        {
                                                                            related.category
                                                                        }
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <h3 className="related-article-title">
                                                            {related.title}
                                                        </h3>
                                                        {related.excerpt && (
                                                            <p className="related-article-excerpt">
                                                                {related.excerpt}
                                                            </p>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </main>
                <CTA />
                <Footer />
            </div>
        </>
    );
}
