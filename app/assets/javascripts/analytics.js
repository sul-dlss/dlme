document.addEventListener('turbo:load', function(event) {
  if (typeof(gtag) == 'undefined') return;
  
  // Google docs on manually creating pageviews in GA4:
  // https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag#manually_send_page_view_events
  gtag('event', 'page_view', {
    page_location: event.detail.url
  });
});
