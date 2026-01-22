import { WhitelabelService } from './whitelabel.service';
import { UpdateWhitelabelDto } from './dto/update-whitelabel.dto';
export declare class WhitelabelController {
    private readonly whitelabelService;
    constructor(whitelabelService: WhitelabelService);
    findDefault(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        primaryColor: string;
        secondaryColor: string | null;
        logoUrl: string | null;
    } | null>;
    update(updateWhitelabelDto: UpdateWhitelabelDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        primaryColor: string;
        secondaryColor: string | null;
        logoUrl: string | null;
    }>;
}
