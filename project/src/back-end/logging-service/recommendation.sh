#!/bin/bash

while getopts i:d: opt; do
    case $opt in
        i)  interval=$OPTARG;;
        d)  duration=$OPTARG;;
    esac
done

now=$(date '+%s')
interval=$((interval*60))
end=$(date -d "+ $duration minutes" '+%s' || date -v+"$duration"M '+%s')

until ((now>=end)); do
    # on récupère tous les gens dans la base de données et on les mets dans un fichier
    curl admin:admin@$1:3001/users/_design/queries/_view/users?group=true | grep 'key' | cut -d ',' -f 1 | cut -d ':' -f 2 | sed -r s/\"//g > users.txt
    wait $!
    #on lit ensuite ce fichier ligne pas ligne et on exécute le script préférence.sh sur chaque user
    input="users.txt"
	while IFS= read -r line
	do
          ./preference.sh $1 '"'"${line}"'"'
	done < "$input"

    sleep "$interval"
    now=$(date '+%s')
done





