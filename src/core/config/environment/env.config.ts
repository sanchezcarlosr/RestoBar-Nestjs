import 'dotenv/config';
import { z } from 'zod';

import { databaseSchema, cloudinarySchema } from 'src/core/environment'; 

const envSchema = z.object({
    ...databaseSchema.shape,
    ...cloudinarySchema.shape,
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
    CLOUD_NAME,
    CLOUD_API_KEY,
    CLOUD_API_SECRET
} = data