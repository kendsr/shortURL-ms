$(document).ready(function(){
	$('#getAllSites').click(function(){
		$('#getAllSites').html("Saved Short URLs");
		$.get('/listall', function(sites){
			var html="";
			// Reset allsites div
			$('#allsites').empty();
			// the returned array contains mongodb document objects
			// the following code parses through to get needed values
			$("#allsites").append("<div class='row' id='head'><div class='col-md-6'"+
					" id='colhead1'></div>"+
            		"<div class='col-md-6' id='colhead2'></div></div>");
				$('#colhead1').append("ShortURL");
				$('#colhead2').append("LongURL");
			for (var i=0; i<sites.length; i++){
				$("#allsites").append("<div class='row' id='site"+i+"'><div class='col-md-6'"+
					" id='shorturl"+i+"'></div>"+
            		"<div class='col-md-6' id='longurl"+
            		i+"''></div></div>");
				$('#shorturl'+i).append(sites[i].shortURL);
				$('#longurl'+i).append(sites[i].longURL);
			}
		});
	});
});