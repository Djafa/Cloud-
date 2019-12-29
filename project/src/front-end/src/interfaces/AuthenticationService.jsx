import axios from 'axios' // we use this library as HTTP client
import text from './data.js' // Relative path to your File
// you can overwrite the URI of the authentication microservice
// with this environment variable
const url = process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:3000'
const urlLog = 'http://192.168.56.102:7000'
var usr;


class AuthenticationService {
    // setters
    setHandlers (onSucc, setAuthStatus, changeRoute) {
        this.onSucc = onSucc
        this.setAuthStatus = setAuthStatus
        this.changeRoute = changeRoute
    }
    // POST /user
    // ${data} is a JSON object with the fields
    // username=[string] and [password]. These fields
    // matches the specification of the POST call
    registerUser (data, onErr) {
        usr = data.username;
        window.localStorage.setItem('username', JSON.stringify(data.username))
        axios.post(`${url}/user`, data) // Perform an HTTP POST rquest to a url with the provided data.
            .then((res) => {
                // we keep the authentication token
                window.localStorage.setItem('authToken', JSON.stringify(res.data.token))
                this.setAuthStatus(true)
                this.onSucc(`Successful registration of user [${data.username}]!`)
                this.changeRoute('/')
            })
            .catch((error) => {
                console.error(error.message)
                var msg = `Registration of user [${data.username}] failed.`
                onErr(`${msg} Error: ${error.msg}`)
            })
    }
    // GET /user/:username/:password
    loginUser (data, onErr) {
        window.localStorage.setItem('username', JSON.stringify(data.username))
        axios.get(`${url}/user/${data.username}/${data.password}`) // Perform an HTTP GET rquest to a url.
            .then((res) => {
                window.localStorage.setItem('authToken', JSON.stringify(res.data.token))
                this.setAuthStatus(true)
                this.onSucc(`Welcome back [${data.username}]!`)
                this.changeRoute('/')
                 
                var content;
                usr = data.username;
                console.log(usr)


                //on va utiliser axios pour faire un get avec la view map reduce qu'on a 
                axios.get(`http://192.168.56.102:7000/logs/${data.username}`)
                    .then((res) => {
                      content = res.data.token.logs;
                      //we use this snippet to create the pop up coming from the recommendation engine
                	if (confirm("Are you interested by this beautiful fruit" + " : " + content + " " + "?")) {
                        	//on lui propose le pop up
  				console.log("you pressed ok");
			} else {
                        	//on supprime le logs du moment

  				axios.delete(`http://192.168.56.102:7000/logs/${data.username}`)
				    .then((res) => {
				        console.log("element bien delete")
				     })
				     .catch((error) => {
					console.log("erreur dans le delete")
			    	     })
			} 
                     })
                     .catch((error) => {
                	console.log("nouveau user")
            	     })



                
            })
            .catch((error) => {
                console.error(error.message)
                onErr(`User [${data.username}] is not registered or his credentials are incorrect.`)
            })
    }
}

export default AuthenticationService
export {usr};
