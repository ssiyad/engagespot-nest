import { EngagespotOptions } from './options.interface';

export interface EngagespotOptionsFactory {
    createMassiveConnectOptions():
        | Promise<EngagespotOptions>
        | EngagespotOptions;
}
