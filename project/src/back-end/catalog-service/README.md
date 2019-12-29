
# MicroService : catalog-service

The catalog microservice (catalog-service) exposes a REST API over HTTP. It stores information on a couch db regarding the history of every purchase of every client of the website

**Our rest API for this microservice**

| Methode               |Ressource Name(URN)                          |Required parameters|Output|Description                          |
|----------------|-------------------------------|-----------------------------|------------|---------|
|POST|/catalog/:username       |name=[string]&price=[double]&image=[string]&category=[string]       |    catalog-token     |  Add a new product in the databse
|GET          |/catalog/:name/:username          |        |    catalog-token  |     get product information via it’s username       |
|PUT          |/catalog/:name/:username|price=[double]&image=[string]&category=[string]
| catalog-token | update product information
DELETE|/catalog/:name/:username | |catalog-token | delete product




## Test catalog-service with curl

**Please, follow the step in the order otherwise you’ll potentially request empty object in the database**

**1 Add a new product in the database using the curl command-line HTTP client**

curl -X POST --data "name=kiwi&price=1.74&image=https://www.alimentarium.org/fr/system/files/thumbnails/image/alimentarium_kiwis.jpg&category=fruit" IP_ADDRESS:PORT_AUTH/catalog/admin

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/> 
> PORT_AUTH = the port on which the container is running<br/>

**2 get product information via it’s username using the curl command-line HTTP client**

curl -X GET IP_ADDRESS:PORT_AUTH/catalog/kiwi/admin

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/>
> PORT_AUTH = the port on which the container is running

**3 update product information using the curl command-line HTTP client**

curl -X PUT --data "price=2.74&image=https://www.alimentarium.org/fr/system/files/thumbnails/image/alimentarium_kiwis.jpg&category=fruit" IP_ADDRESS:PORT_AUTH/catalog/kiwi/admin

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/>
> PORT_AUTH = the port on which the container is running

remark : in this example, we’ve changed some field values<br/>

**4 Delete product using the curl command-line HTTP client**

curl -X DELETE IP_ADDRESS:PORT_AUTH/catalog/kiwi/admin

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/>
> PORT_AUTH = the port on which the container is running
