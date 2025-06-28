const { execSync } = require('child_process');

async function initPrismaDatabase() {
  try {
    console.log('🔄 检查Prisma配置...');
    
    // 生成Prisma客户端
    console.log('📦 生成Prisma客户端...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // 运行数据库迁移
    console.log('🗄️  运行数据库迁移...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    
    console.log('✅ Prisma数据库初始化完成！');
    console.log('💡 提示：使用 npm run db:studio 来查看数据库');
    
  } catch (error) {
    console.error('❌ Prisma数据库初始化失败:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  initPrismaDatabase();
}

module.exports = initPrismaDatabase; 