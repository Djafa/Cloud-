#!/bin/bash

#first we make the curl command in order to fetch information in the product-service database
curl admin:admin@$1:4001/catalog/_design/queries/_view/catalog?group=true | grep 'key' | grep 'vegetable' | cut -d ',' -f 1 | cut -d ':' -f 2 > fileOfVegetable.txt

#we then get rid off od unecessary double quotes

sed -i s/\"//g fileOfVegetable.txt
