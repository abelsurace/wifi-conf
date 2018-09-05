# Wifi-conf Mongoose OS app

## Overview

Mongoose OS ESP-32 Wi-Fi configuration project allows the user to set WiFi ssid name and password from a web page served from
the ESP32 itself. Initially the user will have to connect to the ESP32 in Access Point mode SSID= Mongoose_?????? PWD= Mongoose IP: 192.168.4.1, then ESP32 scans the available WiFi connections and display them in a drop down menu, a separate box allows the user to enter the password, once is set up this values are saved within the ESP32 config and ESP32 is rebooted allowing further connections through the same WiFi network. The application will allow renewing credentials in case the user wants to connect through a different Wi-Fi network if the client wishes to do so, or in case the previous selected network is no longer available. ESP32 will remain in access point mode and Station mode simultaneously.

## How to install this app

- Install and start [mos tool](https://mongoose-os.com/software.html)
- Switch to the Project page, find and import this app, build and flash it:

<p align="center">
  <img src="https://mongoose-os.com/images/app1.gif" width="75%">
</p>
