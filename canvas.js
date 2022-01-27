let bednumber;
var myModal;
let beds = [];
let bed;
var addbedmodal;
let bedstate = 0;
let occuped = 1;
let free = 0;

function draw() {
    var canvas = document.getElementById('canvas');
    
    if (canvas.getContext) {

        var ctx = canvas.getContext('2d');
        var canvasOffset = $("#canvas").offset();
        var offsetX=canvasOffset.left;
        var offsetY=canvasOffset.top;
        
        OutsideRect();
        bed = (function () {

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

            bed.prototype.setText = function(t){
                this.text = t;
            }
        
            bed.prototype.printText = function(){
                console.log(this.text);
            }

            bed.prototype.setColour = function(f){
                this.fill = f;
            }

            bed.prototype.printColour = function(stroke){
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

            return bed;
        })();

        function OutsideRect() {
            
            ctx.lineWidth = 3;
            ctx.strokeRect(0,0,800,560);
            ctx.strokeRect(0,0,250,560);
            ctx.strokeRect(0,0,550,560);

            ctx.strokeRect(0,140,250,140);
            ctx.strokeRect(0,280,250,140);
            ctx.strokeRect(0,420,250,140);
            //ctx.strokeRect(0,560,250,140);
      

            ctx.strokeRect(550,140,250,140);
            ctx.strokeRect(550,280,250,140);
            ctx.strokeRect(550,420,250,140);
           // ctx.strokeRect(550,560,250,140);

        }

        function handleMouseDown(e) {
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);

            // Onclick
            var clicked = "";
            for (var i = 0; i < beds.length; i++) {
                if (beds[i].isPointInside(mouseX, mouseY)) {
                    clicked += beds[i].id + " "
                }
            }
            if (clicked.length > 0) {
                alert("Clicked bed: " + clicked);
                bednumber = clicked;
                console.log("Selected bed:" + bednumber);   
                myModal = new bootstrap.Modal(document.getElementById('DisplayModal'))
                myModal.show()

            }

            return bednumber;
        }

        
        function handleMouseMove(e) {
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);

            
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

        
       /* var showCurrentBedText = function(){
            beds.forEach(element => {
                element.printText();
            });
        }; */   
        
        // Scalable bed entry
        beds = [];
        beds.push(new bed(1, "BED 1", 30, 40, 10, 10, 100, 50, "green", "black", 4));
        beds.push(new bed(2, "BED 2", 30, 110, 10, 80, 100, 50, "green", "black", 4));
        beds.push(new bed(3, "BED 3", 30, 180, 10, 150, 100, 50, "green", "black", 4));
        beds.push(new bed(4, "BED 4", 30, 250, 10, 220, 100, 50, "green", "black", 4));
        beds.push(new bed(5, "BED 5", 30, 320, 10, 290, 100, 50, "green", "black", 4));
        beds.push(new bed(6, "BED 6", 30, 390, 10, 360, 100, 50, "green", "black", 4));
        beds.push(new bed(7, "BED 7", 30, 460, 10, 430, 100, 50, "green", "black", 4));
        beds.push(new bed(8, "BED 8", 30, 530, 10, 500, 100, 50, "green", "black", 4));
        beds.push(new bed(9, "BED 9", 705, 40, 685, 10, 100, 50, "green", "black", 4));
        beds.push(new bed(10, "BED 10", 705, 110, 685, 80, 100, 50, "green", "black", 4));
        beds.push(new bed(11, "BED 11", 705, 180, 685, 150, 100, 50, "green", "black", 4));
        beds.push(new bed(12, "BED 12", 705, 250, 685, 220, 100, 50, "green", "black", 4));
        beds.push(new bed(13, "BED 13", 705, 320, 685, 290, 100, 50, "green", "black", 4));
        beds.push(new bed(14, "BED 14", 705, 390, 685, 360, 100, 50, "green", "black", 4));
        beds.push(new bed(15, "BED 15", 705, 460, 685, 430, 100, 50, "green", "black", 4));
        beds.push(new bed(16, "BED 16", 705, 530, 685, 500, 100, 50, "green", "black", 4));


        console.log("camas, estado inicial:")

       //change text of bed 2
        /*beds.forEach(element => {
            if(element.id == "BED 2"){
                element.setText("BED 2 MODIFIED BY ID");
            }
        }
        );*/
        
        //change text of any bed with id equals to "BED 2"
        /*beds.forEach(element => {
            if(element.id == "BED 2"){
                element.setText("BED 2 MODIFIED BY ID");
            }
        }
        );
        
        console.log("camas, despues de cambiar estado una busqueda por indice");
        showCurrentBedText();*/
        
        //change text of any bed with color equals to "green"
        /*beds.forEach(element => {
            if(element.fill == "green"){
                element.setText("BED MODIFIED BY COLOR");
            }
        }
        );
        
        console.log("camas, despues de cambiar estado una busqueda por color fill");
        showCurrentBedText();*/
        

        $("#canvas").click(handleMouseDown);
        $("#canvas").mousemove(handleMouseMove);

        /*console.log(bednumber)
        beds[1].setText("BED 2 MODIFIED BY INDEX");
        showCurrentBedText();
        
        console.log("camas, despues de cambiar estado usando indice");
        showCurrentBedText();*/
      
     
        
                
        
        
       
        
    }

    
  }

/*var showCurrentBedText = function(){
    beds.forEach(element => {
        element.printText();
    });
};*/



 