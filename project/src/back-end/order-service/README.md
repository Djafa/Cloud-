
# MicroService : order-service

The catalog microservice (catalog-service) exposes a REST API over HTTP. It stores information on a couch db regarding the history of every purchase of every client of the website

**Our rest API for this microservice**

| Methode               |Ressource Name(URN)                          |Required parameters|Output|Description                          |
|----------------|-------------------------------|-----------------------------|------------|---------|
|POST|/history        |username=[string]&orders=[string]&totalItems=[int]&totalAmount=[double]        |    order-token     |  Add a new order in the databse for a client history
|GET          |/history/:username          |        |    order-token   |     get client history information via it’s username       |
|PUT          |/history/:username|orders=[string]&totalItems=[int]&totalAmount=[double] | order-token|update history information




## Test order-service with curl

**Please, follow the step in the order otherwise you’ll potentially request empty object in the database**

**1 Add a new product in the database using the curl command-line HTTP client**

curl -X POST --data "username=kevin&orders=pomme&totalItems=1&totalAmount=1" IP_ADDRESS:PORT_AUTH/history

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/> 
> PORT_AUTH = the port on which the container is running<br/>

**2 get product information via it’s username using the curl command-line HTTP client**

curl -X GET IP_ADDRESS:PORT_AUTH/history/kevin

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/>
> PORT_AUTH = the port on which the container is running

**3 update product information using the curl command-line HTTP client**

curl -X PUT --data "orders=kiwi&totalItems=1&totalAmount=2" IP_ADDRESS:PORT_AUTH/history/kevin


**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/>
> PORT_AUTH = the port on which the container is running

remark : in this example, we’ve changed some filed values
