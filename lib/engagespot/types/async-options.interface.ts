import { ModuleMetadata, Type } from '@nestjs/common';
import { EngagespotOptionsFactory } from './options-factory.interface';
import { EngagespotOptions } from './options.interface';

export interface EngagespotAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useExisting?: Type<EngagespotOptionsFactory>;
    useClass?: Type<EngagespotOptionsFactory>;
    useFactory?: (
        ...args: any[]
    ) => Promise<EngagespotOptions> | EngagespotOptions;
}
