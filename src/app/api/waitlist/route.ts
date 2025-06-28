import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '../../../generated/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      );
    }

    // 使用Prisma创建新的waitlist条目
    const waitlistEntry = await prisma.waitlist.create({
      data: {
        email: email.toLowerCase().trim(),
      },
    });

    return NextResponse.json(
      { 
        message: '成功加入等待列表！',
        id: waitlistEntry.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('数据库错误:', error);
    
    // 处理唯一约束违反（邮箱重复）
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: '该邮箱已在等待列表中' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
} 