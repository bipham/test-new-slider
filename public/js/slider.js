// /**
//  * Created by nobikun1412 on 24-Mar-17.
//  */
var isHover = false;
var slideIndex = 0;
var sliderDetail;
var sliderDetailTotal;
var oldIndexOverview;
var conveyor = jQuery(".content-conveyor", jQuery("#sliderContent"));
var item = jQuery(".item", jQuery("#sliderContent"));
var thumbnailScroll = jQuery('#bx-pager');
var li_thumbnail = jQuery('ul.thumbnail-list-img li');
var ul_thumbnail = jQuery('ul.thumbnail-list-img');
var widthThumbnailScroll = li_thumbnail.length * parseInt(li_thumbnail.css("width"));
var widthBxPager = 0;       
       
        
        //set length of conveyor
conveyor.css("width", item.length * parseInt(item.css("width")));

li_thumbnail.each(function(){
    widthBxPager = widthBxPager + parseInt(jQuery(this).css("width"));
});
    console.log('widthThumbnailScroll: ' + widthBxPager);

        thumbnailScroll.css("width", widthBxPager + 40);

// $('.thumbnail-slider').css("max-width", )

var drag = jQuery("#draggable");
var widthBody = parseInt(jQuery('body').css("width"));
var widthSliderContent = parseInt(jQuery('#sliderContent').css("width"));
var posLeftConveyor = (widthBody - widthSliderContent)/2;
var widthConveyor = parseInt(conveyor.css("width"));

var posXInit = (widthBody - parseInt(jQuery('.thumbnail-slider').css("width")))/2 + 8;
var startX;
           //create slider
           jQuery(function() {

         conveyor.draggable({
           axis: 'x',
           scroll: false,
           containment: [-widthConveyor + posLeftConveyor + widthSliderContent, 0, posLeftConveyor, 0],
           start: function() {
           startX = drag.position().left;
            console.log('start: ' + startX);
      },
           drag: function() {
            var indexThumb = 0;
            var posXSlider = jQuery(this).position().left;
            var posXDrag = drag.position().left;
            var moveXThumb = (posXSlider) * (widthThumbnailScroll/widthConveyor);
            drag.css("left",  -moveXThumb + "px");
           
            console.log('IS: ' + posXDrag);

            if (posXDrag < 45) {
                indexThumb = 0;
            }
            else {
                var tmp = Math.floor((posXDrag + 40 - parseInt(li_thumbnail.css("width")))/(parseInt(li_thumbnail.css("width"))/2));
                 indexThumb = Math.floor(tmp/2) + 1;
            }
            if (startX < posXDrag) {
                var liSelected = 'li-img-' + indexThumb;
                var $this = jQuery('li.' + liSelected);
                $this.find('.img-drop-active').addClass('img-visiting');

                var preIndexThumb = indexThumb - 1;
                var li_Prev = 'li-img-' + preIndexThumb;
                var prev_li_selected = jQuery('li.' + li_Prev);
                prev_li_selected.find('.img-drop-active').removeClass('img-visiting');
            }

            else {
                var liSelected = 'li-img-' + indexThumb;
                var $this = jQuery('li.' + liSelected);
                $this.find('.img-drop-active').addClass('img-visiting');
                var preIndexThumb = indexThumb + 1;
                var li_Prev = 'li-img-' + preIndexThumb;
                var prev_li_selected = jQuery('li.' + li_Prev);
                prev_li_selected.find('.img-drop-active').removeClass('img-visiting');
            }
           },
           stop: function() {
         var posXSlider = jQuery(this).position().left;
      }
         });
         });

          jQuery(function() {
         jQuery("#draggable").draggable({
           axis: 'x',
           scroll: false,
           // containment: [posXInit, 0, posLeftConveyor + 10 + (li_thumbnail.length - 1) * parseInt(li_thumbnail.css("width")), 0],
           containment: '#bx-pager',
           // scrollSpeed: 500,
           drag: function(e, ui) {
               posXDrag = jQuery(this).position().left;
            var moveXSlider = (posXDrag) * (widthConveyor/(widthThumbnailScroll));
     conveyor.css("left", "-" + moveXSlider + "px");
           }
         });
         });
         
           jQuery(".img-drop-active").droppable({
         accept: '#draggable',
         axis: 'x',
         containment: '#bx-pager',
         over: function(event, ui) {      
           slideIndex = jQuery(this).parent().attr('data-slide-index');
           var liSelected = 'li-img-' + slideIndex;
                var $this = jQuery('li.' + liSelected);
                $this.find('.img-drop-active').addClass('img-visiting'); 
         },
         out: function(event, ui) {
           jQuery(this).removeClass('img-visiting');
         },
         drop: function() {
         
         }
         });

jQuery('.row.home-slider-overview').hover(function(event) {
    if (isHover == false) {
        isHover = true;
    } else if (isHover == true) {
        jQuery(this).addClass('hovered');
        return;
    }
});

jQuery('.frame-slider-cover').click(function() {
    jQuery(this).parent().addClass('hovered');
    jQuery(this).hide();
});

jQuery('ul.thumbnail-list-img li').click(function() {
    var oldIndex = jQuery(".img-visiting").parent().attr('data-slide-index');
    chooseThumbnailImage(jQuery(this), oldIndex);
});

function chooseThumbnailImage($this, oldIndex) {
    var classTmp = 'img-thumbnail-' + oldIndex;
    $this.find('.img-drop-active').addClass('img-visiting');
    jQuery('img.' + classTmp).parents('.img-drop-active').removeClass('img-visiting');
     var currentIndex = jQuery(".img-visiting").parent().attr('data-slide-index');
    var posX = $this.position().left;
    var posY = jQuery('#draggable').position().top;
    if (currentIndex != 0) {
        posX = posX - 12;
    } else posX = posX - 12;
    jQuery('#draggable').animate({
        'top': posY + 'px',
        'left': posX + 'px'
    }, 100, function() {

    });

    var newY = conveyor.position().top;
   var newX = (widthConveyor/(widthBxPager))*(posX + 12);
    conveyor.animate({
        'left': "-" + newX + 'px'
    }, 100, function() {

    });
}


jQuery('#sliderContent div.item .btn-zoom').click(function() {
    var slideOffset = jQuery(this).data('slide-offset');
    oldIndexOverview =  jQuery(this).parents('.item').data('slide-index');
    sliderDetail = jQuery('.bxslider.slider-detail').bxSlider({
        startSlide: slideOffset,
        slideMargin: 50,
        controls: false,
        speed: 500,
        pagerType: 'short',
        onSlideAfter: function($slideElement, oldIndex, newIndex) {
            sliderDetailTotal = sliderDetail.getSlideCount();
            updateIndexSlider(newIndex, sliderDetailTotal);
        },
    });
    jQuery('.row.home-slider-overview').hide();
    jQuery('.row.home-slider-detail').show();
    sliderDetailTotal = sliderDetail.getSlideCount();
    updateIndexSlider(slideOffset, sliderDetailTotal);
    sliderDetail.reloadSlider();
});

jQuery('ul.bxslider.slider-detail li .btn-exit').click(function() {
    slideIndex = jQuery(this).data('slide-index');
    sliderDetail.destroySlider();
    jQuery('.row.home-slider-overview').show();
    jQuery('.row.home-slider-detail').hide();
    var liSelected = 'li-img-' + slideIndex;
    var $this = jQuery('li.' + liSelected)
    chooseThumbnailImage($this, oldIndexOverview);
});

function updateIndexSlider(newIndex, totalIndex) {
    newIndex = newIndex + 1;
    jQuery('.box-slide-current').html(newIndex + '/' + totalIndex);
    if (newIndex == 1) {
        jQuery('#slider-prev').addClass('deactive');
        jQuery('#slider-next').removeClass('deactive');
    } else if (newIndex == totalIndex) {
        jQuery('#slider-next').addClass('deactive');
        jQuery('#slider-prev').removeClass('deactive');
    } else {
        jQuery('#slider-prev').removeClass('deactive');
        jQuery('#slider-next').removeClass('deactive');
    }
}

jQuery('.next-btn').click(function() {
    var currentDetail = sliderDetail.getCurrentSlide();
    if (currentDetail != sliderDetailTotal) {
        sliderDetail.goToNextSlide();
        updateIndexSlider(currentDetail + 1, sliderDetailTotal);
    }
});

jQuery('.prev-btn').click(function() {
    var currentDetail = sliderDetail.getCurrentSlide();
    if (currentDetail != 0) {
        sliderDetail.goToPrevSlide();
        updateIndexSlider(currentDetail - 1, sliderDetailTotal);
    }
});

