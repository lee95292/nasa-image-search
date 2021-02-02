#!/bin/bash

sudo rm -rf /var/www/html/nis/*
sudo npm run build  && sudo cp -r /home/ubuntu/nasa-image-searh/build/* /var/www/html/nis