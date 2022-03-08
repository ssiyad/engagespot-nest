## engagespot-nest

[NestJS](https://nestjs.com/) module for [Engagespot](https://engagespot.co/) based on [ssiyad/engagespot-node](https://github.com/ssiyad/engagespot-node)

---
### using register()
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { EngagespotModule } from 'engagespot-nest';

@Module({
    imports: [
        EngagespotModule.register({
            API_KEY: 'API_KEY',
            API_SECRET: 'API_SECRET',
        }),
    ],
    providers: [AppService],
})
export class AppModule { }
```
### using registerAsync()
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { EngagespotModule } from 'engagespot-nest';

@Module({
    imports: [
        EngagespotModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                API_KEY: configService.get('ENGAGESPOT_API_KEY'),
                API_SECRET: configService.get('ENGAGESPOT_API_SECRET'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AppService],
})
export class AppModule { }
```
### and in service
```typescript
import { Injectable } from '@nestjs/common';
import { EngagespotService } from 'engagespot-nest';

@Injectable()
export class AppService {
    constructor(private readonly engagespotService: EngagespotService) { }

    hello() {
        this.engagespotService
            .createNotification('Hello world!')
            .setMessage('So long!')
            .setIcon('https://example.com/icon.svg')
            .setUrl('https://example.com')
            .setCategory('welcome')
            .addRecipient('world@example.com')
            .send();
    }
}

```