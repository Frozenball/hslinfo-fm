# HSL Infoscreen for Nexus 7 tablets

This is a small application that shows the HSL bus time info on my Nexus 7 tablet.
This probably should be migrated to Angular or something.

![Image of info screen](https://i.imgur.com/OfnCdOE.jpg)

## Installing

````
$ git clone https://github.com/Frozenball/hslinfo.git
$ mkvirtualenv hslinfo
$ pip install -r requirements.txt
````

## Running

````
$ export HSL_USERNAME='bla'
$ export HSL_PASSWORD='bla'
$ python hslinfo.py
````
