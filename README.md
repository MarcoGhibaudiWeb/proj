CRUD SPA built with a Laravel API and react modules for the UI

## Requirements
>php 7.4
>mysql

## Setup
>Open project directory in system or editor terminal 
>start mysql server -> $ mysql -u YOUR-USERNAME -p 
>Input password for the server when prompted
>$ CREATE DATABASE laravel_project;
>In new terminal -> $ cd proj-main
>Run migrations >> $ php artisan migrate
--If the project fails to connect to the mysql database, be sure to have the right credentials in .env file, default is USERNAME = user PASSWORD = password 
>Run seeders ->$ php artisan db:seed
>Start Project >> $ php artisan serve

>Navigate to newly opened localhost

## Functionalities
>Table with lists of jobs
>> head row displays summary, description, property name, status and name of the author
>> clicking on the head row opens tab to edit or delete job
>> update form validates input fields for their maxlenghts, if no value is submitted, the form will take the default values stored in db.

>New job form
>>Validation : max length and no empty fields
>>Status is stored as open by default


