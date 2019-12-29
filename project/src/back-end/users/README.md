
# MicroService : users

The catalog microservice (catalog-service) exposes a REST API over HTTP. It stores information on a couch db regarding the history of every purchase of every client of the website

**Our rest API for this microservice**

| Methode               |Ressource Name(URN)                          |Required parameters|Output|Description                          |
|----------------|-------------------------------|-----------------------------|------------|---------|
|POST|/catalog/:username         |name=[string]&price=[double]         |    history-token     |  Add a new order in the databse for a client history
|GET          |/catalog/:name/:username           |        |    history-token   |     get client history information via it’s username       |





## Test users with curl

**Please, follow the step in the order otherwise you’ll potentially request empty object in the database**

**1 Add a new product in the database using the curl command-line HTTP client**

curl -X POST --data "username=kevin&password=bob" IP_ADDRESS:PORT_AUTH/user

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/> 
> PORT_AUTH = the port on which the container is running<br/>

**2 get product information via it’s username using the curl command-line HTTP client**

curl -X GET IP_ADDRESS:PORT_AUTH/user/kevin/bob

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/>
> PORT_AUTH = the port on which the container is running
