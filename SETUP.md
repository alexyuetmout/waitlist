# Waitlist 网站设置指南

这是一个基于 Next.js 和 PostgreSQL 的等待列表网站，使用 **Prisma ORM** 确保数据安全性和类型安全。

## 🔒 安全性改进

✅ **使用Prisma ORM而非原生SQL**
- 自动防SQL注入攻击
- 类型安全的数据库操作  
- 自动数据验证
- 更好的错误处理

## 功能特性

- 用户可以输入邮箱加入等待列表
- 自动检查邮箱格式和重复性
- 美观的响应式界面
- PostgreSQL 数据库存储
- Prisma ORM 类型安全

## 安装步骤

### 1. 安装依赖
```bash
npm install
```

### 2. 设置数据库

#### 选项A: 本地 PostgreSQL
1. 安装 PostgreSQL
2. 创建数据库：
```sql
CREATE DATABASE waitlist_db;
```

#### 选项B: 云数据库 (推荐)
使用 Supabase、PlanetScale 或其他云 PostgreSQL 服务

### 3. 配置环境变量
创建 `.env.local` 文件：
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/waitlist_db
```

### 4. 初始化数据库 (标准migrate方式)
```bash
# 开发环境 - 创建迁移并应用
npm run db:migrate

# 生产环境 - 仅应用已有迁移
npm run db:prisma
```

### 5. 启动开发服务器
```bash
npm run dev
```

网站将在 http://localhost:3000 运行

## 🛠️ Prisma 命令

```bash
# 开发环境 - 创建并应用迁移
npm run db:migrate

# 生产环境 - 部署迁移  
npm run db:deploy

# 生成Prisma客户端
npm run prisma:generate

# 查看数据库 (可视化界面)
npm run db:studio

# 重置数据库 (开发用，会丢失数据)
npm run db:reset

# 生产环境初始化（运行迁移）
npm run db:prisma
```

## 数据库结构 (Prisma Schema)

```prisma
model Waitlist {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("waitlist")
}
```

## API 端点

- `POST /api/waitlist` - 添加邮箱到等待列表

## 🚀 生产部署

1. 设置生产环境的 `DATABASE_URL`
2. 运行 `npm run build`
3. 运行 `npm run db:deploy` 部署数据库迁移
4. 运行 `npm start`

## 🔄 开发工作流程

### 修改数据库schema时：
1. 编辑 `prisma/schema.prisma`
2. 运行 `npm run db:migrate` 创建新迁移
3. Prisma会自动应用迁移并重新生成客户端

### 团队协作时：
1. 拉取最新代码（包含迁移文件）
2. 运行 `npm run db:deploy` 应用新迁移
3. 继续开发

## 📊 查看等待列表数据

### 方式1: Prisma Studio (推荐)
```bash
npm run db:studio
```
打开 http://localhost:5555 查看可视化数据库界面

### 方式2: SQL查询
```sql
SELECT * FROM waitlist ORDER BY created_at DESC;
```

### 方式3: 管理页面
访问 http://localhost:3000/admin

## 🔥 Prisma优势

1. **类型安全** - 自动生成TypeScript类型
2. **SQL注入防护** - 内置安全机制
3. **数据验证** - 自动验证数据格式
4. **错误处理** - 清晰的错误代码和信息
5. **开发体验** - 智能代码补全
6. **可视化工具** - Prisma Studio数据库管理界面 