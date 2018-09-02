load('api_config.js');
load('api_events.js');
load('api_gpio.js');
load('api_sys.js');
load('api_timer.js');
load('api_wifi.js');
load("api_rpc.js");
load('api_mqtt.js');

let l1 = 19;
let l2 = 21;
let l3 = 22;
let l4 = 23;

let getInfo = function() {
  return JSON.stringify({
    total_ram: Sys.total_ram(),
    free_ram: Sys.free_ram()
    //fi_status: Sys.wifi_status()
  });
};

// initialize GPIO
GPIO.set_mode(l1, GPIO.MODE_OUTPUT);
GPIO.set_mode(l2, GPIO.MODE_OUTPUT);
GPIO.set_mode(l3, GPIO.MODE_OUTPUT);
GPIO.set_mode(l4, GPIO.MODE_OUTPUT);
clearAll();

function clearAll(){
  GPIO.write(l1, 0);
  GPIO.write(l2, 0);
  GPIO.write(l3, 0);
  GPIO.write(l4, 0);
}


RPC.addHandler('onled', function() {
  GPIO.write(l1, 1);
  GPIO.write(l2, 0);
  GPIO.write(l3, 1);
  GPIO.write(l4, 0);

});

RPC.addHandler('offled', function() {
  GPIO.write(l1, 0);
  GPIO.write(l2, 1);
  GPIO.write(l3, 0);
  GPIO.write(l4, 1);

});



function scanwifi() {
  print('>> Starting scan...');
  Wifi.scan(function(results) {
    if (results === undefined) {
      print('!! Scan error');
      return;
    } else {
      print('++ Scan finished,', results.length, 'results:');
    }
    for (let i = 0; i < results.length; i++) {
      print(' ', JSON.stringify(results[i]));
    }
    print('..', Sys.free_ram());
  });
}

let jsonarray = null;
RPC.addHandler('getWifi', function() {
  Wifi.scan(function(results){
    if (results === undefined) {
      return error;
    } else {
      jsonarray = results;
    }
  });
  return jsonarray;
});

//scanwifi();
Wifi.scan(function(results){
  if (results === undefined) {
    print('!! Scan error');
    return;
  } else {
    for (let i = 0; i < results.length; i++) {
      print('SSID: ', results[i].ssid);
    }
  }
});

let obj = null;
RPC.addHandler('sysinfo', function (){
  RPC.call(RPC.LOCAL, 'Sys.GetInfo', null, function (resp, ud) {
    obj = resp;
  }, null);
  return obj;
});