const island = document.getElementById('island');
        const islandContent = document.getElementById('island-content');
        let hideTimeout = null;

        const states = {
            'idle': {
                widthClass: 'w-[100px]',
                heightClass: 'h-[30px]',
                roundedClass: 'rounded-full',
                contentHTML: '',
                justifyClass: 'justify-center',
            },
            'call': (message) => ({
                widthClass: 'w-[500px]',
                heightClass: 'h-10',
                roundedClass: 'rounded-3xl',
                justifyClass: 'justify-between',
                contentHTML: `
                    <div class="flex items-center space-x-2 max-w-[450px] force-wrap">
                        <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-xs">${message}</span>
                    </div>
                    <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                `
            }),
            'music': {
                widthClass: 'w-48',
                heightClass: 'h-10',
                roundedClass: 'rounded-3xl',
                justifyClass: 'justify-between',
                contentHTML: `
                    <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a2 2 0 00-2-2H4a2 2 0 00-2 2v14a2 2 0 002 2h4a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h4a2 2 0 002-2V3zm-2 16h-3V5a1 1 0 00-1-1h-4a1 1 0 00-1 1v14H4V3h12v16z"/>
                        </svg>
                        <span class="text-xs">U2 - Where The...</span>
                    </div>
                    <div class="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                `
            },
        };

        function setIslandState(stateKey, customState = null) {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }

            const state = customState || states[stateKey];
            const sizeTransitionDuration = 500;

            islandContent.style.opacity = '0';
            islandContent.innerHTML = state.contentHTML;

            const allSizeClasses = ['w-[100px]', 'w-72', 'w-48', 'w-[500px]', 'h-[30px]', 'h-10', 'rounded-full', 'rounded-3xl', 'justify-center', 'justify-between'];
            island.classList.remove(...allSizeClasses);
            islandContent.classList.remove('justify-center', 'justify-between');

            island.classList.add(state.widthClass, state.heightClass, state.roundedClass);
            islandContent.classList.add(state.justifyClass);

            if (stateKey !== 'idle') {
                setTimeout(() => {
                    islandContent.style.opacity = '1';
                }, 50);

                hideTimeout = setTimeout(() => {
                    setIslandState('idle');
                }, 4000);
            }
        }

        function triggerNotification(message) {
            const notificationState = states.call(message);
            setIslandState('call', notificationState);
        }

        window.onload = function () {
            setIslandState('idle');
        }