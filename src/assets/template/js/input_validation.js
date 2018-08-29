ymaps.ready(init);

function init() {
    // Подключаем поисковые подсказки к полю ввода.
    var suggestView = new ymaps.SuggestView('address-suggest'),
        map,
        placemark;

    // При клике по кнопке запускаем верификацию введёных данных.
    $('.address-map__button').bind('click', function (e) {
        showForms();
        geocode();

    });

    $('body').on('click', '.address-map__clear', function(){
        $('#address-suggest').val('');
        showForms();
        showStartMap();
        return false;
    });

    showForms();
    showStartMap();

    function showStartMap() {
        createMap({center:[55.7549980689873, 37.618174499999974], zoom:10, controls:[], scroll: false}, '');
    }
    function showForms() {
        var noresult_box = $('.address-map__noresult');
        var result_box = $('.address-map__result');
        noresult_box.removeClass('active');
        result_box.removeClass('active');

        if ($('#address-suggest').val()=='') {

            noresult_box.addClass('active');
        } else {
            result_box.addClass('active');
        }
    }
    function geocode() {
        // Забираем запрос из поля ввода.
        var request = $('#address-suggest').val();
        // Геокодируем введённые данные.
        ymaps.geocode(request).then(function (res) {
            var obj = res.geoObjects.get(0),
                error, hint;

            if (obj) {
                // Об оценке точности ответа геокодера можно прочитать тут: https://tech.yandex.ru/maps/doc/geocoder/desc/reference/precision-docpage/
                switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
                    case 'exact':
                        break;
                    case 'number':
                    case 'near':
                    case 'range':
                        error = 'Неточный адрес, требуется уточнение';
                        hint = 'Уточните номер дома';
                        break;
                    case 'street':
                        error = 'Неполный адрес, требуется уточнение';
                        hint = 'Уточните номер дома';
                        break;
                    case 'other':
                    default:
                        error = 'Неточный адрес, требуется уточнение';
                        hint = 'Уточните адрес';
                }
            } else {
                error = 'Адрес не найден';
                hint = 'Уточните адрес';
            }

            // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
            if (error) {
                showError(error);
                showMessage(hint);

            } else {
                showResult(obj);
                showForms();
            }
        }, function (e) {
            console.log(e)
        })

    }
    function showResult(obj) {
        // Удаляем сообщение об ошибке, если найденный адрес совпадает с поисковым запросом.
        //$('#suggest').removeClass('input_error');
        //$('#notice').css('display', 'none');
        $('.address-map__errors').text('');

        var mapContainer = $('#address-map'),
            bounds = obj.properties.get('boundedBy'),
            // Рассчитываем видимую область для текущего положения пользователя.
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            ),
            // Сохраняем полный адрес для сообщения под картой.
            address = [obj.getCountry(), obj.getAddressLine()].join(', '),
            // Сохраняем укороченный адрес для подписи метки.
            shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');

        setForm(address);

        // Убираем контролы с карты.
        mapState.controls = [];
        // Создаём карту.
        createMap(mapState, shortAddress);
        // Выводим сообщение под картой.
        showMessage(address);
    }

    function setForm(address) {
        var arr = address.split(",");
        $('.address-map__city').text([arr[0], arr[1]].join(', '));
        var tmp = [];
        for (var i=2; i<arr.length;i++) {
            tmp.push(arr[i]);
        }
        $('.address-map__street').text(tmp.join(', '));
    }

    function showError(message) {
        $('.address-map__errors').text(message);
        /*$('#suggest').addClass('input_error');
        $('#notice').css('display', 'block');
        // Удаляем карту.
        if (map) {
            map.destroy();
            map = null;
        }*/
    }

    function createMap(state, caption) {
        // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
        //alert(state.toSource());
        if (!map) {
            map = new ymaps.Map('address-map', state);
            placemark = new ymaps.Placemark(
                map.getCenter(), {
                    iconCaption: caption,
                    balloonContent: caption
                }, {
                    preset: 'islands#redDotIconWithCaption'
                });
            map.geoObjects.add(placemark);
            // Если карта есть, то выставляем новый центр карты и меняем данные и позицию метки в соответствии с найденным адресом.
        } else {
            map.setCenter(state.center, state.zoom);
            placemark.geometry.setCoordinates(state.center);
            placemark.properties.set({iconCaption: caption, balloonContent: caption});
        }
    }

    function showMessage(message) {
        $('#messageHeader').text('Данные получены:');
        $('#message').text(message);
    }
}
