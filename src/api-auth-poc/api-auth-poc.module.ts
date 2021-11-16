// A new Auth module.

import { Module } from '@nestjs/common';

import { HealthController } from './controllers/health.controller';
import { ApplicationController } from './controllers/application.controller';

@Module({
    imports: [],
    controllers: [HealthController, ApplicationController],
    providers: [],
})
export class APIAuthPOCModule {}
