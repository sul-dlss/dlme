Blacklight.onLoad(function() {
  var config = {
    selection: { displaySelectionDecorations: false },
  };

  function genericTickFormatter(keys) {
    return function(number) {
      if (number < 0) {
        return I18n.t('date.' + keys[0], { year: number * -1 });
      } else {
        return I18n.t('date.' + keys[1], { year: number });
      }
      return number;
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
