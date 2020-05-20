#!/bin/bash

docker pull omerico/dressit:latest
docker stop dressit
docker rm dressit
docker rmi omerico/dressit:latest
docker tag omerico/dressit:latest omerico/dressit:current
docker run -d --name dressit omerico/dressit:latest
