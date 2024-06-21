// import { z } from 'zod';
// const stringToNumber = z.string().transform((val, ctx) => {
//   const parsed = parseInt(val);
//   if (isNaN(parsed)) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'Not a valid number',
//     });
//     return z.NEVER;
//   }
//   return parsed;
// });
// const envSchema = z.object({
//   API_PORT: stringToNumber,
//   NODE_ENV: z.enum(['local', 'development', 'production']),
//   POSTGRES_USERNAME: z.string(),
//   POSTGRES_PASSWORD: z.string(),
//   POSTGRES_DATABASE: z.string(),
//   POSTGRES_HOST: z.string(),
//   POSTGRES_DIALECT: z.string(),
//   /**
//    * TODO:
//    * prod에 배포할 때는 CLIENT_URL을 필수로 설정해야 합니다.
//    * 그렇지 않으면 CORS 에러가 발생합니다.
//    */
//   CLIENT_URL: z.string().optional(),
// });
// export type Env = z.infer<typeof envSchema>;
// export const env = (() => {
//   // eslint-disable-next-line no-process-env
//   const r = envSchema.safeParse(process.env);
//   if (r.success === true) return r.data;
//   throw new Error(
//     `env validation 오류가 생겼습니다. ${r.error.errors.map((e) => `${e.path[0]}: ${e?.['received'] ?? e.code}`).join(', ')}`,
//   );
// })();
