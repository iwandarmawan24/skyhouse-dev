import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Search, User } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import { Alert } from '@/Components/ui/Alert';
import { Pagination } from '@/Components/ui/Pagination';

export default function Index({ users, filters }) {
    const { flash, auth } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [search, setSearch] = useState(filters.search || '');

    const handleDelete = (id) => {
        router.delete(`/admin/users/${id}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/users', { search }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearSearch = () => {
        setSearch('');
        router.get('/admin/users', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
                    <p className="text-gray-600 mt-1">Manage admin users and their access</p>
                </div>
                <Link href="/admin/users/create">
                    <Button>
                        <Plus className="w-5 h-5 mr-2" />
                        Add New User
                    </Button>
                </Link>
            </div>

            {/* Success/Error Message */}
            {flash.success && (
                <Alert variant="success" className="mb-6">
                    {flash.success}
                </Alert>
            )}
            {flash.error && (
                <Alert variant="destructive" className="mb-6">
                    {flash.error}
                </Alert>
            )}

            {/* Search */}
            <Card className="mb-6 p-4">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <Button type="submit">Search</Button>
                    {search && (
                        <Button type="button" variant="secondary" onClick={clearSearch}>
                            Clear
                        </Button>
                    )}
                </form>
            </Card>

            {/* Users Table */}
            <Card>
                {users.data.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created At
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                            {user.name}
                                                            {user.id === auth.user.id && (
                                                                <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                                    You
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {new Date(user.created_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/admin/users/${user.id}/edit`}>
                                                        <Button variant="ghost" size="sm">
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    {user.id !== auth.user.id && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setShowDeleteConfirm(user.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <Pagination data={users} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <User className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {search ? 'Try adjusting your search' : 'Get started by creating a new user.'}
                        </p>
                        {!search && (
                            <div className="mt-6">
                                <Link href="/admin/users/create">
                                    <Button>
                                        <Plus className="w-5 h-5 mr-2" />
                                        Add New User
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </Card>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="max-w-sm w-full mx-4 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete User</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this user? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={() => handleDelete(showDeleteConfirm)}>
                                Delete
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </AdminLayout>
    );
}
