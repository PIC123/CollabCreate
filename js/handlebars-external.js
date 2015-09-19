// http://berzniz.com/post/24743062344/handling-handlebarsjs-like-a-pro
Handlebars.getTemplate = function(name) {
	if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
		$.ajax({
			url : 'templates/' + name + '.handlebars',
			success : function(data) {
				if (Handlebars.templates === undefined) {
					Handlebars.templates = {};
				}
				Handlebars.templates[name] = Handlebars.compile(data);
			},
			async : false
		});
	}
	return Handlebars.templates[name];
};

var compiledTemplate = Handlebars.getTemplate('navbar');
var html = compiledTemplate({ name : 'World' });
jQuery('#navbar').html(html);
