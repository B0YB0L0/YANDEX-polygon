 
ymaps.ready(init);
//   Yandex Maps API yuklanganda `init` funksiyasini ishga tushiradi.  

function init() {
    var myMap = new ymaps.Map("map", {
        center: [41.5545, 60.6249],
        zoom: 13,
        controls: ['typeSelector', 'fullscreenControl']
    });
    //   Xarita yaratadi, markaziy nuqtasi [41.5545, 60.6249] va zoom darajasi 13. Xarita boshqaruv paneli 'typeSelector' va 'fullscreenControl' bilan ta'minlangan.  

    var myPolygon = new ymaps.Polygon([], {}, {
        editorDrawingCursor: "crosshair",
        fillColor: '#00FF00',
        strokeColor: '#0000FF',
        strokeWidth: 2
    });
    //   Bo'sh poligon yaratadi, uning fillColor yashil, strokeColor esa ko'k va chiziq kengligi 2px.  

    myMap.geoObjects.add(myPolygon);
    //   Poligonni xaritaga qo'shadi.  

    var stateMonitor = new ymaps.Monitor(myPolygon.editor.state);
    stateMonitor.add("drawing", function (newValue) {
        myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
    });
    //   Poligon chizish jarayonida strokeColor qizilga (chizish paytida), aks holda ko'kka o'zgaradi.  

    myPolygon.editor.startDrawing();
    //   Poligon chizishni boshlaydi.  

    myPolygon.editor.events.add(['vertexadd', 'vertexremove', 'statechange'], updatePolygonCoordinates);
    myPolygon.geometry.events.add(['change'], updatePolygonCoordinates);
    //   Poligonning vertex qo'shilishi, olib tashlanishi yoki holat o'zgarishi kabi hodisalarga updatePolygonCoordinates funksiyasini qo'shadi.  

    function updatePolygonCoordinates() {
        var coordinates = myPolygon.geometry.getCoordinates()[0];
        var formattedCoordinates = coordinates.map(function (point) {
            return [point[1], point[0]]; 
        });
        document.getElementById('polygonCoordinates').value = JSON.stringify(formattedCoordinates);
    }
    //  Poligonning koordinatalarini yangilaydi va ularni input maydonida JSON formatida ko'rsatadi.  
} 