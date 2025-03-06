// scripts/fix-openapi.js
const fs = require('fs');
const path = require('path');

const openApiPath = path.join(__dirname, '../src/api/generated/core/OpenAPI.ts');

try {
  let content = fs.readFileSync(openApiPath, 'utf8');

  // Tìm và thay thế WITH_CREDENTIALS: false thành WITH_CREDENTIALS: true
  content = content.replace('WITH_CREDENTIALS: false', 'WITH_CREDENTIALS: true');

  // Tìm và thay thế BASE: '', với URL từ env nếu có
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9999';
  content = content.replace("BASE: '',", `BASE: '${baseUrl}',`);

  // Ghi lại file
  fs.writeFileSync(openApiPath, content);
  console.log('✅ Successfully updated OpenAPI configuration');
} catch (error) {
  console.error('❌ Error updating OpenAPI configuration:', error);
}
