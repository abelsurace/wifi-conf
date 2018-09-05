# Wifi-conf Mongoose OS app

## Overview

Mongoose os ESP-32 wifi configuraton project allows the user to set wiffi ssid name and password from a webpage served from
the ESP32 itself. Initially the user will have to connect to the ESP32 in Acces Point mode, it scans the available wiffi conections and display them in a drop down menu, a separate box allows the user to enter the password, once is setup this values are saved within the ESP32 allowing further conections through the same wiffi network. The application will allow to renew credentials in case the user wants to connect through a different wifi network if the client wishes to do
so, or in case the previous selected network is no longer available.

## How to install this app

- Install and start [mos tool](https://mongoose-os.com/software.html)
- Switch to the Project page, find and import this app, build and flash it:

<p align="center">
  <img src="https://mongoose-os.com/images/app1.gif" width="75%">
</p>
