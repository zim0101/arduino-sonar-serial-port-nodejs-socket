#Config and find your port:

--------------------------
ls /dev/cu.*
--------------------------
and then,
--------------------------
cat < port name >
--------------------------
After giving the port name with the cat command you will get the data from the machine. Any machine which follow serial communication I guess.

# clone this repo and make sure your node version is v10, mine was... and then run:
---------------------------
npm install
---------------------------

#Config port in your application(this application) :
arduino-sonar-serial-port-nodejs-socket ---> port-config ---> config.js

# Run your app: 
---------------------------
npm start
---------------------------