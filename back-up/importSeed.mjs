export default async function runSeed({ strapi }) {
  const fs = await import('fs/promises');

  // Đọc file JSON backup
  const categories = JSON.parse(await fs.readFile('./back-up/backup-categories.json', 'utf-8'));
  const posts = JSON.parse(await fs.readFile('./back-up/backup-posts.json', 'utf-8'));

  const categoryIdMap = {};

  // Tạo categories
  for (const cat of categories) {
    const created = await strapi.entityService.create('api::category.category', {
      data: {
        name: cat.attributes.name,
        slug: cat.attributes.slug
      }
    });
    categoryIdMap[cat.id] = created.id;
  }

  // Tạo posts
  for (const post of posts) {
    const oldCatId = post.attributes.category?.data?.id;
    const newCatId = categoryIdMap[oldCatId];

    await strapi.entityService.create('api::post.post', {
      data: {
        title: post.attributes.title,
        slug: post.attributes.slug,
        excerpt: post.attributes.excerpt,
        content: post.attributes.content,
        author: post.attributes.author,
        tags: post.attributes.tags,
        category: newCatId
      }
    });
  }

  console.log('✅ Đã import lại posts và categories!');
}
