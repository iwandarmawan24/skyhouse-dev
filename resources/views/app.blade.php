<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'SkyHouse Property') }}</title>

        <!-- Favicon -->
        <link rel="icon" type="image/png" sizes="192x192" href="/images/cropped-favicon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/cropped-favicon-192x192.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/cropped-favicon-192x192.png">
        <link rel="shortcut icon" href="/favicon.png">
        <link rel="apple-touch-icon" href="/images/cropped-favicon-192x192.png">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;600;700;800&family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

        <!-- Lenis Smooth Scroll -->
        <script src="https://unpkg.com/@studio-freight/lenis@1.0.36/dist/lenis.min.js"></script>

        <!-- Swiper CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css">

        <!-- Swiper JS -->
        <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
