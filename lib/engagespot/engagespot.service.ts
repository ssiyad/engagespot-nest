import { Inject, Injectable } from '@nestjs/common';
import { Engagespot } from 'engagespot-node';
import { CONFIG_OPTIONS } from './const/config.const';
import { EngagespotOptions } from './types/options.interface';

@Injectable()
export class EngagespotService extends Engagespot {
    /**
     * extend and create an Engagespot client
     * @param options module init options
     */
    constructor(@Inject(CONFIG_OPTIONS) options: EngagespotOptions) {
        super(options.API_KEY, options.API_SECRET, options.config);
    }
}
