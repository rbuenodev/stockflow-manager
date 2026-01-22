import { WhitelabelService } from './whitelabel.service';
import { UpdateWhitelabelDto } from './dto/update-whitelabel.dto';
export declare class WhitelabelController {
    private readonly whitelabelService;
    constructor(whitelabelService: WhitelabelService);
    findDefault(): Promise<{
        id: string;
        name: string;
        primaryColor: string;
        secondaryColor: string | null;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(updateWhitelabelDto: UpdateWhitelabelDto): Promise<{
        id: string;
        name: string;
        primaryColor: string;
        secondaryColor: string | null;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
