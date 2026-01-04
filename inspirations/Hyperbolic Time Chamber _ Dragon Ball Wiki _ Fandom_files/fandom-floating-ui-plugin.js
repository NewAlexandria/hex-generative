/**
 * Fandom Floating UI Plugin for JW Player
 * Enhances the floating video player UI with custom styling
 * Follows official JW Player plugin methodology
 */

// Plugin configuration
const PLUGIN_NAME = 'fandom-floating-ui-plugin';
const PLUGIN_VERSION = '8.0';

// CSS styles for the floating player
const FLOATING_PLAYER_STYLES = `
    #featured-video__player-container [id^="jwPlacementDiv_"] {
        container-type: inline-size;
    }
    
    @container (max-width: 50vw) {
        #featured-video__player-container.is-on-scroll-active .mobileIsScrollPlayer .jw-controls .jw-controlbar .jw-slider-time,
        #featured-video__player-container.is-on-scroll-active .mobileIsScrollPlayer .jw-flag-ads .jw-controls .jw-controlbar .jw-slider-time{
            position: absolute;
            bottom: 0px;
            height: 5px;
            margin-bottom: 2px;
        }
        #featured-video__player-container.is-on-scroll-active .mobileIsScrollPlayer .jw-controls .jw-controlbar .jw-slider-time .jw-timesegment-resetter,
        #featured-video__player-container.is-on-scroll-active .mobileIsScrollPlayer .jw-flag-ads .jw-controls .jw-controlbar .jw-slider-time .jw-timesegment-resetter{
            height: 5px;
            /*border-top: 0.5px solid #00000000;*/
            /*border-bottom: 0.5px solid #00000000;*/
        }
        #featured-video__player-container.is-on-scroll-active .mobileIsScrollPlayer .jw-flag-ads .jw-controls .jw-controlbar .jw-button-container{
            height: 100%;
            padding: unset;
        }
        #featured-video__player-container.is-on-scroll-active .mobileIsScrollPlayer .jw-flag-ads .jw-controls .jw-controlbar .jw-button-container .jw-text{
            display:none;
        }
        #featured-video__player-container.is-on-scroll-active .mobileIsScrollPlayer .jw-controls .jw-controlbar .jw-button-container .jw-icon-volume,
        #featured-video__player-container.is-on-scroll-active .mobileIsScrollPlayer .jw-flag-ads .jw-controls .jw-controlbar .jw-button-container .jw-icon-playback{
            width: auto;
            height: auto;
            position: absolute;
            bottom: 10px;
            left: 8px;
        }
    }
`;

// Base CSS styles for the close button (static parts)
const CLOSE_BUTTON_BASE_STYLES = `
    #fandom-mobile-wrapper [itemprop="video"].jw-flag-ads .closeButtonContainer .closeMobile{
        height: 14px!important;
        width: 14px!important;
    }
`;

// Plugin state variables
let floatingPlayerStyleElement = null;
let closeButtonStyleElement = null;
let videoContainer = null;
let jwPlacementDiv = null;
let resizeObserver = null;

/**
 * Main plugin initialization function
 * Following official JW Player plugin methodology
 */
function initPlugin(playerInstance, pluginConfig, pluginDiv) {
    
    // Check if this is a mobile session using JW Player's getEnvironment API
    try {
        const environment = playerInstance.getEnvironment();
        const isMobile = environment && environment.OS && environment.OS.mobile;
        
        // Only proceed if this is a mobile session
        if (!isMobile) {
            return; // Exit early for non-mobile sessions
        }
    } catch (error) {
        // If getEnvironment fails, assume non-mobile and exit
        return;
    }
    
    /**
     * Inject CSS styles into the document head
     */
    function injectStyles() {
        if (!floatingPlayerStyleElement) {
            floatingPlayerStyleElement = document.createElement('style');
            floatingPlayerStyleElement.setAttribute('data-plugin', PLUGIN_NAME + '-floating');
            floatingPlayerStyleElement.textContent = FLOATING_PLAYER_STYLES;
            document.head.appendChild(floatingPlayerStyleElement);
        }
        
        if (!closeButtonStyleElement) {
            closeButtonStyleElement = document.createElement('style');
            closeButtonStyleElement.setAttribute('data-plugin', PLUGIN_NAME + '-closebutton');
            closeButtonStyleElement.textContent = CLOSE_BUTTON_BASE_STYLES;
            document.head.appendChild(closeButtonStyleElement);
        }
    }
    
    /**
     * Find and store reference to video container and JW placement div
     * Returns true if all required elements are found, false otherwise
     */
    function findContainerElements() {
        const playerContainer = playerInstance.getContainer();
        if (!playerContainer) {
            return false;
        }
        
        const featuredVideoContainer = playerContainer.closest('#featured-video__player-container');
        if (!featuredVideoContainer) {
            return false;
        }
        
        videoContainer = featuredVideoContainer.parentElement;
        if (!videoContainer) {
            return false;
        }
        
        // Find the jwPlacementDiv within the featured video container
        jwPlacementDiv = featuredVideoContainer.querySelector('[id^="jwPlacementDiv_"]');
        if (!jwPlacementDiv) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Calculate close button position based on jwPlacementDiv dimensions and position
     */
    function calculateCloseButtonPosition() {
        // Early return if required elements are not available
        if (!jwPlacementDiv || !videoContainer) {
            return;
        }
        
        try {
            const rect = jwPlacementDiv.getBoundingClientRect();
            
            // Check if element has valid dimensions
            if (rect.width === 0 || rect.height === 0) {
                return;
            }
            
            const computedStyle = window.getComputedStyle(jwPlacementDiv);
            
            // Get padding values
            const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
            const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
            const playerTop = parseFloat(computedStyle.top) || 0;
            
            // Calculate close button position
            // Position close button at top-right of the player with some offset
            const buttonOffset = 10; // offset from edge
            const buttonSize = 14; // close button size
            
            const topPosition = playerTop + paddingTop + buttonOffset;
            const rightPosition = rect.width - paddingRight - buttonSize - buttonOffset;
            
            // Validate calculated positions
            if (topPosition < 0 || rightPosition < 0) {
                return;
            }
            
            // Generate dynamic CSS
            const dynamicCloseButtonCSS = `
                #fandom-mobile-wrapper [itemprop="video"].jw-flag-ads .closeButtonContainer{
                    height: auto;
                    width: auto;
                    top: ${topPosition}px;
                    right: ${rightPosition}px;
                }
            `;
            
            // Update the close button styles
            updateCloseButtonStyles(dynamicCloseButtonCSS);
        } catch (error) {
            // Silently handle errors
        }
    }
    
    /**
     * Update close button styles with dynamic positioning
     */
    function updateCloseButtonStyles(dynamicCSS) {
        if (closeButtonStyleElement) {
            closeButtonStyleElement.textContent = CLOSE_BUTTON_BASE_STYLES + dynamicCSS;
        }
    }
    
    /**
     * Setup resize observer for jwPlacementDiv
     */
    function setupResizeObserver() {
        // Check if jwPlacementDiv exists
        if (!jwPlacementDiv) {
            return;
        }
        
        // Check if ResizeObserver is supported
        if (!window.ResizeObserver) {
            return;
        }
        
        try {
            resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    calculateCloseButtonPosition();
                }
            });
            
            resizeObserver.observe(jwPlacementDiv);
            
            // Initial calculation
            calculateCloseButtonPosition();
        } catch (error) {
            // Silently handle errors
        }
    }
    
    /**
     * Handle ad impression event
     */
    function onAdImpression(event) {
        if (!videoContainer) {
            return;
        }
        
        try {
            videoContainer.classList.add('jw-flag-ads');
        } catch (error) {
            // Silently handle errors
        }
    }
    
    /**
     * Handle ad end events (complete, skipped, error)
     */
    function onAdEnd(event) {
        if (videoContainer) {
            if (videoContainer.classList.contains('jw-flag-ads')) {
                videoContainer.classList.remove('jw-flag-ads');
            }
        }
    }
    
    /**
     * Handle content play event
     */
    function onContentPlay(event) {
        // Ensure classes are removed when content plays
        // This provides additional safety in case ad end events are missed
        if (videoContainer && playerInstance.getState() === 'playing') {
            const currentItem = playerInstance.getPlaylistItem();
            if (currentItem && !currentItem.adschedule) {
                if (videoContainer.classList.contains('jw-flag-ads')) {
                    videoContainer.classList.remove('jw-flag-ads');
                }
            }
        }
    }
    
    /**
     * Bind event listeners (only called if required elements are found)
     */
    function bindEvents() {
        // JW Player ad event listeners
        playerInstance.on('adImpression', onAdImpression);
        playerInstance.on('adComplete', onAdEnd);
        playerInstance.on('adSkipped', onAdEnd);
        playerInstance.on('adError', onAdEnd);
        playerInstance.on('play', onContentPlay);
    }
    
    /**
     * Remove event listeners and cleanup
     */
    function cleanup() {
        // Remove JW Player event listeners (only if they were bound)
        if (videoContainer) {
            playerInstance.off('adImpression', onAdImpression);
            playerInstance.off('adComplete', onAdEnd);
            playerInstance.off('adSkipped', onAdEnd);
            playerInstance.off('adError', onAdEnd);
            playerInstance.off('play', onContentPlay);
        }
        
        // Disconnect resize observer
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
        }
        
        // Remove injected styles
        if (floatingPlayerStyleElement && floatingPlayerStyleElement.parentNode) {
            floatingPlayerStyleElement.parentNode.removeChild(floatingPlayerStyleElement);
            floatingPlayerStyleElement = null;
        }
        if (closeButtonStyleElement && closeButtonStyleElement.parentNode) {
            closeButtonStyleElement.parentNode.removeChild(closeButtonStyleElement);
            closeButtonStyleElement = null;
        }
    }
    
    // Initialize the plugin (only runs on mobile)
    injectStyles();
    
    // Only proceed with full initialization if required elements are found
    const elementsFound = findContainerElements();
    if (elementsFound) {
        // Required elements found - set up full functionality
        bindEvents();
        setupResizeObserver();
    }
    // If elements not found, plugin remains inert with only basic styles injected
    
    // Cleanup when player is removed
    playerInstance.on('remove', cleanup);
}

// Register the plugin using official JW Player methodology
const registerPlugin = window.jwplayerPluginJsonp || window.jwplayer().registerPlugin;
registerPlugin(PLUGIN_NAME, PLUGIN_VERSION, initPlugin);


