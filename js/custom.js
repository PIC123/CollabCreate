CollabCreate = {}
CollabCreate.navigate = function(url) {
  console.log('navigating to:', url);
  document.location.hash = url;

  var compiledTemplate = Handlebars.getTemplate(url);
  var contentHtml = compiledTemplate({});
  jQuery('#render-content').html(contentHtml);
}

jQuery(document).ready(function () {
  // Render basic page layout
  var compiledTemplate = Handlebars.getTemplate('navbar');
  var navbarHtml = compiledTemplate({ profileUrl : 'images/profile.png' });
  jQuery('#render-navbar').html(navbarHtml)

  var url = document.location.hash ? document.location.hash.substring(1) : 'index';
  CollabCreate.navigate(url);

  // Single-page app navigation
  jQuery('a[rel=external]').not('.external-processed').addClass('external-processed').click(function (e) {
    window.open(jQuery(this).attr('href'));
    e.preventDefault();
  });

  jQuery('body').on("click", 'a', function(e) {
    var link = jQuery(this);
    if (link.attr('rel') == 'external') {
      return;
    }
    var url = link.attr('href');
    CollabCreate.navigate(url);
    e.preventDefault();
  });
});
