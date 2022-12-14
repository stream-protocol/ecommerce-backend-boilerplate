import { z } from 'zod'

export const validationLoginSchema = z.object({
    email: z.string().email('This should be a valid email address'),
    password: z.string().min(7, 'The password field should be a minimum of 7 characters'),
})

export const validationRegisterSchema = z.object({
    email: z.string().email('This should be a valid email address'),
    storeName: z.string(),
    subscribeEmail: z.boolean(),
    password: z.string().min(7, 'The password field should be a minimum of 7 characters'),
})

