# employees-records
A CRUD service for employees' records

### Set up application
Node version **v16**  and above.

**Technologies**
- Express.js
- Morgan
- express-validator
- knex.js
- sqlite3

Check config folder for env variables.

Run application: 
```
npm install
npm run start:dev

```


Run migration: 
```
npm run db:migrate:make
npm run db:migrate
npm run db:migrate:rollback

```
