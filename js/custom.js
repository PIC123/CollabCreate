// See http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
if (!String.prototype.format) {
    String.prototype.format = function() {
        var str = this.toString();
        if (!arguments.length)
            return str;
        var args = typeof arguments[0],
            args = (("string" == args || "number" == args) ? arguments : arguments[0]);
        for (arg in args)
            str = str.replace(RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
        return str;
    }
}

// Setup our namespace
CollabCreate = {};

CollabCreate.renderers = {};
CollabCreate.renderers.navbar = function() {
  var authenticated = Parse.User.current() ? Parse.User.current().authenticated() : false;
  var compiledTemplate = Handlebars.getTemplate('navbar');
  var navbarHtml = compiledTemplate({ authenticated: authenticated, profileUrl : 'images/profile.png' });
  jQuery('#render-navbar').html(navbarHtml);
}

CollabCreate.pageReady = {};
CollabCreate.pageReady.document = function () {
  // Initialize Parse with app keys
  Parse.initialize("O9kal43aoqJWQyTT42MOgbf2cWfHgXDmD8fBTQ5F", "uFYtTqDRzVzaYsLdkrmo1OfEIsgwN2ZTzKTAxa6F");

  // Render basic page layout
  CollabCreate.renderers.navbar();

  // Render requested page (by anchor) and trigger its pageReady function
  var url = document.location.hash ? document.location.hash.substring(1) : 'home';
  CollabCreate.navigate(url);
  if (CollabCreate.pageReady.hasOwnProperty(url)) {
    CollabCreate.pageReady[url]();
  }

  // Trigger page-specific navigation reactions
  jQuery("#render-content").on("navigated", function(e, oldUrl, newUrl) {
    if (CollabCreate.pageReady.hasOwnProperty(newUrl)) {
      CollabCreate.pageReady[newUrl]();
    }
  });

  // Setup single-page app navigation
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

jQuery(document).ready(CollabCreate.pageReady.document);

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
