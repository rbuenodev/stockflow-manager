"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
let cachedServer;
async function bootstrap() {
    if (!cachedServer) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
        }));
        await app.init();
        cachedServer = app.getHttpAdapter().getInstance();
    }
    return cachedServer;
}
if (process.env.NODE_ENV !== 'production') {
    bootstrap().then(server => {
        const port = process.env.PORT || 3200;
        server.listen(port, () => console.log(`🚀 Local server on http://localhost:${port}`));
    });
}
exports.default = async (req, res) => {
    const server = await bootstrap();
    return server(req, res);
};
//# sourceMappingURL=main.js.map