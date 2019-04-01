# arduino-sonar-serial-port-nodejs-socket

first of all, check that port is really giving something:

----------------
cat < port >
----------------
in linux for arduino the default port is /dev/ttyACM0, 
   cat /dev/ttyACM0

1. clone the repo:
---------------------------

git clone git@github.com:zim0101/arduino-sonar-serial-port-nodejs-socket.git

---------------------------
2. check node version with this command:
---------------------------
node -v
---------------------------

   
---------------------------
    node version should be v10.15.3, if not then use:
    nvm install v10.15.3
---------------------------
3. npm install

4. Config port and baudrate:
    a) go to arduino-app ->port-config -> config.js, change port and baudrate as your need.

5. start application with: 
---------------------------
npm start
---------------------------

   this will start your app here: "http://localhost:3006"
