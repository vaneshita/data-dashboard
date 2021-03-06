/*
 * Funcionalidad de tu producto
 */
/* *************************************************cargando la pagina *********************************************************/
window.addEventListener('load', function() {
  var view = document.getElementById('overview'),
    students = document.getElementById('students'),
    paginaview = document.getElementById('paginaView'),
    paginaStudents = document.getElementById('paginaStudents'),
    total = document.getElementById('total'),
    porcentaje = document.getElementById('porcentaje'),
    meta = document.getElementById('meta'),
    boxTeacher = document.getElementById('box-teacher'),
    boxJedi = document.getElementById('box-jedi'),
    filtro = document.getElementById('filtro'),
    nps = document.getElementById('nps'),
    npsPorciento = document.getElementById('nps-porciento'),
    boxExpectativa = document.getElementById('box-expectativa'),
    pointTech = document.getElementById('tech'),
    pointHse = document.getElementById('hse');
  /* *************************************************llamando por sede y por promocion***********************************/
  filtro.addEventListener('change', function(event) {
    switch (event.target.value) {
    case '0': sedePromo('LIM', '2016-2');
      break;
    case '1':sedePromo('LIM', '2017-1');
      break;
    case '2':sedePromo('LIM', '2017-2');
      break;
    case '3':sedePromo('AQP', '2016-2');
      break;
    case '4':sedePromo('AQP', '2017-1');
      break;
    case '5':sedePromo('SCL', '2016-2');
      break;
    case '6':sedePromo('SCL', '2017-1');
      break;
    case '7':sedePromo('SCL', '2017-2');
      break;
    case '8':sedePromo('CDMX', '2017-1');
      break;
    case '9':sedePromo('CDMX', '2017-2');
      break;
    }
    // funcion que llamara cada caso que pertenezca la opcion clikeada como parametros pasamos la sede y la promocion datos que estan en la data.js
    function sedePromo(sede, promo) {
      // respondiendo primera pregunta. Hallando la cantidad de alumnas y el porcentaje recorriendo un array se puede contar cuantas alumnas hay
      var arr = data[sede][promo]['students'];
      var cant = 0;
      var nocant = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].active === true) {
          cant++;
        } else {
          nocant++;
        }
      }
      var calculandoPorcentaje = parseInt((nocant / arr.length) * 100);
      total.textContent = cant;
      porcentaje.textContent = calculandoPorcentaje + '%';
      /* ***************************************************Cantida de alumnas que superan el objetivo*****************************************************/
      var sumaScore = 0;
      for (var i = 0; i < arr.length; i++) {
        debugger;
        var sumaHse = 0;
        var sumaTech = 0;
        for (var j = 0; j < data[sede][promo]['students'][i]['sprints'].length; j++) {
          var tech = data[sede][promo]['students'][i]['sprints'][j]['score']['tech'];
          var hse = data[sede][promo]['students'][i]['sprints'][j]['score']['hse'];
          sumaHse = sumaHse + hse;
          sumaTech = sumaTech + tech;
        }
        if (sumaHse > 3360 && sumaTech > 5040) {
          sumaScore++;
        }
      }
      meta.innerHTML = sumaScore;
      /* ***************************************************************cantida de nps*********************************************************************/
      var arrNps = data[sede][promo]['ratings'];
      var sum = 0;
      var npsTotal = 0;
      for (var i = 0; i < arrNps.length; i++) {
        var npsPromoters = data[sede][promo]['ratings'][i]['nps']['promoters'];
        var npsDetractors = data[sede][promo]['ratings'][i]['nps']['detractors'];
        var npsPassive = data[sede][promo]['ratings'][i]['nps']['passive'];
        var npsResta = npsPromoters - npsDetractors;
        sum = sum + npsResta;
        var npsSuma = npsPromoters + npsDetractors + npsPassive;
        npsTotal = npsTotal + npsSuma;
      }
      var promoterPorcentaje = parseInt((npsPromoters / npsTotal) * 100);
      var detractorsPorcentaje = parseInt((npsDetractors / npsTotal) * 100);
      var passivePorcentaje = parseInt((npsPassive / npsTotal) * 100);
      var totalNps = sum / arrNps.length;
      nps.innerHTML = totalNps.toFixed(2);
      npsPorciento.innerHTML = promoterPorcentaje + '% Promoters' + '<br>' + detractorsPorcentaje + '% Passive' + '<br>' + passivePorcentaje + '% Detractors';
      /* *********************************************calculando los puntos obtenidos en tech********************************************************************/
      var cantidadTech = 0;
      for (var i = 0; i < arr.length; i++) {
        var arrSprint = data[sede][promo]['students'][i]['sprints'];
        var sumTech = 0;
        for (var j = 0; j < arrSprint.length; j++) {
          var tech2 = data[sede][promo]['students'][i]['sprints'][j]['score']['tech'];
          sumTech = sumTech + tech2;
          if (sumTech > (1260 * 4)) {
            cantidadTech++;
          }
        }
      }
      pointTech.textContent = cantidadTech;
      /* ********************************************************calculando los puntos en hse*******************************************************************/
      var cantidadHse = 0;
      for (var i = 0; i < arr.length; i++) {
        var arrSprint = data[sede][promo]['students'][i]['sprints'];
        var sumHse = 0;
        for (var j = 0; j < arrSprint.length; j++) {
          var hse2 = data[sede][promo]['students'][i]['sprints'][j]['score']['hse'];
          sumHse = sumHse + hse2;
          if (sumHse > (840 * 4)) {
            cantidadHse++;
          }
        }
      }
      pointHse.textContent = cantidadHse;
      /* **************************************porcentaje de la expectativa de las alumnas respecto a laboratoria**************************************************/
      var sumaExpectativa = 0;
      for (var i = 0; i < arrNps.length; i++) {
        var studentNoCumple = data[sede][promo]['ratings'][i]['student']['no-cumple'];
        var studentCumple = data[sede][promo]['ratings'][i]['student']['cumple'];
        var studentSupera = data[sede][promo]['ratings'][i]['student']['supera'];
        var Expectativa = ((studentSupera + studentCumple) / (studentNoCumple + studentCumple + studentSupera)) * 100;
        sumaExpectativa = sumaExpectativa + Expectativa;
      }
      var porcentajeExpectativa = parseInt(sumaExpectativa / arrNps.length);
      boxExpectativa.textContent = porcentajeExpectativa + '%';
      /* *********************************************promedio de los profesores********************************************************************/
      var promedioTeacher = 0;
      for (var i = 0; i < arrNps.length; i++) {
        var teacher = data[sede][promo]['ratings'][i]['teacher'];
        promedioTeacher = (promedioTeacher + teacher) / arrNps.length;
      }
      boxTeacher.textContent = promedioTeacher.toFixed(2);
      /* *************************************************promedio jedi*****************************************************************/
      var promedioJedi = 0;
      for (var i = 0; i < arrNps.length; i++) {
        var jedi = data[sede][promo]['ratings'][i]['jedi'];
        promedioJedi = (promedioJedi + jedi) / arrNps.length;
      }
      boxJedi.textContent = promedioJedi.toFixed(2);
    }
  });
  /* evento click para la navegacion facetada de students para que muestre cuando se haga click y se borre la vista de overview*/
  students.addEventListener('click', function() {
    paginaView.classList.toggle('enabled');
    paginaView.classList.toggle('disabled');
    paginaStudents.classList.toggle('disabled');
    paginaStudents.classList.toggle('enabled');
    students.firstElementChild.classList.toggle('enabled');
  });
  /* evento click para la navegacion facetada overview para que se muestre******************************************/
  view.addEventListener('click', function() {
    paginaView.classList.remove('disabled');
    paginaView.classList.add('enabled');
    paginaStudents.classList.remove('enabled');
    paginaStudents.classList.add('disabled');
    view.firstElementChild.classList.toggle('enabled');
  });
});
/* ***********************************************grafico de barras*****************************************************************/

google.charts.load('current', {'packages': ['bar']});
google.charts.setOnLoadCallback(drawStuff);

function drawStuff() {
  var data = new google.visualization.arrayToDataTable([
    ['sprint', 'Puntaje'],
    ['S1', 44],
    ['S2', 40],
    ['S3', 31],
    ['S4', 12],
  ]);

  var options = {
    width: 200,
    height: 180,
    legend: { position: 'none' },
    axes: {
      x: {
        0: { side: 'botoom'} // Top x-axis.
      }
    },
    bar: { groupWidth: '60%'}
  };

  var chart = new google.charts.Bar(document.getElementById('top_x_div'));
  // Convert the Classic options to Material options.
  chart.draw(data, google.charts.Bar.convertOptions(options));
};
/* **************************************************grafico circular**************************************************************/
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['S1', 2],
    ['S2', 3],
    ['S3', 1],
    ['S4', 1],
  ]);

  // Set chart options
  var options = {
    'title': 'CANTIDAD DE PUNTOS  POR SPRINT',
    'width': 500,
    'height': 450,
  };
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  var chart2 = new google.visualization.PieChart(document.getElementById('chart_div2'));
  chart.draw(data, options);
  chart2.draw(data, options);
}
/* **************************************************grafico lineal*************************************************************/
