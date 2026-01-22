"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'admin@stockflow.com';
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || 'admin';
    const existingUser = await prisma.user.findUnique({
        where: { email: superAdminEmail },
    });
    if (!existingUser) {
        const hashedPassword = await bcrypt.hash(superAdminPassword, 10);
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
                role: client_1.Role.SUPERADMIN,
                organizationId: organization.id
            },
        });
        console.log('Superadmin created');
    }
    else {
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
//# sourceMappingURL=seed.js.map