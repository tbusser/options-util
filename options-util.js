(function (factory) {
    if(typeof define === 'function' && define.amd) {
        // Register as an AMD module.
        define(['jquery'], factory);
    } else {
        // Browser global variable
        window.optionsUtil = factory(jQuery);
    }
})(function optionsUtil($) {
    'use strict';

    /**
     * The locally scoped object to set options on
     * @type {Object}
     */
    var propHolder = {},

        /**
         * The locally scoped options
         * @type {Object}
         */
        localOptions = {};

    /**
     * Test if a property is set
     *
     * @param {String} property The property to check on
     */
    function isset(property) {
        // If the property does not exist yet
        // And the property is not a string
        if(!property || typeof property !== 'string') {
            console.error('Invalid property name ' + property
                        + ', is it a string?');
        // If the property is not undefined
        } else if(propHolder[property] !== undefined) {
            // Then it is set
            return true;
        }

        // In every other scenario
        // it is not set
        return false;
    }

    /**
     * Tests a property for type and existence
     *
     * @param  {String} property The property to check on
     */
    function testProperty(property) {
        // If the property is set
        if(!isset(property)) {
            // Return a warning because we cannot find a reference
            console.warn('Cannot find reference `' + property
                + '` in app.option, does it exist?');

            return false;
        }

        return true;
    }

    /**
     * Sets an options property
     *
     * @param {String} property The value to set
     * @param {*} [value] The value to set it to
     * @return {*} The value that is set
     */
    function set(property, value) {
        // If it is an object
        if(typeof property === 'object') {
            // Merge it with any possible properties
            // that are already set on this key
            $.extend(true, propHolder, property);

            return;
        }

        // Set the value for the property
        propHolder[property] = value;

        // Return the property that has been set
        return propHolder[property];
    }

    /**
     * Gets an options property
     *
     * @param  {String} property The property to get
     * @param  {String} defaultValue A default value
     * @return {*} The property
     */
    function get(property, defaultValue) {
        if(testProperty(property)) {
            return propHolder[property];
        }

        propHolder[property] = defaultValue;

        return propHolder[property];
    }

    /**
     * Delete an options property
     *
     * @param  {String} property The property to delete
     * @param  {Boolean} strictMode Whether or not to throw an exception
     */
    function remove(property, strictMode) {
        if(testProperty(property)) {
            delete propHolder[property];
        } else if(strictMode !== false) {
            throw 'Unable to delete unknown property `'
                + property
                + '` from options';
        }

        return false;
    }

    /**
     * Extend the localOptions object with the given options object
     *
     * @param {Object} extendOptions The objects to extend with
     */
    function extendLocalOptions(extendOptions) {
        localOptions = $.extend(true, localOptions, extendOptions);
    }

    /**
     * Parse the options of a options block and add to the global options
     */
    function parseOptionsBlock() {
        var $block = $(this),
            blockOptions = JSON.parse($block.html());

        extendLocalOptions(blockOptions);
    }

    /**
     * Initializes op a script tag with type="text/options"
     * Gets invoked immediately!
     */
    function getPageOptions() {
        // Get all script
        var $script = $('script[type="json/options"]'),
            sharedSettings;

        try {
            sharedSettings = JSON.parse(sharedSettingsJSON).shared;
        } catch(e) {
            sharedSettings = {};
        }

        extendLocalOptions(sharedSettings);

        if(!$script.length) {
            return;
        }

        // Parse all script blocks
        $script.each(parseOptionsBlock);

        set(localOptions);
    }

    // Get page options when the DOM is loaded
    // using a short hand document ready
    $(getPageOptions);

    /**
     * Expose public API
     */
    return {
        isset: isset,
        get: get,
        set: set,
        remove: remove
    };
});
