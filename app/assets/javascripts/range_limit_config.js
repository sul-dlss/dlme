Blacklight.onLoad(function() {
  var config = {
    selection: { displaySelectionDecorations: false },
  };

  function genericTickFormatter(keys) {
    return function(number) {
      var label = [number, ''];
      if (number < 0) {
        label[0] *= -1;
        label[1] = I18n.t('date.suffix.' + keys[0]);
      } else {
        label[1] = I18n.t('date.suffix.' + keys[1]);
      }
      return label.join(' ');
    }
  }
  
  var hijriConfig = $.extend({}, config, {
    xaxis: {
      tickFormatter: genericTickFormatter(['bh', 'h'])
    }
  });
  
  var gregorianConfig = $.extend({}, config, {
    xaxis: {
      tickFormatter: genericTickFormatter(['bce', 'ce'])
    }
  })

  $('.blacklight-cho_date_range_norm_isim').data('plot-config', gregorianConfig);
  $('.blacklight-cho_date_range_hijri_isim').data('plot-config', hijriConfig);
});
