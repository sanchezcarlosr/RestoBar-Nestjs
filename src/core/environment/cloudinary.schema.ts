import z from 'zod';

export const cloudinarySchema = z.object({
    CLOUD_NAME: z.string().min(8).max(10),
    CLOUD_API_KEY: z.string().min(5),
    CLOUD_API_SECRET: z.string().min(15).max(30),
});