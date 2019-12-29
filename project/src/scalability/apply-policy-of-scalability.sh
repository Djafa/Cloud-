#!/bin/bash -
#===============================================================================
#
#          FILE: apply-policy-of-scalability.sh
#
#         USAGE: ./apply-policy-of-scalability.sh
#
#   DESCRIPTION:
#
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Raziel Carvajal-Gomez (), raziel.carvajal@uclouvain.be
#  ORGANIZATION:
#       CREATED: 10/29/2019 10:52
#      REVISION:  ---
#===============================================================================

function endScript {
  case ${1} in
    "notManager" )
      echo "Error: this node is not a swarm manager. Run this script in a \
        swarm manager." 
      ;;
    "wrongArgs" )
      echo "Error: wrong number of arguments." 
      echo "Usage: ${shName} <name-of-stack> <name-of-service-to-scale>" 
      ;;
    "unknownStack" )
      echo "Error: the stack name you provide does not exist." 
      ;;
    "unknownService" )
      echo "Error: the service name you provide does not exist." 
      ;;
    * )
      ;;
  esac
  echo "End of ${0}" > log.txt
  exit 1
}

WORKERS_IPS=""
function getWorkersIps {
  rm -f tmp nodes
  docker node ls | awk '{print $1, $2}' > tmp
  l=`wc -l tmp | awk '{print $1}'`
  let n=${l}-1
  # file "nodes" contains all nodes in the swarm
  workers=""
  tail -${n} tmp > nodes
  for (( i = 1; i <= ${n}; i++ )); do
    id=`head -${i} nodes | tail -1 | awk '{print $1}'`
    role=`head -${i} nodes | tail -1 | awk '{print $2}'`
    if [ "${role}" != "*" ]; then
      workers="${id} ${workers}"
    fi
  done
  # ${workers} is a string (sparated with spaces) with all workers IDs in a swarm
  for w in ${workers} ; do
    ip=`docker node inspect ${w} | grep Addr | awk '{print $2}'`
    WORKERS_IPS="${ip} ${WORKERS_IPS}"
  done
  # ${WORKERS_IPS} is a string (sparated with spaces) with all workers IP addresses in a swarm
  rm -f tmp nodes
}

[ ${#} -ne 2 ] && endScript "wrongArgs"

docker node ls &> /dev/null
[ ${?} != 0 ] && endScript "notManager"

stack=`docker stack ls | grep ${1} | awk '{print $1}'`
[ "${stack}" == "" ] && endScript "unknownStack"

service=`docker stack services ${stack} | grep ${stack}_${2}`
[ "${service}" == "" ] && endScript "unknownService"

getWorkersIps

AVG="0.0"
service="${stack}_${2}"
function updateAvg {
  sum=""
  REPLICAS=0
  id=`docker ps | grep ${service}`
  if [ "${id}" != "" ] ; then
    id=`echo ${id} | awk '{print $1}' > log.txt`
    data=`docker stats --no-stream ${id}`
    sum=`echo ${data} | awk '{print $19}' | awk -F '%' '{print $1}' > log.txt`
    let REPLICAS=REPLICAS+1
  fi
  for ip in ${WORKERS_IPS} ; do
    ip=`echo ${ip} | awk -F '"' '{print $2}' > log.txt`
    id=`ssh ${ip} "docker ps" | grep ${service}`
    if [ "${id}" != "" ] ; then
      id=`echo ${id} | awk '{print $1}' > log.txt`
      data=`ssh ${ip} "docker stats --no-stream ${id}"`
      data=`echo ${data} | awk '{print $19}' | awk -F '%' '{print $1}' > log.txt`
      sum="${data}, ${sum}"
      let REPLICAS=REPLICAS+1
    fi
  done
  echo "Get avg with [${sum}]" > log.txt
  ok=`python -c "l = [${sum}] ;r = 1 if len(l) != 0 else 0 ;print(r) "`
  if [ ${ok} -eq 1 ]; then
    AVG=`python -c "l = [${sum}] ;print( sum(l) / len(l) ) "`
  else
    AVG="0.0"
  fi
}

TRESHOLD="90.0"
function tresholdNotReached {
  echo $(python -c "r = 1 if ${AVG} < ${TRESHOLD} else 0 ;print(r)") > log.txt
}

while [ "$(tresholdNotReached)" == "1" ] ; do
  updateAvg
  echo "${AVG} < ${TRESHOLD} ? No" > log.txt
  sleep 2
done
echo "${AVG} >= ${TRESHOLD} ? Yes. Treshold reached." > log.txt

echo "Add new replicas of: ${service}. The total number is ${REPLICAS} replicas." > log.txt
let REPLICAS=REPLICAS*3
docker service scale ${service}=${REPLICAS}
