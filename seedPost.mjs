import fetch from 'node-fetch';

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = 'dbe30afa71fc37b71688bded3c0e5243fde200586cb4dd8807d3d1e01e9f3095a4a766a4b428e1ac7baf083438817e0c139cef58e4092e52a33b789224eb1ab943372dd90d1d90b8f1497aa7e5c75ea332c89bd8b0cf5f51983ae0b69ca1c1e414f206194610e92bfcdebde7e4eb9038554f373faba2aec2814ee15196076ac3';

const categories = [
  { name: "Tin công ty", slug: "tin-cong-ty" },
  { name: "Xu hướng ngành", slug: "xu-huong-nganh" },
  { name: "Cập nhật", slug: "cap-nhat" },
  { name: "Giải thưởng", slug: "giai-thuong" }
];

const titles = [
  "Sài Thành Trading: Báo cáo doanh thu quý 1/2025",
  "Xu hướng thị trường chứng khoán Việt Nam 2025",
  "Lãi suất ngân hàng tăng ảnh hưởng thế nào đến logistics?",
  "Phân tích tỷ giá ngoại tệ và rủi ro tài chính",
  "Sài Thành Trading ký hợp đồng hợp tác chiến lược",
  "Dự báo GDP Việt Nam tăng trưởng mạnh 2025",
  "Chính sách thuế mới tác động ngành xuất nhập khẩu",
  "Sài Thành Trading mở rộng thị phần miền Tây",
  "Dòng vốn FDI đổ vào khu công nghiệp trọng điểm",
  "Cơ hội đầu tư từ Hiệp định EVFTA",
  "Sài Thành Trading nâng cấp hệ thống quản trị rủi ro",
  "Nhận diện xu hướng tiêu dùng nội địa hậu COVID",
  "Tỷ lệ nợ xấu ngân hàng: Báo động hay cơ hội?",
  "Kinh tế Việt Nam trước sóng lạm phát toàn cầu",
  "Sài Thành Trading được vinh danh Top 10 doanh nghiệp logistics"
];

async function createCategories() {
  const categoryIds = {};
  
  for (const category of categories) {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: category
        }),
      });

      if (res.ok) {
        const data = await res.json();
        categoryIds[category.name] = data.data.id;
        console.log(`✅ Đã tạo category: ${category.name} (ID: ${data.data.id})`);
      } else {
        console.error(`❌ Lỗi tạo category "${category.name}":`, await res.text());
      }
    } catch (error) {
      console.error(`❌ Lỗi kết nối API cho category "${category.name}":`, error);
    }
  }
  
  return categoryIds;
}

async function createSamplePosts(categoryIds) {
  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    const slug = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Chọn category ngẫu nhiên
    const categoryNames = Object.keys(categoryIds);
    const randomCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
    const categoryId = categoryIds[randomCategory];

    const payload = {
      data: {
        title,
        slug,
        excerpt: "Tin tức tài chính nổi bật từ Sài Thành Trading.",
        content: `Trong thời đại các website hiện đại cần tốc độ và khả năng mở rộng, Strapi đã nổi lên như một giải pháp Headless CMS mạnh mẽ, dễ sử dụng và linh hoạt.

## Tại sao nên chọn Strapi?

### 🌟 Dễ dàng tạo các Collection Types
Chỉ với vài cú click trong Strapi Admin Panel, bạn có thể tạo các Collection Types (Bài viết, Sản phẩm, Danh mục…) để quản lý dữ liệu của website. Việc này giúp bạn không cần viết code cho backend từ đầu, tiết kiệm hàng chục giờ làm việc.

### ⚡️ API tự động sinh ra

>Khi tạo Collection, Strapi tự động tạo API endpoint cho REST hoặc GraphQL. Ví dụ, với collection \`posts\`, bạn có sẵn các endpoint như \`/api/posts\` để lấy danh sách hoặc \`/api/posts/:id\` để lấy chi tiết, rất tiện lợi cho frontend.

### 🔒 Quản lý quyền truy cập

Strapi hỗ trợ phân quyền cho người dùng Public (khách) và Authenticated (đã đăng nhập) thông qua Roles & Permissions. Bạn có thể cài đặt quyền đọc, viết, chỉnh sửa cho từng endpoint, giúp tăng cường bảo mật website.

### 🎨 Hỗ trợ upload media

Strapi tích hợp Media Library cho phép bạn dễ dàng tải ảnh, video, file… vào server hoặc kết nối CDN (như Cloudinary). Điều này cực kỳ quan trọng với website tin tức, blog, shop cần nhiều ảnh chất lượng cao.

## Hướng dẫn cơ bản:

### 1️⃣ Tạo Collection Type mới

Vào Strapi Admin → Content-Type Builder → Create New Collection Type. Đặt tên (ví dụ: \`post\`), rồi thêm các field cần thiết như \`title\`, \`content\`, \`slug\`, \`image\`, \`category\`.

### 2️⃣ Định nghĩa các field

- **Text:** cho tiêu đề, slug
- **Rich Text:** cho nội dung chi tiết
- **Media:** để tải ảnh featured
- **Relation:** nếu muốn liên kết bài viết với category hoặc tác giả.

### 3️⃣ Tạo nội dung mẫu và xuất bản

Sau khi tạo Collection, vào menu Content Manager → chọn collection mới → thêm bài viết → điền nội dung → bấm Publish.

### 4️⃣ Sử dụng API để hiển thị dữ liệu

Frontend của bạn (React, Vue, Next.js, Nuxt…) chỉ cần fetch API của Strapi để lấy bài viết. Ví dụ, gọi \`GET /api/posts?populate=*\` để nhận dữ liệu kèm ảnh, category, v.v.

---

## 🚀 Hãy bắt đầu dự án blog của bạn với Strapi ngay hôm nay!

Với Strapi, bạn có thể tạo một hệ thống quản trị nội dung mạnh mẽ, dễ mở rộng, dễ bảo trì và tiết kiệm thời gian phát triển. Hãy thử trải nghiệm ngay để cảm nhận sự khác biệt!`,

        category: categoryId, // Sử dụng category ID thay vì string
        author: "Phòng Phân Tích Sài Thành Trading",
        tags: JSON.stringify(["tài chính", "logistics", "thị trường"])
      }
    };

    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error(`❌ Lỗi tạo bài viết "${title}":`, await res.text());
      } else {
        console.log(`✅ Đã tạo: ${title} (Category: ${randomCategory})`);
      }
    } catch (error) {
      console.error(`❌ Lỗi kết nối API cho bài "${title}":`, error);
    }
  }
}

async function main() {
  console.log('🚀 Bắt đầu tạo dữ liệu mẫu...');
  
  // Tạo categories trước
  const categoryIds = await createCategories();
  
  if (Object.keys(categoryIds).length > 0) {
    // Tạo posts với category relation
    await createSamplePosts(categoryIds);
    console.log('✅ Hoàn thành tạo dữ liệu mẫu!');
  } else {
    console.error('❌ Không thể tạo categories, dừng tạo posts');
  }
}

main();
