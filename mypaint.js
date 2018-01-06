var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var e = this;
var actif;
var colorrempli = document.getElementById('colorplein').value;


var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));


var mouse = {x: 0, y: 0};



    function chooseColor() {
      // ctx.globalCompositeOperation = 'source-over';
      // ctx.lineWidth =  document.getElementById('taille').value;
      ctx.strokeStyle = document.getElementById('colorline').value;
    }

    function taillepicker() {
      // ctx.strokeStyle = document.getElementById('color').value;
      ctx.lineWidth =  document.getElementById('taille').value;
    }

    function colorplein() {
     colorrempli = document.getElementById('colorplein').value;
   }


   ctx.strokeStyle = document.getElementById('colorline').value;
   ctx.lineWidth =  document.getElementById('taille').value;
   ctx.lineJoin = 'round';
   ctx.lineCap = 'round';



   canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  }, false);

   var truc = 0;

   $('.outils').click(function() {
     actif = $(this).data('name');
     // console.log($._data($('#myCanvas')[0], 'events'));
     if (actif == 'gomme') {
      truc == 3;

      // console.log('jesuisunegomme');
      ctx.globalCompositeOperation = 'destination-out';
      paintPencil();

    } else if (actif == 'crayon') {
      // console.log('jesuisuncrayon');
      ctx.globalCompositeOperation = 'source-over';
      truc = 1;
      paintPencil();

    } else if (actif == 'ligne') {
      truc = 2;
      // console.log('jesuisuneligne');
      ctx.globalCompositeOperation = 'source-over';
      paintLigne();
    } else if (actif == 'cercle-vide') {
      truc = 4;
      // console.log('jesuisuncerclevide');
      ctx.globalCompositeOperation = 'source-over';

      cercleVide();
    } else if (actif == 'cercle-rempli') {
      truc = 5;
      // console.log('jesuisuncerclerempli');
      ctx.globalCompositeOperation = 'source-over';

      cercleRempli();
    } else if (actif == 'rect-vide') {
      truc = 6;
      // console.log('jesuisunrectanglevide');
      ctx.globalCompositeOperation = 'source-over';

      rectangleVide();
    } else if (actif == 'rect-rempli') {
      truc = 7;
      // console.log('jesuisunrectanglerempli');
      ctx.globalCompositeOperation = 'source-over';

      rectangleRempli();
    }

  })

  function paintPencil () {
    canvas.addEventListener('mousedown', function(e) {
      ctx.lineWidth =  document.getElementById('taille').value;
      ctx.strokeStyle = document.getElementById('colorline').value;
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
      canvas.removeEventListener('mousemove', onPaint, false);
      canvas.removeEventListener('mousedown', onPaint, false);
      ctx.closePath();
    }, false);

    var onPaint = function() {
      if (truc == 1 || truc == 3) {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    };

  }

  arrivee_x = mouse.x;
  arrivee_y = mouse.y;



  function paintLigne () {
   var depart_y;
   var arrivee_x;
   var arrivee_y;
   var count_click = 0;
   $('#myCanvas').click(function(event) {
    if (truc == 2) {
      count_click ++; 
      if (count_click & 1) {
        depart_x = mouse.x;
        depart_y = mouse.y;
        console.log('depart : ' + depart_x + ', ' + depart_y);
      }
      else
      {
        arrivee_x = mouse.x;
        arrivee_y = mouse.y;
        console.log('arrivee : ' + arrivee_x + ', ' + arrivee_y);
        ctx.lineWidth =  document.getElementById('taille').value;
        ctx.strokeStyle = document.getElementById('colorline').value;
        ctx.beginPath();
        ctx.moveTo(depart_x, depart_y);
        ctx.lineTo(arrivee_x, arrivee_y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  });

 }



 var count_circle = 0;
 var cir_x;
 var cir_y;
 var cira_x;
 var cira_y;

 function cercleVide () {

  canvas.addEventListener('mousedown', function(e) { 
    cir_x = mouse.x;
    cir_y = mouse.y;
    ctx.beginPath();
    ctx.lineWidth =  document.getElementById('taille').value;
    ctx.strokeStyle = document.getElementById('colorline').value;
  }, false);

  canvas.addEventListener('mouseup', function(e) { 
    if (truc == 4) {

      cira_x = mouse.x;
      cira_y = mouse.y;
      ctx.arc(cir_x, cir_y, cira_x - cir_x, 0, 2 * Math.PI);
      ctx.stroke();
    }
    ctx.lineWidth =  document.getElementById('taille').value;
    ctx.strokeStyle = document.getElementById('colorline').value;
    ctx.closePath();
  }, false);


}

function cercleRempli () {

  canvas.addEventListener('mousedown', function(e) { 
    cir_x = mouse.x;
    cir_y = mouse.y;
    ctx.beginPath();
    ctx.lineWidth =  document.getElementById('taille').value;
    ctx.strokeStyle = document.getElementById('colorline').value;

  }, false);

  canvas.addEventListener('mouseup', function(e) { 
    if (truc == 5) {

      cira_x = mouse.x;
      cira_y = mouse.y;
      ctx.arc(cir_x, cir_y, cira_x - cir_x, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.fillStyle=colorrempli;
    }
    ctx.closePath();
  }, false);


}

var rec_x;
var rec_y;
var reca_x;
var reca_y;


function rectangleVide () {
  canvas.addEventListener('mousedown', function(e) {
    rec_x = mouse.x;
    rec_y = mouse.y;
    ctx.beginPath();
    //console.log('je suis un rectangle');
    //ctx.lineWidth =  document.getElementById('taille').value;
    //ctx.strokeStyle = document.getElementById('color').value;
    //ctx.fillRect(mouse.x, mouse.y, 130, 150);

  }, false);

  canvas.addEventListener('mouseup', function() {
    if (truc == 6) {
      reca_x = mouse.x;
      reca_y = mouse.y;
      ctx.rect(rec_x, rec_y, (reca_x - rec_x), (reca_y - rec_y));

      ctx.stroke();
    }
    ctx.lineWidth =  document.getElementById('taille').value;
    ctx.strokeStyle = document.getElementById('colorline').value;
    ctx.closePath();
  }, false);

}


function rectangleRempli () {
  canvas.addEventListener('mousedown', function(e) {
    rec_x = mouse.x;
    rec_y = mouse.y;
    ctx.beginPath();


  }, false);

  canvas.addEventListener('mouseup', function() {
    if (truc == 7) {
      reca_x = mouse.x;
      reca_y = mouse.y;

      ctx.rect(rec_x, rec_y, (reca_x - rec_x), (reca_y - rec_y));

      ctx.stroke();
      ctx.fill();
      ctx.fillStyle=colorrempli;
    }
    ctx.lineWidth =  document.getElementById('taille').value;
    ctx.strokeStyle = document.getElementById('colorline').value;
    ctx.closePath();
  }, false);

}


   var fileName;
   var anchor = document.querySelector('a');
   var link = document.getElementById('a');
   anchor.addEventListener('click', onClickAnchor);
   function onClickAnchor(e){
    fileName = 'image' + Math.floor((Math.random() * 1000) + 1) + '.png';
    link.setAttribute('download', fileName);
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  }

  $(function () {
    $(":file").change(function () {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
      }
    });
  });

  function imageIsLoaded(e) {
    var imgs = new Image();
    imgs.src = e.target.result;
    imgs.onload = function(){
      ctx.drawImage(imgs,150,150, 1580, 975);
    }
  };











