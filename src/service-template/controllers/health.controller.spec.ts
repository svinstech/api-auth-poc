import { getMockControllers } from '../../test/mockData';
import { HealthController } from './health.controller';

describe('HealthController', () => {
    let healthController: HealthController;

    beforeAll(async () => {
        healthController = (
            await getMockControllers([HealthController], [])
        )[0];
    });

    it('should be defined', async () => {
        expect(healthController).toBeDefined();
    });
});
