# Ship Management
 Ship Management is an application to perform CRUD operation on ships.
 
 Download the source code. This code contains two projects
1) ShipManagement: This is the frontend site made in Angular language.
2) ShipManagementAPI: This project is created in Asp.Net Core Web API.
   

 ## Installation

Open the command prompt and navigate to the code location(where you have download the code).
There you will see a docker compose file.
In the command line run the following command.

 ```
docker-compose up
 ```
 
 Firstly, this will install nginx server and host the angular application.
 You can access the site using the following url:
 ```
 http://localhost:3000
 ```
Secondly, it will deploy the web api core application on the same server under the same network.
You can access the Rest API using the following URL:
```
http://localhost:5005
```

In case you are running the application locally without the docker, then the angular application will try to connect the api at http://localhost:5003. Make sure you run the api as well using th vs code or vs 2019.
