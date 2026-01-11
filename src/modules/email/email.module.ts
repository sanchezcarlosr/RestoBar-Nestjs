/**
 * Credenciales:
 * duwo khxc joxj bapt
 * restobar
 */
import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { emailConfig } from "src/core/config/email/email.config";
import { EmailSendListener } from "./listeners/email-send.listener";
import { EmailService } from "./services/email.service";


@Module({
    imports: [
        MailerModule.forRoot(
            emailConfig
        )
    ],
    controllers: [],
    providers: [EmailSendListener, EmailService],
})
export class EmailModule{}