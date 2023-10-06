# ASYNC SUDOKU ADDER 

Simple set of asyncrounous functions that retreives generated sudoku data, logs into my API and make a post to add a Sudoku x times, every y seconds.

# Installation

1. Copy the repo and install it.

```bash

npm install

```

2. Set the number of iterations and the amount of time in ms localted in the start() function in app.js.

3. Modify the URLS accordingly, and create a .env with an EMAIL and a PASSWORD for the API login.

4. Run the application and enjoy auto sudoku generation:

```bash

node app.js

```
