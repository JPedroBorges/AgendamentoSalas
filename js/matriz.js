function alteraMatrix() {
  var matrizAtiva = document.getElementById("matrix");
  var matriz = document.getElementById("matrix");
  var idFilho = matriz.firstElementChild.id;
  var filho = idFilho.split("_");
  matrizAtiva.innerHTML = " ";
  if (filho[1] == "day") {
    addMatrix("week");
    addBtnRooms();
    var idPrimeiroElemento = document.getElementById("btn_rooms").firstElementChild.id;
    defineActiveById(idPrimeiroElemento);
    createMatrixWeek();
  } else if (filho[1] == "week") {
    removeBtnSalas();
    addMatrix("day");
    createMatrixDay();
  } else
    console.log("Escolha de matriz errada");
}


//matrix
function addMatrix(matrixType) {
  var matrix = document.getElementById("matrix");
  var mh = document.createElement('thead');
  mh.id = "matrix_" + matrixType + "_head";
  var mb = document.createElement('tbody');
  mb.id = "matrix_" + matrixType + "_body";
  matrix.appendChild(mh);
  matrix.appendChild(mb);
}

function refreshMatrix() {
  var matrix = document.getElementById("matrix");
  var id_child = matrix.firstElementChild.id;
  var child = id_child.split("_");
  matrix.innerHTML = " ";
  addMatrix(child[1]);
  if (child[1] == "day")
    createMatrixDay();
  else if (child[1] == "week") {
    var activeBtn = getActive("btn-rooms");
    refreshButtons();
    defineActiveById(activeBtn);
    createMatrixWeek();
  } else
    console.log("Escolha de matriz errada");
}

function createMatrixWeek() {
  ////////////////////////////////////////////
  //Alterar quando recebermos JSON
  var id_andar = getActive('list-group-item');
  var temp_id_sala = getActive('btn-rooms').split("-");
  var id_sala = "1" + temp_id_sala[1];
  var id_week = "1";
  var scheduleWeek;
  switch (id_sala) {
    case "11":
      if (id_week == "1")
        scheduleWeek = scheduleWeek_1_sala_11;
      else if (id_week == "2")
        scheduleWeek = scheduleWeek_2_sala_11;
      else if (id_week == "3")
        scheduleWeek = scheduleWeek_3_sala_11;
      break;
    case "12":
      if (id_week == "1")
        scheduleWeek = scheduleWeek_1_sala_12;
      else if (id_week == "2")
        scheduleWeek = scheduleWeek_2_sala_12;
      else if (id_week == "3")
        scheduleWeek = scheduleWeek_3_sala_12;
      break;
    case "13":
      if (id_week == "1")
        scheduleWeek = scheduleWeek_1_sala_13;
      else if (id_week == "2")
        scheduleWeek = scheduleWeek_2_sala_13;
      else if (id_week == "3")
        scheduleWeek = scheduleWeek_3_sala_13;
      break;
    case "14":
      if (id_week == "1")
        scheduleWeek = scheduleWeek_1_sala_14;
      else if (id_week == "2")
        scheduleWeek = scheduleWeek_2_sala_14;
      else if (id_week == "3")
        scheduleWeek = scheduleWeek_3_sala_14;
      break;
    default:
      console.log("não tenho mockdata dessa sala para matriz semana");
  }
  //Alterar quando recebermos JSON
  ////////////////////////////////////////////

  //Matrix Head
  var mh = document.getElementById("matrix_week_head");
  var tr = document.createElement('tr');
  mh.appendChild(tr);
  var th1 = document.createElement('th');
  tr.appendChild(th1);
  for (var i = 0; i < scheduleWeek.dates.length; i++) {
    var th2 = document.createElement('th');
    th2.innerHTML = scheduleWeek.dates[i];
    tr.appendChild(th2);
  }

  //Matrix Body
  var mb = document.getElementById("matrix_week_head");
  for (var i = 0; i < scheduleWeek[0].length; i++) {
    var tr = document.createElement('tr');
    mb.appendChild(tr);
    var th = document.createElement('th');
    th.setAttribute("scope", "row");
    tr.appendChild(th);
    th.innerHTML = i + 8 + " H";
    for (var j = 0; j < scheduleWeek.dates.length; j++) {
      var td = document.createElement('td');
      td.innerHTML = scheduleWeek[j][i];
      tr.appendChild(td);
    }
  }
}
function removeBtnSalas() {
  var divBotoes = document.getElementById("btn_rooms");
  divBotoes.innerHTML = "";
}

function refreshButtons() {
  var divButton = document.getElementById("btn_rooms");
  var id_child = divButton.firstElementChild.id;
  var child = id_child.split("_");
  divButton.innerHTML = " ";
  addBtnRooms();
}

// Adiciona Botões Salas
function addBtnRooms() {
  ////////////////////////////////////////////
  //Alterar quando recebermos JSON
  var idAndar = getActive('list-group-item');
  var rooms;
  switch (idAndar) {
    case "piso-0":
      rooms = rooms_0;
      break;
    case "piso-1":
      var rooms = rooms_1;
      break;
    case "piso-2":
      var rooms = rooms_2;
      break;
    case "piso-3":
      var rooms = rooms_3;
      break;
    case "piso-4":
      var rooms = rooms_4;
      break;
    case "piso-5":
      var rooms = rooms_5;
      break;
    case "piso-6":
      var rooms = rooms_6;
      break;
    case "piso-7":
      var rooms = rooms_7;
      break;
    default:
  }
  //Alterar quando recebermos JSON
  ////////////////////////////////////////////

  var element = document.getElementById("btn_rooms");
  for (var i = 1; i <= rooms.salas.length; i++) {
    var btn = document.createElement('button');
    btn.innerHTML = rooms.salas[i - 1];
    btn.setAttribute("type", "button");
    btn.id = "btn_rooms-" + i;
    btn.classList.add('btn-rooms');
    btn.classList.add('btn');
    btn.classList.add('btn-lg');
    btn.classList.add('btn-default');
    btn.addEventListener("click", defineActiveEvent);
    element.appendChild(btn);
  }
}









selected_hours = [];
//matrix Day
function createMatrixDay() {
    ////////////////////////////////////////////
    //Alterar quando recebermos JSON
    var idSelectedFloor = getActive('list-group-item');
    var tempSelectedFloor = idSelectedFloor.split("-");
    var selectedFloor = parseInt(tempSelectedFloor[1]);
    //Alterar quando recebermos JSON
    ////////////////////////////////////////////

    //Matrix Head
    var mh = document.getElementById("matrix_day_head");
    var tr = document.createElement('tr');
    mh.appendChild(tr);
    var th1 = document.createElement('th');
    th1.innerHTML = '[' + floors.Andares[selectedFloor] + ']';
    tr.appendChild(th1);
    for(var i = 0; i < shedualDay[selectedFloor].length; i++) {
        var th2 = document.createElement('th');
        th2.innerHTML = shedualDay[selectedFloor][i].NomeSala;
        tr.appendChild(th2);
    }

    //Matrix Body
    var mb = document.getElementById("matrix_day_body");
    for(var i = 0; i < shedualDay[selectedFloor][0].Disponibilidade.length; i++) {
        var tr = document.createElement('tr');
        mb.appendChild(tr);
        var th = document.createElement('th');
        th.setAttribute("scope", "row");
        tr.appendChild(th);
        th.innerHTML = i + 8 + " H";
        for(var j = 0; j < shedualDay[selectedFloor].length; j++) {
            var td = document.createElement('td');

            var disponibilidade = shedualDay[selectedFloor][j].Disponibilidade[i];
            if(disponibilidade == 'Disponivel')
                td.classList.add("disponivel");
            else if(disponibilidade == 'Indisponivel')
                td.classList.add("indisponivel");
            else
                td.classList.add("indefinido");
            td.innerHTML = disponibilidade;
            td.id = 'td-'+j+'-'+i;
            td.addEventListener("click", selecionarGrupoMatriz);
            tr.appendChild(td);
        }
    }
}
function selecionarGrupoMatriz(e){
    var newElemet = e.target;

        if(newElemet.classList.contains('active')){
        for(var i=0; i<selected_hours.length; i++){
            if(selected_hours[i] === newElemet.id){
                selected_hours.splice(i,1);
                defineMultiActiveEvent(e);
                break;
            }
        }
    }else{
        if (selected_hours.length==0) {
            defineMultiActiveEvent(e);
            selected_hours.push(e.target.id);
        }else{
            var newElemetSplit =  newElemet.id.split('-');
            var otherElement = selected_hours[0];
            var otherElementSplit =  otherElement.split('-');
            if(newElemetSplit[1] === otherElementSplit[1]){
                defineMultiActiveEvent(e);
                selected_hours.push(e.target.id);
            }else{
                alert('Por favor seleciona na mesma sala');
            }
        }
    }
}
//
// $(function () {
//   var isMouseDown = false,
//     isHighlighted;
//   $("#our_table td")
//     .mousedown(function () {
//       isMouseDown = true;
//       $(this).toggleClass("highlighted");
//       isHighlighted = $(this).hasClass("highlighted");
//       return false; // prevent text selection
//     })
//     .mouseover(function () {
//       if (isMouseDown) {
//         $(this).toggleClass("highlighted", isHighlighted);
//       }
//     })
//     .bind("selectstart", function () {
//       return false;
//     })
//
//   $(document)
//     .mouseup(function () {
//       isMouseDown = false;
//     });
// });
//
//
// create.addEventListener("click", defineActiveEvent);
