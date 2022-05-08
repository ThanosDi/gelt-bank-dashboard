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
