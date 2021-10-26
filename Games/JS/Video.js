(function(window) {
    function setupVideo()
    {
        var v = document.getElementById('videoElement');
        v.addEventListener('mouseover', function() { this.controls = true; }, false);
        v.addEventListener('mouseout', function() { this.controls = false; }, false);
    }

    window.addEventListener('load', setupVideo, false);
})(window);