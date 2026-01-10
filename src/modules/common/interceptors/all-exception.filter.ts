import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

interface ErrorResponse {
    _metadata: {
        statusCode: number;
        timestamp: string;
        path: string;
    };
    message: string | string[];
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = this.getStatus(exception);
        const message = this.getMessage(exception);

        const errorResponse: ErrorResponse = {
            _metadata: {
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.originalUrl,
            },
            message,
        };

        response.status(status).json(errorResponse);
    }

    private getStatus(exception: unknown): number {
        if (exception instanceof HttpException) {
            return exception.getStatus();
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    private getMessage(exception: unknown): string | string[] {
        if (exception instanceof HttpException) {
            const response = exception.getResponse();

            if (typeof response === 'string') {
                return response;
            }

            if (typeof response === 'object' && response !== null) {
                return (response as any).message ?? 'Unexpected error';
            }
        }

        if (exception instanceof Error) {
            return exception.message;
        }

        return 'Internal Server Error';
    }
}
