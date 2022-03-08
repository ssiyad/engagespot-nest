import { Inject, Injectable } from '@nestjs/common';
import { Engagespot } from 'engagespot-node';
import { CONFIG_OPTIONS } from './const/config.const';
import { EngagespotOptions } from './types/options.interface';

@Injectable()
export class EngagespotService {
    private CLIENT: Engagespot;

    constructor(@Inject(CONFIG_OPTIONS) options: EngagespotOptions) {
        this.CLIENT = new Engagespot(options.API_KEY, options.API_SECRET);
    }

    // This may well be a design limitation in TypeScript, if not a full-fledged bug. The fact is that
    // automated control flow analysis is hard to do "right". Since it's generally impossible for the
    // compiler to figure out exactly which states are possible for each variable at each point in a program,
    // it has to use heuristics, which tend to result both in false negatives (uncaught bugs) and false
    // positives (caught non-bugs). This seems like a false positive to me, since the asynchronous function
    // is definitely invoked after this.prop has been set. A similar issue has been raised and addressed
    // before, with synchronous immediately-invoked function expressions.
    // Meanwhile, if you have a workaround, such as assigning const self = this and then accessing self.prop,
    // or the equivalent accessing of (this as this).prop, then I guess you should use it.
    // - https://stackoverflow.com/a/51678644/11143333
    /**
     *
     * @param title
     * @returns notification instance
     */
    createNotification = (this as this).CLIENT.createNotification;
}
