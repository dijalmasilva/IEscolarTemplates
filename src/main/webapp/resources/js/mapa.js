/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Método que realiza a localização de um ponto no mapa.
 * Recebe como parâmetro um elemento JSON.
 * 
 * @param {type} elementoJSON
 * @returns {undefined}
 */
function localizacao(elementoJSON) {
    try {
        var obj = JSON.parse("[" + elementoJSON + "]");
    } catch (err) {
        console.log(err);
    }

    var object = obj[0];
    var geocoder = new google.maps.Geocoder;
    var map, marker, infowindows, street;
    geocoder.geocode({'address': object.address, region: 'BR'}, function(results, status) {

        if (status === google.maps.GeocoderStatus.OK) {

            map = new google.maps.Map(document.getElementById('map_canvas'), {
                zoom: 17,
                center: results[0].geometry.location
            });
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location

            });
            street = results[0].formatted_address.replace(/, /g, '</br>');
            infowindows = new google.maps.InfoWindow({
                content: getContentMarker(object.name, street, object.image)
            });
            marker.addListener('mouseover', function() {
                infowindows.open(map, marker);
            });
            marker.addListener('mouseout', function() {
                infowindows.close(map, marker);
            });
            google.maps.event.addListener(infowindows, 'domready', function() {

                var iw = $('.gm-style-iw');
                var iwBackground = iw.prev();
                iwBackground.children(':nth-child(2)').css({'display': 'none'});
                iwBackground.children(':nth-child(4)').css({'display': 'none'});
                iw.parent().parent().css({left: '115px'});
                iwBackground.children(':nth-child(3)').css({'display': 'none'});
                iwBackground.children(':nth-child(1)').css({'box-shadow': 'none'});
            });
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

/**
 * Método que realiza a estimativa de tempo e distância entre dois pontos no mapa.
 * Recebe como parâmetro de entrada um elemento JSON.
 * 
 * @param {type} elementoJSON
 * @returns {undefined}
 */
function estimativaDeTempo(elementoJSON) {
    
    try {
        var obj = JSON.parse("[" + elementoJSON + "]");
    } catch (err) {
        console.log(err);
    }

    var object = obj[0];

    //variaveis
    var service = new google.maps.DistanceMatrixService;
    var distance, timer, address, title, image, school;

    address = object.addressOrigem;
    title = object.title;
    image = object.image;
    school = object.addressDestino;

    service.getDistanceMatrix({
        origins: [address],
        destinations: [school],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false

    }, function(response, status) {

        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error was: ' + status);
        } else {

            distance = response.rows[0].elements[0].distance.text;
            timer = response.rows[0].elements[0].duration.text;
            var content = '<table id="table">\n\
                                    <tr>\n\
                                        <td colspan="2" >\n\
                                            <div id="title">\n\
                                                ' + title + '\n\
                                            </div>\n\
                                        </td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td colspan="2">\n\
                                            <div id="footer">\n\
                                                Distância até a escola: ' + distance + '</br>\n\
                                                Tempo estimado: ' + timer + '</br>\n\
                                                <div id="informativo">\n\
                                                    * Deslocamento por caminhada\n\
                                                </div>\n\
                                            </div>\n\
                                        </td>\n\
                                    </tr>\n\
                                </table>';
            document.getElementById('map_tempo_estimado').innerHTML = content;
        }
    });
}

/**
 * Método que realiza o desenho de uma rota entre dois pontos no mapa.
 * Recebe como parâmetro de entrada um elemento JSON.
 * 
 * @param {type} rotaJSON
 * @returns {undefined}
 */
function rotasDesenhadas(rotaJSON) {
    console.log(rotaJSON);
    try {
        var obj = JSON.parse("[" + rotaJSON + "]");
    } catch (err) {
        console.log(err);
    }

    var object = obj[0];
//    var object = JSON.parse(rotaJSON);

    console.log(object);
    var icon_start_url = 'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=A&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1';

    var icon_end_url = 'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=B&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1';

    var directionsService = new google.maps.DirectionsService;

    var map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 4,
        center: {lat: -6.9231769, lng: -38.5309765}
    });
    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });
    directionsDisplay.setMap(map);
    directionsService.route({
        origin: object[0].address,
        destination: object[1].address,
        travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setOptions({
                suppressInfoWindows: true,
                suppressMarkers: true
            });
            var leg = response.routes[0].legs[0];
            //adicionando marcador e infowindow do ponto inicial
            var start_street = object[0].address.replace(/, /g, '</br>');
            var start_marker = createMarker(map, leg.start_location, createIcon(icon_start_url));
            var start_infowindow = createInfoWindow(object[0].name, start_street, object[0].image);
            addListenerMarker(start_marker, start_infowindow, map);
            addListenerInfoWindow(start_infowindow);
            //adicionando marcador e infowindow do ponto final
            var end_street = object[1].address.replace(/, /g, '</br>');
            var end_marker = createMarker(map, leg.end_location, createIcon(icon_end_url));
            var end_infowindow = createInfoWindow(object[1].name, end_street, object[1].image);
            addListenerMarker(end_marker, end_infowindow, map);
            addListenerInfoWindow(end_infowindow);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

/**
 *
 * @param {type} elementoJSON
 * @returns {undefined}
 */
function localizacaoDeVariosEnderecos(elementoJSON) {
    
    try {
        var objeto = JSON.parse(elementoJSON);
    } catch (err) {
        console.log(err);
    }
    
    var icon_base_url = 'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=A&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1';
    
    var base = objeto.enderecoSimplesJSON;
    var rotas = objeto.enderecoSimplesJSONs;
    var map, i;
    
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 15,
        center: {lat: -6.887368, lng: -38.556562}
    });
    
    geoCode(map, base.address, base.name, base.image, createIcon(icon_base_url));
    
    for (i = 0; i < rotas.length; i++) {

        var obj = rotas[i];

        geoCodeAluno(map, obj.address, obj.name, obj.image);

    }

}

/**
 * 
 * @param {type} map
 * @param {type} address
 * @param {type} title
 * @param {type} image
 * @returns {undefined}
 */
function geoCodeAluno(map, address, title, image) {

    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({'address': address, region: 'BR'}, function(results, status) {

        if (status === google.maps.GeocoderStatus.OK) {

            var marker = createMarker(map, results[0].geometry.location);
            var street = results[0].formatted_address.replace(/, /g, '</br>');
            var infowindows = createInfoWindow(title, street, image);
            addListenerMarker(marker, infowindows, map);
            addListenerInfoWindow(infowindows);
        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            setTimeout(function() {
                geoCodeAluno(map, address, title, image);
            }, 50);
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

/**
 * 
 * @param {type} map
 * @param {type} address
 * @param {type} title
 * @param {type} image
 * @param {type} icon
 * @returns {undefined}
 */
function geoCode(map, address, title, image, icon) {

    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({'address': address, region: 'BR'}, function(results, status) {

        if (status === google.maps.GeocoderStatus.OK) {

            var marker = createMarker(map, results[0].geometry.location, icon);
            var street = results[0].formatted_address.replace(/, /g, '</br>');
            var infowindows = createInfoWindow(title, street, image);
            addListenerMarker(marker, infowindows, map);
            addListenerInfoWindow(infowindows);
        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            setTimeout(function() {
                geoCodeAluno(map, address, title, image);
            }, 50);
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

/**
 * Cria o texto que será exibido na INFOWINDOW do MARKER
 * Recebe como parâmetro de entrada o tituto (title), conteúdo (address) e uma imagem para exibição. 
 * "[{"name":"ALICE MACENA BARRETO","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"ALLAN FERREIRA ABREU","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"ANA JULIA TRAJANO BEZERRA","address":"SITIO CAJAZEIRAS VELHHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"ANDRESSA DOS SANTOS ABREU ","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"CAIO AUGUSTO DE ABREU ROLIM","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"EMANUEL ABREU DA SILVA","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"EVERTON LOAN DA SILVA LIMA","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"FELLIPE MACENA BARRETO","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"INÁCIO JERÔNIMO DA SILVA","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"ITAYLAN LUCAS DE SOUZA PEREIRA","address":"SITIO CAJAZEIRAS, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"ITAYNALANIA MARIA PEREIRA DE SOUZA","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"JAQUELINE PEREIRA DA SILVA","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"JOÃO LUCAS ROLIM DE ABREU","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"JOSE GUSTAVO ROLIM DE ABREU","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"JOSUÉ PEDRO DA SILVA","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"LAUANY PAULINO JERONIMO DA SILVA","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"LUCAS DE SOUZA RODRIGUES","address":"SITIO TRAJANO BORGES, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"MARIA CECÍLIA DELFINO DE ABREU","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"MARIA IZABEL DE OLIVEIRA IZIDORIO","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"MARIA LUIZA DE ABREU TRAJANO","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"MARIA VITÓRIA MACENA BARRETO","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"MARIANA DE SOUSA VIANA","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"MARIANA DE SOUZA RODRIGUES","address":"SITIO CAJAZEIRAS VELHA, CAJZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"SANSÃO JERONIMO DA SILVA","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"SARH JERONIMO DA SILVA","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"SINBA JERONIMO DA SILVA","address":"SITIO CAJAZEIRAS VELHA, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"},{"name":"YASMIM ROLIM DE ABREU","address":"SITIO CAJAZEIRAS VELHAS, CAJAZEIRAS, PB","image":"/home/postgres/appservers/postgresr_fotos/default_user_profile.png"}]"
 * @param {type} title
 * @param {type} address
 * @param {type} image
 * @returns {String}
 * */
function getContentMarker(title, address, image) {

    return '<table id="table">\n\
              <tr>\n\
                <td colspan="2" >\n\
                  <div id="title">\n\
                    ' + title + '\n\
                  </div>\n\
                </td>\n\
              </tr>\n\
              <tr>\n\
                <td>\n\
                  <div id="left">\n\
                    ' + address + '\n\
                  </div>\n\
                </td>\n\
              </tr>\n\
            </table>';
}

/**
 * Adiciona dois eventos ao marcador. O mouseover para abrir a infowindow e o mouseout para fechar a infowindow.
 * Recebe como entrada o marcador, a infowindow e o mapa.
 * 
 * @param {type} marker
 * @param {type} infowindow
 * @param {type} map
 * @returns {undefined}
 */
function addListenerMarker(marker, infowindow, map) {
    marker.addListener('mouseover', function() {
        infowindow.open(map, marker);
    });
    marker.addListener('mouseout', function() {
        infowindow.close(map, marker);
    });
}

/**
 * Cria um novo marcador para exibição no mapa.
 * Recebe como parâmetros de entrada o mapa, a localização (LatLng) e o ícone do marcador.
 * 
 * @param {type} map
 * @param {type} location
 * @param {type} icon
 * @returns {@exp;google@pro;maps@call;Marker}
 */
function createMarker(map, location, icon) {
    return new google.maps.Marker({
        map: map,
        position: location,
        icon: icon
    });
}

/**
 * Cria um novo ícone que será utilizado no marcador.
 * Recebe como parâmetro de entrada a URL do icone.
 * 
 * @param {type} url
 * @returns {createIcon.Anonym$16}
 */
function createIcon(url) {
    return {
        url: url,
        size: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 40)
    };
}

/**
 * Cria uma nova InfoWindow para exibição de informações nos marcadores.
 * Recebe como parâmetro de entrada o tituto (name), conteúdo (street) e uma imagem para exibição. 
 * 
 * @param {type} name
 * @param {type} street
 * @param {type} image
 * @returns {@exp;google@pro;maps@call;InfoWindow}
 */
function createInfoWindow(name, street, image) {
    return new google.maps.InfoWindow({
        content: getContentMarker(name, street, image)
    });
}

/**
 * Aplica um evendo a InfoWindow para remover a formatação padrão do Google.
 * Recebe como parâmetro de entrada uma InfoWindow.
 * 
 * @param {type} infowindow
 * @returns {undefined}
 */
function addListenerInfoWindow(infowindow) {

    google.maps.event.addListener(infowindow, 'domready', function() {

        var iw = $('.gm-style-iw');
        var iwBackground = iw.prev();
        iwBackground.children(':nth-child(2)').css({'display': 'none'});
        iwBackground.children(':nth-child(4)').css({'display': 'none'});
        iw.parent().parent().css({left: '115px'});
        iwBackground.children(':nth-child(3)').css({'display': 'none'});
        iwBackground.children(':nth-child(1)').css({'box-shadow': 'none'});
    });
}
