import fetch from 'node-fetch';
import fs from 'fs';

const API_URL = 'https://cms-landingpage.onrender.com/api';

async function fetchData(endpoint) {
  const res = await fetch(`${API_URL}/${endpoint}?populate=*`);
  const data = await res.json();
  return data.data;
}

async function main() {
  const posts = await fetchData('posts');
  const categories = await fetchData('categories');
  fs.writeFileSync('backup-posts.json', JSON.stringify(posts, null, 2));
  fs.writeFileSync('backup-categories.json', JSON.stringify(categories, null, 2));
  console.log('✅ Đã backup xong posts và categories!');
}

main(); 