-- Sample Data Population for FashionOS
-- Run this in Supabase SQL Editor

-- Insert sample categories
INSERT INTO categories (title, description, created_at, updated_at) VALUES
('Fashion Week', 'Major fashion week events showcasing designer collections', NOW(), NOW()),
('Runway Shows', 'Individual designer runway presentations', NOW(), NOW()),
('Trade Shows', 'Business-to-business fashion industry events', NOW(), NOW()),
('Pop-up Events', 'Temporary fashion retail and showcase events', NOW(), NOW()),
('Designer Showcases', 'Events highlighting emerging and established designers', NOW(), NOW())
ON CONFLICT (title) DO NOTHING;

-- Insert sample blog posts (using category IDs)
INSERT INTO blog_posts (title, content, status, category_id, created_at, updated_at) VALUES
(
    'Top Fashion Trends for Summer 2025',
    'Discover the hottest fashion trends dominating the runways and streets this summer. From sustainable fabrics to bold color palettes, explore what''s shaping the fashion landscape in Canada and beyond. This season brings a fresh perspective on luxury meets accessibility, with designers focusing on versatile pieces that transition seamlessly from day to night.',
    'published',
    (SELECT id FROM categories WHERE title = 'Fashion Week' LIMIT 1),
    NOW(),
    NOW()
),
(
    'How to Plan a Successful Fashion Event',
    'Planning a fashion event requires meticulous attention to detail. This comprehensive guide covers everything from venue selection to model coordination, ensuring your event makes a lasting impression. Learn about budget management, vendor relationships, and creating memorable experiences for attendees.',
    'published',
    (SELECT id FROM categories WHERE title = 'Runway Shows' LIMIT 1),
    NOW(),
    NOW()
),
(
    'Sustainable Fashion: The Future of the Industry',
    'Sustainability is no longer optional in fashion. Learn how brands are embracing eco-friendly practices and how event organizers can promote sustainable fashion through their shows and exhibitions. Discover innovative materials, ethical production methods, and consumer awareness strategies.',
    'draft',
    (SELECT id FROM categories WHERE title = 'Fashion Week' LIMIT 1),
    NOW(),
    NOW()
),
(
    'Canadian Fashion Designers to Watch',
    'Canada''s fashion scene is thriving with innovative designers pushing creative boundaries. Meet the emerging talents who are putting Canadian fashion on the global map. From Toronto to Vancouver, discover the unique voices shaping Canadian style.',
    'published',
    (SELECT id FROM categories WHERE title = 'Designer Showcases' LIMIT 1),
    NOW(),
    NOW()
),
(
    'Fashion Technology: AR and VR in Fashion Events',
    'Explore how cutting-edge technology is revolutionizing fashion events. From virtual runway shows to augmented reality shopping experiences, technology is reshaping how we experience fashion. Learn about the latest innovations and their impact on the industry.',
    'published',
    (SELECT id FROM categories WHERE title = 'Trade Shows' LIMIT 1),
    NOW(),
    NOW()
);

-- Verify data insertion
SELECT 
    'Categories' as table_name,
    COUNT(*) as record_count
FROM categories
UNION ALL
SELECT 
    'Blog Posts' as table_name,
    COUNT(*) as record_count
FROM blog_posts
UNION ALL
SELECT 
    'Events' as table_name,
    COUNT(*) as record_count
FROM events;