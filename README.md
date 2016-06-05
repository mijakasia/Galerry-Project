## Flickr Gallery

This application allows you to browse and see the details of pictures taken from Flickr. It utilizes the public Flickr image feed `https://api.flickr.com/services/feeds/photos_public.gne`. 

##  Installation and running

To run this project clone the repo and serve the files with any server. Example using the python simple http server:
```
python -m SimpleHTTPServer 8080
```
After running this command point your browser to http://localhost:8080/


## Features

At startup of the application it will query the Flickr API to get the galleries with pre-defined tags, and will fill up fours images for each gallery. You can add a new gallery (the code is re-usable) using the form on the bottom of the page. After you input the tags, and press the button application will query the Flicker api again, with your tags as a parameter, and will add a new gallery.

Clicking on the image will bring up a popover cointaining more details of that image.
