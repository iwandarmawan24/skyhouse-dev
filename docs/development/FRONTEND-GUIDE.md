# 🎨 Frontend Developer Guide - SkyHouse CMS

**Panduan lengkap untuk Frontend Developer React yang ingin collaborate pada project SkyHouse CMS.**

Dokumentasi ini ditujukan untuk frontend developer yang sudah familiar dengan React, tapi belum pernah menggunakan Laravel atau Inertia.js. Jangan khawatir! Kamu tidak perlu tahu Laravel untuk mengerjakan landing page dan frontend lainnya.

---

## 📚 Table of Contents

1. [Quick Start](#-quick-start)
2. [Apa itu Inertia.js?](#-apa-itu-inertiajs)
3. [Project Structure](#-project-structure)
4. [Development Workflow](#-development-workflow)
5. [Routing & Navigation](#-routing--navigation)
6. [Data Fetching](#-data-fetching)
7. [Forms & Submissions](#-forms--submissions)
8. [UI Components](#-ui-components)
9. [Landing Page Development](#-landing-page-development)
10. [API Integration](#-api-integration)
11. [Best Practices](#-best-practices)
12. [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

### Prerequisites

Yang kamu perlukan:
- Node.js 20+ (cek: `node --version`)
- npm atau yarn
- Git
- Text editor (VS Code recommended)

### Setup Development Environment

```bash
# 1. Clone repository
git clone <repository-url>
cd skyhouse

# 2. Install dependencies
npm install

# 3. Copy environment file (minta ke backend developer)
cp .env.example .env

# 4. Start development server
npm run dev
```

**Important:** Backend developer perlu menjalankan Laravel server di background dengan `./vendor/bin/sail up -d` atau `php artisan serve`.

### Your First Change

Coba edit landing page:

1. Buka `resources/js/Pages/Welcome.jsx`
2. Edit text atau styling
3. Save file
4. Browser akan auto-reload (Hot Module Replacement)

---

## 🤔 Apa itu Inertia.js?

**TL;DR:** Inertia.js adalah "glue" yang menghubungkan Laravel backend dengan React frontend tanpa perlu REST API.

### Cara Kerja Inertia

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Browser   │────────▶│  Laravel     │────────▶│   React     │
│             │◀────────│  Controller  │◀────────│  Component  │
└─────────────┘         └──────────────┘         └─────────────┘
    Request                Inertia.render()          Render UI
```

### Bedanya dengan REST API

**Traditional React + API:**
```jsx
// ❌ Cara lama dengan REST API
function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return <div>{/* render products */}</div>;
}
```

**React + Inertia:**
```jsx
// ✅ Dengan Inertia (NO API calls needed!)
export default function ProductList({ products }) {
    // Data sudah ada di props, langsung pakai!
    return <div>{/* render products */}</div>;
}
```

### Keuntungan Pakai Inertia

✅ **No API layer needed** - Data langsung dari controller ke props
✅ **Server-side routing** - Routes defined di Laravel, tinggal pakai
✅ **Automatic code splitting** - Each page loaded on demand
✅ **Built-in form handling** - Easy form submissions
✅ **SPA-like experience** - No full page reloads
✅ **SEO friendly** - Server-side rendering support

---

## 📁 Project Structure

Ini adalah folder-folder yang penting untuk frontend development:

```
skyhouse/
├── resources/
│   ├── js/                          # 👈 INI FOLDER UTAMA KAMU!
│   │   ├── Pages/                   # React page components
│   │   │   ├── Welcome.jsx          # Landing page (homepage)
│   │   │   ├── Admin/               # Admin pages (jangan diubah)
│   │   │   └── ... (future pages)   # Landing pages kamu nanti
│   │   │
│   │   ├── Components/              # Reusable components
│   │   │   ├── ui/                  # UI components (shadcn)
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── ...
│   │   │   └── ... (your components)
│   │   │
│   │   ├── Layouts/                 # Layout components
│   │   │   ├── AdminLayout.jsx      # Admin layout (jangan diubah)
│   │   │   └── LandingLayout.jsx    # Landing layout (buat ini!)
│   │   │
│   │   ├── app.jsx                  # Inertia app entry point
│   │   └── bootstrap.js             # Axios & app bootstrap
│   │
│   └── css/
│       └── app.css                  # Global styles (Tailwind)
│
├── routes/
│   └── web.php                      # Routes definition (Laravel)
│
├── public/                          # Static assets
│   ├── build/                       # Compiled assets (jangan edit!)
│   └── storage/                     # Uploaded files
│
├── package.json                     # npm dependencies
├── vite.config.js                   # Vite configuration
└── tailwind.config.js               # Tailwind configuration
```

### Folder Kerja Kamu

Sebagai frontend developer, **95% waktu kamu akan di folder ini:**

```
resources/js/
├── Pages/              # Buat halaman baru di sini
├── Components/         # Buat komponen reusable di sini
└── Layouts/            # Buat layout di sini
```

---

## 🔄 Development Workflow

### Daily Development Flow

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
npm install

# 3. Start dev server (dengan hot reload)
npm run dev

# 4. Develop! Edit files di resources/js/
# Browser auto-reload saat save

# 5. Build for production (sebelum commit)
npm run build
```

### Hot Module Replacement (HMR)

Vite provides instant feedback:
- Edit `.jsx` files → Browser updates instantly
- Edit `.css` files → Styles update without reload
- Errors show in browser console

### Working with Vite

```bash
# Development (with HMR)
npm run dev

# Production build
npm run build

# Lint check (optional)
npm run lint
```

**Tips:** Keep `npm run dev` running di terminal terpisah while coding!

---

## 🛣️ Routing & Navigation

### Route Definition (Laravel Side)

Routes didefinisikan di `routes/web.php`. Kamu **tidak perlu** edit file ini kecuali minta backend developer.

**Example routes:**
```php
// routes/web.php
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{uid}', [ProductController::class, 'show'])->name('products.show');
Route::get('/about', [AboutController::class, 'show'])->name('about');
Route::get('/contact', [ContactController::class, 'create'])->name('contact');
```

### Navigation in React

Gunakan `Link` component dari Inertia (JANGAN pakai `<a>` tag!):

```jsx
import { Link } from '@inertiajs/react';

export default function Navigation() {
    return (
        <nav>
            {/* ✅ Correct - Inertia Link (SPA navigation) */}
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>

            {/* ❌ Wrong - Native anchor (full page reload) */}
            <a href="/products">Products</a>
        </nav>
    );
}
```

### Using Named Routes

Lebih baik pakai named routes dengan `route()` helper:

```jsx
import { Link } from '@inertiajs/react';

// Route name defined in Laravel: ->name('products.show')
<Link href={route('products.show', product.uid)}>
    View Product
</Link>

// With query params
<Link href={route('products.index', { category: 'apartment' })}>
    Apartments
</Link>
```

### Programmatic Navigation

Pakai `router.visit()` untuk navigate via JavaScript:

```jsx
import { router } from '@inertiajs/react';

function handleClick() {
    router.visit('/products');
}

function handleRedirect() {
    router.visit('/thank-you', {
        method: 'get',
        onSuccess: () => console.log('Navigated!')
    });
}
```

---

## 📦 Data Fetching

### Props dari Laravel Controller

Data **automatically** dikirim dari Laravel ke React component sebagai props.

**Laravel Controller:**
```php
// app/Http/Controllers/ProductController.php
public function index()
{
    return Inertia::render('Products/Index', [
        'products' => Product::with('images')->get(),
        'categories' => Category::all(),
    ]);
}
```

**React Component:**
```jsx
// resources/js/Pages/Products/Index.jsx
export default function ProductIndex({ products, categories }) {
    // ✅ Data sudah ada di props, tinggal pakai!
    return (
        <div>
            <h1>Products</h1>
            {products.map(product => (
                <div key={product.uid}>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
}
```

### Shared Data (Available in All Pages)

Ada beberapa data yang **selalu** tersedia di semua page via `usePage()` hook:

```jsx
import { usePage } from '@inertiajs/react';

export default function MyComponent() {
    const { props } = usePage();

    // ✅ Data yang selalu ada:
    console.log(props.auth);        // User info (if logged in)
    console.log(props.flash);       // Flash messages
    console.log(props.errors);      // Validation errors

    return <div>...</div>;
}
```

### Getting Current Route

```jsx
import { usePage } from '@inertiajs/react';

export default function Navigation() {
    const { url, component } = usePage();

    // url: "/products" (current URL)
    // component: "Products/Index" (current page component)

    return (
        <nav>
            <Link
                href="/products"
                className={url === '/products' ? 'active' : ''}
            >
                Products
            </Link>
        </nav>
    );
}
```

### Reloading Data

Kadang kamu perlu reload data tanpa full page refresh:

```jsx
import { router } from '@inertiajs/react';

function handleRefresh() {
    router.reload({
        only: ['products'],  // Only reload 'products' prop
        preserveScroll: true // Keep scroll position
    });
}
```

---

## 📝 Forms & Submissions

### Basic Form with useForm Hook

Inertia provides `useForm` hook untuk handling forms dengan mudah:

```jsx
import { useForm } from '@inertiajs/react';

export default function ContactForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => alert('Message sent!'),
            onError: (errors) => console.log(errors)
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div>
                <label>Message</label>
                <textarea
                    value={data.message}
                    onChange={e => setData('message', e.target.value)}
                />
                {errors.message && <span className="error">{errors.message}</span>}
            </div>

            <button type="submit" disabled={processing}>
                {processing ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
```

### useForm Hook Methods

```jsx
const form = useForm(initialData);

// Available properties:
form.data           // Current form data
form.errors         // Validation errors
form.processing     // Is form submitting?
form.wasSuccessful  // Was last submit successful?
form.recentlySuccessful // Was successful in last 2 seconds?
form.hasErrors      // Are there any errors?

// Available methods:
form.setData('key', value)           // Set single field
form.setData({ key: value, ... })    // Set multiple fields
form.reset()                          // Reset to initial values
form.reset('key1', 'key2')           // Reset specific fields
form.clearErrors()                    // Clear all errors
form.clearErrors('key')              // Clear specific error

// Submit methods:
form.post(url, options)
form.put(url, options)
form.patch(url, options)
form.delete(url, options)
```

### File Upload

```jsx
import { useForm } from '@inertiajs/react';

export default function UploadForm() {
    const { data, setData, post, progress } = useForm({
        image: null,
        title: '',
    });

    function handleSubmit(e) {
        e.preventDefault();

        // Inertia will automatically handle multipart/form-data
        post('/upload', {
            forceFormData: true,  // Force FormData (for files)
            onSuccess: () => alert('Uploaded!')
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                onChange={e => setData('image', e.target.files[0])}
            />

            <input
                type="text"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
            />

            {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
            )}

            <button type="submit">Upload</button>
        </form>
    );
}
```

### Success Messages

Laravel sends flash messages yang bisa kamu show setelah form submission:

```jsx
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function MyForm() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            alert(flash.success);
            // Or use toast library like react-hot-toast
        }
    }, [flash]);

    return <form>...</form>;
}
```

---

## 🎨 UI Components

Project ini sudah include **shadcn/ui** components yang sudah di-optimize. Kamu bisa langsung pakai!

### Available Components

Located in `resources/js/Components/ui/`:

```
ui/
├── Alert.jsx         # Alert boxes
├── Badge.jsx         # Status badges
├── Button.jsx        # Buttons with variants
├── Card.jsx          # Card containers
├── Dialog.jsx        # Modals
├── Form.jsx          # Form wrapper with context
├── FormField.jsx     # Form field wrapper
├── Input.jsx         # Text inputs
├── Label.jsx         # Form labels
├── Pagination.jsx    # Pagination component
├── Select.jsx        # Dropdown select
├── Table.jsx         # Data tables
└── Textarea.jsx      # Text area
```

### Using UI Components

```jsx
import { Button } from '@/Components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Badge } from '@/Components/ui/Badge';

export default function ProductCard({ product }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <Badge variant="success">Available</Badge>
            </CardHeader>
            <CardContent>
                <p>{product.description}</p>
                <p className="text-2xl font-bold">{product.price}</p>
                <Button variant="primary" size="lg">
                    Buy Now
                </Button>
            </CardContent>
        </Card>
    );
}
```

### Button Variants

```jsx
import { Button } from '@/Components/ui/Button';

<Button variant="default">Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Card Components

```jsx
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from '@/Components/ui/Card';

<Card>
    <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text</CardDescription>
    </CardHeader>
    <CardContent>
        <p>Main content goes here</p>
    </CardContent>
    <CardFooter>
        <Button>Action</Button>
    </CardFooter>
</Card>
```

### Alert Components

```jsx
import { Alert, AlertTitle, AlertDescription } from '@/Components/ui/Alert';

<Alert variant="success">
    <AlertTitle>Success!</AlertTitle>
    <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

<Alert variant="error">
    <AlertTitle>Error!</AlertTitle>
    <AlertDescription>Something went wrong.</AlertDescription>
</Alert>

<Alert variant="warning">
    <AlertTitle>Warning!</AlertTitle>
    <AlertDescription>Please review before proceeding.</AlertDescription>
</Alert>
```

### Using Lucide Icons

Project includes `lucide-react` for icons:

```jsx
import { Home, ShoppingCart, User, Search, Menu } from 'lucide-react';

<Button>
    <ShoppingCart className="w-4 h-4 mr-2" />
    Add to Cart
</Button>

<Search className="w-6 h-6 text-gray-500" />
```

**Icon Library:** https://lucide.dev/icons

---

## 🏠 Landing Page Development

Ini adalah task utama kamu! Mari kita breakdown step-by-step.

### Step 1: Create Landing Layout

Buat layout untuk landing pages (berbeda dari admin layout):

```jsx
// resources/js/Layouts/LandingLayout.jsx
import { Link } from '@inertiajs/react';

export default function LandingLayout({ children }) {
    return (
        <div className="min-h-screen bg-white">
            {/* Header / Navigation */}
            <header className="sticky top-0 z-50 bg-white border-b">
                <nav className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            SkyHouse
                        </Link>

                        {/* Navigation Links */}
                        <div className="flex items-center space-x-6">
                            <Link href="/" className="hover:text-blue-600">
                                Home
                            </Link>
                            <Link href="/products" className="hover:text-blue-600">
                                Products
                            </Link>
                            <Link href="/about" className="hover:text-blue-600">
                                About
                            </Link>
                            <Link href="/contact" className="hover:text-blue-600">
                                Contact
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">SkyHouse</h3>
                            <p className="text-gray-400">
                                Premium property management system
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/about">About</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contact</h4>
                            <p className="text-gray-400">
                                Email: info@skyhouse.com<br />
                                Phone: (123) 456-7890
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        © 2025 SkyHouse. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
```

### Step 2: Update Welcome Page (Homepage)

```jsx
// resources/js/Pages/Welcome.jsx
import LandingLayout from '@/Layouts/LandingLayout';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent } from '@/Components/ui/Card';
import { Link } from '@inertiajs/react';
import { Home, Building, Users } from 'lucide-react';

export default function Welcome({ heroBanners, featuredProducts }) {
    return (
        <LandingLayout>
            {/* Hero Section */}
            <section className="relative h-screen">
                <img
                    src={heroBanners[0]?.image_url}
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-6xl font-bold mb-4">
                            Find Your Dream Property
                        </h1>
                        <p className="text-xl mb-8">
                            Luxury apartments and houses in prime locations
                        </p>
                        <Link href="/products">
                            <Button size="lg" variant="primary">
                                Explore Properties
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Why Choose SkyHouse
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card>
                            <CardContent className="p-6 text-center">
                                <Home className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Premium Properties
                                </h3>
                                <p className="text-gray-600">
                                    Handpicked luxury properties in the best locations
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <Building className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Modern Facilities
                                </h3>
                                <p className="text-gray-600">
                                    State-of-the-art amenities and facilities
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Expert Support
                                </h3>
                                <p className="text-gray-600">
                                    Professional team ready to assist you
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Featured Properties
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProducts?.map(product => (
                            <Card key={product.uid}>
                                <img
                                    src={product.primary_image?.image_url}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {product.location}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-blue-600">
                                            {product.price}
                                        </span>
                                        <Link href={`/products/${product.uid}`}>
                                            <Button variant="outline">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
```

### Step 3: Ask Backend Developer for Routes

Setelah bikin component, kamu perlu minta backend developer untuk:

1. **Add route di `routes/web.php`:**
```php
Route::get('/', [HomeController::class, 'index'])->name('home');
```

2. **Create controller method:**
```php
// app/Http/Controllers/HomeController.php
public function index()
{
    return Inertia::render('Welcome', [
        'heroBanners' => HeroBanner::where('is_active', true)->get(),
        'featuredProducts' => Product::where('is_featured', true)->take(6)->get(),
    ]);
}
```

### Step 4: Create More Landing Pages

**Products Listing Page:**
```jsx
// resources/js/Pages/Products/Index.jsx
import LandingLayout from '@/Layouts/LandingLayout';
import { Card, CardContent } from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import { Link } from '@inertiajs/react';

export default function ProductIndex({ products, categories }) {
    return (
        <LandingLayout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">Our Properties</h1>

                {/* Filters */}
                <div className="mb-8 flex gap-4">
                    {categories?.map(category => (
                        <Button
                            key={category.uid}
                            variant="outline"
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products?.map(product => (
                        <Card key={product.uid}>
                            <img
                                src={product.primary_image?.image_url}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-semibold mb-2">
                                    {product.name}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-blue-600">
                                        {product.price}
                                    </span>
                                    <Link href={`/products/${product.uid}`}>
                                        <Button>View Details</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </LandingLayout>
    );
}
```

**Product Detail Page:**
```jsx
// resources/js/Pages/Products/Show.jsx
import LandingLayout from '@/Layouts/LandingLayout';
import { Button } from '@/Components/ui/Button';
import { useState } from 'react';

export default function ProductShow({ product }) {
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <LandingLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div>
                        <img
                            src={product.images[currentImage]?.image_url}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-lg mb-4"
                        />
                        <div className="grid grid-cols-4 gap-2">
                            {product.images?.map((image, index) => (
                                <img
                                    key={image.uid}
                                    src={image.image_url}
                                    alt={`${product.name} ${index + 1}`}
                                    className="w-full h-20 object-cover rounded cursor-pointer"
                                    onClick={() => setCurrentImage(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-4xl font-bold mb-4">
                            {product.name}
                        </h1>
                        <p className="text-3xl font-bold text-blue-600 mb-6">
                            {product.price}
                        </p>
                        <p className="text-gray-600 mb-6">
                            {product.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Type:</span>
                                <span className="font-semibold">{product.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Location:</span>
                                <span className="font-semibold">{product.location}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Size:</span>
                                <span className="font-semibold">{product.size}</span>
                            </div>
                        </div>

                        <Button size="lg" className="w-full">
                            Contact Us
                        </Button>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
```

**Contact Page:**
```jsx
// resources/js/Pages/Contact.jsx
import LandingLayout from '@/Layouts/LandingLayout';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                alert('Thank you! We will contact you soon.');
            }
        });
    }

    return (
        <LandingLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">
                        Contact Us
                    </h1>

                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <Input
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Your name"
                                    />
                                    {errors.name && (
                                        <span className="text-red-500 text-sm">
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm">
                                            {errors.email}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Phone
                                    </label>
                                    <Input
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        placeholder="+62 xxx xxxx xxxx"
                                    />
                                    {errors.phone && (
                                        <span className="text-red-500 text-sm">
                                            {errors.phone}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Message
                                    </label>
                                    <Textarea
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        placeholder="Tell us what you're interested in..."
                                        rows={5}
                                    />
                                    {errors.message && (
                                        <span className="text-red-500 text-sm">
                                            {errors.message}
                                        </span>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                    size="lg"
                                >
                                    {processing ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </LandingLayout>
    );
}
```

---

## 🔌 API Integration

Meskipun Inertia sudah handle most data passing, kadang kamu tetap perlu call API untuk:
- Real-time updates
- Third-party APIs
- AJAX operations

### Using Axios (Already Configured)

```jsx
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function LiveStats() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        // Axios already configured with CSRF token
        axios.get('/api/stats')
            .then(response => setStats(response.data))
            .catch(error => console.error(error));
    }, []);

    return <div>{stats?.total_properties} Properties</div>;
}
```

### CSRF Token (Already Handled)

Axios sudah dikonfigurasi untuk automatically include CSRF token di `resources/js/bootstrap.js`:

```js
// Already configured - you don't need to do this!
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
```

### Fetching External APIs

```jsx
import { useState, useEffect } from 'react';

export default function ExternalData() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://api.example.com/data')
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    return <div>...</div>;
}
```

---

## ✅ Best Practices

### 1. Component Organization

```
Components/
├── ui/              # Generic UI components (shadcn)
├── landing/         # Landing-specific components
│   ├── HeroSection.jsx
│   ├── ProductCard.jsx
│   ├── Testimonial.jsx
│   └── Newsletter.jsx
└── shared/          # Shared components
    ├── Navigation.jsx
    ├── Footer.jsx
    └── SearchBar.jsx
```

### 2. Path Aliases

Gunakan `@/` alias untuk import (already configured):

```jsx
// ✅ Good - menggunakan alias
import LandingLayout from '@/Layouts/LandingLayout';
import { Button } from '@/Components/ui/Button';

// ❌ Avoid - relative paths
import LandingLayout from '../../Layouts/LandingLayout';
import { Button } from '../../Components/ui/Button';
```

### 3. Prop Validation

Gunakan PropTypes atau TypeScript untuk type safety:

```jsx
import PropTypes from 'prop-types';

export default function ProductCard({ product }) {
    return <div>...</div>;
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
    }).isRequired,
};
```

### 4. Conditional Rendering

```jsx
// ✅ Good - optional chaining
<img src={product.primary_image?.image_url} />

// ✅ Good - with fallback
<img src={product.primary_image?.image_url || '/placeholder.jpg'} />

// ✅ Good - conditional component
{products?.length > 0 && (
    <div className="grid">
        {products.map(product => <ProductCard key={product.uid} product={product} />)}
    </div>
)}

{products?.length === 0 && (
    <p>No products found.</p>
)}
```

### 5. Key Props in Lists

Always use unique `uid` for keys:

```jsx
// ✅ Good
{products.map(product => (
    <ProductCard key={product.uid} product={product} />
))}

// ❌ Bad - using index
{products.map((product, index) => (
    <ProductCard key={index} product={product} />
))}
```

### 6. Loading States

```jsx
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function ProductList() {
    const [loading, setLoading] = useState(false);

    function handleFilter(category) {
        setLoading(true);
        router.visit(`/products?category=${category}`, {
            onFinish: () => setLoading(false)
        });
    }

    return (
        <div>
            {loading && <LoadingSpinner />}
            {/* content */}
        </div>
    );
}
```

### 7. Error Boundaries

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
```

### 8. Performance Optimization

```jsx
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive component
const ProductCard = memo(function ProductCard({ product }) {
    return <div>...</div>;
});

// Memoize expensive calculations
export default function ProductList({ products }) {
    const sortedProducts = useMemo(() => {
        return products.sort((a, b) => a.price - b.price);
    }, [products]);

    const handleClick = useCallback((uid) => {
        console.log('Clicked', uid);
    }, []);

    return (
        <div>
            {sortedProducts.map(product => (
                <ProductCard
                    key={product.uid}
                    product={product}
                    onClick={handleClick}
                />
            ))}
        </div>
    );
}
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Issue: "Inertia request did not receive a valid Inertia response"

**Cause:** Route tidak return Inertia response

**Solution:** Minta backend developer untuk pastikan controller return `Inertia::render()`

```php
// routes/web.php
Route::get('/products', [ProductController::class, 'index']);

// app/Http/Controllers/ProductController.php
public function index() {
    // ✅ Correct
    return Inertia::render('Products/Index', [
        'products' => Product::all()
    ]);

    // ❌ Wrong
    return view('products.index');
    return response()->json([...]);
}
```

#### Issue: "Cannot find module '@/Components/...'"

**Cause:** Path alias not recognized

**Solution:** Restart Vite dev server

```bash
# Stop dev server (Ctrl+C)
# Start again
npm run dev
```

#### Issue: Changes not reflecting in browser

**Solutions:**
```bash
# 1. Hard refresh browser
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

# 2. Clear Vite cache
rm -rf node_modules/.vite
npm run dev

# 3. Rebuild
npm run build
```

#### Issue: "419 Page Expired" on form submit

**Cause:** CSRF token expired

**Solution:** Refresh page atau check `bootstrap.js` configuration

#### Issue: Images not loading

**Solutions:**
```jsx
// ✅ Use full URL from backend
<img src={product.image_url} />

// ✅ Use public path
<img src={`/storage/${product.image_path}`} />

// ❌ Don't use relative paths
<img src="../../images/product.jpg" />
```

#### Issue: Props undefined

**Debug steps:**
```jsx
import { usePage } from '@inertiajs/react';

export default function MyPage() {
    const { props } = usePage();

    // Debug: Check all props
    console.log('All props:', props);

    return <div>...</div>;
}
```

---

## 📚 Additional Resources

### Official Documentation

- **Inertia.js**: https://inertiajs.com/
- **React**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Lucide Icons**: https://lucide.dev/
- **Vite**: https://vite.dev/

### Learning Resources

- **Inertia.js Tutorial**: https://inertiajs.com/demo-application
- **React Hooks**: https://react.dev/reference/react
- **Tailwind Components**: https://tailwindui.com/

### Project-Specific Files

- Check `routes/web.php` for available routes
- Check `app/Models/` for database structure
- Check existing admin pages in `resources/js/Pages/Admin/` for examples

---

## 🤝 Collaboration Tips

### Communication with Backend Developer

**Saat butuh route baru:**
```
"Halo, aku butuh route untuk products list page.

Route: GET /products
Controller method: ProductController@index
Data yang dibutuhkan:
- products (dengan images dan categories)
- categories (untuk filter)

Thanks!"
```

**Saat butuh data tambahan:**
```
"Di product detail, aku butuh data related_products.
Bisa ditambahkan di ProductController@show?
Maksimal 4 products dengan category yang sama."
```

**Saat butuh form endpoint:**
```
"Aku sudah bikin contact form, butuh route:

POST /contact
Request body:
{
    name: string,
    email: string,
    phone: string,
    message: string
}

Setelah sukses, redirect ke /thank-you"
```

### Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/landing-page-home

# 2. Make changes
# Edit files...

# 3. Commit dengan pesan yang jelas
git add .
git commit -m "feat: Add homepage hero section and featured products"

# 4. Push ke remote
git push origin feature/landing-page-home

# 5. Create Pull Request di GitHub
```

### Code Review Checklist

Sebelum push/PR, pastikan:
- [ ] `npm run build` success tanpa error
- [ ] Tidak ada console.error di browser
- [ ] Responsive di mobile, tablet, desktop
- [ ] Images loading dengan benar
- [ ] Links/navigation berfungsi
- [ ] Forms submit dengan benar
- [ ] Loading states implemented
- [ ] Error handling implemented

---

## 🎯 Quick Reference

### Common Commands

```bash
# Development
npm run dev              # Start dev server with HMR
npm run build            # Build for production
npm run lint             # Run ESLint

# Git
git status               # Check changes
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push                 # Push to remote
git pull                 # Pull latest changes

# Project structure
resources/js/Pages/      # Create pages here
resources/js/Components/ # Create components here
resources/js/Layouts/    # Create layouts here
```

### Import Cheat Sheet

```jsx
// Inertia
import { Link, useForm, usePage, router } from '@inertiajs/react';

// React
import { useState, useEffect, useMemo, useCallback } from 'react';

// UI Components
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';

// Icons
import { Home, User, Search, Menu } from 'lucide-react';

// Layouts
import LandingLayout from '@/Layouts/LandingLayout';
```

### Component Template

```jsx
import { Link } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import { Button } from '@/Components/ui/Button';

export default function MyPage({ data, otherProp }) {
    // Props automatically passed from Laravel controller

    return (
        <LandingLayout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">
                    Page Title
                </h1>

                {/* Your content here */}
            </div>
        </LandingLayout>
    );
}
```

---

## 💬 Need Help?

**Stuck?** Ask your backend developer teammate:
- Route issues
- Data structure questions
- API endpoints
- Database queries
- Server errors

**Frontend issues?** Check:
1. Browser console for errors
2. Vite dev server terminal for build errors
3. This documentation
4. Official Inertia.js docs

---

**Happy Coding!** 🚀

Kalau ada yang kurang jelas atau butuh contoh lebih spesifik, jangan ragu untuk tanya! Good luck dengan landing page development! 💪
