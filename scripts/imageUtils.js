
function initImagePicker(elementSelector, options) {    
    var cropbox = $(elementSelector).cropbox(options);    
    var cropFrame = $(elementSelector).closest('.cropFrame');
    var controls = cropFrame.find(".cropControls");
    var imageSelectorControl = $('<div/>', {'class' : 'cropImageSelector'});
    var fileInput = $('<input/>', {'type' : 'file'});
    imageSelectorControl.append(fileInput);
    imageSelectorControl.append($('<i/>', {'class' : 'icon-docs'}));
    controls.append(imageSelectorControl);

    fileInput.on('change', function() {
        if (typeof (FileReader) != "undefined") {  
            var reader = new FileReader();
            reader.onload = function (e) {
                cropFrame.find("img").attr("src", e.target.result);
                $(elementSelector).cropbox(options);
            }
            reader.readAsDataURL($(this)[0].files[0]);
        } else {
            alert("This browser does not support FileReader.");
        }
    });
};


function initGalleryPreview() {
    var galleryUploader = $(".gallery-files");
    galleryUploader.on('change', function() {
        var files = $(this)[0].files;
         
        for(var i=0; i < files.length; i++) {
            var name = files[i].name.toLowerCase();
            var extn = name.substring(name.lastIndexOf(".")+1);
            if(extn === 'jpg' || extn === 'jpeg' || extn === 'png' || extn === 'gif') {
                var reader = new FileReader();
                reader.onload = function(e) {
                    createImageAndShow(e.target.result);
                };
                reader.readAsDataURL(files[i])
            }
        }
    });
};

function createImageAndShow(imageContent) {
    var container = $(".playground-photos-section .photos");
    var imageObj = new Image();
    imageObj.onload = function(imgEvent) {
        var scaleFactor = (imageObj.width > 800) ? (800/imageObj.width) : 1;
        var canvas = $("#image-resizing-canvas")[0];
        canvas.width = imageObj.width * scaleFactor;
        canvas.height = imageObj.height * scaleFactor;
        canvas.getContext('2d').drawImage(imageObj, 0, 0, canvas.width, canvas.height);
        var resizedDataUrl = canvas.toDataURL('image/jpeg');
    
        var newImageHolder = createNewImageComponent(resizedDataUrl);
        newImageHolder.appendTo(container);
    }
    imageObj.src = imageContent;
};

function createNewImageComponent(imageData) {
    var imageHolder = $("<div/>", {        
        "class": "new-image",
        "id": getImageIndex()
    });
    imageHolder.append($("<img/>", {"src": imageData}));
    imageHolder.append($("<input/>", {"type": "text", "placeholder": "Enter a caption"}));
    return imageHolder;
}

function getImageIndex() {
    return $(".playground-photos-section .photos img").size() + 1;
}
