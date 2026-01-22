import { PrismaService } from '../prisma/prisma.service';
export declare class WhitelabelService {
    private prisma;
    constructor(prisma: PrismaService);
    findDefault(): Promise<{
        id: string;
        name: string;
        primaryColor: string;
        secondaryColor: string | null;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        primaryColor: string;
        secondaryColor: string | null;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(updateWhitelabelDto: any): Promise<{
        id: string;
        name: string;
        primaryColor: string;
        secondaryColor: string | null;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
