import React from 'react';
import { Head } from '@inertiajs/react';
import Navigation from '@/Components/Frontend/Navigation';
import Footer from '@/Components/Frontend/Footer';
import { Heading, Text } from '@/Components/Frontend/atoms';
import '@css/frontend.css';

export default function Policy({ policy, pageTitle }) {
    return (
        <>
            <Head title={pageTitle} />
            <Navigation />

            <main style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '70vh' }}>
                <div className="padding-global">
                    <div className="container-large" style={{ maxWidth: '800px' }}>
                        <Heading as="h1" style={{ marginBottom: '2rem' }}>
                            {policy?.title || pageTitle}
                        </Heading>

                        {policy ? (
                            <div
                                className="policy-content"
                                dangerouslySetInnerHTML={{ __html: policy.content }}
                                style={{
                                    lineHeight: '1.8',
                                    color: 'rgb(71, 84, 103)',
                                }}
                            />
                        ) : (
                            <Text>This page is not available yet.</Text>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
