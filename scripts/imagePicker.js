
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
}

