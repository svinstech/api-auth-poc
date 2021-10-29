import { Provider, Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

export const getMockControllers = async (
    controllers: Type<any>[],
    providers: Provider[],
) => {
    const module: TestingModule = await Test.createTestingModule({
        controllers,
        providers,
    }).compile();

    return controllers.map((controller) => module.get(controller));
};
