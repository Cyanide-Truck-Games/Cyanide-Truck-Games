var ed_balls = 0;
var edBalls = 0;
var ed_Balls = false;

$(document).ready( function () {

  $('#test').on('keyup', edballs);

});

function edballs() {
  
  var d = new Date();
  
  var _ed_balls = "Hello, how are you";
  var _edballs = $('#test').val();
  var _edBalls = '';
  
  for(var i = 0; (i < _edballs.length) && (i < _ed_balls.length); i++) {
  
    if(_ed_balls[i].toLowerCase() == _edballs[i].toLowerCase()) {
      _edBalls += _ed_balls[i];
    }
    
  }
  
  $('#test').val(_edBalls);
  
  if(ed_Balls == false &&
     ( (_edBalls == "H" && _edballs.length == 1) ||
       (_edBalls == "He" && _edballs.length == 2) ||
       (_edBalls == "Hel" && _edballs.length == 3)
       )
    ) {
  
    // start the game!
    ed_Balls = true;
    $('#instructions > p').html('Go! Go! Go! <br> Type the sentance quickly and improve your score');
    ed_balls = d.getTime();
  
  }
  
  if ((_edBalls == _ed_balls) && ed_Balls) {
    
    // end the game!
    var finaltime = (d.getTime() - ed_balls)/1000;
    ed_Balls = false;
    
    ed_balls = 0;
    
    var reactions = ['FASTER THAN LIGHT!','AS FAST AS SOUND!','IMMENSE POWER!','SPEEDIEST','Speedier','Speedy',"You're getting fast!","You're speeding up!","You're getting there","You're too slow :("];
    var reaction = Math.floor((finaltime - 2)*10);
    if (reaction < 0) { reaction = 0; }
    if (reaction > 9) { reaction = 9; }
    
    
      
    var judgment;
      
    if(edBalls > 0) {
    
      if(edBalls >= finaltime) {
        document.getElementById('best').play()
        edBalls = finaltime;
        judgment = 'Personal best! ' + finaltime.toString() + ' seconds!';
        
      } else {
        document.getElementById('win').play()
        judgment = 'Done in ';
        judgment +=  finaltime.toString() + ' seconds! <small>(Your best: ' + edBalls.toString() + ')</small>';
        
      }

    
    } else {
        document.getElementById('win').play()
      judgment = 'Done in ' + finaltime.toString() + ' seconds.';
      edBalls = finaltime;
    
    }
    
    judgment += '<br>Rating: ' + reactions[reaction];
    
    $('#instructions > p').html(judgment);
    $('#test').val('');
    
  }
  
}