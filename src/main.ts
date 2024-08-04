import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cookieSession on 'main' level - we can use it,
  // but if there is e2e testing it does not work, so
  // better write it in the app.module
  // app.use(
  //   cookieSession({
  //     keys: ['fdsfkjsdkfl'],
  //   }),
  // );

  // ValidationPipe on 'main' level - we can use it,
  // but if there is e2e testing it does not work, so
  // better write it in the app.module
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );

  await app.listen(3088);
}
bootstrap();
