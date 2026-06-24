import { z } from 'zod';

export const getRegisterSchema = (t: (key: string) => string) =>
  z.object({
    displayName: z.string().min(3, { message: t('register.full_name_validation') }),
    email: z.string().email({ message: t('register.email_validation') }),
    phone: z.string().min(8, { message: t('register.phone_validation') }),
    password: z.string().min(8, { message: t('register.password_validation') })
  });

export const getLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({ message: t('login.email_validation') }),
    password: z.string().min(8, { message: t('login.password_validation') })
  });
