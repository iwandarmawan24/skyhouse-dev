-- Create New Admin User
-- Replace values as needed

-- Generate UUID for the user
-- You can replace this with any valid UUID or let PostgreSQL generate it

INSERT INTO users (
    uid,
    name,
    username,
    full_name,
    email,
    password,
    role,
    status,
    email_verified_at,
    created_at,
    updated_at
) VALUES (
    gen_random_uuid(),
    'Admin Name',                           -- Change this
    'adminuser',                            -- Change this (unique username)
    'Admin Full Name',                      -- Change this
    'admin@example.com',                    -- Change this (unique email)
    '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Password: "password"
    'superadmin',                           -- Role: 'superadmin' or 'staff'
    'active',                               -- Status: 'active' or 'inactive'
    NOW(),
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Verify user created
SELECT uid, name, username, email, role, status FROM users WHERE email = 'admin@example.com';

-- ============================================
-- COMMON PASSWORDS (Hashed with bcrypt)
-- ============================================
-- 'password'     -> $2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
-- 'admin123'     -> $2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5fBcZJ3cH.8Tu
-- 'secret'       -> $2y$12$Jvks/VjKjKKZiJPuaKK0EuBfvZTCzKn.nLbMq45vLJZK5i5KRj8Pu

-- ============================================
-- EXAMPLE: Create Multiple Admin Users
-- ============================================

-- Admin User 1 - Super Admin
INSERT INTO users (uid, name, username, full_name, email, password, role, status, email_verified_at, created_at, updated_at)
VALUES (
    gen_random_uuid(),
    'Super Admin',
    'superadmin',
    'Super Admin',
    'superadmin@skyhouse.com',
    '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'superadmin',
    'active',
    NOW(), NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- Admin User 2 - Staff
INSERT INTO users (uid, name, username, full_name, email, password, role, status, email_verified_at, created_at, updated_at)
VALUES (
    gen_random_uuid(),
    'Staff Member',
    'staff01',
    'Staff Member One',
    'staff@skyhouse.com',
    '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'staff',
    'active',
    NOW(), NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- Verify all users
SELECT uid, name, username, email, role, status, created_at FROM users ORDER BY created_at DESC;
