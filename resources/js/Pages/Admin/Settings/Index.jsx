import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';

export default function Index({ settings }) {
    const { flash } = usePage().props;

    // Initialize form data from settings
    const initialSettings = {};
    Object.keys(settings).forEach((group) => {
        settings[group].forEach((setting) => {
            initialSettings[setting.key] = setting.value || '';
        });
    });

    const { data, setData, put, processing } = useForm(initialSettings);

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
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your website settings and configuration</p>
            </div>

            {/* Success Message */}
            {flash.success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    {flash.success}
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
                                <div key={setting.key}>
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
