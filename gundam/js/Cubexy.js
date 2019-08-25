$.fn.extend({
    Cubexy: function(options) {
        var Cubexy = this;
        var id = $(Cubexy).attr('id');
        defaults = {
            idDownload: 'download',
            idRandom: 'randomize',
            idCanvas: 'canvas',
            imgSrc: 'src',
            activeItem: 'active'
        }

        var options = $.extend({}, defaults, options);
        var idDownload = options.idDownload;
        var idRandom = options.idRandom;
        var Canvas = options.idCanvas;
        var imgSrc = options.imgSrc;
        var activeItem = options.activeItem;

        var canvas = document.getElementById(Canvas);
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, ctx.width, ctx.height);

        var base_image = [];

        renderAvatar();

        // handle click selection
        $('#' + id + ' > div >img').click(function() {
            $(this).parent().children('img').removeClass(activeItem);
            $(this).addClass(activeItem);

            renderAvatar();
        });

        function renderAvatar() {
            canvasImgArray = 0;
            
            resetCanvas();

            $('#' + id + ' > div').each(function() {
                menuID = $(this).attr('id');
                $('#' + menuID + ' >img').each(function() {
                    if ($(this).hasClass(activeItem)) {
                        base_image[canvasImgArray] = new Image();
                        base_image[canvasImgArray].src = $(this).attr(imgSrc);
                        base_image[canvasImgArray].enabled = true;
                        base_image[canvasImgArray].onload = function() {

                            ctx.drawImage(this, 0, 0, this.width, this.height,     // source rectangle
                            0, 0, canvas.width, canvas.height);
                        }
                        canvasImgArray++;
                       
                    }
                });
            });
        }

        // download image


        $('#' + idDownload).click(function() {
            var dataURL = canvas.toDataURL('image/png');
            $('#' + idDownload).attr('href', dataURL);
            $('#' + idDownload).attr('download', "gundam_avatar@2x.png");
        });

        // reset canvas
        function resetCanvas() {
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0,  canvas.width, canvas.height);
        };


        // randomize
        function randomize(e) {
            var elementLength = e.length;
            var randomElement = Math.floor( Math.random() * elementLength );
            e.eq(randomElement).addClass(activeItem);
        }

        $('#' + idRandom).click(function() {
            $('.img-thumbnail').removeClass(activeItem);
            resetCanvas();
            randomize($(".bg-item"));
            randomize($(".face-item"));
            randomize($(".horn-item"));
            randomize($(".chin-item"));
            randomize($(".eye-item"))

            renderAvatar();
        });

        // select tab
        $('#menu span').click(function(){
          $('.tab-active').removeClass('tab-active');
          $(this).addClass('tab-active');
          $('#avatar >div').hide();
          $('#avatar >div#'+$(this).attr('data-tab')).show();
        });
    }
});