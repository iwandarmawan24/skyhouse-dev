import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">
            <div className="text-center">
                {/* Logo/Icon */}
                <div className="mb-8 animate-bounce">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white mb-6 drop-shadow-2xl">
                    SkyHouse
                </h1>

                {/* Message */}
                <p className="text-2xl sm:text-3xl lg:text-4xl text-white/90 font-light mb-12 drop-shadow-lg">
                    We'll be there soon
                </p>

                {/* Admin Link */}
                <Link
                    href="/admin/login"
                    className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-2xl hover:bg-white/30 transition border-2 border-white/30 shadow-xl"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Admin Access
                </Link>
            </div>
        </div>
    );
}
