# 🔐 Hidden Admin Registration Feature

Feature untuk registrasi admin user baru tanpa ada link yang terlihat di UI. Hanya bisa diakses via URL langsung.

## 🎯 Cara Akses

### Development (Local)
```
http://localhost/admin/register
```

### Production (Server)
```
http://your-domain.com/admin/register
```
atau
```
http://your-vps-ip/admin/register
```

## 📋 Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Display Name | Text | Yes | Nama yang akan ditampilkan di UI |
| Username | Text | Yes | Username untuk login (huruf kecil, tanpa spasi) |
| Full Name | Text | Yes | Nama lengkap user |
| Email | Email | Yes | Email address (harus unique) |
| Password | Password | Yes | Password minimal 8 karakter |
| Confirm Password | Password | Yes | Konfirmasi password (harus sama) |
| Role | Select | Yes | `staff` atau `superadmin` |

## 🔒 Security Features

- ✅ **Hidden Entry Point** - Tidak ada link di halaman login atau UI manapun
- ✅ **Guest Only** - Hanya bisa diakses kalau belum login
- ✅ **Validation** - All fields divalidasi di backend
- ✅ **Unique Constraints** - Username dan email harus unique
- ✅ **Password Hashing** - Password di-hash dengan bcrypt
- ✅ **Auto lowercase** - Username otomatis lowercase
- ✅ **Alpha dash validation** - Username hanya boleh huruf, angka, dash, underscore

## 🎭 Role Types

### Staff
- Regular admin access
- Bisa manage content (articles, products, etc)
- Tidak bisa manage users

### Super Admin
- Full system access
- Bisa manage semua content
- Bisa manage users
- Bisa manage settings

## ✅ Setelah Registrasi

Setelah berhasil register:
1. User akan diredirect ke halaman login
2. Muncul success message
3. User bisa login dengan credentials yang baru dibuat
4. Status user otomatis `active`
5. Email sudah verified (auto)

## 🔧 Backend Implementation

### Controller
```php
// app/Http/Controllers/Auth/RegisterController.php
Route: /admin/register
Methods: GET (form), POST (submit)
```

### Validation Rules
```php
'name' => 'required|string|max:255'
'username' => 'required|string|max:255|unique:users|alpha_dash'
'full_name' => 'required|string|max:255'
'email' => 'required|email|max:255|unique:users'
'password' => 'required|confirmed|min:8'
'role' => 'required|in:staff,superadmin'
```

### Routes
```php
// routes/web.php
Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('admin.register');
    Route::post('/register', [RegisterController::class, 'register']);
});
```

## 🎨 Frontend Component

```javascript
// resources/js/Pages/Admin/Auth/Register.jsx
- Full form validation
- Show/hide password toggle
- Responsive design (mobile friendly)
- Matching login page styling
- Green color theme (berbeda dari login yang biru)
```

## 📱 Usage Examples

### Example 1: Create Staff User
```
URL: http://localhost/admin/register

Form Data:
- Display Name: John Doe
- Username: johndoe
- Full Name: John Doe
- Email: john@skyhouse.com
- Password: SecurePass123!
- Confirm Password: SecurePass123!
- Role: Staff
```

### Example 2: Create Super Admin
```
URL: http://localhost/admin/register

Form Data:
- Display Name: Admin Boss
- Username: adminboss
- Full Name: Admin Boss
- Email: boss@skyhouse.com
- Password: SuperSecure456!
- Confirm Password: SuperSecure456!
- Role: Super Admin
```

## 🚫 Access Restrictions

Registration page **TIDAK BISA** diakses jika:
- User sudah login (akan redirect)
- Menggunakan middleware `guest`

## 🔐 Security Best Practices

1. **Share URL dengan hati-hati** - Jangan expose URL ini di documentation publik
2. **Monitor registrations** - Check user table secara berkala
3. **Use strong passwords** - Enforce password complexity
4. **Limit super admin** - Hanya buat super admin kalau benar-benar perlu
5. **Audit logs** - Monitor siapa yang register kapan (optional: implement audit)

## 🛠️ Maintenance

### Check Recent Registrations
```sql
SELECT uid, name, username, email, role, status, created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;
```

### Disable User (If Needed)
```sql
UPDATE users
SET status = 'inactive'
WHERE email = 'suspicious@email.com';
```

### Delete User
```sql
DELETE FROM users WHERE email = 'unwanted@email.com';
```

## 📊 Database Schema

```sql
CREATE TABLE users (
    uid UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('staff', 'superadmin') DEFAULT 'staff',
    status ENUM('active', 'inactive') DEFAULT 'active',
    email_verified_at TIMESTAMP,
    remember_token VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## 🎯 Future Enhancements (Optional)

1. **Invitation system** - Generate unique tokens untuk registration
2. **Email verification** - Kirim email verification setelah register
3. **Admin approval** - Registrasi perlu approval dari super admin dulu
4. **Rate limiting** - Limit berapa kali bisa register dari satu IP
5. **Audit logging** - Log semua registration activity
6. **Disable registration** - Setting untuk enable/disable registration
7. **Custom registration URL** - Bisa ganti URL registration via config

## 🆘 Troubleshooting

### Error: Username already exists
**Solution:** Gunakan username yang berbeda atau cek database untuk username yang sudah ada

### Error: Email already exists
**Solution:** Gunakan email yang berbeda atau cek database untuk email yang sudah ada

### Error: Password confirmation doesn't match
**Solution:** Pastikan password dan confirm password sama persis

### Error: Validation failed
**Solution:** Check semua field sudah diisi dengan benar dan format valid

### Can't access registration page (404)
**Solution:**
```bash
# Clear route cache
./vendor/bin/sail artisan route:clear
./vendor/bin/sail artisan route:cache

# Or in production
docker compose -f docker-compose.prod.yml exec app php artisan route:clear
docker compose -f docker-compose.prod.yml exec app php artisan route:cache
```

## ✅ Testing

### Test Registration Flow
1. Buka `http://localhost/admin/register`
2. Isi semua field dengan data valid
3. Submit form
4. Harus redirect ke login page dengan success message
5. Login dengan credentials yang baru dibuat
6. Harus berhasil login dan masuk dashboard

### Test Validations
1. Coba submit form kosong → harus error
2. Coba password tidak match → harus error
3. Coba email yang sudah ada → harus error
4. Coba username yang sudah ada → harus error
5. Coba username dengan spasi → harus error

## 🔗 Related Files

```
app/Http/Controllers/Auth/RegisterController.php
resources/js/Pages/Admin/Auth/Register.jsx
routes/web.php
database/migrations/*_create_users_table.php
app/Models/User.php
```

---

**Important:** Keep this URL private and only share with trusted administrators!

**Created:** November 2025
**Last Updated:** November 2025
