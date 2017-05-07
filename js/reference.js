var data;
$(document).ready(function () {
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            // navigator.geolocation.getCurrentPosition(loadMapScenario);
            
        } else {
            //x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        // got lat and lang. Send to the service
        data = [position.coords.latitude, position.coords.longitude];
        console.log("Coordds "+data)
        
        /*
        $.ajax({
            url: "/services",
            data: data,
            success: onDataResult,
            dataType: 'json'
        });
        */
        
    }
    
    function onDataResult(result)
    {
        // add to the map and the page
    }
   

    function toggle(itemClass) {
        var items = $(itemClass);
        items.each(function (index, value) {
            if ($(this).hasClass('showing')) {
                $(this).removeClass('showing').addClass('hiding');
            } else {
                $(this).removeClass('hiding').addClass('showing');
            }

        })
    }
    
    /*
    Get position 
    */ 
    getLocation();
 
    
    // $('.financial').click(function (e) {
    //     toggle('.financial-item');

    // })

    // $('.budget').click(function (e) {
    //     toggle('.budget-item');
    // })

    // $('.housing').click(function (e) {
    //     toggle('.housing-item');
    // })
    // $('.signin').click(function (e) {
    //     toggle('.signin-item');
    // })

})

 function loadMapScenario() {
    //   $.ajax({
    //         url: "http://substanceabuseapi.azurewebsites.net/api/wh/getServicesbycityname?city=DC",
    //         type: 'GET',
    //         beforeSend : function( xhr ) {
    //             xhr.setRequestHeader("Access-Control-Allow-Origin", true)
    //         },
    //         success: function(response){
    //             response
    //         }
    //   });
     
     $.getJSON("./public/test.json",function(json){
         var addresses = [];
         for(var i =0; i < json.length;i++){
             var street = json[i].ServiceAddress;
             var city = json[i].City;
             var name = json[i].ServiceDisplayName;
             var website= json[i].ContactUrl;
             var type = json[i].ServiceTypeId;
             var address = [street,city,name,website,type];
             addresses.push(address);
         }
        //  console.log(addresses);
                    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
                        credentials: 'AnAmvPCLpNnwtRblvEQNVb86D__AA0iYU7Wlxp7q5FzDbFaT7hGrCMYr9k5pVcJo',
                        center: new Microsoft.Maps.Location(data[0],data[1]),
                        // bounds: center.bestView
                    });
                    var center = map.getCenter();
                    var centerPin = new Microsoft.Maps.Pushpin(map.getCenter(), { text: 'U', title: 'My Location'});
                    map.entities.push(centerPin);
                    var pushpins=[];
                    var infobox = new Microsoft.Maps.Infobox(center, { title: 'title',
                        description: 'description', showCloseButton: false });
                    var pushpins = Microsoft.Maps.TestDataGenerator.getPushpins(6, map.getBounds());
                    // var infobox = new Microsoft.Maps.Infobox(pushpins[0].getLocation(), { title: 'title',
                    //     description: 'description', showCloseButton: false });
                    // infobox.setMap(map);
                    for (var i = 0; i < pushpins.length; i++) {
                        var street= addresses[i][0];
                        var city = addresses[i][1]
                        var address= street.concat(',',city);
                        console.log(address);
                        var displayName = addresses[i][2];
                        var site = addresses[i][3];
                        var type = addresses[i][4];
                        var pushpin = pushpins[i];
                        console.log(pushpin);
                        var descript = "address" + '\n' +  "site" + '\n' +"type";
                        Microsoft.Maps.Events.addHandler(pushpin, 'click', function (args) {
                            
                            infobox.setLocation(args.target.getLocation());
                            infobox.setOptions({title: "Result", description: descript});
                            infobox.setMap(map);
                        });
                        if(type=="Housing"){
                            pushpin.setOptions({text:"H", enableHoverStyle: true, enableClickedStyle: true });
                        }
                        else if(type=="Financial"){
                            pushpin.setOptions({text:"B", enableHoverStyle: true, enableClickedStyle: true });
                        }
                        else if(type=="Agency"){
                             pushpin.setOptions({text:"F", enableHoverStyle: true, enableClickedStyle: true });
                        }
                        map.entities.push(pushpin);
                    }
                    // map.entities.push(pushpins);

                    // for(var j =0; j<addresses.length;j++){
                    //     var address= addresses[j].join();
                        // console.log(addresses[j].join());
                        // Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
                        //     var searchManager = new Microsoft.Maps.Search.SearchManager(map);
                        //     var requestOptions = new Microsoft.Maps.Search.GeocodeRequestOptions();
                        //     requestOptions.bounds = map.getBounds();
                        //     for(var j =0; j<addresses.length;j++){
                        //         var street= addresses[j][0];
                        //         var city = addresses[j][1]
                        //         var address= street.concat(',',city);
                        //         console.log(address);
                        //         var displayName = addresses[j][2];
                        //         var site = addresses[j][3];
                        //         var type = addresses[j][4];

                        //               requestOptions.where = address;
                        //               requestOptions.callback = function (answer, userData) {
                        //         // map.setView({ bounds: answer.results[0].bestView });
                        //                 console.log(answer.results);
                        //                 var pin = new Microsoft.Maps.Pushpin(answer.results[0].location);
                        //                 if(type=="Budget"){
                        //                     map.entities.push(pin);
                        //                     pin.setOptions({text:"B", enableHoverStyle: true, enableClickedStyle: true });
                        //                         Microsoft.Maps.Events.addHandler(pin, 'click', function (args) {
                        //                         infobox.setLocation(args.target.getLocation());
                        //                         infobox.setOptions({title: displayName, description: address + '\n' +  site + '\n' + type});
                        //                         infobox.setMap(map);
                        //                     });
                        //                 }
                        //                 if(type=="Housing"){
                        //                     map.entities.push(pin);
                        //                     pin.setOptions({text:"H", enableHoverStyle: true, enableClickedStyle: true });
                        //                     Microsoft.Maps.Events.addHandler(pin, 'click', function (args) {
                        //                         infobox.setLocation(args.target.getLocation());
                        //                         infobox.setOptions({title: displayName, description: address + '\n' +  site + '\n' + type});
                        //                         infobox.setMap(map);
                        //                     });
                        //                 }
                        //                 if(type=="Financial"){
                        //                     map.entities.push(pin);
                        //                     pin.setOptions({text:"F", enableHoverStyle: true, enableClickedStyle: true });
                        //                     Microsoft.Maps.Events.addHandler(pin, 'click', function (args) {
                        //                         infobox.setLocation(args.target.getLocation());
                        //                         infobox.setOptions({title: displayName, description: address + '\n' +  site + '\n' + type});
                        //                         infobox.setMap(map);
                        //                     });
                        //                 }
                                        
                        //         };
                        //         searchManager.geocode(requestOptions);
                                
                        //     }
                             
                        // })
                           
        })
 }
    