#!/bin/bash
apt-get update && apt-get install -y unixodbc-dev
pip install -r requirements.txt