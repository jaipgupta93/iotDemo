jQuery(function ($) {
    var ns = google.maps,
        listUrl  = "/api/locations",
        detailUrl  = "not_implemented",
        markers = [],
        mapOptions = {
            zoom: 13,
            center: new ns.LatLng(35.665595, 139.739)
        },
        map = new ns.Map($("#mapDiv")[0], mapOptions);


    function detailShow(data) {
        var info;
        if (data.success !== true) {
            return;
        }
        info = data.info;
        console.log(info.id);
    }

    function getDetailInfo(id) {
        $.ajax({
            url: detailUrl,
            dataType: "json",
            data: {
                id: id
            },
            type: "GET"
        }).done(detailShow);
    }

    function showConsole() {
        console.log('aki');
    }

    function placeMarker(id, info) {
        var position = new ns.LatLng(info.latitude, info.longitude),
            marker = new ns.Marker({position: position, map: map, title: "aki"});

        var contentString="<dl id='infowin1'><dt>" + info.uid + "</dt><dd>詳細は<a href='/cockpit/" + info.uid + "'>こちら</a></dd></dl>";
        var infowindow=new google.maps.InfoWindow({
            content: contentString
        });


        ns.event.addListener(marker, 'click', function () {
            infowindow.open(map,marker);
        });
        markers[id] = marker;
    }

    function listAll(data) {
        var id, i, newLen,
            shops = [],
            newStore = [];

        shops = data;
        newLen = shops.length;

        for (i = 0; i < newLen; i = i + 1) {
            id = shops[i].uid;
            newStore[id] = 1;
        }

        for (id in markers) {
            if (!newStore[id]) {
                markers[id].setMap(null);
                delete markers[id];
            }
        }

        for (i = 0; i < newLen; i = i + 1) {
            id = shops[i].uid;
            if (!markers[id]) {
                placeMarker(id, shops[i]);
            }
        }
    }

    function getTarget() {
        var latLngBounds = map.getBounds(),
            northEast = latLngBounds.getNorthEast(),
            southWest = latLngBounds.getSouthWest();

        $.ajax({
            url: listUrl,
            dataType: "json",
            data: {
                neLat: northEast.lat(),
                neLng: northEast.lng(),
                swLat: southWest.lat(),
                swLng: southWest.lng()
            },
            type: "GET"
        }).done(listAll);
    }

    ns.event.addListener(map, 'idle', getTarget);

});