import { Module } from '@nestjs/common';

import { TypeOrmConfigService } from './services/type-orm-config.service';
import { HealthController } from './controllers/health.controller';

@Module({
    imports: [],
    controllers: [HealthController],
    providers: [TypeOrmConfigService],
})
export class ServiceTemplateModule {}
