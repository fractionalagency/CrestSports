import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as readline from 'readline';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    console.log('\n🔐 Create Admin User\n');

    const email = await question('Email: ');
    const name = await question('Name: ');
    const password = await question('Password (min 8 characters): ');

    if (!email || !name || !password) {
      console.error('❌ All fields are required');
      process.exit(1);
    }

    if (password.length < 8) {
      console.error('❌ Password must be at least 8 characters');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.error(`❌ Admin with email ${email} already exists`);
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      },
    });

    console.log('\n✅ Admin user created successfully!');
    console.log(`\nEmail: ${admin.email}`);
    console.log(`Name: ${admin.name}`);
    console.log(`Role: ${admin.role}`);
    console.log(`\nYou can now login with these credentials.\n`);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

createAdmin();
