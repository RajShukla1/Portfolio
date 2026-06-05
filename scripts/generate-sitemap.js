const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://rajshukla-portfolio.vercel.app';

// Paths
const blogsJsonPath = path.join(__dirname, '../src/data/blogs.json');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Read the blogs JSON
const blogsData = JSON.parse(fs.readFileSync(blogsJsonPath, 'utf8'));

// Static routes
const staticRoutes = [
  { url: '/', priority: '1.0' },
  { url: '/about-me', priority: '0.8' },
  { url: '/skills', priority: '0.8' },
  { url: '/projects', priority: '0.8' },
  { url: '/contact', priority: '0.8' },
  { url: '/blogs', priority: '0.9' }
];

// Start XML string
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Pages -->\n`;

// Add static routes
staticRoutes.forEach(route => {
  xml += `  <url>
    <loc>${DOMAIN}${route.url}</loc>
    <priority>${route.priority}</priority>
  </url>\n`;
});

xml += `\n  <!-- Blog Posts -->\n`;

// Add dynamic blog routes
blogsData.forEach(blog => {
  xml += `  <url>
    <loc>${DOMAIN}/blogs/${blog.slug}</loc>
    <priority>0.7</priority>
  </url>\n`;
});

xml += `</urlset>`;

// Write to public/sitemap.xml
fs.writeFileSync(sitemapPath, xml, 'utf8');

console.log('✅ sitemap.xml generated successfully!');
