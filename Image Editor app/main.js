document.addEventListener("DOMContentLoaded", function() {
    // This function runs when the DOM is fully loaded and parsed.

    // Selecting DOM elements
    const upload = document.getElementById('upload');
    const downloadButton = document.getElementById('download');
    const resetBtn = document.querySelector('.filtersBox ul li span');

    const theImage = document.getElementById('theImage');
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext("2d");

    const saturate = document.getElementById('saturate');
    const contrast = document.getElementById('contrast');
    const brightness = document.getElementById('brightness');
    const sepia = document.getElementById('sepia');
    const grayscale = document.getElementById('grayscale');
    const blur = document.getElementById('blur');
    const hueRotate = document.getElementById('hue-rotate');

    // Initial setup
    downloadButton.style.display = "none";
    resetBtn.style.display = "none";
    theImage.style.display = "none";
    canvas.style.display = "none";

    // Event listener for file upload
    upload.addEventListener("change", () => {
        resetValues(); // Reset all filters and canvas

        const file = upload.files[0];
        if (file) {
            const reader = new FileReader();

            // When file is loaded
            reader.onload = function(event) {
                theImage.src = event.target.result; // Set image source to uploaded file
                
                // Display necessary elements
                downloadButton.style.display = "block";
                resetBtn.style.display = "block";
                canvas.style.display = "block";
            };
            reader.readAsDataURL(file); // Read file as data URL

            // When image is loaded
            theImage.onload = function() {
                canvas.width = theImage.naturalWidth; // Set canvas width to image width
                canvas.height = theImage.naturalHeight; // Set canvas height to image height
                context.drawImage(theImage, 0, 0, canvas.width, canvas.height); // Draw image on canvas
                theImage.style.display = "none"; // Hide original image element 
            };
        }
    });

    // Event listeners for filter inputs
    let filters = document.querySelectorAll("ul li input");
    filters.forEach(filter => {
        filter.addEventListener("input", () => {
            // Update image filter based on slider values
            context.filter = `
                saturate(${saturate.value}%)
                contrast(${contrast.value}%)
                brightness(${brightness.value}%)
                sepia(${sepia.value}%)
                grayscale(${grayscale.value})
                blur(${blur.value}px)
                hue-rotate(${hueRotate.value}deg)
            `;
            context.drawImage(theImage, 0, 0, canvas.width, canvas.height); // Redraw image with updated filter
        });
    });

    // Event listener for reset button
    resetBtn.addEventListener("click", resetValues);

    // Function to reset all filters and canvas
    function resetValues() {
        context.filter = 'none'; // Reset filter to none
        // Reset slider values to defaults
        saturate.value = '100';
        contrast.value = '100';
        brightness.value = '100';
        sepia.value = '0';
        grayscale.value = '0';
        blur.value = '0';
        hueRotate.value = '0';
        context.drawImage(theImage, 0, 0, canvas.width, canvas.height); // Redraw original image on canvas
    }

    // Event listener for download button
    downloadButton.addEventListener("click", () => {
        // Set download link href to canvas data URL (image/jpeg)
        downloadButton.href = canvas.toDataURL("image/jpeg");
    });

});
