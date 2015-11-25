$(function(){
  $('.menu li.item').hover( function(){
    $('ul', this).width(this.clientWidth+3);
  } );

  (function(parentSelector){
    var parent = $(parentSelector);
    if (parent.length < 0) { return };
    
    // paret should have up to 3 elements. Next, Prev, and the list itself.

    var list = $(" > *:not(.prev):not('.next):first", parent); // only the elements list should be left

    var itemsCount = list.children().length;

    var itemWidth = $(" > *:first", list).width();
    var itemHeight = $(" > *:first", list).height();

    var itemsToShow = Math.round(list.width()/itemWidth);
    var maxItem = itemsCount - itemsToShow+1;

    list.css({position: "relative", "overflow": "hidden", height: itemHeight}); // set the real width, so elements are inline. It's a guess that all elements width is the same

    var children = list.children().detach(); // prepare to move children into wrapper
    var wrapper = list.append("<div/>").find('> *') // create wrapper and find wrrapper

    wrapper.css({position: "absolute", width : (itemsCount*itemWidth)}); // set the overflown window width
    wrapper.append(children);

    wrapper.attr('position', 0); // reset position to 0
    
    var slide=function(direction){
      var position = wrapper.attr('position')/1; // force to be in
      position = (position + direction + maxItem) % maxItem; // move up or down using mod
      wrapper.attr('position', position); // save new position

      var left = children.eq(position)[0].offsetLeft*-1; // find the right left position of the right element
      wrapper.clearQueue().animate({'left':left}); // clear previous animation and animate to the right left position
    }
    parent.find('.prev').click(function(){slide(-1)}); // bind slide down
    parent.find('.next').click(function(){slide(+1)}); // bind slide up
  })(".catalog-holder");

  // emulate hover for ie6
  if (/MSIE (5\.5|6)/.test(navigator.userAgent)) {
    $("li").hover(function(){$(this).toggleClass('hover');});
  }
})

$(document).ready(function(){
  if ( window.DD_belatedPNG !== undefined ) { DD_belatedPNG.fix('img') };
})