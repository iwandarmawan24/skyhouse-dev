import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard({ stats, recent_contacts, recent_products }) {
    const statCards = [
        {
            name: 'Total Products',
            value: stats.total_products,
            subtitle: `${stats.active_products} Active`,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            color: 'bg-blue-500',
        },
        {
            name: 'Total Articles',
            value: stats.total_articles,
            subtitle: `${stats.published_articles} Published`,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            ),
            color: 'bg-green-500',
        },
        {
            name: 'Contact Messages',
            value: stats.total_contacts,
            subtitle: `${stats.unread_contacts} Unread`,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: 'bg-yellow-500',
        },
        {
            name: 'Upcoming Events',
            value: stats.upcoming_events,
            subtitle: 'Scheduled',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: 'bg-purple-500',
        },
    ];

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your property CMS.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">{stat.name}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg text-white`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Contacts */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Contacts</h2>
                            <Link
                                href="/admin/contacts"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View All
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {recent_contacts.length > 0 ? (
                            recent_contacts.map((contact) => (
                                <div key={contact.uid} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium text-gray-900">{contact.name}</h3>
                                                {!contact.is_read && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{contact.email}</p>
                                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{contact.message}</p>
                                            {contact.product && (
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Interested in: {contact.product.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                No contacts yet
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Products */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
                            <Link
                                href="/admin/products"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View All
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {recent_products.length > 0 ? (
                            recent_products.map((product) => (
                                <div key={product.uid} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        {product.images && product.images[0] ? (
                                            <img
                                                src={product.images[0].image_path}
                                                alt={product.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    product.type === 'house' ? 'bg-blue-100 text-blue-800' :
                                                    product.type === 'apartment' ? 'bg-green-100 text-green-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {product.type}
                                                </span>
                                                {product.is_featured && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                No products yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
