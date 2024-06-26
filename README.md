# Restaurant Reservation System

## Live Links

You can find the deployed backend [here](https://restaurantreservationsystem-backend.onrender.com)
and the deployed frontend [here](https://restaurantreservationsystem-frontend.onrender.com).


## About

I created a restaurant reservation system for my final capstone at my Chegg Skills Engineering program.

The project required the following technologies:

- React for the client
- Node.js and Express for the API
- PostgreSQL for the database

From the assignment,

> "You have been hired as a full stack developer at Periodic Tables, a startup that is creating a reservation system for fine dining restaurants.
> The software is used only by restaurant personnel when a customer calls to request a reservation.
> At this point, the customers will not access the system online."

Chegg skills gave user stories to inform what functions the user would need such as listing reservations, creating reservations, creating tables, assigning reservations to tables, updating the status of a reservation and table once its assigned.

This is a monorepo. You can find the original assignment here [Thinkful-Ed/starter-restaurant-reservation](https://github.com/Thinkful-Ed/starter-restaurant-reservation).

## Client Descriptions

### Dashboard

The Dashboard page displays all reservations for a given date and all tables. Each reservation has an option to seat, edit or, cancel the reservation. Each table displays the capacity and status. If the table is occupied, it also displays the reservation_id and a button to clear the table once its done.

<img width="1207" alt="image" src="https://github.com/clarisse-fong/restaurantReservationSystem/assets/52180173/af8d90ab-80ec-4299-bd15-bebea1e6449b">



### New Reservation

The New Reservation page allows you to create a new reservation by providing a first name, last name, mobile number, date of reservation, time of reservation, and number of people in the party.

<img width="342" alt="image" src="https://github.com/clarisse-fong/restaurantReservationSystem/assets/52180173/dc791692-6eb4-41bd-8157-8d12a2b79bfc">



### New Table Page

The New Table page allows you to add a new table to the restaurant by providing a table name and table capacity.

<img width="321" alt="image" src="https://github.com/clarisse-fong/restaurantReservationSystem/assets/52180173/c5fd414f-26b5-4e06-b49c-53ae965ada06">


### Edit Reservation

The Edit Reservation page allows you to edit the reservation you selected.

<img width="333" alt="image" src="https://github.com/clarisse-fong/restaurantReservationSystem/assets/52180173/d561ea41-3df2-4187-a983-08c988bb7c8d">


### Seat Reservation

The Seat Reservation page allows you to assign the reservation you selected to a particular table.

<img width="693" alt="image" src="https://github.com/clarisse-fong/restaurantReservationSystem/assets/52180173/dc3eed26-97aa-480c-84ed-696dce0f9834">




### Search

The Search page allows you to search for a reservation by a partial or completey mobile number.

<img width="1293" alt="image" src="https://github.com/clarisse-fong/restaurantReservationSystem/assets/52180173/eca3d183-6ab9-465b-9abe-8feba1ba46d6">





# API

| Request | Path                                   | Description                                                                                     |
| ------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| POST    | /reservations                          | Create a new reservation                                                                        |
| GET     | /reservations/:reservation_id          | Read a reservation by a reservation_id                                                          |
| PUT     | /reservations/:reservation_id          | Update a reservation by a reservation_id                                                        |
| PUT     | /reservations/:reservation_id/status   | Update a reservation status by a reserervation_id                                               |
| GET     | /reservations?mobile_number=XXXXXXXXXX | List all reservation that contain the partial or complete phone number entered, ordered by date |
| GET     | /reservations?date=XXXX-XX-XX          | List all reservations for a given date ordered by date                                          |
| GET     | /tables                                | List all tables                                                                                 |
| POST    | /tables                                | Create a new table                                                                              |
| PUT     | /tables/:table_id/seat                 | Update the table with a reservation                                                             |
| DELETE  | /tables/:table_id/seat                 | Delete a reservation from a table                                                               |

# Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5005`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.
