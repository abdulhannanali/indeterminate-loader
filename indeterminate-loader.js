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
        const MAX_PROGRESS = 1;
        
        const loaderVertical = document.querySelector('.loader-box-vertical');
        const loaderHorizontal = document.querySelector('.loader-box-horizontal');
        const loaderContainer = document.querySelector('.loader-container');

        const timePassedElement = document.querySelector('.info-field.time-passed .field-value');
        const totalIterationsElement = document.querySelector('.info-field.iterations-completed .field-value');

        let startTime;

        let xInc = 15;
        let yInc = 3;
        let xPos = 0;
        let yPos = 0;
        let horizontalIterations = 0;
        
        let xIterations = 0;
        let yIterations = 0;

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
        }
        
        function reset() {
            xPos = yPos = 0;
            xInc = Math.abs(xInc);
            yInc = Math.abs(yInc);
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

            loaderVertical.style.left = xPos + 'px';
            loaderHorizontal.style.top = yPos + 'px';

            xPos = Math.min(loaderContainer.offsetWidth - loaderHorizontal.offsetHeight, xPos + xInc);
            yPos = Math.min(loaderContainer.offsetHeight, yPos + yInc);
            timePassedElement.textContent = timeSpent;

            if (xPos >= loaderContainer.offsetWidth - loaderHorizontal.offsetHeight || xPos <= 0) {
                xIterations++;
                xInc = -xInc;
            }

            if (yPos >= loaderContainer.offsetHeight || yPos <= 0) {
                yInc = -yInc;
                yIterations++;
            }

            totalIterationsElement.textContent = 'x = ' + xIterations + ', y = ' + yIterations;
        }

        /**
         * Object methods related to the given loader
         */
        return { start, stop, reset };
    }
}

