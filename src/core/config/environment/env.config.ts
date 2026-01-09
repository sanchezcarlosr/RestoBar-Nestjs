import 'dotenv/config';
import { z } from 'zod';

import { databaseSchema } from 'src/core/environment';

const envSchema = z.object({
    ...databaseSchema.shape,
});

const { success, error, data } = envSchema.safeParse(process.env);

if(!success){
    console.error(
        'Environment variable validation failed: ',
        z.treeifyError(error),
    );
    process.exit(1);
}

export const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
} = data