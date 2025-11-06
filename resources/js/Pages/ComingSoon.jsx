import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ComingSoon() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement email subscription
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setEmail('');
        }, 3000);
    };

    return (
        <GuestLayout>
            <section className="min-h-screen flex items-center justify-center py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Icon */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-2xl animate-pulse">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
                        Get Ready,
                        <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-2">
                            Something Amazing is Coming!
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Kami sedang mempersiapkan fitur-fitur terbaik untuk memberikan pengalaman yang luar biasa dalam mencari properti impian Anda.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Katalog Properti</h3>
                            <p className="text-sm text-gray-600">Ribuan pilihan properti terbaik</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Smart Search</h3>
                            <p className="text-sm text-gray-600">Pencarian cerdas dengan AI</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Virtual Tour</h3>
                            <p className="text-sm text-gray-600">Tur properti dari rumah</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
                            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Kalkulator KPR</h3>
                            <p className="text-sm text-gray-600">Hitung cicilan dengan mudah</p>
                        </div>
                    </div>

                    {/* Newsletter Form */}
                    <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100 max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            Jadilah yang Pertama Tahu!
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Dapatkan notifikasi saat platform kami resmi diluncurkan dan nikmati promo eksklusif
                        </p>

                        {submitted ? (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                <div className="flex items-center justify-center text-green-600 mb-2">
                                    <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-semibold text-lg">Terima kasih!</span>
                                </div>
                                <p className="text-green-700 text-center">
                                    Kami akan menghubungi Anda segera setelah launching.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="masukkan@email.anda"
                                    required
                                    className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition text-lg"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
                                >
                                    Notify Me
                                </button>
                            </form>
                        )}

                        <p className="text-sm text-gray-500 mt-4">
                            *Kami menghargai privasi Anda. Data email tidak akan disebarkan.
                        </p>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-12">
                        <Link
                            href="/"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Kembali ke Home
                        </Link>
                    </div>

                    {/* Countdown (Optional - Static for now) */}
                    <div className="mt-16 grid grid-cols-4 gap-4 max-w-md mx-auto">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-4 text-white">
                            <div className="text-3xl font-bold">--</div>
                            <div className="text-xs uppercase tracking-wide opacity-80">Days</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-4 text-white">
                            <div className="text-3xl font-bold">--</div>
                            <div className="text-xs uppercase tracking-wide opacity-80">Hours</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-4 text-white">
                            <div className="text-3xl font-bold">--</div>
                            <div className="text-xs uppercase tracking-wide opacity-80">Minutes</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-4 text-white">
                            <div className="text-3xl font-bold">--</div>
                            <div className="text-xs uppercase tracking-wide opacity-80">Seconds</div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
