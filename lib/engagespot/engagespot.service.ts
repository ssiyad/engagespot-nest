import { Inject, Injectable } from '@nestjs/common';
import { Engagespot } from 'engagespot-node';
import { CONFIG_OPTIONS } from './const/config.const';
import { EngagespotOptions } from './types/options.interface';

@Injectable()
export class EngagespotService {
    private CLIENT: Engagespot;

    constructor(@Inject(CONFIG_OPTIONS) options: EngagespotOptions) {
        this.CLIENT = new Engagespot(
            options.API_KEY,
            options.API_SECRET,
            options.config,
        );

        this.createNotification = this.CLIENT.createNotification;
        this.genHmac = this.CLIENT.genHmac;
        this.connect = this.CLIENT.connect;
        this.sendNotification = this.CLIENT.sendNotification;
    }

    /**
     *
     * @param title
     * @returns notification instance
     */
    createNotification;

    /**
     * returns a sha256 encoded string used to further ensure security. read more at
     * https://documentation.engagespot.co/docs/HMAC-authentication/enabling-HMAC-authentication
     * @param userId
     * @returns encoded string
     */
    genHmac;

    /**
     * connect/register a user with Engagespot
     * @param userId like 'hello@example.com'
     * @returns API response
     */
    connect;

    /**
     * send an already prepared notification
     * @param notification body
     * @returns API response
     */
    sendNotification;
}
