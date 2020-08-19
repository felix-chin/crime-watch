# crime-watch

A full stack mobile application for people who want to view and monitor crime activity.

## Live Demo

Link to a live demo of the application: 

https://crime-watch.felixchin.com

Best viewed in iPhone 6/7/8.

## Technologies Used

- React.js
- Node.js
- PostgreSQL
- Express
- Webpack 4
- Babel
- Bootstrap 4
- HTML5
- CSS3
- AWS EC2

## Features

- User can search for crime rates by city.
- User can view crime incidents plotted on a map.
- User can view a crime heatmap.
- User can compare crime rates between two cities.
- User can view a list of crime incidents organized by crime type.
- User can view a detailed description of a crime incident.
- User can bookmark specific crime incidents.
- User can view a list of searches saved to a search history page.

## Preview

![crime-watch](./demo.gif "Demo")

## Development

### System Requirements

- Node.js
- PostgreSQL
- npm

### Getting Started

1. Clone the repo:
    ```shell
    git clone https://github.com/felix-chin/crime-watch
    cd crime-watch
    ```
2. Install npm dependencies:
    ```shell
    npm install
    ```
3. Start PostgreSQL:

   Command if using Linux:
    ```shell
    sudo service postgresql start
    ```
4. Import the example database:
    ```shell
    npm run db:import
    ```
5. Run webpack script to start the application:
    ```shell
    npm run dev
    ```
6. Visit http://localhost:3000 in your browser to view the application.
