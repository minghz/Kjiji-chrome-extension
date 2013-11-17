function fetch_feed(QUERY) {
    var link =  "http://toronto.kijiji.ca/f-SearchAdRss?" +
                "CatId=0&" +
                "Keyword=" + encodeURIComponent(QUERY) + "&" + 
                "Location=1700276";
    console.log(QUERY);
	var req = new XMLHttpRequest();
	req.open("GET", link, true);
	req.onload = display_stories.bind(this);
	req.send(null);
}

function display_stories(feed_data) {

    var xml_doc = feed_data.target.responseXML;
	$xml = $(xml_doc);
    var items = $xml.find("item");
    $('#popup').html('<img src="images/logo.png" id="logo" onclick="open_item(\'http://lifehacker.com/\'); window.close();" /><br clear="all" />');
	console.log(items[0]);
    items.each(function(index, element) {
        var post = parse_post(element);
        var item = '';
        var class2 = '';
		var tagID = index+1;
        if (index >= localStorage['unread_count']) {
            item += '<div class="post read">';
        }
        else {
            item += '<div class="post">'
        }
        item += "<span class=\"tag\">Item " + tagID + "</span>\n" +
                "\n" +
                "<div id=\"" + tagID + "\" class=\"item\">\n" +
                "<a href=\"" + post.url + "\" target=\"_blank\"><h4>" + post.title + "</h4></a>\n" +
                "<span class=\"description\">" + post.description + "...</span>\n" +
                "</div>\n" +
                "\n";
        item += "</div>";
        $('#popup').append(item);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    //document.getElementById('button').addEventListener('click', function() { fetch_feed(document.getElementById('query').value); });
    //
    //
});
$("#q").submit(function(event) {
        
    event.preventDefault();
    console.log("here");

    alert ("in here");

    var $form = $(this),
        term = $form.find('input[name="query"]' ).val(),
        url = $form.attr('action');
    var posting = $.post(url, {s: term} );

    posting.done(function( data ){
        var content = $(data).find('#content');
        $("#result").empty().append(content);
    });
});
