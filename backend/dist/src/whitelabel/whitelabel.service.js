"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhitelabelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WhitelabelService = class WhitelabelService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findDefault() {
        return this.prisma.organization.findFirst();
    }
    async findOne(id) {
        return this.prisma.organization.findUnique({ where: { id } });
    }
    async update(updateWhitelabelDto) {
        let org = await this.findDefault();
        if (!org) {
            org = await this.prisma.organization.create({
                data: {
                    name: updateWhitelabelDto.name || 'StockFlow Manager',
                    primaryColor: updateWhitelabelDto.primaryColor || '#2563eb',
                    secondaryColor: updateWhitelabelDto.secondaryColor || '#64748b',
                    logoUrl: updateWhitelabelDto.logoUrl || null,
                }
            });
            return org;
        }
        return this.prisma.organization.update({
            where: { id: org.id },
            data: updateWhitelabelDto
        });
    }
};
exports.WhitelabelService = WhitelabelService;
exports.WhitelabelService = WhitelabelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WhitelabelService);
//# sourceMappingURL=whitelabel.service.js.map