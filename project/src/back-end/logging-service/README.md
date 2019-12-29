
# MicroService : logging-service

The catalog microservice (catalog-service) exposes a REST API over HTTP. It stores information on a couch db regarding the history of every purchase of every client of the website

**Our rest API for this microservice**

| Methode               |Ressource Name(URN)                          |Required parameters|Output|Description                          |
|----------------|-------------------------------|-----------------------------|------------|---------|
|POST|/logs       |name=[string]&price=[double]&image=[string]&category=[string]       |    pro-token     |  Add a new log in the database





## Test logging-service with curl

**Please, follow the step in the order otherwise you’ll potentially request empty object in the database**

**1 Add a new product in the database using the curl command-line HTTP client**

curl -X POST --data "name=admin&price=1.74&image=https://www.alimentarium.org/fr/system/files/thumbnails/image/alimentarium_kiwis.jpg&category=fruit" IP_ADDRESS:PORT_AUTH/catalog

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/> 
> PORT_AUTH = the port on which the container is running<br/>
