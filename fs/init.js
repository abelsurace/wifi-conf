load('api_config.js');
load('api_events.js');
load('api_gpio.js');
load('api_sys.js');
load('api_timer.js');
load('api_wifi.js');
load("api_rpc.js");
load('api_mqtt.js');

let led = Cfg.get('pins.led');

let getInfo = function() {
  return JSON.stringify({
    total_ram: Sys.total_ram(),
    free_ram: Sys.free_ram()
    //fi_status: Sys.wifi_status()
  });
};

// Blink built-in LED every second
GPIO.set_mode(led, GPIO.MODE_OUTPUT);
Timer.set(1000 /* 1 sec */, Timer.REPEAT, function() {
  let value = GPIO.toggle(led);
  //print(value ? 'Tick' : 'Tock', 'uptime:', Sys.uptime(), getInfo());
}, null);

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