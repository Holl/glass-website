var indexChange = 0;
var colorArray = [ '#ace699', '#9f99e6', '#99e6df', '#cc99e6', '#99bfe6', '#e69999'];
var superCount = 0;
var colorCount = 0;
var mouseOverAble = 1;
var invsCount = 0;
var invsId = [];
var musicStart = 0;
var dance;
var shift;
var shiftFullCount = 0;
var shiftCount = 0;
var userIsNotPlaying;

var glassPoints = [
  [{x: 195, y: 10}, {x:0,y:180}, {x:155, y:210}],
  [{x: 200, y:10}, {x:250, y:190}, {x:160, y:210}],
  [{x: 255, y:190}, {x: 205, y:10}, {x: 400, y: 410}],
  [{x: 405, y:190}, {x: 210, y: 10}, {x:405, y:410}],
  [{x:400,y:415}, {x:0, y:400}, {x: 250, y:195}],
  [{x:0, y:265}, {x:0, y:395}, {x:245, y:195}],
  [{x:0, y:185}, {x:155, y: 215}, {x:0, y:255}],
  [{x:200, y:615}, {x:0, y:405}, {x:250, y:415}],
  [{x:200, y:620}, {x:0, y:410}, {x:0, y:695}],
  [{x:200, y:625}, {x:0, y:700}, {x:200, y:700}],
  [{x:205, y:620}, {x:205, y:700}, {x:400, y:510}, {x:255, y:415}],
  [{x:700, y:500}, {x:400, y:505}, {x:260, y:415}],
  [{x:700, y:495}, {x:700, y:436}, {x:280, y:415}],
  [{x:405, y:510}, {x:210, y:700}, {x:700, y:700}],
  [{x:410, y:510}, {x:700, y:600}, {x:700, y:700}],
  [{x:415, y:510}, {x:700, y:505}, {x:700, y:595}],
  [{x:410, y:417}, {x:410, y:200}, {x:500, y:422}],
  [{x:700, y:217}, {x:700, y:430}, {x:505, y:422}],
  [{x:700, y:207}, {x:430, y:230}, {x:503, y:415}],
  [{x:700, y:107}, {x:430, y:220}, {x:503, y:115}],
  [{x:700, y:117}, {x:430, y:225}, {x:700, y:200}],
  [{x:400, y:0}, {x:370, y:100}, {x:425, y:220}, {x:580, y:0}],
  [{x:405, y:185}, {x:205, y:0}, {x:320, y:0}],
  [{x:368, y:95}, {x:325, y:0}, {x:395, y:0}],
  [{x:507, y:110}, {x:590, y:0}, {x:700, y:100}],
  // the H:
  [{x:129, y:610}, {x:129, y:97}, {x:248, y:97}, {x:248, y:311}, {x:457,y:311}, {x:457, y:97}, {x:577, y:97}, {x:577, y:610}, {x:457, y:610},
    {x:457, y:392}, {x:248, y:392}, {x:248, y:610}]
  ];

  $(document).ready(function() {
    $("#circle").fadeIn(1000);
    $("#links").fadeIn(1000);
    startTheShow = window.setTimeout(glassShift, 2500);

    userIsNotPlaying = window.setInterval(function(){
      console.log("User is not playing, keep the colors.");
      glassShift();
    }, 14500);
    userIsNotPlaying;
    var diameter = resizeCircle();

    glassGenerator(glassPoints, diameter, null);

    var doit = '';
    window.onresize = function(){
      clearTimeout(doit);
      doit = setTimeout(function(){
        diameter = resizeCircle();
        glassGenerator(glassPoints, diameter, $('#polyhold').children());
      }, 100);
    };
  })

  function colorSwap(allColors, superCount, target) {
    var indexRound = Math.floor((superCount / 50));
    target.css('fill', allColors[indexRound]);
    if (indexChange != indexRound){
      indexChange = indexRound;
      $('#links a').animate({color: allColors[indexRound]}, 500);
      $('#links h1').animate({color: allColors[indexRound]}, 500);
    }
  }

  function instrumentsToNote(musicObject, milisecondsPerBeat, audioFile){
    var theBeat = 0;
    var audio = new Audio(audioFile);
    audio.play();
    setInterval(function(){
      // Loop through each instrument
      for (var x = 0; x< musicObject.length; x++){
        // Loop through each note
        for (var y = 0; y < musicObject[x].length; y++){
          if (musicObject[x][y]['startingBeat'] == theBeat){
            noteInfo = musicObject[x][y];
            noteToGlass(Math.floor((Math.random() * 25) + 1), noteInfo['length'], noteInfo['fadeInTime'], noteInfo['fadeOutTime'], colorArray[Math.floor(Math.random() * 5)]);
          }
        }
      }
      theBeat++;
    }, milisecondsPerBeat);
  }

  function noteToGlass (note, length, fadeInTime, fadeOutTime, soundColor) {
    if (note){
      if (!fadeInTime){
        fadeInTime = "fast";
      }
      if (!fadeOutTime){
        fallOutTime = "fast"
      }
      $('#poly' + note).css('fill', soundColor);
      $('#poly' + note).fadeTo(fadeInTime, 1, function(){
        // and then?
      });
      setTimeout(function(){
        $('#poly' + note).fadeTo(fadeOutTime, .5, function(){
          // and THEN?!
        });
      }, length);
    }
  }

  function glassGenerator(brokenGlass, diameter, currentGlass){
    if (dance){
      clearInterval(dance);
    }

    var glassInnerHtml = '';
    var pointCollect = '';
    var diameterRatio = diameter/700;
    for (var polyCount = 0; polyCount < brokenGlass.length ; polyCount++){
      pointCollect = '';
      for (var pointCount = 0; pointCount < brokenGlass[polyCount].length; pointCount++){
        var coords = brokenGlass[polyCount][pointCount];
        pointCollect += (coords['x'] * diameterRatio)  + "," + (coords['y'] * diameterRatio) + " ";
      }
      var indexOneCount = polyCount + 1;
      var stylePass = '';
      if (currentGlass != null){
        stylePass = currentGlass[polyCount].getAttribute("style");
      }
      if (brokenGlass.length == (polyCount + 1)){
        glassInnerHtml += "<polygon id='h' points='"+pointCollect+"' />";
      }
      else{
        glassInnerHtml += "<polygon id='poly"+indexOneCount+"' class='poly' points='"+pointCollect+"' style='"+stylePass+"' />"
      }

    }
    $('#polyhold').html(glassInnerHtml);
    if (diameter >= 450){
      prepListeners();
    }
  }

  function prepListeners(){

    $( "#links a, #links h1" ).mouseover(function() {
      $(this).fadeTo( 100 , 1, function() {
      });
    });
    $( "#links a, #links h1" ).mouseleave(function() {
      $(this).fadeTo( 100 , .5, function() {
      });
    });
    $( ".poly" ).mouseover(function() {
      console.log("Mouseover");
      window.clearTimeout(userIsNotPlaying);
      if (dance){
        clearInterval(dance);
      }
      if (shift){
        clearInterval(shift);
        shiftCount = 0;
        shiftFullCount = 0;
      }

      userIsNotPlaying;


      if (((colorArray.length) * 50) < superCount) {
        if ($.inArray($(this).attr('id'), invsId)==-1){
          invsCount ++;
          invsId.push($(this).attr('id'));
          $(this).fadeTo( "fast" , 0, function() {});
        }
      }
      else {
        $(this).fadeTo( 100, 1, function() {
          colorSwap(colorArray, superCount, $(this));
        });
      }
    });
    $( ".poly" ).mouseleave(function() {
      if (((colorArray.length) * 50) > superCount) {
        $(this).fadeTo( 100, .5, function() {
          superCount++;
        });
      }
      if (invsCount == 25 && !musicStart){
        musicStart = 1;
        setTimeout(instrumentsToNote(fullInstruments, 250, 'tuning.mp3'), 10000);
      }
    });
  }

  function resizeCircle(){
    var height = window.innerHeight;
    var width = window.innerWidth;
    var diameter = 0;
    if (height <= width){
      diameter = height * .75;
    }
    else{
      diameter = width * .75;
    }
    $('#circle').css('height', diameter);
    $('#circle').css('width', diameter);
    $('#polyhold').attr('height', diameter);
    $('#polyhold').attr('width', diameter);
    return diameter;
  }

  function glassDance(){
    setTimeout(function(){
      dance = setInterval(function(){
        noteToGlass(Math.floor((Math.random() * 25) + 1), 500, 300, 300, colorArray[Math.floor(Math.random() * 5)]);
      }, 100);
    }, 3000)
  }

  function glassShift(){
    var countArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
    var randomizer = shuffle(countArray);
    shiftCount = 0;
    if (shiftFullCount > colorArray.length){
      window.clearTimeout(userIsNotPlaying);
      glassDance();
    }
    else {
      $('#links a').animate({color: colorArray[shiftFullCount]}, 6000);
      $('#links h1').animate({color: colorArray[shiftFullCount]}, 6000);

      shift = setInterval(function(){
        if (shiftCount > 25){
          console.log("Shift cleared.");
          shiftFullCount++;
          clearInterval(shift);
        }
        else{
          noteToGlass(countArray[shiftCount], 500, 200, 200, colorArray[shiftFullCount]);
          shiftCount++;
        }
      }, 250)

    }
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  var fullInstruments =
  [
    // Oboe
    [
      {startingBeat: 1, note: 13, length:15000, fadeInTime:300, fadeoutTime:300, soundColor: 'red'},
      {startingBeat: 100, note: 13, length:15000, fadeInTime:300, fadeoutTime:300, soundColor: 'red'},
    ],
    // Violins
    [
      {startingBeat: 14, note: 7, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 20, note: 25, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 22, note: 1, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 24, note: 17, length:300, fadeInTime:300, fadeoutTime:300, soundColor: '#e69999'},
      {startingBeat: 25, note: 13, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 26, note: 15, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 27, note: 17, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 28, note: 5, length:300, fadeInTime:300, fadeoutTime:300, soundColor: '#e69999'},
      {startingBeat: 29, note: 21, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 30, note: 7, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'yellow'},
      {startingBeat: 31, note: 25, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 32, note: 23, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 33, note: 1, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 34, note: 3, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 35, note: 17, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'yellow'},
      {startingBeat: 36, note: 13, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 37, note: 15, length:300, fadeInTime:300, fadeoutTime:300, soundColor: '#e69999'},
      {startingBeat: 38, note: 17, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 39, note: 5, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 40, note: 21, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 41, note: 7, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 42, note: 25, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'yellow'},
      {startingBeat: 43, note: 23, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 44, note: 1, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 45, note: 3, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 46, note: 17, length:300, fadeInTime:300, fadeoutTime:300, soundColor: '#e69999'},
      {startingBeat: 47, note: 13, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 48, note: 15, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'yellow'},
      {startingBeat: 49, note: 17, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 50, note: 5, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 51, note: 21, length:700, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 52, note: 7, length:700, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 53, note: 25, length:700, fadeInTime:300, fadeoutTime:300, soundColor: 'yellow'},
      {startingBeat: 54, note: 23, length:700, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 55, note: 1, length:700, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 56, note: 3, length:700, fadeInTime:300, fadeoutTime:300, soundColor: '#e69999'},
      {startingBeat: 57, note: 17, length:700, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 58, note: 13, length:700, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 59, note: 15, length:300, fadeInTime:300, fadeoutTime:300, soundColor: '#e69999'},
      {startingBeat: 60, note: 17, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 61, note: 5, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'yellow'},
      {startingBeat: 62, note: 21, length:300, fadeInTime:300, fadeoutTime:250, soundColor: 'green'},
      {startingBeat: 63, note: 25, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 64, note: 1, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 65, note: 17, length:300, fadeInTime:300, fadeoutTime:300, soundColor: '#e69999'},
      {startingBeat: 66, note: 13, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 67, note: 15, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 68, note: 17, length:300, fadeInTime:300, fadeoutTime:300, soundColor: '#e69999'},
      {startingBeat: 69, note: 5, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'yellow'},
      {startingBeat: 70, note: 21, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 71, note: 25, length:300, fadeInTime:300, fadeoutTime:300, soundColor: '#e69999'},
      {startingBeat: 72, note: 23, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 73, note: 1, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 74, note: 3, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 75, note: 17, length:300, fadeInTime:300, fadeoutTime:300, soundColor: '#e69999'},
      {startingBeat: 76, note: 13, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 77, note: 15, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 78, note: 17, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 79, note: 5, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'yellow'},
      {startingBeat: 80, note: 21, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 81, note: 7, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'yellow'},
      {startingBeat: 82, note: 25, length:700, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 83, note: 23, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 84, note: 1, length:300, fadeInTime:300, fadeoutTime:300, soundColor: '#e69999'},
      {startingBeat: 85, note: 3, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 87, note: 13, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 88, note: 15, length:700, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
      {startingBeat: 90, note: 5, length:300, fadeInTime:300, fadeoutTime:300, soundColor: 'green'},
    ],
    // Cello
    [
      // {startingBeat: 6, note: 7, length:700, fadeInTime:300, fadeoutTime:300, soundColor: 'yellow'}
    ]
  ]
