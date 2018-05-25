(function() {

    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true, color_r="255",color_g="255",color_b="255";
    var data_colors = {};
    data_colors['red']      = "#FFAAAA";
    data_colors['blue']     = "#74C6FF";
    data_colors['green']    = "#BAFF97";
    data_colors['orange']   = "#FFC690";
    data_colors['violet']   = "#D798DF";
    data_colors['grey']     = "#FFFFFF";
    // Main


    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < width*0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);

        var obj=document.getElementsByClassName('color_site');
        for (var i = obj.length - 1; i >= 0; i--) {
            obj[i].addEventListener('click',color);
        };
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }



    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function color(){

        var color_to=hexToRgb(data_colors[this.getAttribute('data-color')]);
        color_r=color_to.r;
        color_g=color_to.g;
        color_b=color_to.b;
    }

    /** Animation */
    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
        })();

        // Initialisation aléatoire du point
        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = height+Math.random()*100;
            _this.alpha = 0.1+Math.random()*0.5;
            _this.scale = 0.1+Math.random()*0.3;
            _this.velocity = Math.random();
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }


            //On n'oublie pas de récupérer le canvas et son context.


            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;


            /** Faire des triangles **/
            /**
            ctx.beginPath();//On démarre un nouveau tracé
            ctx.moveTo(_this.pos.x, _this.pos.y);//On se déplace au coin inférieur gauche
            ctx.lineTo(_this.pos.x+_this.scale*10, _this.pos.y+_this.scale*10);
            ctx.lineTo(_this.pos.x+_this.scale*20, this.pos.y+_this.scale*10);
            ctx.lineTo(_this.pos.x-_this.scale*10,this.pos.y+_this.scale*10);

            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.fill();
            ctx.closePath();
            **/

            /** Faire des disques **/
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba('+color_r+','+color_g+','+color_b+','+ _this.alpha+')';
            ctx.fill();


        };
    }

})();

;(function(){

            // Menu settings
            $('#menuToggle, .menu-close').on('click', function(){
                $('#menuToggle').toggleClass('active');
                $('body').toggleClass('body-push-toleft');
                $('#theMenu').toggleClass('menu-open');
            });


})(jQuery)