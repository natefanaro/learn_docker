# Dockerizing an application

Here at Hello World Inc, we have an application that needs to run in a container.

Let's look at the README.md first to see how the application is compiled and ran.

    ❯ cat README.md

Now, look at the index.js file

    ❯ cat index.js

This looks like a very complex node application.

The readme file had commands to install and run the service. We can add that to the Dockerfile.

    ❯ cat Dockerfile

This file begins with `FROM`. From indicates the image that we are starting off with. Just about every container starts from another container. You can usually find a container for whatever operating system, or programming language you are looking for. Search for more at hub.docker.com

Next we want to copy the files from our current directory in to the container.

Now we are setting the `WORKDIR`. This helps the container know where the rest of the commands should run. This includes when the container is booted.

While we're in this `Dockerfile`, we can run commands inside the container. Here I'm getting a file list. This might be useful if you are building a container and need to add some commands for troubleshooting.

We want to install the dependencies next. Running `npm install` is happening inside the container. After each step in this file, a cache image is made with the changes to the filesystem. All of the run steps are happening at build time.

Expose marks a port that will be accessible to the container. This was also set in `index.js`.

Now we can build the container. This command uses the current directory and tags the image with the name `hello-world`. Each step from our `Dockerfile` is outlined and you can see the output from the command that ran. --no-cache is added so build ignores previously cached versions of this Dockerfile.

    ❯ docker build . -t hello-world --no-cache
    Sending build context to Docker daemon  17.41kB
    Step 1/7 : FROM node:14
    ---> 173eeb895217
    Step 2/7 : COPY . /app
    ---> 73613d004c98
    Step 3/7 : WORKDIR /app
    ---> Running in 4c58d7d09051
    Removing intermediate container 4c58d7d09051
    ---> 82421a441b6b
    Step 4/7 : RUN ls -ll
    ---> Running in 5b9f74121518
    total 32
    -rw-rw-r-- 1 root root  113 Sep 16 03:23 Dockerfile
    -rw-rw-r-- 1 root root 1451 Sep 16 03:01 README.md
    -rw-rw-r-- 1 root root 3358 Sep 16 03:35 WALKTHROUGH.md
    -rwxrwxr-x 1 root root  133 Sep 16 02:57 commands.sh
    -rw-rw-r-- 1 root root  225 Sep 16 03:24 index.js
    -rw-rw-r-- 1 root root  550 Sep 16 01:33 package.json
    -rw-rw-r-- 1 root root 4757 Sep 16 02:56 recording.cast
    Removing intermediate container 5b9f74121518
    ---> 2e1f9b4a6107
    Step 5/7 : RUN npm install
    ---> Running in f4f5231bb633
    npm notice created a lockfile as package-lock.json. You should commit this file.
    added 50 packages from 37 contributors and audited 50 packages in 2.337s
    found 0 vulnerabilities

    Removing intermediate container f4f5231bb633
    ---> 2c8b580d471d
    Step 6/7 : EXPOSE 3000
    ---> Running in 8abd1251ffa6
    Removing intermediate container 8abd1251ffa6
    ---> 72ef2b982684
    Step 7/7 : ENTRYPOINT ["node", "index.js"]
    ---> Running in 879f8c44ebf4
    Removing intermediate container 879f8c44ebf4
    ---> b4a5988c3ce0
    Successfully built b4a5988c3ce0
    Successfully tagged hello-world:latest


And now we can run it

    ❯ docker run -d -it -p 3000:3000 --name hello-world-app hello-world

It started!

    ❯ curl http://localhost:3000
    hello world

What if I want to see the containers that are running. You can run `docker ps`

    ❯ docker ps  
    CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS              PORTS                    NAMES
    e4889c4c28e4        hello-world         "node index.js"     About a minute ago   Up About a minute   0.0.0.0:3000->3000/tcp   hello-world-app

Let's look at the logs of our application

    ❯ docker logs hello-world-app
    App started at 0.0.0.0:3000

And now we can stop it

    ❯ docker stop hello-world-app

Adding `-a` to `docker ps` will show all containers. Without it we only saw running containers

    ❯ docker ps -a

And we can remove that container

    ❯ docker rm hello-world-app

