#!/bin/sh
node ./API/index.js &

cd ./Server
java -Xms1G -Xmx1G -jar paper.jar