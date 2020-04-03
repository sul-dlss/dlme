Blacklight.onLoad(function() {
  var config = {
    selection: { displaySelectionDecorations: false },
  };
  
  var hijriConfig = $.extend({}, config, {
    xaxis: {
      tickFormatter: function(number) {
        if (number === 0) {
          return number;
        }
        var label = [number, ''];
        if (number < 0) {
          label[0] *= -1;
          label[1] += 'B'
        }
        label[1] += 'H';
        return label.join(' ');
      }
    }
  });
  
  var gregorianConfig = $.extend({}, config, {
    xaxis: {
      tickFormatter: function(number) {
        if (number === 0) {
          return number;
        }
        var label = [number, ''];
        if (number < 0) {
          label[0] *= -1;
          label[1] += 'B'
        }
        label[1] += 'CE';
        return label.join(' ');
      }
    }
  })

  $('.blacklight-cho_date_range_norm_isim').data('plot-config', gregorianConfig);
  $('.blacklight-cho_date_range_hijri_isim').data('plot-config', hijriConfig);
});
