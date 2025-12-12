# Toast Migration Guide

Flash messages sekarang ditangani secara otomatis oleh `AdminLayout` menggunakan Sonner toast.

## Apa yang Sudah Dilakukan

✅ **Toaster Component** sudah dibuat di `resources/js/Components/ui/Toaster.jsx`
✅ **AdminLayout** sudah memiliki useEffect yang menampilkan toast untuk flash messages
✅ **Articles/Index.jsx** sudah diperbaiki (contoh)

## Yang Perlu Dihapus dari Setiap Halaman Admin

### 1. Hapus import Alert
```jsx
// HAPUS baris ini:
import { Alert } from '@/Components/ui/Alert';
```

### 2. Hapus usePage import untuk flash (jika tidak digunakan untuk hal lain)
```jsx
// JIKA hanya digunakan untuk flash, HAPUS:
const { flash } = usePage().props;

// JIKA masih ada yang menggunakan usePage untuk hal lain, biarkan saja
```

### 3. Hapus Alert component untuk flash messages
```jsx
// HAPUS seluruh block ini:
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
```

## Daftar File yang Perlu Diperbaiki

- [x] `resources/js/Pages/Admin/Articles/Index.jsx` ✅ SELESAI
- [ ] `resources/js/Pages/Admin/Settings/Index.jsx`
- [ ] `resources/js/Pages/Admin/Contacts/Index.jsx`
- [ ] `resources/js/Pages/Admin/Policies/Index.jsx`
- [ ] `resources/js/Pages/Admin/MediaHighlights/Index.jsx`
- [ ] `resources/js/Pages/Admin/Users/Index.jsx`
- [ ] `resources/js/Pages/Admin/Events/Index.jsx`
- [ ] `resources/js/Pages/Admin/ArticleCategories/Index.jsx`
- [ ] `resources/js/Pages/Admin/Facilities/Index.jsx`
- [ ] `resources/js/Pages/Admin/Media/Index.jsx`
- [ ] `resources/js/Pages/Admin/Auth/Register.jsx`
- [ ] `resources/js/Pages/Admin/About/Edit.jsx`

## Cara Toast Bekerja Sekarang

Toast akan muncul secara otomatis ketika:

1. **Backend** mengirim flash message:
   ```php
   return redirect()->route('admin.articles.index')
       ->with('success', 'Article created successfully.');
   ```

2. **AdminLayout** mendeteksi flash message dan menampilkan toast:
   ```jsx
   useEffect(() => {
       if (flash.success) toast.success(flash.success);
       if (flash.error) toast.error(flash.error);
       if (flash.info) toast.info(flash.info);
   }, [flash]);
   ```

3. Toast muncul di pojok kanan atas dengan animasi yang smooth

## Keuntungan Menggunakan Toast

✅ Tidak perlu menambahkan Alert component di setiap halaman
✅ Toast muncul secara konsisten di semua halaman
✅ Animasi yang lebih smooth dan modern
✅ Auto-dismiss setelah beberapa detik
✅ Bisa stack multiple notifications
✅ Posisi tetap di pojok kanan atas (tidak scroll)

## Jika Butuh Manual Toast

Jika butuh menampilkan toast secara manual (tidak dari flash message):

```jsx
import { toast } from 'sonner';

// Di dalam component atau function
toast.success('Operation successful!');
toast.error('Something went wrong!');
toast.info('Info message');
toast.warning('Warning message');

// Dengan action button
toast.success('Article deleted', {
    action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
    },
});
```

## Testing

Setelah menghapus Alert:

1. Buat/edit/delete data di halaman yang diperbaiki
2. Pastikan toast muncul di pojok kanan atas
3. Pastikan tidak ada error di console
4. Pastikan layout tidak berubah (karena Alert sudah dihapus)
