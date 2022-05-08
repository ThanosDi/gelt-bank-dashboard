## Gelt Bank

Online demo: https://gelt-bank-dashboard.vercel.app/


A dashboard to present account information like account balance or top accounts.
It can filter the data and export them to a csv.

![Preview](preview.gif)

## Development :computer:
```bash
$ git clone git@github.com:thanosdi/gelt-bank-dashboard.git
$ cd gelt-bank-dashboard
$ yarn install
$ vercel dev
```

then visit `http://localhost:3000`

## Testing :bomb:
```bash
$ yarn test # add -- --watch to monitor for changes
```
## Coverage
```
---------------------------|---------|----------|---------|---------|-------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------------|---------|----------|---------|---------|-------------------
All files                  |   92.07 |    68.18 |   86.56 |   91.39 |
 api/endpoints             |     100 |      100 |     100 |     100 |
  get-accounts.ts          |     100 |      100 |     100 |     100 |
  get-balance.ts           |     100 |      100 |     100 |     100 |
  get-transactions.ts      |     100 |      100 |     100 |     100 |
 api/mocks                 |     100 |      100 |     100 |     100 |
  get-accounts-mock.ts     |     100 |      100 |     100 |     100 |
  get-balance-mock.ts      |     100 |      100 |     100 |     100 |
  get-transactions-mock.ts |     100 |      100 |     100 |     100 |
 src/api                   |     100 |      100 |     100 |     100 |
  balance-mock-response.ts |     100 |      100 |     100 |     100 |
 src/components            |     100 |      100 |     100 |     100 |
  TestProvider.tsx         |     100 |      100 |     100 |     100 |
 src/components/common     |     100 |      100 |     100 |     100 |
  Error.tsx                |     100 |      100 |     100 |     100 |
  Loading.tsx              |     100 |      100 |     100 |     100 |
  index.ts                 |     100 |      100 |     100 |     100 |
 src/components/dashboard  |    87.2 |    64.28 |   78.57 |   87.73 |
  AccountPreview.tsx       |   35.29 |        0 |       0 |      40 | 7-26
  BalanceTable.tsx         |   79.16 |        0 |   66.66 |   78.94 | 40-52,126
  GetTransactions.tsx      |     100 |      100 |     100 |     100 |
  Title.tsx                |     100 |      100 |     100 |     100 |
  TopAccounts.tsx          |     100 |      100 |     100 |     100 |
  TotalBalance.tsx         |     100 |      100 |     100 |     100 |
 src/components/icons      |   81.08 |    33.33 |   71.42 |   79.41 |
  AccessDeniedSvg.tsx      |     100 |       50 |     100 |     100 | 13-16
  BugFixingSvg.tsx         |     100 |       50 |     100 |     100 | 10-13
  Logo.tsx                 |     100 |      100 |     100 |     100 |
  VoidSvg.tsx              |      30 |        0 |       0 |      30 | 11-19
  index.ts                 |     100 |      100 |   66.66 |     100 |
 src/components/providers  |     100 |      100 |     100 |     100 |
  DashboardGuard.tsx       |     100 |      100 |     100 |     100 |
 src/utilities             |   93.75 |      100 |   88.88 |   91.66 |
  theme.ts                 |     100 |      100 |     100 |     100 |
  tools.ts                 |    92.3 |      100 |   88.88 |   88.88 | 14
---------------------------|---------|----------|---------|---------|-------------------

Test Suites: 11 passed, 11 total
Tests:       17 passed, 17 total
```

### Accounts table schema
```sql
CREATE TABLE IF NOT EXISTS public.accounts
(
    id integer NOT NULL DEFAULT nextval('accounts_id_seq'::regclass),
    name character(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT accounts_pkey PRIMARY KEY (id)
)


CREATE TABLE public.accounts
(
    id serial NOT NULL,
    name character(255) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.accounts
    OWNER to root;
```

### Transactions table schema

For amount we use the numeric data type to support 18 digits, 4 of which would come after the decimal.

Maximum amount `99999999999999.9999` supported.

Minimum `-99999999999999.9999` supported.

We also use delete cascade to correctly delete any transaction of an account if that account is deleted.

```sql
CREATE TABLE IF NOT EXISTS public.transactions
(
    id integer NOT NULL DEFAULT nextval('trasactions_id_seq'::regclass),
    account_id integer NOT NULL DEFAULT nextval('trasactions_account_id_seq'::regclass),
    amount numeric(18,4),
    CONSTRAINT transactions_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.accounts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)


CREATE TABLE public.transactions
(
    id serial NOT NULL,
    amount numeric(18, 4) NOT NULL,
    account_id serial NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.transactions ADD CONSTRAINT transactions_account_id_fkey FOREIGN KEY (account_id)
        REFERENCES public.accounts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.transactions
    OWNER to root;
```


### Store the balances to a materialized view named `balance`

Personaly I would use a materialized view to get the total balance of all accounts and refresh the view once per day using a cron job.

```sql
CREATE MATERIALIZED VIEW IF NOT EXISTS public.balance
TABLESPACE pg_default
AS
 SELECT sum(transactions.amount) AS balance,
    transactions.account_id AS id,
    accounts.name
   FROM transactions
     JOIN accounts ON transactions.account_id = accounts.id
  GROUP BY transactions.account_id, accounts.name
WITH DATA;

```
### Create unique index so we can use the materialized view concurently.

```sql
CREATE UNIQUE INDEX balance_id_idx
    ON public.balance USING btree
    (id)
    TABLESPACE pg_default;
```

### Query to refresh materialized view utilizing a cron job once per day.

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY public.balance WITH DATA;
```
