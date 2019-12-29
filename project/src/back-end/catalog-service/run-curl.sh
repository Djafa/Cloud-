#!/bin/bash

#we get rid off "' for the second parameter in order to correctly name related file with username
VERSION=$2
TMP=$(echo "$VERSION" | tr -d '')
fileName=$(echo "$TMP" | sed 's/\"//g')

#< à ce niveau j'ai un fichier qui contient kiwi pomme  sur des lignes séparées> mon programme à maintenant besoin de savoir pour chaque éléments s'il s'agit d'un fruit ou d'un légumes
#on va parcourir ligne pr ligne de fileOfHistory et appliquer le script clean-output.result qui se trouve dans catalog-service pour savoir si fruit ou légume et on va rediriger l'ouput dans un autre fich$
#procéder à la deuxième étape qui sera de voir s'il a plus de fruits ou de légume
input="fileOfHistory.txt"
while IFS= read -r line
do
  #echo "$line" >> fileOfCategory.txt
  upLine="'\"$line\"'"
  echo $line
  echo $1
  echo $upLine

  #we first run the curl command to fetch all the content in the db with our map reduce function
  curl admin:admin@$1:4001/catalog/_design/queries/_view/catalog?key='"'"${line}"'"' > tmp.txt

  #we the proceed to grep to get rid of the rows at the beginning of the file
  grep 'key' tmp.txt > ok.txt

  rm tmp.txt

  #get rid of [ character
  cut -d '[' -f 3 ok.txt | cut -d ']' -f 1 > result.txt


  #we get rid off doule quotes
  sed -i s/\"//g result.txt

  cat result.txt >> $fileName.txt

  rm ok.txt
done < "$input"

