import { NestFactory } from '@nestjs/core';
import 'winston-daily-rotate-file';
// import { Logger } from '@nestjs/common';
// import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { CustomLoggerService } from './custom-logger.service';
import { DatabaseService } from './database.service';

// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // if I want to use built in logger for console.logs
  // const logger = new Logger('Bootstrap');

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

  const databaseService = app.get(DatabaseService);

  const logger = app.get(CustomLoggerService);

  app.useLogger(logger);

  // Handle application shutdown gracefully
  app.enableShutdownHooks();

  process.on('SIGINT', async () => {
    await databaseService.closeConnection();
    process.exit();
  });

  process.on('SIGTERM', async () => {
    await databaseService.closeConnection();
    process.exit();
  });

  app.listen(process.env.PORT || 3088);
}

bootstrap();

// Built in logger usage in services
//
// import { Injectable, Logger } from '@nestjs/common';

// @Injectable()
// export class SomeService {
//   private readonly logger = new Logger(SomeService.name);

//   someMethod() {
//     this.logger.log('This is a log message');
//     this.logger.error('This is an error message');
//     this.logger.warn('This is a warning message');
//     this.logger.debug('This is a debug message');
//     this.logger.verbose('This is a verbose message');
//   }
// }
