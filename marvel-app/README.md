Hi Team welcome back to my Repo! 

Project Title: Marvel App

Technologies/Languages used to Create this project: 

For the Backend - Python - for the server endpoints , MySQL -to store character data. 

For the Frontend - React + Vite, JavaScript (JSX), HTML and CSS for styling. 


I developed this project to create a responsve frontend interface where users can access a database full of information on marvel characters from the mutiverse or create a character of their choosing to defend earth! 

During this process I learned how to intergate the concepts of creating a React project using vite, handling events in react, working with input from forms, and integrating react-bootstrap to style the app and ensure that it is responsive on different screen sizes. 

As mentioned above, one of the features of this project is the ability to create your own character! It can be a hero or villian, you can name them whatever you like, decide the powers and capabilities they will have and provide an image to represent how you would like the character to look!




How to Install and Run the Project: 

1. Clone the Repo - on github using the green "code" select the dropdown menu and clone the repo either by downloading it as a zip file or copying the url and using the "git clone" command in the CLI. 
    

2. Once you have successfully cloned the repo you can "cd" into the project's repository and install the required dependencies. With your terminal open, first cd into the backend folder
Create a new virtual environment for your flask server: python3 -m venv venv
Activate the virtual environment: source venv/bin/activate
run pip install -r requirements.txt to install the neccessary dependencies for the backend server. 

3. In the server.py updated this line with your actual MySQL password 'mysql+mysqlconnector://root:YOUR_PASSWORD@localhost/marvel'

4. In your terminal run this command 'python server.py' to create the database and start Flask, you should see it running at 'http://127.0.0.1:5000/characters' if you see JSON its running successfully. 

5. Populate the Database: Open MySQL Workbench and log in to your local MySQL server.

Open marvel_characters.sql (located in the backend folder).

Make sure the marvel database exists (created by running server.py).

Set the marvel schema as default (right-click > Set as Default Schema).

Run the contents of marvel_characters.sql to populate the characters table.

6. Navigate to the frontend 'cd marvel-app'
    Install the dependencies 'npm i'
    Next the command 'npm run dev' will run the app at your  http://localhost:


Clone, Download & Enjoy! 
    
    


