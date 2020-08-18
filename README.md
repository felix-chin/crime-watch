# **Crime-Watch**
A mobile application for people who want to monitor crime activity. Crime-Watch utilizes data from two public APIs to create a full-stack application that allows users to monitor crime rates in major cities. The two APIs used during the project consisted of *Crimeometer* and *Google Maps API*.

## Live Demo: <a href="http://crimewatch.danielvargas.tech/" target="_blank">Crime-Watch</a>
![Live Demo](/server/public/images/preview.gif)

## Current Feature List:
* User can view single incident crime details
* User can set a default location
* User can search crime rates by location
* User can view crime incidents plotted on a map
* User can view overall crime statistics for a location
* User can click on an incident on the map to view details of that incident
* User can view crime details for a specific crime statistic
* User can view a heatmap
* User can compare overall crime statistics for two locations
* User can login to an account
* User can bookmark an incident
* User can view search history
* User can view profile page

## Planned Additions:
* User can filter for different types of crimes on a map
* User can receive notifications when a new crime has been reported nearby
* User can follow other user
* User can report a crime

## Takeaways From this Project:
Throughout the development of **Crime-Watch**, I was able to takeaway a great deal of knowledge and information. While working on **Crime-Watch**, I sharpened my full-stack skills by working with *React.js*, *Node.js*, *Express*, and *PostgreSQL*. Utilizing the *Agile Methodology*, myself, and two other developers worked efficiently together in order to complete a Minimum Viable Product within our two week period. One of the many challenges overcome throughout the development of this project was creating a dynamically rendering map with each new search made by a user. This was made possible by implementing a geocoder into the input field within the search. Once the search was submitted, coordinates of that city were saved and set to the state of entire app. This allowed for the coordinates to be passed into the map feature as a prop, and ultimately implemented as the center of the map at it's initialization. Overall, **Crime-Watch** tested my ability to create a functioning Full-Stack application and has greatly strengthened my skills as a Software Engineer.
