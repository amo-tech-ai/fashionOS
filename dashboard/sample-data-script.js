// Sample Data Population Script for FashionOS
// Run this in the browser console on https://fashionos.vercel.app/

(async function populateSampleData() {
    try {
        // Check if supabaseClient is available
        if (typeof window.supabaseClient === 'undefined') {
            console.log('Supabase client not found in window. Trying to access from modules...');
            // Try to access from the application
            return;
        }

        const supabase = window.supabaseClient;
        
        console.log('🚀 Starting sample data population...');

        // Sample Categories
        const categories = [
            {
                title: "Fashion Week",
                description: "Major fashion week events showcasing designer collections"
            },
            {
                title: "Runway Shows",
                description: "Individual designer runway presentations"
            },
            {
                title: "Trade Shows",
                description: "Business-to-business fashion industry events"
            },
            {
                title: "Pop-up Events",
                description: "Temporary fashion retail and showcase events"
            },
            {
                title: "Designer Showcases",
                description: "Events highlighting emerging and established designers"
            }
        ];

        // Insert categories
        console.log('📂 Adding sample categories...');
        const { data: categoriesData, error: categoriesError } = await supabase
            .from('categories')
            .insert(categories)
            .select();

        if (categoriesError) {
            console.error('Error inserting categories:', categoriesError);
        } else {
            console.log('✅ Categories added:', categoriesData.length);
        }

        // Sample Blog Posts
        const blogPosts = [
            {
                title: "Top Fashion Trends for Summer 2025",
                content: "Discover the hottest fashion trends dominating the runways and streets this summer. From sustainable fabrics to bold color palettes, explore what's shaping the fashion landscape in Canada and beyond.",
                status: "published",
                category_id: categoriesData && categoriesData[0] ? categoriesData[0].id : null
            },
            {
                title: "How to Plan a Successful Fashion Event",
                content: "Planning a fashion event requires meticulous attention to detail. This comprehensive guide covers everything from venue selection to model coordination, ensuring your event makes a lasting impression.",
                status: "published",
                category_id: categoriesData && categoriesData[1] ? categoriesData[1].id : null
            },
            {
                title: "Sustainable Fashion: The Future of the Industry",
                content: "Sustainability is no longer optional in fashion. Learn how brands are embracing eco-friendly practices and how event organizers can promote sustainable fashion through their shows and exhibitions.",
                status: "draft",
                category_id: categoriesData && categoriesData[0] ? categoriesData[0].id : null
            },
            {
                title: "Canadian Fashion Designers to Watch",
                content: "Canada's fashion scene is thriving with innovative designers pushing creative boundaries. Meet the emerging talents who are putting Canadian fashion on the global map.",
                status: "published",
                category_id: categoriesData && categoriesData[4] ? categoriesData[4].id : null
            },
            {
                title: "Fashion Technology: AR and VR in Fashion Events",
                content: "Explore how cutting-edge technology is revolutionizing fashion events. From virtual runway shows to augmented reality shopping experiences, technology is reshaping how we experience fashion.",
                status: "published",
                category_id: categoriesData && categoriesData[2] ? categoriesData[2].id : null
            }
        ];

        // Insert blog posts
        console.log('📝 Adding sample blog posts...');
        const { data: blogData, error: blogError } = await supabase
            .from('blog_posts')
            .insert(blogPosts)
            .select();

        if (blogError) {
            console.error('Error inserting blog posts:', blogError);
        } else {
            console.log('✅ Blog posts added:', blogData.length);
        }

        console.log('🎉 Sample data population completed!');
        console.log('Total items added:');
        console.log(`- Categories: ${categoriesData ? categoriesData.length : 0}`);
        console.log(`- Blog Posts: ${blogData ? blogData.length : 0}`);
        console.log(`- Events: Already exist (4 events)`);

    } catch (error) {
        console.error('❌ Error populating sample data:', error);
    }
})();

// Alternative function to check current data
async function checkCurrentData() {
    try {
        if (typeof window.supabaseClient === 'undefined') {
            console.log('Supabase client not available');
            return;
        }

        const supabase = window.supabaseClient;
        
        // Check events
        const { data: events } = await supabase.from('events').select('*');
        console.log('Current events:', events?.length || 0);

        // Check categories  
        const { data: categories } = await supabase.from('categories').select('*');
        console.log('Current categories:', categories?.length || 0);

        // Check blog posts
        const { data: blogPosts } = await supabase.from('blog_posts').select('*');
        console.log('Current blog posts:', blogPosts?.length || 0);

    } catch (error) {
        console.error('Error checking data:', error);
    }
}

// Run data check
console.log('🔍 Checking current data...');
checkCurrentData();