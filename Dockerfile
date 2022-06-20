#based on python3.9
FROM python:3.9
#put the project folder under code folder
ADD . /code/
WORKDIR /code/
RUN pip install -r requirements.txt
ENTRYPOINT python3 manage.py runserver 0.0.0.0:8000