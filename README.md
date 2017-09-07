# Fiffteen Puzzle

This classic puzzle game is a progressive web app built with EcmaScript2015 and supplemented with modern browser APIs and polyfills using browserify. The app UI is served from the back end over an express server. A custom node RESTful API uses MongoDB for the game score database and IndexedDB for offline support. Nodemailer is on the backend to handle form submission mailing.

A a board is generated at random and then the permutations of the tiles are calculated to determine if it is a configuration that can be completed. 

Game features include:

- full offline support
- timer and move counter
- leaderboards for both least moves and least time