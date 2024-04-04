[readme file.pdf](https://github.com/smritizz/cricbuzz/files/14875763/readme.file.pdf)
Create an API that supports requirements mentioned in the problem statement
TechStack: Node.js, Express, MongoDB
Assumptions:
1. All the ID’s that are passed as req.params are the object Id automatically created by database, and not created exclusively in the schema
2. To get players stats in the 7th endpoint, I have added some players data in the database which was not taken through any POST request or json file.
Env credentials:
NODE_ENV=
DATABASE_LOCAL=
JWT_SECRET=
JWT_EXPIRES_IN=

How to setup:
1.	Download the zip file
2.	Open the VS Code and run command “npm init” 
3.	A package.json file will be created. Fill the necessary details in the terminal and the file will be created.
4.	Install the necessary dependencies used in the project by running the command “npm i nodemon express mongoose bcryptjs jsonwebtoken validator dotenv”
5.	Node_modules folder will be created.
6.	Create config.env file and enter the env credentials in it to successfully run it.
7.	Now project will successfully run by hitting command “nodemon app.js”
8.	Now you can go to the postman to test API endpoints
9.	I have attached below all the demo of all the routes and endpoints.

ENDPOINTS 

1. Register Admin 
Endpoint for registering a user
[POST] /api/admin/signup.
# SignUp successfully done (admin account created)   RESPONSE TIME: 709ms
![image](https://github.com/smritizz/cricbuzz/assets/93935378/150000a6-f556-4fb4-b5c2-5d1c20bfb28a)

 

# DATABASE after registering admin    
![image](https://github.com/smritizz/cricbuzz/assets/93935378/7e423156-8b5a-4874-b6a2-715900e89699)

 

2. Login User
Endpoint for logging in a user
[POST] /api/admin/login.
# Login Failed (enetered wrong password)   RESPONSE TIME: 612ms
![image](https://github.com/smritizz/cricbuzz/assets/93935378/688db436-db2b-4964-929a-67cd1eec3393)

 
# Login Successful (with correct password and username) RESPONSE TIME: 940ms

    

3. create match
Endpoint for admins to create match
[POST] /api/matches
Works only when authorization token is added to headers
# Unauthorized (when authorization token is not added in headers along with the req.body)
RESPONSE TIME: 9ms

 

# Authorized and match is created (when authorization token is added in headers along with the req.body)  RESPONSE TIME: 45ms

  

4. Get match schedules
Guest users can also fetch match details, so no authorization needed
[GET] /api/matches
# Match details fetched successfully by Get request  RESPONSE TIME: 7ms


 
5. Get match Details by match_id
Guest users can also fetch match details of a particular match by match_id (No authorization token needed)      [GET] /api/matches/{match_id}
# Match details of a particular match by passing matchId in params fetched successfully by Get request       RESPONSE TIME: 97ms

 
 

6. Add player to the team squad
Endpoint for the admin to add a player to the team’s squad.
      [POST] /api/teams/{team_id}/squad
Works only when authorization token is added to headers
# Unauthorized (when authorization token is not added in the headers)

 
# Authorized and player is added to the team whose id is passed in params(when authorization token is added in headers along with the req.body)

 
Database after adding player:

 
7. Get Player’s Stats
Endpoint for admin to see players stats by entering players id (Assuming some players data is already present in the database)
      [POST] /api/players/{player_id}/squad
Works only when authorization token is added to headers
# Unauthorized (when authorization token is not added in the headers)
 RESPONSE TIME: 709ms
 
 

# Authorized and player’s stats is fetched(when authorization token is added in headers)

 

DATABASE:

 

 

 









