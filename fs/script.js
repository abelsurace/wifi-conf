	var log = function(msg) {
		$('<span/>').html(msg + '\n').appendTo('#result')
	};

	log('Calling /rpc/Config.Get ...');
	$.ajax({
		url: '/rpc/Config.Get',
		success: function(data) {
			log('Result: ' + JSON.stringify(data));
			$('#ap-dropdown').add(data.wifi.sta.ssid);
			$('#password').val(data.wifi.sta.pass);
		},
	});


	$('#save').on('click', function() {
		log('Calling /rpc/Config.Set  ...');
		$.ajax({
			url: '/rpc/Config.Set',
            data: JSON.stringify({config: {wifi: {sta: {enable: true, ssid: $('#ap-dropdown').val(), pass: $('#password').val()}}}}),
            type: 'POST',
        	success: function(data) {
      			$('#connection').attr('src', 'spinner.gif');
      			$('#wifimsg').html('WiFi connecting ...');
      			log('Saving ...');
      			$.ajax({url: '/rpc/Config.Save', 
      				data: JSON.stringify({"reboot": false}),
      				type: 'POST', 
        			success: function(data) {
        			log('Saved ...');
        			redirectToWifi();
        			}
         
        		});
 			},
		})
	});

	function fetchSSID(){
		log('Calling /rpc/Wifi.Scan  ...');
		let dropdown = document.getElementById('ap-dropdown');
		dropdown.lenght =0;
		$.ajax({
			url: '/rpc/Wifi.Scan',
			success: function(data){
				log ('fetchSSID:' + JSON.stringify(data));
				let option;
				for (let i = 0; i < data.length; i++) {
					option = document.createElement('option');
					option.text = data[i].ssid;
					option.value = data[i].ssid;
					dropdown.add(option);
				}
			}
		})
	}

	function getStatus(){
		$.ajax({
			url: '/rpc/Sys.GetInfo',
			success: function(data){
				if (data.wifi.status == "got ip"){
					$('#connection').attr('src', 'connected.png');
				}
				else {
					$('#connection').attr('src', 'disconnected.png');
				}
				if (data.wifi.sta_ip != ""){
					$('#wifimsg').html('WiFi connected: '+ data.wifi.sta_ip + '<br> SSID Name: '+ data.wifi.ssid);
				}
				else {
					$('#wifimsg').html('WiFi not connected');
				}
				if (data.wifi.ap_ip != ""){
					$('#apmsg').html('AP ready on: '+ data.wifi.ap_ip);
				}
				else {
					$('#apmsg').html('AP not enabled');
				}
			}
		})
	}

	function redirectToWifi(){
		log('Redirecting to info...');
		window.location.href = "/info.html";
		$.ajax({ url: '/rpc/Sys.Reboot'});
	}
	setInterval(getStatus, 3000);