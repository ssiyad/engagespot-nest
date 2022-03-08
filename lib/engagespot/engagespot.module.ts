import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from './const/config.const';
import { EngagespotService } from './engagespot.service';
import { EngagespotModuleOptions } from './types/options.type';

@Module({})
export class EngagespotModule {
    static register(options: EngagespotModuleOptions): DynamicModule {
        return {
            module: EngagespotModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                EngagespotService,
            ],
            exports: [EngagespotService],
        };
    }
}
