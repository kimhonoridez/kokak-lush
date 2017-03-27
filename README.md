# Kokak Lush
### A system designed to create a harmonious relationship between pond admins and frogs.

### Overview
Pond Admins can manage ponds and the frogs in them.
Frogs can mate in their selected ponds and develop their eggs into full grown adult frogs.

### Environment Setup
#### Pre-requisites
1. [Node JS](https://nodejs.org/en/download/)
2. [Grunt CLI](https://gruntjs.com/getting-started#installing-the-cli)
3. [GIT](https://git-scm.com/downloads)
5. [Bower CLI](https://bower.io/#install-bower)
6. [PostgreSQL](https://www.postgresql.org/download/)
7. [PG Admin](https://www.pgadmin.org/download/)

#### Setting-up the Database
By now, PostgreSQL and PG Admin should already be installed. Below steps will help you to setup the database:
1. Using PG Admin, create a new database called __*mypond*__.
2. Right click on the newly created database and select __*Restore*__.
3. Input the following into the shown Restore dialog
```
  Format: Custom or tar
  Filename: Locate the sql dump in app\src\backend\sql\mypond
  Rolename: Postgres
```
4. Click *Restore* button.
5. Check if tables are created.

#### Setting-up the Application
1. Using command prompt, make sure you are currently pointing to the Kokak Lush main folder which contains the *package.json*.
2. Input command `npm install`.
3. Input command `bower install`.

#### Running the Backend
1. Using command prompt, go to the following path: `app/src/backend/service/DB.svc.js`.
2. Update the DB Connection URL in *line 5* using the format: `postgres://{username}:{password}@localhost/mypond`
3. Go back to *backend* folder.
4. Input command `node Backend.main.js`.

#### Building the Frontend
1. Using command prompt, go to Kokak Lush main folder.
2. Create a new folder called *nwjs*.
3. Download current [NWJS.io normal version](https://nwjs.io/).
4. Extract the zip file and copy the contents to the created *nwjs* folder.
5. From the main folder, input command `grunt build-dev`.
6. A **_dist_** folder should be automatically created.

#### Running the Frontend Application
1. Go to *dist* folder.
2. Make sure backend application is running at *localhost:3000*.
3. Double click **_nw.exe_**.
4. By default, Kokak Lush - Admin Mode is launched.

#### Running Admin and Frog Modes at the same time
Kokak Lush frontend has 2 modes: **admin mode** and **frog mode**. To run both modes at the same time, just follow the following simple steps:
