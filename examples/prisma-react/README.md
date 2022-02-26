Example of using Telefunc with [Prisma](https://www.prisma.io/).

To run it:

```bash
git clone git@github.com:vikejs/telefunc
cd telefunc/examples/prisma-react/
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```
