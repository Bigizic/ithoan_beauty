## in case when

-[x] docker compose up -d --build

works and server-v2 cannot connect to the mongodb

it's cuz server-v2 docker container is not on the same network as the mongodb

because i didn't create server-v2 and the mongodb container at the same time

so server-v2 container network has to be connected to mongodb container


list all network on docker

-[x] docker network ls

find the mongodb container

-[x] docker inspect mongodb --format='{{json .NetworkSettings.Networks}}'

connect server-v2 to the netowrk

-[x] docker network connect <mongo_network_name> server-v2

it usually start with

'mern-ecommerce_app-network something: i.e the mongo_network_name

