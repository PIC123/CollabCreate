CollabCreate = {};
CollabCreate.pageReady = {};
CollabCreate.pageReady.document = function () {
  // Render basic page layout
  var compiledTemplate = Handlebars.getTemplate('navbar');
  var navbarHtml = compiledTemplate({ profileUrl : 'images/profile.png' });
  jQuery('#render-navbar').html(navbarHtml)

  var url = document.location.hash ? document.location.hash.substring(1) : 'home';
  CollabCreate.navigate(url);

  // Trigger page-specific reactions
  jQuery("#render-content").on("navigated", function(e, oldUrl, newUrl) {
    if (CollabCreate.pageReady.hasOwnProperty(newUrl)) {
      CollabCreate.pageReady[newUrl]();
    }
  });

  // Single-page app navigation
  jQuery('body').on("click", 'a', function(e) {
    var link = jQuery(this);
    if (link.attr('rel') == 'external') {
      window.open(jQuery(this).attr('href'));
    }
    else {
      var url = link.attr('href');
      CollabCreate.navigate(url);
    }
    e.preventDefault();
  });
};

CollabCreate.navigate = function(url) {
  if (url == "") {
    url = "home";
  }

  console.log('navigating to:', url);
  try {
    var compiledTemplate = Handlebars.getTemplate(url);
    var contentHtml = compiledTemplate({});
    jQuery('#render-content').html(contentHtml);
  }
  catch (err) {
    console.log('Error retrieving page:', err);
    var compiledTemplate = Handlebars.getTemplate("notfound");
    var contentHtml = compiledTemplate({});
    jQuery('#render-content').html(contentHtml);
  }

  var oldUrl = document.location.hash.substring(1);
  document.location.hash = url;
  jQuery('#render-content').trigger("navigated", [oldUrl, url]);
}

jQuery(document).ready(CollabCreate.pageReady.document);
