# Steps to create server with sequelize sql database

- Define models
    - ex: book and author
    - create models.js (to write relations between model and export all models from one file)
- create database.js file 
- create index.js

### Migration steps
1. initialise migration
    ```
    npx sequelize-cli init
    ```
2. create migration file using
    ```
    npx sequelize-cli migration:generate --name <name>
    ```
3. specify modification in the file 
4. run followinf cmd to apply migration
    ```
    npx sequelize-cli db:migrate
    ```