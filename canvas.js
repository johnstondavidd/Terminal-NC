function draw() {
    var canvas = document.getElementById('canvas');
    
    if (canvas.getContext) {

        var ctx = canvas.getContext('2d');
        var canvasOffset = $("#canvas").offset();
        var offsetX=canvasOffset.left;
        var offsetY=canvasOffset.top;
        OutsideRect();
        var bed = (function () {

            // BED Class
            function bed(id, text, xt, yt, x, y, width, height, fill, stroke, strokewidth) {
                this.id = id;
                this.text = text;
                this.xt = xt;
                this.yt = yt;
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.fill = fill;
                this.stroke = stroke;
                this.strokewidth = strokewidth || 2;
                this.redraw(this.x, this.y);
                return (this);
            }
            bed.prototype.redraw = function (x, y) {
                this.x = x || this.x;
                this.y = y || this.y;
                this.draw(this.stroke);
                return (this);
            }
            

            bed.prototype.highlight = function (x, y) {
                this.x = x || this.x;
                this.y = y || this.y;
                this.draw("orange");
                OutsideRect();
                return (this);
            }

            
            bed.prototype.draw = function (stroke) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = this.fill;
                ctx.strokeStyle = stroke;
                ctx.lineWidth = this.strokewidth;
                ctx.shadowOffsetX = 3;
                ctx.shadowOffsetY = 3;
                ctx.shadowBlur = 3;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
                ctx.fill();
                ctx.font = '20px serif';
                ctx.fillStyle = 'white';
                ctx.fillText(this.text, this.xt, this.yt);
                ctx.restore();
            }

            bed.prototype.isPointInside = function (x, y) {
                return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);  
            }

            return bed;
        })();

        function OutsideRect() {
            
            ctx.lineWidth = 3;
            ctx.strokeRect(0,0,800,700);
            ctx.strokeRect(0,0,250,700);
            ctx.strokeRect(0,0,550,700);

            ctx.strokeRect(0,140,250,140);
            ctx.strokeRect(0,280,250,140);
            ctx.strokeRect(0,420,250,140);
            ctx.strokeRect(0,560,250,140);
      

            ctx.strokeRect(550,140,250,140);
            ctx.strokeRect(550,280,250,140);
            ctx.strokeRect(550,420,250,140);
            ctx.strokeRect(550,560,250,140);

        }

        function handleMouseDown(e) {
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);

            // Put your mousedown stuff here
            var clicked = "";
            for (var i = 0; i < beds.length; i++) {
                if (beds[i].isPointInside(mouseX, mouseY)) {
                    clicked += beds[i].id + " "
                }
            }
            if (clicked.length > 0) {
                alert("Clicked bed: " + clicked);
            }
        }

        //
        function handleMouseMove(e) {
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);

            // Put your mousemove stuff here
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < beds.length; i++) {
                if (beds[i].isPointInside(mouseX, mouseY)) {
                    beds[i].highlight();
                    OutsideRect();
                } else {
                    beds[i].redraw();
                    OutsideRect();
                }
            }
        }



        // Scalable bed entry
        var beds = [];
        beds.push(new bed("BED 1", "BED 1", 30, 40, 10, 10, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 2", "BED 2", 30, 110, 10, 80, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 3", "BED 3", 30, 180, 10, 150, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 4", "BED 4", 30, 250, 10, 220, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 5", "BED 5", 30, 320, 10, 290, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 6", "BED 6", 30, 390, 10, 360, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 7", "BED 7", 30, 460, 10, 430, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 8", "BED 8", 30, 530, 10, 500, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 9", "BED 9", 30, 600, 10, 570, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 10", "BED 10", 30, 670, 10, 640, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 11", "BED 11", 705, 40, 685, 10, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 12", "BED 12", 705, 110, 685, 80, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 13", "BED 13", 705, 180, 685, 150, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 14", "BED 14", 705, 250, 685, 220, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 15", "BED 15", 705, 320, 685, 290, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 16", "BED 16", 705, 390, 685, 360, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 17", "BED 17", 705, 460, 685, 430, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 18", "BED 18", 705, 530, 685, 500, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 19", "BED 19", 705, 600, 685, 570, 100, 50, "green", "black", 4));
        beds.push(new bed("BED 20", "BED 20", 705, 670, 685, 640, 100, 50, "green", "black", 4));

        $("#canvas").click(handleMouseDown);
        $("#canvas").mousemove(handleMouseMove);
        
    }
  }