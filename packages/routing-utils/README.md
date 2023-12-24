# @khulnasoft/routing-utils

Route validation utilities

## Usage

`npm add @khulnasoft/routing-utils`

```ts
import { normalizeRoutes } from '@khulnasoft/routing-utils';

const { routes, error } = normalizeRoutes(inputRoutes);

if (error) {
  console.log(error.code, error.message);
}
```

```ts
import { routesSchema } from '@khulnasoft/routing-utils';

const ajv = new Ajv();
const validate = ajv.compile(routesSchema);
const valid = validate([{ src: '/about', dest: '/about.html' }]);

if (!valid) console.log(validate.errors);
```
