# LINGI2145-Project1 : MicroServices

As part of this project, we were asked to take on the role of a back-end development team for a fruit and vegetable online ordering website. This site contains the basic elements of client authentication with username and password. A customer can then place products in his basket to finally make the actual order. We must take into account the fact that Admins will have to maintain this site, so it is essential at our level to distinguish between a normal user and an admin who is trying to make changes to the website. We first worked on virtual machines locally within our company and then deployed our work on the Microsoft Azure platform

There you can see our general code structure :

| ── Project << containing our project files  
| ── tutorials << contains the tutorials that we've used to set up Vm's etc.

**Instructions :** 
Deploy project (local) :

1.  Before starting you need to create a swarm and a network called scapp-fe.
    
2.  Then clone our Github repository on your VM
    
3.  Go to the folder LINGI2145-2019-2020/project/src
    
4.  Deploy the stack using the command:  
    docker stack deploy -c scapp.yml scapp
    
5.  This command will download all the docker images from our Dockerhub and run them with the right parameters.

In case of problem: We have created a script that can do all the previous commands for you. To run it, simply write ./deploy.sh in the current folder.

From now on, all services are running.

(See more detailed instructions in the report)

**Contributors :** 
MARINI Samir,
SALEY ABDOU Djafarouu
