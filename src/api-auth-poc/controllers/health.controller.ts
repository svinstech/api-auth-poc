import { Controller, Get, Header } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiProduces } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class HealthController {
    @Get('/health')
    @Header('Cache-Control', 'no-store')
    @ApiResponse({
        status: 200,
        description:
            '"ok" if service is healthy. Any other response indicates unhealthy.',
        schema: {
            type: 'string',
            example: 'ok',
        },
    })
    @ApiProduces('text/plain')
    healthcheck(): string {
        return 'ok';
    }
}
