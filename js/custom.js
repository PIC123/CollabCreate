jQuery(document).ready(function () {
	// Render basic page layout
	var compiledTemplate = Handlebars.getTemplate('navbar');
	var navbarHtml = compiledTemplate({ profileUrl : 'images/profile.png' });
	jQuery('#render-navbar').html(navbarHtml)

	var compiledTemplate = Handlebars.getTemplate('index');
	var contentHtml = compiledTemplate({});
	jQuery('#render-content').html(contentHtml);
});
