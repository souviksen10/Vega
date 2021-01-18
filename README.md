# Vega

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)]()

This is a web application for a vehicle dealer called Vega. If someone wants to sell his car then he needs to call Vega and ask them to register his car in their database. Other people who are buyers can browse the vehicles in their database. If they are interested in a vehicle they will call Vega and talk to someone on the phone and rest of the process happens offline.

In the home page we can see all the vehicles present in the database. We can filter and sort vehicles. If there are more than 10 vehicles they are displayed in pages. We can click a vehicle to see its’ details. There is also a page to add a new vehicle to the database.
#### Authorization
There are two roles:
* **Moderator**: They are Vega personnel who talk to sellers and buyers on the phone. They can create update and delete vehicles in the database.
* **Admin**: Anyone in this role has additional privileges. They can view reports of vehicle sales by their makes(like BMW,AUDI etc) in a pie chart. 
Anyone who has not logged in can only browse through the vehicles.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

The following must be installed in your computer
* Node.js
* Angular CLI 10 or above
* .NET Core 3.1 Runtime 
* Entity Framework Core .NET Command-line Tools

### To run the project

First of all set your *db connection string* in **appsettings.json**, then follow the steps below:

```
$ npm install
$ dotnet restore
$ dotnet ef database update
$ dotnet watch run 

```

## Technologies
* C#
* ASP.NET Core 3.1
* Entity Framework Core 3.1.9
* TypeScript 4.0.3
* Angular 10
* Bootstrap 4
* SQL Server 2016
* Authentication and Authorization using Auth0 and JWTs
* [AutoMapper](http://automapper.org/) - For mapping
* [ngx-toastr](https://www.npmjs.com/package/ngx-toastr) - For growl-style alerts and messages
* [raven-js](https://www.npmjs.com/package/raven-js) - For automatically reporting uncaught JavaScript exceptions triggered from a browser and sending them to Sentry
* [Font-Awesome](https://fontawesome.com/) - For pictographic icons
* [Auth0 Angular SDK](https://www.npmjs.com/package/@auth0/auth0-angular) - For integrating Auth0 into the Angular application

