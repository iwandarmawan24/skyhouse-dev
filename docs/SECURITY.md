# Security Implementation - SkyHouse

## 🔒 Data Security Features

### 1. **API Resources**
Filters sensitive data before sending to client-side.

#### Implementation:

**Created Resources:**
- `app/Http/Resources/UserResource.php`
- `app/Http/Resources/HeroBannerResource.php`

**Usage Example:**
```php
// Controller
use App\Http\Resources\HeroBannerResource;

return Inertia::render('Admin/HeroBanners/Index', [
    'banners' => HeroBannerResource::collection($banners)
]);
```

**Benefits:**
- ✅ Only exposes necessary fields
- ✅ Hides sensitive data (passwords, tokens)
- ✅ Conditional fields based on user role
- ✅ Consistent data structure

---

### 2. **HashIds Trait** (Available but not used by default)

The project uses **UUID** for primary keys instead of HashIds. UUID provides better security than auto-increment IDs.

**If you want to use HashIds for additional models:**

```php
use App\Traits\HasHashId;

class YourModel extends Model
{
    use HasHashId;

    // Now you can use:
    // $model->hash_id  - Get hashed ID
    // Model::findByHashId($hashId) - Find by hash
}
```

**Current Implementation:**
- ✅ `uid` field uses UUID (more secure than sequential IDs)
- ✅ UUID format: `550e8400-e29b-41d4-a716-446655440000`
- ✅ Cannot be guessed or enumerated

---

## 🛡️ Security Best Practices Applied

### 1. **Data Filtering**
```php
// UserResource.php
public function toArray(Request $request): array
{
    return [
        'uid' => $this->uid,
        'name' => $this->name,
        'email' => $this->email,
        // ❌ NEVER expose password, tokens, etc.

        // Conditional fields
        'role' => $this->when($request->user()?->role === 'admin', $this->role),
    ];
}
```

### 2. **UUID Primary Keys**
```php
// Models use UUID instead of auto-increment
protected $primaryKey = 'uid';
protected $keyType = 'string';
public $incrementing = false;
```

### 3. **Code Minification** (vite.config.js)
```javascript
build: {
    minify: 'esbuild',
    sourcemap: false,  // No source maps in production
}
```

### 4. **CSRF Protection**
Laravel's built-in CSRF protection is active for all POST requests.

---

## 📊 What's Visible in Browser Inspect?

### ✅ Safe to Expose:
- User's own data (name, email)
- Public content (banners, articles)
- UI state and settings
- UUIDs (non-sequential, non-guessable)

### ❌ Never Exposed:
- Passwords (hashed in DB, never sent to client)
- API keys and secrets
- Other users' sensitive data
- Database structure details
- Session tokens (httpOnly cookies)

---

## 🚀 Usage Examples

### Creating a New Resource

1. **Generate Resource:**
```bash
sail artisan make:resource ProductResource
```

2. **Define Fields:**
```php
public function toArray(Request $request): array
{
    return [
        'uid' => $this->uid,
        'name' => $this->name,
        'price' => $this->price,
        // Only include fields that are safe to expose
    ];
}
```

3. **Use in Controller:**
```php
use App\Http\Resources\ProductResource;

public function index()
{
    $products = Product::all();

    return Inertia::render('Products/Index', [
        'products' => ProductResource::collection($products)
    ]);
}
```

---

## 🔐 Additional Security Recommendations

### 1. **Rate Limiting**
Already configured in `app/Http/Kernel.php`:
```php
'api' => [
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

### 2. **Environment Variables**
Never commit sensitive data to git:
```env
# .env (gitignored)
APP_KEY=base64:...
DB_PASSWORD=secret
```

### 3. **Production Checklist**
- ✅ `APP_DEBUG=false` in production
- ✅ `APP_ENV=production`
- ✅ Use HTTPS
- ✅ Regular security updates
- ✅ Database backups

---

## 📝 Summary

**Implemented:**
1. ✅ API Resources for data filtering
2. ✅ UUID primary keys
3. ✅ HashIds trait (available for use)
4. ✅ Code minification
5. ✅ CSRF protection
6. ✅ Password hashing

**Result:**
- 🔒 Sensitive data never exposed to client
- 🎯 Only necessary data sent to browser
- 🛡️ Multiple layers of security
- ⚡ No performance impact

---

**Last Updated:** December 2025
**Version:** 1.0
