# Car Shop Rest API simulation

## Developed by
- [@Rafaqfg](https://www.linkedin.com/in/rafaelqfg/)
## Description
- In this Back-End project I created a Rest API with CRUD for managing a car shop, using OOP and SOLID principles and MSC architecture, with MongoDB database.<br>
- User can Create, Read, Update and Delete cars and motorcycles registers in the Car Shop database, simulating transactions of sell and buy.
- The API have 100% of unit test coverage.

## Stack
Development: TypeScript, Node.js, Express, Docker, Mongoose, Zod and MongoDB. <br>
Test: Chai, Mocka and Sinon.
## How to run the application with Docker (you need have already docker-compose installed in your machine)<br>
Clone the repository
```bash
  git clone git@github.com:Rafaqfg/Car_Shop---Rest-API-simulation.git
```
Enter in the project folder
```bash
  cd Car_Shop---Rest-API-simulation-TypeScript
```
Install the dependencies
```bash
  npm install
```
Up the Docker containers using the compose file (door 27017 must be avaible)
```bash
  docker-compose up -d
```
Attach in the container terminal
```bash
   docker exec -it car_shop bash
```
Start the application (door 3001 must be avaible)
```bash
   npm run:dev
```
## To run the tests
### open another terminal
Run all unit tests
```bash
   npm run test:dev
```
Run coverage test
```bash
   npm run test:coverage
```
##

## Steps of development
| description | finished |
| :--------------------------: | :----- |
| Create the generic IModel interface  | :heavy_check_mark:
| Create the IVehicle	interface | :heavy_check_mark:
| Create the ICar interface from the IVehicle interface	| :heavy_check_mark:
| Create a route to the /cars endpoint where it is possible to register a new car	| :heavy_check_mark:
| Create a route to the /cars endpoint where you can list all registered cars	| :heavy_check_mark:
| Create a route to the /cars/id endpoint where it is possible to list a single car through its id	| :heavy_check_mark:
| Create a route to the /cars/id endpoint, where it is possible to update the registration of a car through its id	| :heavy_check_mark:
| Create a route to the /cars/id endpoint to delete a car's records	| :heavy_check_mark:
| Create the IMotorcicle interface from the IVehicle interface	| :heavy_check_mark:
| Create a route to the /motorcycles endpoint where it is possible to register a new motorcycle	| :heavy_check_mark:
| Create a route to the /motorcycles endpoint where you can list all registered motorcycles	| :heavy_check_mark:
| Create a route to the /motorcycles/id endpoint where it is possible to list a single motorcycle through its id	| :heavy_check_mark:
| Create a route to the /motorcycles/id endpoint where it is possible to update the registration of a motorcycle through its id	| :heavy_check_mark:
| Create a route to the /motorcycles/id endpoint to delete the records of a motorcycle	| :heavy_check_mark:
| Write tests to cover 100% of the Controller layer	| :heavy_check_mark:
| Write tests to cover 100% of the Service layer	| :heavy_check_mark:
| Write tests to cover 100% of the Model layer	| :heavy_check_mark:

## Gif of the application code
![](https://github.com/Rafaqfg/Car_Shop---Rest-API-simulation/blob/main/car_shop.gif)
