import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { FormInput, FormSelect } from '@/Components/ui/FormField';
import { Input } from '@/Components/ui/Input';
import { Label } from '@/Components/ui/Label';

export default function Form({ user }) {
    const isEdit = user !== null;
    const { data, setData, post, processing, errors } = useForm({
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        username: user?.username || '',
        full_name: user?.full_name || '',
        role: user?.role || 'staff',
        status: user?.status || 'active',
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/users/${user.uid}` : '/admin/users';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/admin/users" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit User' : 'Create New User'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update user information' : 'Add a new admin user to the system'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormInput
                            label="Email Address"
                            name="email"
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            placeholder="email@example.com"
                        />

                        <FormInput
                            label="Username"
                            name="username"
                            required
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            error={errors.username}
                            placeholder="username (e.g. john.doe, john-doe, john_doe)"
                            helperText="Lowercase letters, numbers, dots (.), dashes (-), and underscores (_) allowed"
                        />

                        <FormInput
                            label="Full Name"
                            name="full_name"
                            required
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            error={errors.full_name}
                            placeholder="Enter full name"
                        />

                        <FormSelect
                            label="Role"
                            name="role"
                            required
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            error={errors.role}
                        >
                            <option value="staff">Staff</option>
                            <option value="superadmin">Super Admin</option>
                        </FormSelect>

                        <FormSelect
                            label="Status"
                            name="status"
                            required
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            error={errors.status}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Not Active</option>
                        </FormSelect>
                    </CardContent>
                </Card>

                {/* Password */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {isEdit ? 'Change Password (Optional)' : 'Password'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {isEdit && (
                            <p className="text-sm text-gray-600">
                                Leave password fields empty to keep the current password
                            </p>
                        )}

                        {/* Password Field with Toggle */}
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Password {!isEdit && <span className="text-red-500">*</span>}
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required={!isEdit}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                                    placeholder={isEdit ? 'Leave empty to keep current password' : 'Minimum 8 characters'}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field with Toggle */}
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">
                                Confirm Password {!isEdit && data.password && <span className="text-red-500">*</span>}
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password_confirmation"
                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                    required={!isEdit && data.password}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className={`pr-10 ${errors.password_confirmation ? 'border-red-500' : ''}`}
                                    placeholder="Re-enter password"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                >
                                    {showPasswordConfirmation ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                            {errors.password_confirmation && (
                                <p className="text-sm text-red-500">{errors.password_confirmation}</p>
                            )}
                        </div>

                        {!isEdit && (
                            <p className="text-sm text-gray-500">
                                Password must be at least 8 characters long
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Submit Buttons */}
                <Card>
                    <CardContent className="flex items-center justify-end gap-4 pt-6">
                        <Link href="/admin/users">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </AdminLayout>
    );
}
