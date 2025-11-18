-- Manual Media Seeder
-- Run this directly in your PostgreSQL database

-- Insert Media Outlets
INSERT INTO media (uid, name, logo, is_active, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Kompas', 'media/logos/kompas.png', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'Detik.com', 'media/logos/detik.png', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'Tempo', 'media/logos/tempo.png', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'CNN Indonesia', 'media/logos/cnn-indonesia.png', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440005', 'Tribun News', 'media/logos/tribun.png', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440006', 'BBC News', 'media/logos/bbc.png', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440007', 'CNN', 'media/logos/cnn.png', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440008', 'Reuters', 'media/logos/reuters.png', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440009', 'Al Jazeera', 'media/logos/aljazeera.png', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440010', 'The Guardian', 'media/logos/guardian.png', true, NOW(), NOW())
ON CONFLICT (uid) DO NOTHING;

-- Insert Media Highlights for Kompas
INSERT INTO media_highlights (uid, media_uid, title, publish_date, image, article_url, created_at, updated_at) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Perkembangan Ekonomi Indonesia di Kuartal Keempat 2024', CURRENT_DATE - INTERVAL '2 days', 'media/highlights/kompas-ekonomi.jpg', 'https://kompas.com/read/2024/ekonomi-indonesia-q4', NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Teknologi AI Mulai Diterapkan di Berbagai Sektor Industri', CURRENT_DATE - INTERVAL '5 days', 'media/highlights/kompas-tech.jpg', 'https://kompas.com/read/2024/ai-industri', NOW(), NOW())
ON CONFLICT (uid) DO NOTHING;

-- Insert Media Highlights for Detik
INSERT INTO media_highlights (uid, media_uid, title, publish_date, image, article_url, created_at, updated_at) VALUES
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'Breaking News: Kebijakan Baru Pemerintah tentang Pajak Digital', CURRENT_DATE - INTERVAL '1 day', 'media/highlights/detik-pajak.jpg', 'https://detik.com/finance/kebijakan-pajak-digital', NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Olahraga: Timnas Indonesia Raih Prestasi di Turnamen Internasional', CURRENT_DATE - INTERVAL '3 days', 'media/highlights/detik-sport.jpg', 'https://detik.com/sport/timnas-prestasi', NOW(), NOW())
ON CONFLICT (uid) DO NOTHING;

-- Insert Media Highlights for Tempo
INSERT INTO media_highlights (uid, media_uid, title, publish_date, image, article_url, created_at, updated_at) VALUES
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'Investigasi: Dampak Perubahan Iklim terhadap Pertanian', CURRENT_DATE - INTERVAL '4 days', 'media/highlights/tempo-climate.jpg', 'https://tempo.co/read/investigasi-iklim-pertanian', NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003', 'Profil: Startup Indonesia yang Mendunia', CURRENT_DATE - INTERVAL '7 days', 'media/highlights/tempo-startup.jpg', 'https://tempo.co/read/profil-startup-indonesia', NOW(), NOW())
ON CONFLICT (uid) DO NOTHING;

-- Insert Media Highlights for CNN Indonesia
INSERT INTO media_highlights (uid, media_uid, title, publish_date, image, article_url, created_at, updated_at) VALUES
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440004', 'Politik: Dinamika Pemilihan Kepala Daerah 2024', CURRENT_DATE - INTERVAL '1 day', 'media/highlights/cnni-politik.jpg', 'https://cnnindonesia.com/nasional/pilkada-2024', NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440004', 'Kesehatan: Terobosan Baru dalam Pengobatan Kanker', CURRENT_DATE - INTERVAL '6 days', 'media/highlights/cnni-health.jpg', 'https://cnnindonesia.com/gaya-hidup/kesehatan-kanker', NOW(), NOW())
ON CONFLICT (uid) DO NOTHING;

-- Insert Media Highlights for Tribun News
INSERT INTO media_highlights (uid, media_uid, title, publish_date, image, article_url, created_at, updated_at) VALUES
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440005', 'Regional: Pembangunan Infrastruktur di Indonesia Timur', CURRENT_DATE - INTERVAL '3 days', 'media/highlights/tribun-infra.jpg', 'https://tribunnews.com/regional/infrastruktur-timur', NOW(), NOW())
ON CONFLICT (uid) DO NOTHING;

-- Insert Media Highlights for BBC
INSERT INTO media_highlights (uid, media_uid, title, publish_date, image, article_url, created_at, updated_at) VALUES
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440006', 'Global Climate Summit Reaches Historic Agreement', CURRENT_DATE - INTERVAL '2 days', 'media/highlights/bbc-climate.jpg', 'https://bbc.com/news/climate-summit-agreement', NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440006', 'Technology: The Future of Quantum Computing', CURRENT_DATE - INTERVAL '8 days', 'media/highlights/bbc-quantum.jpg', 'https://bbc.com/technology/quantum-computing', NOW(), NOW())
ON CONFLICT (uid) DO NOTHING;

-- Insert Media Highlights for CNN
INSERT INTO media_highlights (uid, media_uid, title, publish_date, image, article_url, created_at, updated_at) VALUES
('650e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440007', 'US Elections: Latest Updates and Analysis', CURRENT_DATE - INTERVAL '1 day', 'media/highlights/cnn-election.jpg', 'https://cnn.com/politics/election-updates', NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440007', 'Business: Markets React to Federal Reserve Decision', CURRENT_DATE - INTERVAL '4 days', 'media/highlights/cnn-markets.jpg', 'https://cnn.com/business/fed-markets', NOW(), NOW())
ON CONFLICT (uid) DO NOTHING;

-- Insert Media Highlights for Reuters
INSERT INTO media_highlights (uid, media_uid, title, publish_date, image, article_url, created_at, updated_at) VALUES
('650e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440008', 'Global Economy: Emerging Markets Show Strong Growth', CURRENT_DATE - INTERVAL '3 days', 'media/highlights/reuters-economy.jpg', 'https://reuters.com/markets/emerging-growth', NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440008', 'Energy: Renewable Sources Reach New Milestone', CURRENT_DATE - INTERVAL '5 days', 'media/highlights/reuters-energy.jpg', 'https://reuters.com/business/energy/renewable-milestone', NOW(), NOW())
ON CONFLICT (uid) DO NOTHING;

-- Insert Media Highlights for Al Jazeera
INSERT INTO media_highlights (uid, media_uid, title, publish_date, image, article_url, created_at, updated_at) VALUES
('650e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440009', 'Middle East: Diplomatic Breakthrough in Regional Talks', CURRENT_DATE - INTERVAL '1 day', 'media/highlights/aljazeera-diplomacy.jpg', 'https://aljazeera.com/news/middle-east-talks', NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440009', 'Asia Pacific: Economic Integration Deepens', CURRENT_DATE - INTERVAL '6 days', 'media/highlights/aljazeera-asia.jpg', 'https://aljazeera.com/economy/asia-integration', NOW(), NOW())
ON CONFLICT (uid) DO NOTHING;

-- Insert Media Highlights for The Guardian
INSERT INTO media_highlights (uid, media_uid, title, publish_date, image, article_url, created_at, updated_at) VALUES
('650e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440010', 'Environment: New Study Reveals Ocean Conservation Success', CURRENT_DATE - INTERVAL '2 days', 'media/highlights/guardian-ocean.jpg', 'https://theguardian.com/environment/ocean-conservation', NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440019', '550e8400-e29b-41d4-a716-446655440010', 'Culture: The Rise of Digital Art in Modern Museums', CURRENT_DATE - INTERVAL '9 days', 'media/highlights/guardian-art.jpg', 'https://theguardian.com/culture/digital-art-museums', NOW(), NOW())
ON CONFLICT (uid) DO NOTHING;

-- Verify data inserted
SELECT 'Media Outlets:', COUNT(*) as total FROM media;
SELECT 'Media Highlights:', COUNT(*) as total FROM media_highlights;
