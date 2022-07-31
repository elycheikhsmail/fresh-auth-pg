# how to authentificate "fresh" users using pg db and cookies stategie

example for how authorize users using fresh, postgres based on cookies stategie

# features

## cli

build in sample cli for common operations

[+] create users and tokens tables

[+] drop/delete tables

## sevices and utiles

build in service and utiles (some ts functions) for crud operations and hashing
password

[+] db_services for crud operations in users and tokens tables

[+] no orm used instead deno pg driver

[+] utiles for hash password befor save it in db

# in controller

we use cookies and interact to recognise identity of user bihind each incoming
request, the folloeing screens give you better idea than habla habla.

# befor run it

- you must have postegres db (local or remote) and DATABASE_URL string to access
  this <br /> DATABASE_URL syntax is <br />

```
export DATABASE_URL=postgres://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}
```

- you must export 2 env variable SECRET_KEY and DATABASE_URL like this

```
export SECRET_KEY=SuperDuperSecret
export DATABASE_URL=postgres://postgres:postgresmaster@localhost:5432/freshauth
deno task start
```

# usage

Start the project: update env variables and run

```
export SECRET_KEY=SuperDuperSecret
export DATABASE_URL=postgres://postgres:postgresmaster@localhost:5432/freshauth
deno task start
```

This will watch the project directory and restart as necessary.

# can I use it in production ?

I don't know
