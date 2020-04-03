Blacklight.onLoad(function() {
  var dateRangeFacets = [
    $('.blacklight-cho_date_range_norm_isim'),
    $('.blacklight-cho_date_range_hijri_isim')
  ];

  for(i = 0; i < dateRangeFacets.length; i++) {
    dateRangeFacets[i].data('plot-config', {
      selection: { displaySelectionDecorations: false }
    });
  }
});
