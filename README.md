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
By now, the PostgreSQL and PG Admin are already installed. Below steps will help you to setup the database:
1. Using PG Admin, create a new database called __*mypond*__.
2. Right click on the newly created database and select __*Restore*__.
3. Input the following into the shown Restore diaglog:
  - Format: Custom or tar
  - Filename: *Locate the sql dump in app\src\backend\sql\mypond*
4. Test

- Forgot password
- Only 1 session is supported
- No backend pagination yet
- Should have used error codes to get/display error messages
- Should have implemented relationships between tables
- should have audit tables
