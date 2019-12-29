#!/bin/bash

#we could eventually deploy sth here

#we first run the curl command to fetch all the content in the db with our map reduce function
curl admin:admin@192.168.56.102:5001/catalog/_design/queries/_view/catalog?group=true > tmp.txt

#we the proceed to grep to get rid of the rows at the beginning of the file
grep 'name' tmp.txt > ok.txt

rm tmp.txt

#we then get rid off of every other information not realted to the element in the database with a succesion of cut command
cut -d ',' -f 1 ok.txt | cut -d '{' -f 3 | cut -d '}' -f 1 > result.txt

rm ok.txt

