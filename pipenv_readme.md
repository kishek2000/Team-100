##Information on how to use pipenv

#Setup virtual environment,
Navigate to project root, then run:
pipenv install

#Start virtual environment:
pipenv shell

#Stop virtual environment:
exit

#To ensure dependencies are correct:
pipenv check

Approximate dependencies are contained in the Pipfile, while deterministic dependencies are in Pipfile.lock
To get started with pipenv, running "pipenv install" will create a virtual environment and install all required packages into it from the Pipfile.
Setup tutorial: https://www.youtube.com/watch?v=zDYL22QNiWk