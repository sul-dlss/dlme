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
        if (number < 0) {
          number *= -1;
          number += 'B';
        }
        return number+= 'H';
      }
    }
  });
  
  var gregorianConfig = $.extend({}, config, {
    xaxis: {
      tickFormatter: function(number) {
        if (number === 0) {
          return number;
        }
        if (number < 0) {
          number *= -1;
          number += 'B';
        }
        return number+= 'CE';
      }
    }
  })

  $('.blacklight-cho_date_range_norm_isim').data('plot-config', gregorianConfig);
  $('.blacklight-cho_date_range_hijri_isim').data('plot-config', hijriConfig);
});
