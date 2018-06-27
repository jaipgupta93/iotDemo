function success(pos) {
    var crd = pos.coords;
    lat = crd.latitude;
    lon = crd.longitude;
};

function error(err) {
    alert('Can not take geolocation value so use Tokyo location instead (' + err.code + '): ' + err.message);
    lat = 35.6798053;
    lon = 139.7646006;
};

$(function () {
    navigator.geolocation.getCurrentPosition(success, error, {timeout: 5000});
});

/*
$(function () {
    navigator.geolocation.getCurrentPosition(function (pos) {
        var crd = pos.coords;
        lat = crd.latitude;
        lon = crd.longitude;
        send_data()
    }, function (err) {
        alert('Can not take geolocation value so use Tokyo location instead (' + err.code + '): ' + err.message);
        lat = 35.6798053;
        lon = 139.7646006;
    }, {timeout: 5000});
});
*/
