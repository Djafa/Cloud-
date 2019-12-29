#!/bin/bash
# we run docker rmi and we gait it's pid in order to wait
docker rmi catalog-service:shopapp --force & 
process_id=$!
wait $process_id
#ensuite on build l'image et on attend sa fin
docker build --no-cache -t catalog-service:shopapp catalog-service/.
wait $!

docker rmi catalog_init_db --force & 
process_id=$!
wait $process_id
#ensuite on build l'image et on attend sa fin
docker build --no-cache -t catalog_init_db catalog-service/catalog_init_db/.
wait $!

docker rmi cart-service:shopapp --force & 
process_id=$!
wait $process_id
#ensuite on build l'image et on attend sa fin
docker build --no-cache -t cart-service:shopapp cart-service/.
wait $!

docker rmi front-service:shopapp --force & 
process_id=$!
wait $process_id
#ensuite on build l'image et on attend sa fin
docker build --no-cache -t front ../front-end/.
wait $!

docker rmi logging-service --force & 
process_id=$!
wait $process_id
#ensuite on build l'image et on attend sa fin
docker build --no-cache -t logging-service logging-service/.
wait $!

docker rmi logging_init_db --force & 
process_id=$!
wait $process_id
#ensuite on build l'image et on attend sa fin
docker build --no-cache -t logging_init_db logging-service/logging_init_db/.
wait $!

docker rmi order-service:shopapp --force & 
process_id=$!
wait $process_id
#ensuite on build l'image et on attend sa fin
docker build --no-cache -t order-service:shopapp order-service/.
wait $!

docker rmi order_init_db --force & 
process_id=$!
wait $process_id
#ensuite on build l'image et on attend sa fin
docker build --no-cache -t order_init_db order-service/order_init_db/.
wait $!

docker rmi storage-service:shopapp --force & 
process_id=$!
wait $process_id
#ensuite on build l'image et on attend sa fin
docker build --no-cache -t storage-service:shopapp storage/.
wait $!

docker rmi auth-service:shopapp --force & 
process_id=$!
wait $process_id
#ensuite on build l'image et on attend sa fin
docker build --no-cache -t auth-service:shopapp users/.
wait $!