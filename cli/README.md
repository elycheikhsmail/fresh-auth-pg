commands must be runned from the root

# befor each command

```
export DATABASE_URL=postgres://postgres:postgresmaster@localhost:5432/freshauth
```

# command creating tables

```
deno run --allow-read --allow-env --allow-net  cli/create_table.cli.ts
```

# command for drop tables

```
deno run --allow-read --allow-env --allow-net  cli/drop_tables.cli.ts
```

# command for init some tables withe data

```
deno run --allow-read --allow-env --allow-net cli/add.cli.ts
```

? maybe more

# env

```
deno test --allow-read --allow-env --allow-net
```

```
deno run --allow-read --allow-env --allow-net src/share_env/export_env.ts

deno test --allow-read --allow-env --allow-net
```
