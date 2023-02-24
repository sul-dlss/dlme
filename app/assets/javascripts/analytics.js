document.addEventListener('turbo:load', function(event) {
  if (typeof(dataLayer) == 'undefined') return;

  var url = event.data.url;

  dataLayer.push({
    'event':'pageView',
    'virtualUrl': url
  });
});
