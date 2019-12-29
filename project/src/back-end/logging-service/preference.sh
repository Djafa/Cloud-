#!/bin/bash

#
#this script takes as parameter the username of the guy who's currently logged and the ip address of the host vm

#we get rid off "' for the second parameter in order to correctly name related file with username
VERSION=$2
TMP=$(echo "$VERSION" | tr -d '')
fileName=$(echo "$TMP" | sed 's/\"//g')

#we first move to order-service forlder
cd ../order-service
#we then execute the clean-output.sh folder in this folder that will provide us the history of the user
./clean-output.sh $1 $2
#on fait ensuite une copie du fichier result.txt contenant notre résultat dans le folder de logging
cp -a result.txt /home/user/LINGI2145-2019-2020/project/src/back-end/logging-service
#we then get back in the right folder
cd ../logging-service
#on renomme le fichier result.txt qu'on a importé en fileOfHistory pour rester en corrélation avec les noms
mv result.txt fileOfHistory.txt

#we then need to make some statistics regarding the fileOfHistory.txt to see whether our username is more fruit or more vegetable.

#first, in fileOfHistory.txt, every order is delimited by _ <underscore, we will switch it by a new line, it will be easier for processing afterwards
sed -i 's/_/\n/g' fileOfHistory.txt

#on fait une copie du fileOfHistory.txt dans le folder du catalog-service pour se simplifier la vie
cp fileOfHistory.txt /home/user/LINGI2145-2019-2020/project/src/back-end/catalog-service
#on se rend ensuite dans le folder du catalog service pour réaliser la suite
cd ../catalog-service

./run-curl.sh $1 $2
wait $!

#on déplace le fichier associé au gars de le logging service
cp $fileName.txt /home/user/LINGI2145-2019-2020/project/src/back-end/logging-service
#on peut ensuit supprimer le fileOfHistory et le $filname.txt pour laisser de la place dans le folder
rm $fileName.txt
rm fileOfHistory.txt
#on revient ensuite dans le folder du logging service pour réaliser la suite
cd ../logging-service
#on rename son fichier associé récupéré du catalog-service par un nom plus généiruque
mv $fileName.txt fileOfCategory.txt

#<à ce stade, j'ai un fichier fileOfCategory qui contien fruit fruit vegetable fruit séparé par des sauts de ligne.
#me reste à créer 2 varaibles pour comptabiliser le nombre de fois que fruit ou légume apparait, puis je divise chacune d'elle par le total pour avoir une moyenne et je choisi la valeur la plus élevée pour décider 
#si l'user est plus fruit ou légume de cette manière je serai ce que je vais lui proposer. 
#cette commande va compter le nombre de fois que le mot fruit apparait dans  le fichier
#the $() is used in bash to store the output of a command line in a variable
fruit=$(grep -o 'fruit' fileOfCategory.txt | wc -l)
#celle ci le nombre de fois que le mot vegetable apparait dans le fichier
vegetable=$(grep -o 'vegetable' fileOfCategory.txt | wc -l)
#nbrLines=$(wc -l fileOfCategory | awk '{ print $1 }')

#fruitPercentage=$(expr $fruit / $nbrLines)
#vegetablePercentage=$(expr $vegetable / $nbrLines)

#j'ai juste mnt à comparer fruit de vegetable et d'agir en fct si l'un est plus grand que l'autre. ge est greater or equal

if [ "$fruit" -ge "$vegetable" ]; then
	#on récupère la liste de tous les fruits via un script, ce script va placer l'output dans un fichier qui s'appelle fileOfFruit.txt, on lui passe en paramètre l'addresse ip de la vm host
	./clean-output-fruit.sh $1
	wait $!
	#on compare l'history des fruits du user avec le catalog de tous les fruits
	diff fileOfFruit.txt fileOfHistory.txt > tmp.txt
	#on se débarasse des choses inutiles dans l'ouput
	grep '<' tmp.txt | cut -d '<' -f 2 > $fileName.txt
	rm tmp.txt
        #on remove les espaces dans le fichier de filename.txt afin de ne pas faire bugger le json par après
        sed -r -i 's/\s+//g' $fileName.txt
        #on lit ensuite la première ligne de ce fichier qu'on stocke dans une variable
        firstline=$(head -1 ${fileName}.txt)
        #ensuite je peux faire le curl vers la base de donnée de ligging service
        curl -X DELETE $1:7000/logs/$fileName
        curl --request POST --data '{"username": "'"$fileName"'", "logs": "'"$firstline"'", "_id": "'"$fileName"'"}' -H "Content-Type: application/json" admin:admin@$1:7001/logs
	#echo "$fruit" #on lance le script de proposition avec les views sur les fruits
	else
	./clean-output-vegetable.sh $1
	wait $!
	#on compare l'history des fruits du user avec le catalog de tous les fruits
	diff fileOfVegetable.txt fileOfHistory.txt > tmp.txt
	#on se débarasse des choses inutiles dans l'ouput
	grep '<' tmp.txt | cut -d '<' -f 2 > $fileName.txt
	rm tmp.txt
        #on remove les espaces dans le fichier de filename.txt afin de ne pas faire bugger le json par après
        sed -r -i 's/\s+//g' $fileName.txt
        #on lit ensuite la première ligne de ce fichier qu'on stocke dans une variable
        firstline=$(head -1 ${fileName}.txt)
        #ensuite je peux faire le curl vers la base de donnée de ligging service
        curl -X DELETE $1:7000/logs/$fileName
        curl --request POST --data '{"username": "'"$fileName"'", "logs": "'"$firstline"'", "_id": "'"$fileName"'"}' -H "Content-Type: application/json" admin:admin@$1:7001/logs
	#echo "$vegetable" #on lance le script de proposition avec les views sur les légumes
fi
