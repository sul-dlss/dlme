import jQuery from 'jquery'

(function( $ ){
  $.fn.lineCollapse = function( options ) {
    var button, configuredLines, container, containerHeight, containerLines, lineHeight;

    function init(container) {
      button = container.next('[data-behavior="line-collapse-button"]');
      lineHeight = parseFloat(
        document.defaultView.getComputedStyle(container[0], null).getPropertyValue('line-height'),
        10
      );
      configuredLines = parseFloat(container.data('collapse-at'), 10);
      containerHeight = parseFloat(container[0].getBoundingClientRect().height, 10);
      containerLines = containerHeight / lineHeight;

      if (containerLines < configuredLines) {
        return false;
      }
      container.addClass('collapsed');
      container.height(lineHeight * configuredLines);

      button.show();

      button.on('click', function(event) {
        event.preventDefault();

        $(this).toggleClass('collapsed');
        container.toggleClass('collapsed');

        if (container[0].style.height && container[0].style.height != "") {
          container.removeAttr('style');
        } else {
          container.height(lineHeight * configuredLines);
        }
      });
    }

    return this.each(function() {
      init($(this));
    });
  }
})( jQuery );

Blacklight.onLoad(function() {
  $('[data-behavior="line-collapse"]').lineCollapse();
});
