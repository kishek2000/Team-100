----RUN GUIDE---

Once all your dependencies are installed, you can run the following commands

Running the frontend:
    1) Navigate to SourceCode_and_Documentation/frontend
    2) Run command "npm start"

    If you get errors, you may be missing npm, node or react-scripts, and will need to install them.

Running the backend:
    1) Navigate to SourceCode_and_Documentation/backend
    2) Run command "python manage.py runserver"
    2b) Alternatively, if you wish to use a virtual environment, after installing and setting up pipenv, you may do "pipenv run python manage.py runserver"

    If you get any errors, you are likely missing modules, and will need to install them with either pip or pipenv.

Tips:
It may be helpful to open two seperate terminals, as you will need to run both the backend and the frontend simultaneously to have a functioning webapp. This can be done easily in vscode.

Once everything is functional, the frontend is accessible from localhost:3000 and the backend from localhost:8000