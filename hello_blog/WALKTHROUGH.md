# Working with docker-compose

The fine folks of Hello World Inc want to start a blog. They wanted something that was easy to use and easy for someone else to hack in to. Wordpress was the obvious choice. We can make a docker-compose file that starts Wordpress and a mysql database for storage.

Let's look at the docker-compose file.

    ❯ cat docker-compose.yaml

There are a few pieces here to call out.

You should see two blocks of services. One is `db` , and the other is `wordpress` .

There are some keys used often when defining a service

    - image: Any locally built or downloaded image
    - volumes: Maps local storage to paths inside container
    - restart: What to do if your one service exits
    - ports: What tcp or udp ports to make accessible on the host
    - environment: Plain old environment variables

We can start both of these services with a single command

    ❯ docker-compose up

You should see a lot of output here. This is from your application starting up. In a few moments, you can visit http://localhost:8000 and see the setup steps for a new website.

If you want to stop the service, for now hit ctrl-d. We can start this again in daemon mode so we can still access the terminal.

    ❯ docker-compose up -d

When you do this, regular docker commands still work. docker-compose is just using docker to make its containers.

    ❯ docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    efc1587eaf78        wordpress:latest    "docker-entrypoint.s…"   10 seconds ago      Up 1 second         0.0.0.0:8000->80/tcp     hello_blog_wordpress_1
    6d615d5ed2db        mysql:5.7           "docker-entrypoint.s…"   10 seconds ago      Up 2 seconds        3306/tcp, 33060/tcp      hello_blog_db_1

If you look at `db_data` , you can see the files that are normally in `/var/lib/mysql`

    ❯ tree db_data/ | head
    db_data/
    ├── auto.cnf
    ├── ca-key.pem
    ├── ca.pem
    ├── client-cert.pem
    ├── client-key.pem
    ├── ib_logfile0
    ├── ib_logfile1
    ├── ibdata1
    ├── ibtmp1
