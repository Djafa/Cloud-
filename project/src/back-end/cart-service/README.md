
# MicroService : catalog-service

The catalog microservice (catalog-service) exposes a REST API over HTTP. It stores information on a couch db regarding the history of every purchase of every client of the website

**Our rest API for this microservice**

| Methode               |Ressource Name(URN)                          |Required parameters|Output|Description                          |
|----------------|-------------------------------|-----------------------------|------------|---------|
|POST|/cart        |username=[string]&products=[double]&totalItems=[int]&totalAmount=[double]&category=[string]       |    cart-token     |  Add a new cart in the databse related to a client
|GET          |/cart/:username           |        |    cart-token  |     get cart information via it’s usernameusername       |
|PUT          |/cart/:username|products=[string]&totalItems=[int]&totalAmount=[double]&category=[string]| cart-token | update cart information of a client
DELETE|/cart/:username | |cart-token | delete cart




## Test cart-service with curl

**Please, follow the step in the order otherwise you’ll potentially request empty object in the database**

**1 Add a new product in the database using the curl command-line HTTP client**

curl -X POST --data "username=kevin&products=pomme&totalItems=4&totalAmount=6,78&category=fruit"  IP_ADDRESS:PORT_AUTH/cart

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/> 
> PORT_AUTH = the port on which the container is running<br/>

**2 get product information via it’s username using the curl command-line HTTP client**

curl -X GET IP_ADDRESS:PORT_AUTH/cart/kevin

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/>
> PORT_AUTH = the port on which the container is running

**3 update product information using the curl command-line HTTP client**

curl -X PUT --data "products=pomme&totalItems=5&totalAmount=7,78&category=fruit" IP_ADDRESS:PORT_AUTH/cart/kevin

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/>
> PORT_AUTH = the port on which the container is running

remark : in this example, we’ve changed the value of the field ‘orders’ from pomme to kiwi<br/>

**4 Delete product using the curl command-line HTTP client**

curl -X DELETE IP_ADDRESS:PORT_AUTH/cart/kevin

**/!\ REPLACE** 
>IP_ADDRESS = the ip address of the machine running the container<br/>
> PORT_AUTH = the port on which the container is running
