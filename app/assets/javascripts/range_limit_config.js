Blacklight.onLoad(function() {
  var config = {
    selection: { displaySelectionDecorations: false },
  };

  function genericTickFormatter(keys) {
    return function(number) {
      if (number < 0) {
        return i18n.t('date.' + keys[0], { year: number * -1 });
      } else {
        return i18n.t('date.' + keys[1], { year: number });
      }
      return number;
    }
  }

  var hijriConfig = $.extend({}, config, {
    field: 'cho_date_range_hijri_isim',
    xaxis: {
      tickFormatter: genericTickFormatter(['bh', 'h'])
    }
  });

  var gregorianConfig = $.extend({}, config, {
    field: 'cho_date_range_norm_isim',
    xaxis: {
      tickFormatter: genericTickFormatter(['bce', 'ce'])
    }
  });

  var configs = [gregorianConfig, hijriConfig];

  configs.forEach(function(conf) {
    $('.blacklight-' + conf.field).data('plot-config', conf);
  });

  var $customDateRange = $('[data-date-range-selector]');

  $('[data-date-range-selector] .form-check').change(function(e) {
    var newField = $(e.currentTarget).find('.form-check-input').val();
    $customDateRange.find('.custom-range-limit-container').hide();
    $.ajax({
      url: $customDateRange.data().dateRangeSelectorPaths[newField]
    }).done(function(html) {
      // Configure facet field appropriately
      configs.forEach(function(conf) {
        if (conf.field === newField) {
          $('.blacklight-' + $customDateRange.data().dateRangeSelectorOriginalField).data('plot-config', conf);
        }
      });
      // Select content and insert it
      var $content = $(html).find('.custom-range-limit-container').children();
      $customDateRange.find('.custom-range-limit-container').html($content).show();
      // Rerun Range Limit Setup stuff
      $(".range_limit .profile .distribution.chart_js ul").each(function () {
        BlacklightRangeLimit.turnIntoPlot($(this).parent());
      });
      BlacklightRangeLimit.checkForNeededFacetsToFetch();
      $(".range_limit .profile .range.slider_js").each(function() {
        BlacklightRangeLimit.buildSlider(this);
      });
    });
  });
});
