(function() {
    $('#battery').text('Battery: ' + (navigator.battery.level * 100) + '%');

    var batteryFunction = function(event) {
        var battery = navigator.battery;
        var $page = $('html');
        if (battery.charging) {
            $('#battery').text('Battery is chargin');
            navigator.vibrate(4000);
        } else {
            $('#battery').text('Battery: ' + (navigator.battery.level * 100) + '%');
        }
    };
    $(function() {
        batteryFunction();
    });
    navigator.battery.addEventListener('levelchange', batteryFunction);
    navigator.battery.addEventListener('chargingchange', batteryFunction);
})();
