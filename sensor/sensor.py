import random
import time
import datetime
###########################################################################

_MAX_TEMPERATURE = 15.00
_MIN_TEMPERATURE = -20.00

#return a random temperature float 
#with only two decimal places
def getTemperature():
    return round(random.uniform(-25.0,30.0), 2)

#responsible of alerting the clint if the
#temperature is out of the normal range
def isOutside(temperature):
    isOutside = True

    if(_MIN_TEMPERATURE >= temperature or _MAX_TEMPERATURE <= temperature):
        return isOutside
    elif(_MIN_TEMPERATURE < temperature or _MAX_TEMPERATURE > temperature):
        return not isOutside
############################################################################
#return a random boolean of door open
def doorOpen():
    return bool(random.getrandbits(1))
############################################################################
def getTimestamp():
    return time.time()