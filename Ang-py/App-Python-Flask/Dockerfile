FROM python:3.6

WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app/requirements.txt

RUN pip install -r requirements.txt

COPY . /usr/src/app

#ENTRYPOINT [ "python" ]
EXPOSE 5001
CMD ["python", "run.py" ] 
#CMD ["py", "run" ]  