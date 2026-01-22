import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'admin@stockflow.com';
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || 'admin'; 
  
  const existingUser = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(superAdminPassword, 10);
    
    // Create Default Organization
    const organization = await prisma.organization.create({
        data: {
            name: 'StockFlow',
            primaryColor: '#2563eb',
            secondaryColor: '#64748b',
            logoUrl: null,
        }
    });

    await prisma.user.create({
      data: {
        email: superAdminEmail,
        password: hashedPassword,
        name: 'Super Admin',
        role: Role.SUPERADMIN,
        organizationId: organization.id
      },
    });
    console.log('Superadmin created');
  } else {
    console.log('Superadmin already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
