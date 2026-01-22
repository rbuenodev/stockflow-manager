"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConsumptionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_consumption_dto_1 = require("./create-consumption.dto");
class UpdateConsumptionDto extends (0, mapped_types_1.PartialType)(create_consumption_dto_1.CreateConsumptionDto) {
}
exports.UpdateConsumptionDto = UpdateConsumptionDto;
//# sourceMappingURL=update-consumption.dto.js.map