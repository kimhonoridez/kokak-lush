# Kokak Lush
### A system designed to create a harmonious relationship between pond admins and frogs.

### Overview
Pond Admins can manage ponds and the frogs in them.
Frogs can mate in their selected ponds and develop their eggs into full grown adult frogs.

### Techology Used
I wanted to separate frontend and backend development because to me both worlds have their own rightful strengths.

At frontend, Angular JS + Kendo UI is preferred. Angular JS supports single page application, secured and lightweight, has easy state management, and promotes modularity of codes through its MVC & MVVM Design Patterns. Since the application is mainly using Grids for it's display, I decided to use Kendo UI on top of Angular JS.

For the backend side, I wanted to challenge myself in using Express JS + PostgreSQL for my RESTful services instead of my comfort zone - Java + Spring + Hibernate.

To manage external libraries, I used NPM and Bower.
To streamline building of the application, I created a grunt task.

### Testing
Supposedly, I was about to use Karma + Jasmine but because it's already long overdue so I was not able to integrate.

### Other Highlights
Previously, I created an authorization frontend framework which I have partly applied to this application. For more details, please visit and download [Kahayag](https://github.com/kimhonoridez/kahayag).

-------

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
  Rolename: postgres
```
4. Click *Restore* button.
5. Check if tables are created.
6. Using command prompt, go to the following path: `app/src/backend/service/DB.svc.js`.
7. Update the DB Connection URL in *line 5* using the format: `postgres://{username}:{password}@localhost/mypond`

#### Setting-up the Application
1. Using command prompt, make sure you are currently pointing to the Kokak Lush main folder which contains the *package.json*.
2. Input command `npm install`.
3. Input command `bower install`.

#### Running the Backend
1. Using command prompt, go to the following path: `app/src/backend`.
2. Input command `node Backend.main.js`.

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
1. Copy *dist* folder and rename it as *dist_frog*.
2. Open the following file in a text editor: *dist_frog/app/src/pondManagementSystem.config.js*.
3. In *line 32*, set the following value: `$rootScope.CURRENT_USER_TYPE = USER_TYPE.FROG;`.
> **NOTE: ** For Admin mode, this value is *$rootScope.CURRENT_USER_TYPE = USER_TYPE.ADMIN*;
4. Go back to *dist_frog* folder and open *package.json* in a text editor.
5. Update name to **_my-pond-frog_**.
6. Double click **_nw.exe_** to run in **FROG MODE**.
5. Go back to *dist* folder and double click **_nw.exe_** to run in **ADMIN MODE**.

#### Known Issues
Known Issues are listed down in the [Issues](https://github.com/kimhonoridez/kokak-lush/issues) section.
