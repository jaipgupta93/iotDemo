function send_data(uuid, value, lat, lon) {

    var created = new Date().toISOString();

    $.ajax({
        type: "POST",
        url: "/api/series",
        data: {
            "value": value,
            "uid": uuid,
            "created_at": created,
            "latitude": lat,
            "longitude": lon
        },
        success: function (j_data) {
            console.log("GET: /api/series success " + value);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Failed : GET /api/series  " + textStatus);
            alert("Sending data is failed : " + errorThrown);
        }
    });
}