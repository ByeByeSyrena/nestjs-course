import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  constructor(private dataSource: DataSource) {}

  async initialize() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();

      console.log('Database connection initialized.');
    }
  }

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
