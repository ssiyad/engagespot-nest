import { EngagespotConfig } from 'engagespot-node/dist/engagespot/types/config.interface';

export interface EngagespotOptions {
    API_KEY: string;
    API_SECRET: string;
    config?: EngagespotConfig;
}
