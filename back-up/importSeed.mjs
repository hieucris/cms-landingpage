import fetch from 'node-fetch';
import fs from 'fs';

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = 'YOUR_ADMIN_API_TOKEN'; // Thay bằng token thực tế từ Strapi Admin > Settings > API Tokens

const categories = JSON.parse(fs.readFileSync('backup-categories.json', 'utf-8'));
const posts = JSON.parse(fs.readFileSync('backup-posts.json', 'utf-8'));

async function createCategory(category) {
  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data: { name: category.attributes.name, slug: category.attributes.slug } }),
  });
  const data = await res.json();
  return data.data?.id;
}

async function createPost(post, categoryIdMap) {
  const catId = post.attributes.category?.data?.id;
  const newCatId = categoryIdMap[catId];
  const payload = {
    data: {
      title: post.attributes.title,
      slug: post.attributes.slug,
      excerpt: post.attributes.excerpt,
      content: post.attributes.content,
      author: post.attributes.author,
      tags: post.attributes.tags,
      category: newCatId,
    }
  };
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

async function main() {
  // Tạo lại categories trước, lưu map oldId -> newId
  const categoryIdMap = {};
  for (const cat of categories) {
    const newId = await createCategory(cat);
    categoryIdMap[cat.id] = newId;
  }
  // Tạo lại posts, gán đúng category mới
  for (const post of posts) {
    await createPost(post, categoryIdMap);
  }
  console.log('✅ Đã import lại posts và categories!');
}

main(); 