import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { CONFIG_OPTIONS } from './const/config.const';
import { EngagespotService } from './engagespot.service';
import { EngagespotAsyncOptions } from './types/async-options.interface';
import { EngagespotOptionsFactory } from './types/options-factory.interface';
import { EngagespotOptions } from './types/options.interface';

@Global()
@Module({
    providers: [EngagespotService],
    exports: [EngagespotService],
})
export class EngagespotModule {
    static register(options: EngagespotOptions): DynamicModule {
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

    static registerAsync(options: EngagespotAsyncOptions): DynamicModule {
        return {
            module: EngagespotModule,
            imports: options.imports || [],
            providers: this.createProviders(options),
        };
    }

    private static createProviders(
        options: EngagespotAsyncOptions,
    ): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createOptionsProvider(options)];
        }

        return [
            this.createOptionsProvider(options),
            {
                provide: options.useClass as Type<EngagespotOptionsFactory>,
                useClass: options.useClass as Type<EngagespotOptionsFactory>,
            },
        ];
    }

    private static createOptionsProvider(
        options: EngagespotAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                provide: CONFIG_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }

        return {
            provide: CONFIG_OPTIONS,
            useFactory: async (optionsFactory: EngagespotOptionsFactory) =>
                await optionsFactory.createMassiveConnectOptions(),
            inject: [
                (options.useExisting as Type<EngagespotOptionsFactory>) ||
                    (options.useClass as Type<EngagespotOptionsFactory>),
            ],
        };
    }
}
