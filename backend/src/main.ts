import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';

// Variável global para cachear o servidor entre invocações (Serverless optimization)
let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    // Deixe o Nest criar a instância do Express internamente
    const app = await NestFactory.create(AppModule);
    
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));
    
    // Inicializa o app, mas não chama .listen()
    await app.init();
    
    // Extrai o servidor Express subjacente
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

// Suporte para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(server => {
    const port = process.env.PORT || 3200;
    server.listen(port, () => console.log(`🚀 Local server on http://localhost:${port}`));
  });
}

// Export para a Vercel
export default async (req: any, res: any) => {
  const server = await bootstrap();
  return server(req, res);
};