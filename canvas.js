function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {

        var ctx = canvas.getContext('2d');

            for (var i = 0; i < 13; i++) {
                for (var j = 13; j < 16; j++) {
                    ctx.fillStyle = 'rgb(0,0,255)';
                    ctx.fillRect(j * 40, i * 55 , 75, 50);
                }
            }

            for (var i = 0; i < 13; i++) {
                for (var j = 20; j < 23; j++) {
                    ctx.fillStyle = 'rgb(0,0,255)';
                    ctx.fillRect(j * 40, i * 55 , 75, 50);
                }
            }
    }
  }