import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from '../services/email.service';

@Injectable()
export class EmailSendListener {
    constructor(private readonly emailService: EmailService) {

    }
    @OnEvent('user.registered')
    async handleOrderCreatedEvent(object: any) {
        // handle and process "OrderCreatedEvent" event
        await this.emailService.sendWelcome(object?.email, object?.name);
    }
}