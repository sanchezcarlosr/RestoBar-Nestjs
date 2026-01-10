import { DocumentBuilder, SwaggerCustomOptions } from "@nestjs/swagger";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

export const getSwaggerConfig = () => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('API Restobar')
        .setDescription('Restobar API Documentation')
        .setVersion('1.0')
        .build();

    const theme = new SwaggerTheme();

    const swaggerSetupOptions = {
        customSiteTitle: 'API Restobar',
        customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
        explorer: true,
        swaggerOptions: {
            operationsSorter: function (a: any, b: any) {
                const order = {
                    get: '0',
                    post: '1',
                    patch: '2',
                    put: '3',
                    delete: '4',
                };
                return (
                    order[a.get('method')].localeCompare(order[b.get('method')]) ||
                    a.get('path').localeCompare(b.get('path'))
                );
            },
        },
    } as SwaggerCustomOptions;

    return {
        swaggerConfig,
        swaggerSetupOptions
    }
}