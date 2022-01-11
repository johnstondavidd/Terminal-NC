function draw() {
    var canvas = document.getElementById('canvas');
    
    if (canvas.getContext) {

        var ctx = canvas.getContext('2d');

        ctx.lineWidth = 3;
        ctx.strokeRect(0,0,800,980);
        ctx.strokeRect(0,0,250,980);
        ctx.strokeRect(0,0,550,980);

        ctx.strokeRect(0,140,250,140);
        ctx.strokeRect(0,280,250,140);
        ctx.strokeRect(0,420,250,140);
        ctx.strokeRect(0,560,250,140);
        ctx.strokeRect(0,700,250,140);

        ctx.strokeRect(550,140,250,140);
        ctx.strokeRect(550,280,250,140);
        ctx.strokeRect(550,420,250,140);
        ctx.strokeRect(550,560,250,140);
        ctx.strokeRect(550,700,250,140);

        var bed1 = new Path2D();
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
        bed1.rect(10, 10, 100, 50);
        ctx.fillStyle = 'green';
        ctx.fill(bed1);
        ctx.font = '20px serif';
        ctx.fillStyle = 'white';
        ctx.fillText('BED 1', 30, 40);
        

        var bed2 = new Path2D();
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
        bed2.rect(10, 80, 100, 50);
        ctx.fillStyle = 'green';
        ctx.fill(bed2);
        ctx.font = '20px serif';
        ctx.fillStyle = 'white';
        ctx.fillText('BED 2', 30, 110);

        var bed3 = new Path2D();
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
        bed3.rect(10, 150, 100, 50);
        ctx.fillStyle = 'green';
        ctx.fill(bed3);
        ctx.font = '20px serif';
        ctx.fillStyle = 'white';
        ctx.fillText('BED 3', 30, 180);
        

        var bed4 = new Path2D();
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
        bed4.rect(10, 220, 100, 50);
        ctx.fillStyle = 'green';
        ctx.fill(bed4);
        ctx.font = '20px serif';
        ctx.fillStyle = 'white';
        ctx.fillText('BED 4', 30, 250);
    }
  }