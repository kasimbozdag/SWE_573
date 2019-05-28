Now we going to start to explain steps necessary for deploying our system.

1.	Secure a server

We used a Google cloud compute engine to create a virtual machine. The machine’s OS is Debian GNU/Linux 9 (stretch), it has core vCPU, 3.75 GB memory and 10 GB storage capacity. The system should work on any server with any operating system that supports python.

2.	Clone git repo

Install git if it is not installed already. Run the fallowing codes:
git clone https://github.com/kasimbozdag/SWE_573.git 
cd SWE_573/

3.	Setting database environment variables.

Assuming you have a postgresql database setup, you have set the database configuration to the environment as variable so that API can reach the database. Follow these steps to set environment variables.
$ touch ~/.bash_proflle
$ vi ~/.bash_proflle

add following content to the document change the necessary arguments
export POSTGRES_HOST="localhost"
export POSTGRES_PORT="0000"
export POSTGRES_DB_NAME='database_name'
export POSTGRES_USERNAME="username"
export POSTGRES_PASSWORD="*******"

save the file and exit then run
$ source ~/.bash_profile

now your environment variables are set.



4.	Deploy the API

The API was develop using python 3.7 and was deploy with python 3.5.3 it should work with 3.5.*, 3.6.* and 3.7. when you’re in project main folder(SWE_573) run the following command codes to deploy the API. We will assume you want to run the API as a background service so it does not stop when you close the terminal.

$ cd API
$ python manage.py migrate
$ python -m venv Swe_venv
$ source Swe_venv/bin/activate
$ pip install -r requirement.txt
$ mkdir /var/log/apis/swe.live.log
$ python manage.py 0.0.0.0:8000 --settings=API.settings.dev &>> /var/log/apis/swe.live.log &

now you’re API is running in background and it can be accessed from 8000 port of the server from outside. You have to open the port from firewall settings to allow access.  

5.	Deploy the UI

Before starting to deploy the UI you need change API configuration in the ReactJs.
Go to project folder (SWE_573)
$ cd frontend
$ vi src/redux/services.js

change line 3 API_URL should be equal to API uri there is a “/” at end of the uri. Save and exit

$ vi src/redux/configureStore.js

change line 19 API_URL should be equal to API uri there is not a “/” at end of the uri. Save and exit
Now you can build the ReactJs project.

$ npm run build

this will create a build folder now you can move the contents of this folder to anywhere you can serve a static html file.

I served on the same server so I did the following

$ cp -r build/* /var/www/html

This allowed my apache server to serve the project.
