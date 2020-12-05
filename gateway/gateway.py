import sys
sys.path.append("..")
import random
from natufia.sensor.sensor import *
import json
import requests
import time
###########################################################################

TEMPERATURE = "temperature"
DOOR_OPEN = "doorOpen"

#This method is responsible of forwarding the data
#to the API
def forwardData():
    url = "localhost:8080/"
    headers = {
        "Content-Type": "application/json"
    }

    DEVICE_ID = random.randint(1,5) #making a random ID
    temperature = getTemperature()
    isDoorOpen = doorOpen()
    isInRange = isOutside(temperature)
    timestamp = getTimestamp()

    typeList = [TEMPERATURE,DOOR_OPEN]
    tempOrDoor = random.choice(typeList) #choosing between temperature and door open

    if(tempOrDoor == TEMPERATURE):    
        data = json.dumps({
        "ID": DEVICE_ID,
        "type": TEMPERATURE,
        "value": str(temperature),
        "alert": str(isInRange),
        "timestamp": str(timestamp)
        })
        print("\n",data,"\n")
        # response = requests.post(url, data=data, headers=headers)
        # print(response.text)
    elif(tempOrDoor == DOOR_OPEN):
        data = json.dumps({
            "ID": DEVICE_ID,
            "type": DOOR_OPEN,
            "value": str(isDoorOpen),
            "alert": str(False),
            "timestamp": str(timestamp)
        })
        print("\n",data,"\n")
        # response = requests.post(url, data=data, headers=headers)
        # print(response.text)

###########################################################################
#This is the main loop that spin
#the gateway to generate data to 
#the frontend every 300sec
def main():
    while True:
        forwardData()
        time.sleep(30)
main()