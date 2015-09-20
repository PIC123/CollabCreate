var initializeSkillsRemove = function () {
    jQuery(".skills,.locations").on("click", "a", function(){
        jQuery(this).parent().remove();
    });
};

var initializeSkillsAutocomplete = function () {
    var CHUNK_SIZE = 1000;
    var skillsQuery = new Parse.Query("Skills").limit(CHUNK_SIZE);

    // Add results in chunks (due to max array size return limit of Parse)
    var results = [];
    var loadChunk = function (currentSkip) {
        if (currentSkip !== 0) {
            skillsQuery.skip(currentSkip);
        }

        var promise = skillsQuery.find().then(function (skills) {
            // Add chunk
            skills.forEach(function (skill) {
                results.push({"label": skill.get("name"), "value": skill.get("name"),
                  "skillId": skill.id});
            });

            // Increase skip
            currentSkip += CHUNK_SIZE;

            // Check if all data loaded
            if (currentSkip === results.length) {
                return loadChunk(currentSkip);
            }
        });

        return promise;
    }

    loadChunk(0).then(function () {
        _.sortBy(results, "label");
        $( ".skills-autocomplete" ).autocomplete({
            select: function(event, ui){
                var outerSpan = document.createElement('span');
                var innerSpan = document.createElement('span');
                var a = document.createElement('a');
                var i = document.createElement('i');
                jQuery(i).addClass('remove').addClass('glyphicon').addClass('glyphicon-remove-sign').addClass('glyphicon-white');
                a.appendChild(i);
                jQuery(a).addClass('action').attr('data-value', ui.item.value);
                innerSpan.textContent = ui.item.label;
                innerSpan.appendChild(a);
                outerSpan.appendChild(innerSpan);
                jQuery(outerSpan).addClass('tag').addClass('label').addClass('label-info');
                jQuery(".skill-tags").append(outerSpan);

                // Clear string
                jQuery(".skills-autocomplete").val("");
                event.preventDefault();
            },
            source: results
        });
    });
};