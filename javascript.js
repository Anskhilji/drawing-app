$(function () {



    // declare variables

    // paintingErasing or nor
    var paint = false;

    // painting or erasing
    var paint_erase = "paint";

    // get the canvas and context
    var canvas = document.getElementById("paint");
    var context = canvas.getContext("2d");

    // get the canvas container
    var container = $("#container");

    // mouse position
    var mouse = { x: 0, y: 0 };

    // onload load saved work on local storage
    if (localStorage.getItem("canvasImage") != null) {
        var img = new Image();
        img.onload = function () {
            context.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("canvasImage");
    };
    // set drawing Parameters(lineWidth, lineJoin, lineCap)
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";

    // click inside container
    container.mousedown(function (e) {
        paint = true;
        context.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.moveTo(mouse.x, mouse.y);
    });

    // move the mouse while holding mouse key
    container.mousemove(function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

        if (paint == true) {
            if (paint_erase == "paint") {
                // get color input
                context.strokeStyle = $("#paintColor").val();
            } else {
                // white color
                context.strokeStyle = "white";
            }
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }
    });

    // mouseUp-> we are not paintingErasing anymore
    container.mouseup(function () {
        paint = false;
    });

    // if we leave the container we are not paintingErasing anymore
    container.mouseleave(function () {
        paint = false;
    });

    // click on reset button
    $("#reset").click(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $('#erase').removeClass("eraseMode");
    });
    // click on the save button
    $("#save").click(function () {
        if (typeof (localStorage) != null) {
            localStorage.setItem("canvasImage", canvas.toDataURL());
            // window.alert(localStorage.getItem("canvasImage"));
        } else {
            window.alert("your browser does not support local storage");
        }
    });
    // click on the erase button
    $("#erase").click(function () {
        if (paint_erase == "paint") {
            paint_erase = "erase";
        } else {
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");

    });
    // change color input
    $("#paintColor").change(function () {
        $("#circle").css("background-color", $(this).val());
    });
    // change lindWidth using slider
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function (event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        }
    });
    // functions














    // just for learning how to use canvas

    // var canvas = document.getElementById('paint');
    // var context = canvas.getContext('2d');

    // // draw a line
    // // declare a new path
    // context.beginPath();

    // // set the line width
    // context.lineWidth = 40;
    // // set the line color
    // context.strokeStyle = '#42e565';
    // // set cap to the line (round, butt, square)
    // context.lineCap = "round";
    // // set line join style(bevel,round,miter);
    // context.lineJoin = "round";
    // // position the context point
    // context.moveTo(50, 50);
    // // draw a straight line from starting point to a new position
    // context.lineTo(200, 200);
    // // draw another line
    // context.lineTo(400, 100);
    // // visible the line
    // context.stroke();
});
