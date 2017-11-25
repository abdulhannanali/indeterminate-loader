document.addEventListener('DOMContentLoaded', initializeDemo);

/**
 * Initializes the demo and all the related functionality
 * required to run this demo
 */
function initializeDemo() {
    const startControl = document.querySelector('.loader-control.start');
    const stopControl = document.querySelector('.loader-control.stop');
    const resetControl = document.querySelector('.loader-control.reset');
    const indeterminateLoader = Loader();


    startControl.addEventListener('click', () => indeterminateLoader.start());
    stopControl.addEventListener('click', () => indeterminateLoader.stop());
    resetControl.addEventListener('click', () => indeterminateLoader.reset());

    /**
     * Loader
     * Loader function for the demo handling all the functionality related to the loader
     * @return {Object} methods that can be applied on the given loader
     */
    function Loader() {
        // Loader 0 moves over horizontal angle and loader90 moves vertically
        const loader0 = document.querySelector('.loader-box-vertical');
        const loader90 = document.querySelector('.loader-box-horizontal');
        
        const loaderContainer = document.querySelector('.loader-container');
        const timePassedElement = document.querySelector('.info-field.time-passed .field-value');
        
        const hSpace = loaderContainer.offsetWidth - loader0.offsetWidth;
        const vSpace = loaderContainer.offsetHeight - loader90.offsetHeight;

        let startTime = 0;
        let xInc = 15;
        let yInc = 3;
        let xPos = 0;
        let yPos = 0;

        // Animation frame identifier which can be used to stop the animation
        let animationFrameId;

        function start() {
            animateLoader();
        }

        function stop() {
            if (!animationFrameId) {
                throw new Error('No Animation Frame Exists');
            }

            cancelAnimationFrame(animationFrameId);
            animationFrameId = undefined;
        }
        
        function reset() {
            startTime = xPos = yPos = 0;
            xInc = Math.abs(xInc);
            yInc = Math.abs(yInc);

            if (!animationFrameId) {
                requestAnimationFrame(loadStep);
            }
        }

        /**
         * Simple function call to initiate the animation
         * This will run indefinitely
         */
        function animateLoader(timestamp) {
            loadStep(timestamp);
            animationFrameId = requestAnimationFrame(animateLoader);
        }

        /**
         * Takes a `load` step to increment and decrement the loader appropriately 
         */
        function loadStep(timestamp) {
            startTime = startTime || timestamp;
            const timeSpent = Math.round((timestamp - startTime) / 1000) + ' seconds';

            loader0.style.left = xPos + 'px';
            loader90.style.top = yPos + 'px';

            xPos = Math.min(xInc + xPos, hSpace);
            yPos = Math.min(yInc + yPos, vSpace);

            if (xPos >= hSpace || xPos <= 0) {
                xInc = -xInc;
                xPos = Math.abs(xPos);
            }

            if (yPos >= vSpace || yPos <= 0) {
                yInc = -yInc;
                yPos = Math.abs(yPos);
            }

            timePassedElement.textContent = timeSpent;
        }

        /**
         * Object methods related to the given loader
         */
        return { start, stop, reset };
    }
}

