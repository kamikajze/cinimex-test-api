# ReqRes API tests: TypeScript + Playwright

```bash
npm install
npm test                 
npm run test:users 
npm run test:auth     
npm run report     
npm run typecheck        
```


### конфиг (env)

| переменная       | по умолчанию              | описание                          |
|------------------|---------------------------|-----------------------------------|
| `BASE_URL`       | `https://reqres.in/api/`  | базовый URL |
| `REQRES_API_KEY` | `reqres-free-v1`          | значение заголовка `x-api-key`    |

## структура

```
src/
  api/        ApiClient (generic-обёртка) + UsersApi, AuthApi (по ресурсу)
  types/      интерфейсы запросов и ответов
  schemas/    zod-схемы, типизированные интерфейсами (z.ZodType<T>)
  fixtures/   Playwright fixture `api` с готовыми клиентами
  utils/      тестовые данные
tests/        спеки: users.spec.ts, auth.spec.ts
```

