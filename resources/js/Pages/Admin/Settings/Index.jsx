import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ settings }) {
    const { flash } = usePage().props;
    const [showAddForm, setShowAddForm] = useState(false);

    // Initialize form data from settings
    const initialSettings = {};
    Object.keys(settings).forEach((group) => {
        settings[group].forEach((setting) => {
            initialSettings[setting.key] = setting.value || '';
        });
    });

    const { data, setData, put, processing } = useForm(initialSettings);

    // Form for adding new setting
    const { data: newSettingData, setData: setNewSettingData, post, processing: addProcessing, reset, errors } = useForm({
        key: '',
        value: '',
        type: 'text',
        group: 'general',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert form data to array format expected by controller
        const settingsArray = Object.keys(data).map((key) => ({
            key,
            value: data[key],
        }));

        put('/admin/settings', {
            data: { settings: settingsArray },
        });
    };

    const handleAddSetting = (e) => {
        e.preventDefault();

        post('/admin/settings', {
            onSuccess: () => {
                reset();
                setShowAddForm(false);
            },
        });
    };

    const handleDeleteSetting = (settingUid) => {
        if (confirm('Are you sure you want to delete this setting?')) {
            router.delete(`/admin/settings/${settingUid}`);
        }
    };

    const getSettingField = (setting) => {
        if (setting.key.includes('phone') || setting.key.includes('whatsapp')) {
            return (
                <input
                    type="tel"
                    value={data[setting.key]}
                    onChange={(e) => setData(setting.key, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={setting.description}
                />
            );
        }

        if (setting.key.includes('email')) {
            return (
                <input
                    type="email"
                    value={data[setting.key]}
                    onChange={(e) => setData(setting.key, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={setting.description}
                />
            );
        }

        if (setting.key.includes('url') || setting.key.includes('link')) {
            return (
                <input
                    type="url"
                    value={data[setting.key]}
                    onChange={(e) => setData(setting.key, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={setting.description}
                />
            );
        }

        if (setting.key.includes('description') || setting.key.includes('address')) {
            return (
                <textarea
                    value={data[setting.key]}
                    onChange={(e) => setData(setting.key, e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={setting.description}
                />
            );
        }

        return (
            <input
                type="text"
                value={data[setting.key]}
                onChange={(e) => setData(setting.key, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={setting.description}
            />
        );
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your website settings and configuration</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                    {showAddForm ? 'Cancel' : '+ Add New Setting'}
                </button>
            </div>

            {/* Success Message */}
            {flash.success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    {flash.success}
                </div>
            )}

            {/* Add Setting Form */}
            {showAddForm && (
                <div className="mb-6 bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Setting</h2>
                    <form onSubmit={handleAddSetting} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Key <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newSettingData.key}
                                    onChange={(e) => setNewSettingData('key', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., contact_phone"
                                    required
                                />
                                {errors.key && <p className="mt-1 text-sm text-red-600">{errors.key}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Value
                                </label>
                                <input
                                    type="text"
                                    value={newSettingData.value}
                                    onChange={(e) => setNewSettingData('value', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Setting value"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={newSettingData.type}
                                    onChange={(e) => setNewSettingData('type', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="text">Text</option>
                                    <option value="textarea">Textarea</option>
                                    <option value="number">Number</option>
                                    <option value="boolean">Boolean</option>
                                    <option value="image">Image</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Group <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={newSettingData.group}
                                    onChange={(e) => setNewSettingData('group', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="general">General</option>
                                    <option value="contact">Contact</option>
                                    <option value="social">Social</option>
                                    <option value="calculator">Calculator</option>
                                    <option value="seo">SEO</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={addProcessing}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {addProcessing ? 'Adding...' : 'Add Setting'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {Object.keys(settings).map((group) => (
                    <div key={group} className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                            {group} Settings
                        </h2>
                        <div className="space-y-4">
                            {settings[group].map((setting) => (
                                <div key={setting.key} className="relative">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <label
                                                htmlFor={setting.key}
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                {setting.key
                                                    .replace(/_/g, ' ')
                                                    .split(' ')
                                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(' ')}
                                            </label>
                                            {getSettingField(setting)}
                                            {setting.description && (
                                                <p className="mt-1 text-sm text-gray-500">{setting.description}</p>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteSetting(setting.uid)}
                                            className="mt-7 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete setting"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Submit Button */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
