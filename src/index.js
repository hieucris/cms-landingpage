export default {
    register() {},
  
    async bootstrap({ strapi }) {
      const postCount = await strapi.entityService.count('api::post.post');
  
      if (postCount === 0) {
        console.log('📦 Chưa có dữ liệu. Đang import từ backup...');
        const seed = await import('../back-up/importSeed.mjs');
        await seed.default({ strapi });
      } else {
        console.log('✅ Đã có dữ liệu, bỏ qua importSeed.');
      }
    },
  };
  