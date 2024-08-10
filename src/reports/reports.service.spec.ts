import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Report } from './report.entity';

describe('ReportsService', () => {
  let service: ReportsService;
  let repository: Repository<Report>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useClass: Repository, // You can also provide a mock repository here
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    repository = module.get<Repository<Report>>(getRepositoryToken(Report));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
