$(document).ready(function(){
	var flickrUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&&jsoncallback=?'
	var galleryData = {};

	function fillUpGallery($gallery, choosen_tag){
		$.getJSON(flickrUrl + '&tags=' + choosen_tag, function (data){
			var items = data.items.splice(0, 4);

			galleryData[choosen_tag] = items

			items.forEach(function (item) {
				var galleryImg = "<a class='showImageDetails' data-media-taken='" + item.date_taken +
									"' date_published='" + item.published +"'>" +
									"<img class='col-sm-3' src='" + item.media.m + "'/>" +
								"</a>"
				$gallery.append(galleryImg);
			})
		})
	}

	$(".gallery").each(function (index) {
		var $gallery = $(this)
		var chosen_tag = $gallery.attr("data-tag");

		fillUpGallery($gallery, chosen_tag)
	})

	$(".all-gallery").on("click", ".media_taken", function(event) {
		var $button = $(this);
		var $gallery = $(this).parent().next().find('.gallery')
		var images = $gallery.find("a").detach()
		var sortedImages

		$button.next().removeClass("pub-desc pub-asc");

		if ($button.hasClass("sort-asc") == false && $button.hasClass("sort-desc") == false) {

			$button.addClass("sort-asc")

			sortedImages = images.sort(function (a, b) {
				var aMediaTaken = new Date($(a).attr('data-media-taken'))
				var bMediaTaken = new Date($(b).attr('data-media-taken'))
			
				return aMediaTaken > bMediaTaken
			})
			
		} else {
			$button.toggleClass('sort-desc sort-asc')

			if ($button.hasClass('sort-asc')) {
				sortedImages = images.sort(function (a, b) {
					var aMediaTaken = new Date($(a).attr('data-media-taken'))
					var bMediaTaken = new Date($(b).attr('data-media-taken'))
				
					return aMediaTaken > bMediaTaken


				})
			} else {
				sortedImages = images.sort(function (a, b) {
					var aMediaTaken = new Date($(a).attr('data-media-taken'))
					var bMediaTaken = new Date($(b).attr('data-media-taken'))
				
					return aMediaTaken < bMediaTaken


				})
			}
		}

		$gallery.append(sortedImages);
	})

		
	$(".all-gallery").on("click", ".published_date", function (event) {
		var $button = $(this);
		var $gallery = $button.parent().next().find('.gallery')
		var images = $gallery.find("a").detach()
		var publImages

		$button.prev().removeClass("sort-desc sort-asc");

		if($button.hasClass("pub-asc") ===false && $button.hasClass("pub-desc") === false){
			$button.addClass("pub-asc");

			publImages = images.sort(function(a,b){
				var aImgPubl = new Date($(a).attr('date_published'));
				var bImgPubl = new Date($(b).attr('date_published'));

				return aImgPubl > bImgPubl;
			})
		} else {
			$button.toggleClass("pub-asc pub-desc");

			if($button.hasClass("pub-asc")){
				publImages = images.sort(function(a,b){
				var aImgPubl = new Date($(a).attr('date_published'));
				var bImgPubl = new Date($(b).attr('date_published'));

				return aImgPubl > bImgPubl;
				})
			}

			else {
				publImages = images.sort(function(a,b){
				var aImgPubl = new Date($(a).attr('date_published'));
				var bImgPubl = new Date($(b).attr('date_published'));

				return aImgPubl < bImgPubl;
				})
			}	
		}
		$gallery.append(publImages);
	});


	$("#addGallery").click(function(event){
		var tagName = $("#newGallery").val();
		var beforeTagName = '<div class="gallery-container">'+ '<div class="sort-container">' + 
		'<button class="media_taken btn-primary">Sort by media taken<span class="glyphicon glyphicon-arrow-up"></span><span class="glyphicon glyphicon-arrow-down"></span></button>' + 
		'<button class="published_date btn-primary">Sort by published date<span class="glyphicon glyphicon-arrow-up"></span><span class="glyphicon glyphicon-arrow-down"></span></button>'+
		'<button class="delete_gallery btn-danger">Delete this gallery</button>'+
		'</div>' + '<div class="row">' +
		'<div data-tag=';
		var afterTagName = 'class="gallery" style="margin-bottom: 70px;"></div>' + '</div> <hr class="style-five">';

		var $galleryContainer = $(beforeTagName +  "'" + tagName + "'" + afterTagName)

		$(".all-gallery").append($galleryContainer);

		var $gallery = $galleryContainer.find('.gallery')
		
		fillUpGallery($gallery, tagName);

		$("#newGallery").val("");

	});

	$(".all-gallery").on("click",".delete_gallery", function(){
		$(this).parent().parent().remove();
	});

	$(".all-gallery").on("click",".showImageDetails", function(e){
		$('#imageDetails').modal('toggle', $(this));
	});

	$('#imageDetails').on('show.bs.modal', function (event) {
	  var linkElement = $(event.relatedTarget) // linkElement that triggered the modal
	  var myDataTag = linkElement.parent().data("tag");
	  var myIndex = linkElement.index();

	  var modal = $(this)
	  modal.find('.modal-title').text(galleryData[myDataTag][myIndex].title);
	  modal.find('.modal-description').html(galleryData[myDataTag][myIndex].description);
	  modal.find('.modal-link').html("<a href='" + galleryData[myDataTag][myIndex].link + "'>Check more here</a>");
	  modal.find('.modal-footer').text(galleryData[myDataTag][myIndex].author);
	})
})


// linkElement
// linkElement -> parent -> gallery
// gallery data-tag
// galleryData[data-tag] => [items]
// odczytac pozycje "linkElement"(a) (indexOf) => index
// galleryData[data-tag][index] => media, media_taken, published, title

// modal-title -> title
// modal-body -> img, author, description, link
