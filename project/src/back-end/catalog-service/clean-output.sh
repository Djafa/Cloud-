  GNU nano 3.2                                                                                  clean-output.sh                                                                                             

#!/bin/bash

#we could eventually deploy sth here

#we first run the curl command to fetch all the content in the db with our map reduce function
curl admin:admin@$1:4001/catalog/_design/queries/_view/catalog?key=$2 > tmp.txt

#we the proceed to grep to get rid of the rows at the beginning of the file
grep 'key' tmp.txt > ok.txt

rm tmp.txt

#get rid of [ character
cut -d '[' -f 3 ok.txt | cut -d ']' -f 1 > result.txt


#we get rid off doule quotes
sed -i s/\"//g result.txt

cat result.txt

rm ok.txt


