/**
 * Created by sahib on 11/30/14.
 */
/*
 * When document is ready...
 */
$(document).on('ready', function (e)
{
    /*
     * Initialize MapMarker
     */
    $('#mapmarker').mapMarker({
        resultsView: '#search-results',
        mapOptions: {
            zoom: 2
        },
        resultTemplate: '<li><a href="#">:address</a></li>',
        onChange: function (location)
        {
            $('#lat').text(location.lat().toFixed(6));
            $('#lng').text(location.lng().toFixed(6));
        }
    });

    /*
     * Search address on form submit.
     */
    $('#form-search').on('submit', function (e)
    {
        e.preventDefault();
        $('#mapmarker').mapMarker('search', $('#search').val());
    });
    // End of: '#form-search' on submit

    /* -----------------------------------------------
     * jquery-zclip
     * -----------------------------------------------
     *
     * Setup jquery-zclip plugin
     *
     */

    ZeroClipboard.defaults.afterCopy = function ()
    {
        // do nothing...
    };

    $('#btn-copy-lat').zclip({
        copy: function ()
        {
            return $('#lat').text();
        }
    });

    $('#btn-copy-lng').zclip({
        copy: function ()
        {
            return $('#lng').text();
        }
    });

    $('#btn-copy-all').zclip({
        copy: function ()
        {
            return $('#lat').text() + ',' + $('#lng').text();
        }
    });
});
// End of: $(document).on('ready', ...)
