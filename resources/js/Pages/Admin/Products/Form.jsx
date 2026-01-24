import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { MediaPicker } from '@/Components/MediaPicker';
import RichTextEditor from '@/Components/RichTextEditor';
import { Upload, X, Plus, Image as ImageIcon, ArrowUp, ArrowDown, Pencil, Trash2, Eye } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Form({ product }) {
    const isEdit = product !== null;

    const { data, setData, post, processing, errors } = useForm({
        name: product?.name || '',
        type: product?.type || 'house',
        short_description: product?.short_description || '',
        description: product?.description || '',
        price: product?.price || '',
        land_area: product?.land_area || '',
        building_area: product?.building_area || '',
        bedrooms: product?.bedrooms || '',
        bathrooms: product?.bathrooms || '',
        floors: product?.floors || '',
        garage: product?.garage || '',
        is_balcon_exist: product?.is_balcon_exist ?? false,
        balcon_size: product?.balcon_size || '',
        room_area: product?.room_area || '',
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
        featured_image_uid: product?.featured_image_uid || null,
        gallery_uids: product?.gallery_uids || [],
        _method: isEdit ? 'PUT' : 'POST',
    });

    // MediaPicker state
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [mediaPickerMode, setMediaPickerMode] = useState('featured'); // 'featured', 'gallery', or 'slider'

    // Preview state for MediaLibrary images
    const [featuredImagePreview, setFeaturedImagePreview] = useState(product?.featured_image || null);
    const [galleryPreviews, setGalleryPreviews] = useState(product?.gallery_images || []);

    // Slider management state
    const [sliders, setSliders] = useState(product?.sliders || []);
    const [editingSlider, setEditingSlider] = useState(null);
    const [showSliderForm, setShowSliderForm] = useState(false);
    const [showSliderPreview, setShowSliderPreview] = useState(false);
    const [sliderFormData, setSliderFormData] = useState({
        image_uid: null,
        title: '',
        description: '',
        is_active: true,
    });
    const [sliderImagePreview, setSliderImagePreview] = useState(null);

    // Sync sliders with product prop when it changes
    useEffect(() => {
        if (product?.sliders) {
            setSliders(product.sliders);
        }
    }, [product?.sliders]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/products/${product.uid}` : '/admin/products';
        post(url);
    };

    const formatPrice = (value) => {
        if (!value) return '';
        return new Intl.NumberFormat('id-ID').format(value);
    };

    // Slider management functions
    const handleAddSlider = () => {
        setEditingSlider(null);
        setSliderFormData({
            image_uid: null,
            title: '',
            description: '',
            is_active: true,
        });
        setSliderImagePreview(null);
        setShowSliderForm(true);
    };

    const handleEditSlider = (slider) => {
        setEditingSlider(slider);
        setSliderFormData({
            image_uid: slider.image_uid,
            title: slider.title || '',
            description: slider.description || '',
            is_active: slider.is_active,
        });
        setSliderImagePreview(slider.media_image);
        setShowSliderForm(true);
    };

    const handleSaveSlider = () => {
        if (!sliderFormData.image_uid) {
            alert('Please select an image for the slider');
            return;
        }

        if (editingSlider) {
            // Update existing slider
            router.put(
                `/admin/products/${product.uid}/sliders/${editingSlider.uid}`,
                sliderFormData,
                {
                    preserveScroll: true,
                    preserveState: false,
                    onSuccess: () => {
                        setShowSliderForm(false);
                    },
                }
            );
        } else {
            // Add new slider
            router.post(
                `/admin/products/${product.uid}/sliders`,
                sliderFormData,
                {
                    preserveScroll: true,
                    preserveState: false,
                    onSuccess: () => {
                        setShowSliderForm(false);
                    },
                }
            );
        }
    };

    const handleDeleteSlider = (sliderUid) => {
        if (confirm('Are you sure you want to delete this slider?')) {
            router.delete(`/admin/products/${product.uid}/sliders/${sliderUid}`, {
                preserveScroll: true,
                preserveState: false,
            });
        }
    };

    const handleMoveSliderUp = (slider, index) => {
        if (index === 0) return;

        const prevSlider = sliders[index - 1];
        router.post(
            `/admin/products/${product.uid}/sliders/update-order`,
            {
                updates: [
                    { uid: slider.uid, order: prevSlider.order },
                    { uid: prevSlider.uid, order: slider.order },
                ],
            },
            {
                preserveScroll: true,
                preserveState: false,
            }
        );
    };

    const handleMoveSliderDown = (slider, index) => {
        if (index === sliders.length - 1) return;

        const nextSlider = sliders[index + 1];
        router.post(
            `/admin/products/${product.uid}/sliders/update-order`,
            {
                updates: [
                    { uid: slider.uid, order: nextSlider.order },
                    { uid: nextSlider.uid, order: slider.order },
                ],
            },
            {
                preserveScroll: true,
                preserveState: false,
            }
        );
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
                            <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 mb-2">
                                Short Description
                            </label>
                            <textarea
                                id="short_description"
                                value={data.short_description}
                                onChange={(e) => setData('short_description', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.short_description ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Enter a brief description (1-2 sentences)"
                                rows={3}
                            />
                            {errors.short_description && <p className="mt-1 text-sm text-red-600">{errors.short_description}</p>}
                            <p className="mt-1 text-sm text-gray-500">
                                A brief summary of the property (optional)
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <RichTextEditor
                                value={data.description}
                                onChange={(content) => setData('description', content)}
                                placeholder="Enter property description"
                                error={errors.description}
                            />
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

                        {data.type === 'apartment' && (
                            <div>
                                <label htmlFor="room_area" className="block text-sm font-medium text-gray-700 mb-2">
                                    Room Area (m²)
                                </label>
                                <input
                                    id="room_area"
                                    type="number"
                                    step="0.01"
                                    value={data.room_area}
                                    onChange={(e) => setData('room_area', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0"
                                />
                            </div>
                        )}

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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Balcony
                            </label>
                            <div className="flex items-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_balcon_exist}
                                        onChange={(e) => setData('is_balcon_exist', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-700">
                                        Has Balcony
                                    </span>
                                </label>
                            </div>
                        </div>

                        {data.is_balcon_exist && (
                            <div>
                                <label htmlFor="balcon_size" className="block text-sm font-medium text-gray-700 mb-2">
                                    Balcony Size (m²)
                                </label>
                                <input
                                    id="balcon_size"
                                    type="number"
                                    step="0.01"
                                    value={data.balcon_size}
                                    onChange={(e) => setData('balcon_size', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0"
                                />
                            </div>
                        )}
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

                {/* Media Library Images */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>

                    {/* Featured Image */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Featured Image
                        </label>
                        {featuredImagePreview ? (
                            <div className="relative inline-block">
                                <img
                                    src={featuredImagePreview.url || featuredImagePreview.thumbnail_url}
                                    alt={featuredImagePreview.alt_text || 'Featured Image'}
                                    className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFeaturedImagePreview(null);
                                        setData('featured_image_uid', null);
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    setMediaPickerMode('featured');
                                    setShowMediaPicker(true);
                                }}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-48 h-48 flex flex-col items-center justify-center hover:border-blue-500 transition-colors group"
                            >
                                <ImageIcon className="h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                <p className="mt-2 text-sm text-gray-600 group-hover:text-blue-600">Select Image</p>
                            </button>
                        )}
                    </div>

                    {/* Gallery Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gallery Images
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {galleryPreviews.map((image, index) => (
                                <div key={image.uid || index} className="relative group">
                                    <img
                                        src={image.thumbnail_url || image.url}
                                        alt={image.alt_text || `Gallery ${index + 1}`}
                                        className="w-full aspect-square object-cover rounded-lg border-2 border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newGallery = galleryPreviews.filter((_, i) => i !== index);
                                            setGalleryPreviews(newGallery);
                                            setData('gallery_uids', newGallery.map(img => img.uid));
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}

                            {/* Add More Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    setMediaPickerMode('gallery');
                                    setShowMediaPicker(true);
                                }}
                                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors group"
                            >
                                <Plus className="h-8 w-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                <p className="text-xs text-gray-600 group-hover:text-blue-600 mt-1">Add Images</p>
                            </button>
                        </div>
                    </div>
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

                {/* Product Sliders */}
                {isEdit && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Product Sliders</h2>
                                <p className="text-sm text-gray-600 mt-1">Manage image sliders for this product</p>
                            </div>
                            <div className="flex gap-2">
                                {sliders && sliders.filter(s => s.is_active).length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setShowSliderPreview(true)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Preview
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleAddSlider}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Slider
                                </button>
                            </div>
                        </div>

                        {sliders && sliders.length > 0 ? (
                            <div className="space-y-2">
                                {sliders.map((slider, index) => (
                                    <div key={slider.uid} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                                        <div className="flex flex-col gap-1">
                                            <button
                                                type="button"
                                                onClick={() => handleMoveSliderUp(slider, index)}
                                                disabled={index === 0}
                                                className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <ArrowUp className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleMoveSliderDown(slider, index)}
                                                disabled={index === sliders.length - 1}
                                                className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <ArrowDown className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="w-20 h-14 flex-shrink-0">
                                            {slider.image_url ? (
                                                <img src={slider.image_url} alt={slider.title} className="w-full h-full object-cover rounded" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                                                    <ImageIcon className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="font-medium">{slider.title || 'Untitled'}</div>
                                            {slider.description && (
                                                <div className="text-sm text-gray-600 line-clamp-1">{slider.description}</div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs px-2 py-1 rounded ${slider.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {slider.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleEditSlider(slider)}
                                                className="p-2 hover:bg-gray-200 rounded"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteSlider(slider.uid)}
                                                className="p-2 hover:bg-red-100 text-red-600 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                <p>No sliders added yet. Click "Add Slider" to create one.</p>
                            </div>
                        )}
                    </div>
                )}

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

            {/* MediaPicker Modal */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={(media) => {
                    if (mediaPickerMode === 'featured') {
                        // Single image for featured
                        setFeaturedImagePreview(media);
                        setData('featured_image_uid', media.uid);
                    } else if (mediaPickerMode === 'gallery') {
                        // Multiple images for gallery
                        const mediaArray = Array.isArray(media) ? media : [media];
                        const newGallery = [...galleryPreviews, ...mediaArray];
                        setGalleryPreviews(newGallery);
                        setData('gallery_uids', newGallery.map(img => img.uid));
                    } else if (mediaPickerMode === 'slider') {
                        // Single image for slider
                        setSliderImagePreview(media);
                        setSliderFormData({ ...sliderFormData, image_uid: media.uid });
                    }
                    setShowMediaPicker(false);
                }}
                multiple={mediaPickerMode === 'gallery'}
                accept="image"
                folder="products"
            />

            {/* Slider Form Modal */}
            {showSliderForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingSlider ? 'Edit Slider' : 'Add New Slider'}
                            </h3>

                            <div className="space-y-4">
                                {/* Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image <span className="text-red-500">*</span>
                                    </label>
                                    {sliderImagePreview && (
                                        <div className="mb-3 relative group">
                                            <img src={sliderImagePreview.url} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSliderImagePreview(null);
                                                    setSliderFormData({ ...sliderFormData, image_uid: null });
                                                }}
                                                className="absolute top-2 right-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMediaPickerMode('slider');
                                            setShowMediaPicker(true);
                                        }}
                                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                                    >
                                        <ImageIcon className="w-4 h-4 inline mr-2" />
                                        Select from Media Library
                                    </button>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={sliderFormData.title}
                                        onChange={(e) => setSliderFormData({ ...sliderFormData, title: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter slider title (optional)"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={sliderFormData.description}
                                        onChange={(e) => setSliderFormData({ ...sliderFormData, description: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter slider description (optional)"
                                        rows={3}
                                    />
                                </div>

                                {/* Active Status */}
                                <div className="flex items-center">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={sliderFormData.is_active}
                                            onChange={(e) => setSliderFormData({ ...sliderFormData, is_active: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-700">
                                            Active
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowSliderForm(false)}
                                    className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveSlider}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                                >
                                    {editingSlider ? 'Update' : 'Add'} Slider
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Slider Preview Modal */}
            {showSliderPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold">Slider Preview</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Preview bagaimana slider akan ditampilkan. Hanya slider aktif yang ditampilkan.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowSliderPreview(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {sliders && sliders.filter(s => s.is_active).length > 0 ? (
                                <div className="space-y-4">
                                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                                        <Swiper
                                            modules={[Navigation, Pagination, Autoplay]}
                                            spaceBetween={0}
                                            slidesPerView={1}
                                            navigation
                                            pagination={{ clickable: true }}
                                            autoplay={{
                                                delay: 3000,
                                                disableOnInteraction: false,
                                            }}
                                            loop={true}
                                            className="product-slider-preview"
                                        >
                                            {sliders
                                                .filter(slider => slider.is_active)
                                                .map((slider) => (
                                                    <SwiperSlide key={slider.uid}>
                                                        <div className="bg-white">
                                                            <div className="flex flex-col md:flex-row">
                                                                <div className="md:w-1/2">
                                                                    {slider.image_url ? (
                                                                        <img
                                                                            src={slider.image_url}
                                                                            alt={slider.title}
                                                                            className="w-full h-64 md:h-96 object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center">
                                                                            <ImageIcon className="w-16 h-16 text-gray-400" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                                                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                                                        {slider.title || 'Untitled'}
                                                                    </h3>
                                                                    {slider.description && (
                                                                        <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                                                                            {slider.description}
                                                                        </p>
                                                                    )}
                                                                    <span className="inline-block text-xs px-3 py-1 bg-green-100 text-green-700 rounded w-fit">
                                                                        Active
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                        </Swiper>
                                    </div>
                                    <div className="text-sm text-gray-500 text-center">
                                        Menampilkan {sliders.filter(s => s.is_active).length} slider aktif
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-lg">
                                    <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No Active Sliders</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Tidak ada slider aktif untuk ditampilkan.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
