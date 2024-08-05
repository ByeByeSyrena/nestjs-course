import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  constructor(private dataSource: DataSource) {}

  async onModuleDestroy() {
    await this.closeConnection();
  }

  async closeConnection() {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      console.log('Database connection closed.');
    }
  }
}
