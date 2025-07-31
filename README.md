# Smart Breakdown
Smart Breakdown is a responsive web app that breaks down euro amounts into the fewest possible coins and notes, always using the largest denominations first. It features a mode toggle for frontend or backend calculations and visually compares the result with the previous result

## Project Structure
#### frontend --> Angular project
#### backend --> Java EE project


## Frontend
### Build the frontend
cd frontend
npm install

### Run frontend
ng serve
The frontend will be served on http://localhost:4200/smartbreakdown

## Backend
### Build the backend and run wildfly server with maven
cd backend
mvn clean package wildfly:run
The backend will listen on http://localhost:8080/api

### OR build the project and deploy the war to your desired server
cd backend
mvn clean package
e.g. for wildfly:
cp target/SmartChangeBackend.war <wildfly_directory_path>/standalone/deployments