import { PrismaService } from '../prisma/prisma.service';
export declare class WhitelabelService {
    private prisma;
    constructor(prisma: PrismaService);
    findDefault(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        primaryColor: string;
        secondaryColor: string | null;
        logoUrl: string | null;
    } | null>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        primaryColor: string;
        secondaryColor: string | null;
        logoUrl: string | null;
    } | null>;
    update(updateWhitelabelDto: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        primaryColor: string;
        secondaryColor: string | null;
        logoUrl: string | null;
    }>;
}
