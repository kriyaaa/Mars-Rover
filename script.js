var nasaImages = $("#nasa-images");
var input = $("#datepicker").datepicker({dateFormat: 'dd-mm-yy'});


$('#btn').click(fetchImages);

function fetchImages() {
    var date = input.val();

    if(date === ""){
        alert("Please enter the date");
        return;
    }

    $.ajax({
        url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
        method: "GET",
        data: {
            earth_date: date,
            api_key: "NBlCLhD21Eud5RxMy1TjZoeJedDa1c1qbsnLMIG2"
        },
        success: function(data){
            var photos = data.photos;
            if(photos.length === 0){
                alert("No photos available for this date");
                return;
            }

            nasaImages.empty();

            for (var i = 0; i < photos.length; i++) {
                var photo = photos[i];
                nasaImages.append('<img src="' + photo.img_src + '" alt="' + photo.id + '">');
            }
        },
        error: function(){
            alert("Error occured while fetching data");
        }

    });
}