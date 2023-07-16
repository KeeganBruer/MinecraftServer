FROM ubuntu:22.04

RUN apt update
RUN apt install git openjdk-17-jre-headless -y
RUN apt install nodejs npm -y

COPY ./Server ./Server
COPY ./API ./API

COPY ./start.sh ./start.sh
RUN chmod +x start.sh

CMD ["./start.sh"]
