/**
 * main
 */
import { createRoot } from 'react-dom/client';
import App from './App';
import { ModalProvider, ModalContainer } from './components/Modal';


((w, $) => {
  'use strict';

  const AppProvider = ({ children }) => {
    return (
      <ModalProvider>
        {children}
        {/* <ModalContainer /> */}
      </ModalProvider>
    );
  }

  const setup = () => {
    const addBtnMarkup = `<span class="etl-tailwind-scope etl-container-button-open-library-template">
    </span>`;  

    const $buttonContainerClassSelector = '.elementor-add-new-section';
    const $container = elementor.$previewContents[0].querySelector($buttonContainerClassSelector);
    
    
    // get the last buttons in container
    const $lastButton = [...$container.querySelectorAll('button')].pop();

    // add button to the last button 
    $lastButton.insertAdjacentHTML('afterend', addBtnMarkup);


    const $rootTemplateLibrary = document.getElementById('ETL-ROOT-TEMPLATE-LIBRARY');
    const root = createRoot($rootTemplateLibrary);
    root.render(<AppProvider>
      <App appendButtonTo={ $container.querySelector('.etl-container-button-open-library-template') } />
      <ModalContainer />
    </AppProvider>);
  }

  // window load
  $( window ).on( 'elementor/panel/init', function (e){ 
    const elementLoadedSelector = '.elementor-add-section-drag-title';

    // setInterval check if buttonContainerClassSelector is loaded
    const interval = setInterval(() => {
      const $elementLoaded = elementor.$previewContents[0].querySelector(elementLoadedSelector);
      if ($elementLoaded) {
        try {
          setup();
          clearInterval(interval);
        } catch (error) {
          console.error('Error in template library initialization:', error);
          clearInterval(interval);
        }
      }
    }, 500);
  } );

})(window, jQuery)

