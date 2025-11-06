import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Form({ product }) {
    const isEdit = product !== null;

    const { data, setData, post, processing, errors } = useForm({
        name: product?.name || '',
        type: product?.type || 'house',
        description: product?.description || '',
        price: product?.price || '',
        land_area: product?.land_area || '',
        building_area: product?.building_area || '',
        bedrooms: product?.bedrooms || '',
        bathrooms: product?.bathrooms || '',
        floors: product?.floors || '',
        garage: product?.garage || '',
        location: product?.location || '',
        city: product?.city || '',
        province: product?.province || '',
        latitude: product?.latitude || '',
        longitude: product?.longitude || '',
        video_url: product?.video_url || '',
        video_360_url: product?.video_360_url || '',
        is_featured: product?.is_featured ?? false,
        is_sold: product?.is_sold ?? false,
        is_active: product?.is_active ?? true,
        images: [],
        deleted_images: [],
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [existingImages, setExistingImages] = useState(product?.images || []);
    const [newImagePreviews, setNewImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setData('images', [...data.images, ...files]);

            const previews = files.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(previews).then((results) => {
                setNewImagePreviews([...newImagePreviews, ...results]);
            });
        }
    };

    const removeNewImage = (index) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);

        const newPreviews = [...newImagePreviews];
        newPreviews.splice(index, 1);
        setNewImagePreviews(newPreviews);
    };

    const removeExistingImage = (imageId) => {
        setExistingImages(existingImages.filter((img) => img.id !== imageId));
        setData('deleted_images', [...data.deleted_images, imageId]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/products/${product.uid}` : '/admin/products';
        post(url);
    };

    const formatPrice = (value) => {
        if (!value) return '';
        return new Intl.NumberFormat('id-ID').format(value);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link
                        href="/admin/products"
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Product' : 'Create New Product'}
                    </h1>
                </div>
                <p className="text-gray-600 ml-10">
                    {isEdit ? 'Update the product details below' : 'Fill in the form to add a new product'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Property Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Enter property name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                                Property Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="type"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.type ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            >
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="land">Land</option>
                            </select>
                            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                Price (IDR) <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="price"
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.price ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="0"
                            />
                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                            {data.price && (
                                <p className="mt-1 text-sm text-gray-500">
                                    {formatPrice(data.price)} IDR
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={6}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.description ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Enter property description"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="land_area" className="block text-sm font-medium text-gray-700 mb-2">
                                Land Area (m²)
                            </label>
                            <input
                                id="land_area"
                                type="number"
                                step="0.01"
                                value={data.land_area}
                                onChange={(e) => setData('land_area', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label htmlFor="building_area" className="block text-sm font-medium text-gray-700 mb-2">
                                Building Area (m²)
                            </label>
                            <input
                                id="building_area"
                                type="number"
                                step="0.01"
                                value={data.building_area}
                                onChange={(e) => setData('building_area', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                                Bedrooms
                            </label>
                            <input
                                id="bedrooms"
                                type="number"
                                value={data.bedrooms}
                                onChange={(e) => setData('bedrooms', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                                Bathrooms
                            </label>
                            <input
                                id="bathrooms"
                                type="number"
                                value={data.bathrooms}
                                onChange={(e) => setData('bathrooms', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label htmlFor="floors" className="block text-sm font-medium text-gray-700 mb-2">
                                Floors
                            </label>
                            <input
                                id="floors"
                                type="number"
                                value={data.floors}
                                onChange={(e) => setData('floors', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label htmlFor="garage" className="block text-sm font-medium text-gray-700 mb-2">
                                Garage
                            </label>
                            <input
                                id="garage"
                                type="number"
                                value={data.garage}
                                onChange={(e) => setData('garage', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="location"
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.location ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Enter full address"
                            />
                            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="city"
                                type="text"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.city ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Enter city"
                            />
                            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                        </div>

                        <div>
                            <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
                                Province <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="province"
                                type="text"
                                value={data.province}
                                onChange={(e) => setData('province', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.province ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Enter province"
                            />
                            {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
                        </div>

                        <div>
                            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
                                Latitude
                            </label>
                            <input
                                id="latitude"
                                type="number"
                                step="any"
                                value={data.latitude}
                                onChange={(e) => setData('latitude', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="-6.200000"
                            />
                        </div>

                        <div>
                            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
                                Longitude
                            </label>
                            <input
                                id="longitude"
                                type="number"
                                step="any"
                                value={data.longitude}
                                onChange={(e) => setData('longitude', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="106.816666"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>

                    {/* Existing Images */}
                    {isEdit && existingImages.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Current Images</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {existingImages.map((image) => (
                                    <div key={image.id} className="relative group">
                                        <img
                                            src={
                                                image.image_path.startsWith('http')
                                                    ? image.image_path
                                                    : `/storage/${image.image_path}`
                                            }
                                            alt="Product"
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        {image.is_primary && (
                                            <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                                                Primary
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(image.id)}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* New Images Preview */}
                    {newImagePreviews.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">New Images</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {newImagePreviews.map((preview, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upload Area */}
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="images"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PNG, JPG, JPEG or WEBP (MAX. 2MB each)</p>
                            </div>
                            <input
                                id="images"
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                multiple
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                    {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
                </div>

                {/* Media Links */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Media Links (Optional)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="video_url" className="block text-sm font-medium text-gray-700 mb-2">
                                Video URL
                            </label>
                            <input
                                id="video_url"
                                type="url"
                                value={data.video_url}
                                onChange={(e) => setData('video_url', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://youtube.com/..."
                            />
                        </div>

                        <div>
                            <label htmlFor="video_360_url" className="block text-sm font-medium text-gray-700 mb-2">
                                360° Video URL
                            </label>
                            <input
                                id="video_360_url"
                                type="url"
                                value={data.video_360_url}
                                onChange={(e) => setData('video_360_url', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-700">
                                    Featured Product
                                </span>
                            </label>
                        </div>

                        {isEdit && (
                            <div className="flex items-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_sold}
                                        onChange={(e) => setData('is_sold', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-700">
                                        Mark as Sold
                                    </span>
                                </label>
                            </div>
                        )}

                        <div className="flex items-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-700">
                                    Active
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href="/admin/products"
                            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
