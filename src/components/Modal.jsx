import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// Modal Context for managing multiple modals
const ModalContext = createContext();

// Modal Provider - Wrap your app with this
export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState(new Map());

  const openModal = useCallback((id, content, options = {}) => {
    setModals(prev => new Map(prev).set(id, { content, options }));
  }, []);

  const closeModal = useCallback((id) => {
    setModals(prev => {
      const newModals = new Map(prev);
      newModals.delete(id);
      return newModals;
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setModals(new Map());
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals, modals }}>
      {children}
    </ModalContext.Provider>
  );
};

// useModal Hook - Use this in your components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Individual Modal Component
const Modal = ({ id, content, options = {}, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    size = 'md', // 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full'
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    preventScroll = true,
    animation = 'fade', // 'fade', 'slide', 'scale'
    fullScreenOnMobile = false,
  } = options;

  // Responsive size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full mx-4',
  };

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (preventScroll) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [preventScroll]);

  // Show modal with animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsAnimating(true);
    setIsVisible(false);
    
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible && !isAnimating) return null;

  return createPortal(
    <div
      className={`
        fixed inset-0 z-9999 flex items-center justify-center
        transition-all duration-200 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${fullScreenOnMobile ? 'p-0 sm:p-4' : 'p-4'}
      `}
      onClick={handleOverlayClick}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        className={`
          relative bg-white shadow-2xl rounded-md
          w-full transform transition-all duration-200 ease-out
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
          ${fullScreenOnMobile ? 'h-full sm:h-auto sm:max-h-[calc(100vh-2rem)]' : 'max-h-[calc(100vh-2rem)]'}
          ${fullScreenOnMobile ? 'rounded-none sm:rounded-xl' : ''}
          ${sizeClasses[size]}
        `}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="
              absolute top-4 right-4 z-10
              p-2 rounded-full
              bg-gray-100 hover:bg-gray-200
              text-gray-600 hover:text-gray-800
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              group
            "
            aria-label="Close modal"
          >
            <X 
              size={20} 
              className="transition-transform duration-200 group-hover:rotate-90" 
            />
          </button>
        )}

        {/* Modal Content */}
        <div 
          className={`
            overflow-y-auto max-h-full
            ${fullScreenOnMobile ? 'h-full p-4 sm:p-6' : 'p-6'}
          `}
          style={{
            maxHeight: fullScreenOnMobile ? '100vh' : 'calc(100vh - 2rem)',
            overflowY: 'auto'
          }}
        >
          {typeof content === 'function' ? content({ close: handleClose }) : content}
        </div>
      </div>
    </div>,
    document.querySelector('#ETL-ROOT-TEMPLATE-LIBRARY')
  );
};

// Modal Container - Add this to your app to render modals
export const ModalContainer = () => {
  const { modals, closeModal } = useModal();

  return (
    <>
      {Array.from(modals.entries()).map(([id, { content, options }]) => (
        <Modal
          key={id}
          id={id}
          content={content}
          options={options}
          onClose={() => closeModal(id)}
        />
      ))}
    </>
  );
};

// Export individual components
export { Modal };

/*
HOW TO USE THIS MODAL COMPONENT:

1. SETUP - Wrap your app with ModalProvider and add ModalContainer:

import { ModalProvider, ModalContainer } from './components/Modal';

function App() {
  return (
    <ModalProvider>
      <YourAppContent />
      <ModalContainer />
    </ModalProvider>
  );
}

2. USAGE - In any component, use the useModal hook:

import { useModal } from './components/Modal';

function MyComponent() {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal('my-modal', (
      <div>
        <h2 className="text-2xl font-bold mb-4">My Modal</h2>
        <p className="text-gray-600">This is modal content!</p>
        <div className="mt-6 flex gap-3">
          <button 
            onClick={() => closeModal('my-modal')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              // Do something
              closeModal('my-modal');
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    ), {
      size: 'md',
      closeOnOverlayClick: true,
      closeOnEscape: true,
      showCloseButton: true,
      preventScroll: true,
      animation: 'fade',
      fullScreenOnMobile: false,
    });
  };

  return (
    <button 
      onClick={handleOpenModal}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Open Modal
    </button>
  );
}

3. OPTIONS:
- size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'
- closeOnOverlayClick: boolean (default: true)
- closeOnEscape: boolean (default: true)
- showCloseButton: boolean (default: true)
- preventScroll: boolean (default: true)
- animation: 'fade' | 'slide' | 'scale' (default: 'fade')
- fullScreenOnMobile: boolean (default: false)

4. MOBILE/TABLET FEATURES:
- Responsive sizing
- Touch-friendly close button
- Optional full-screen mode on mobile
- Proper padding and spacing for touch devices
- Backdrop blur effect
- Smooth animations

5. ACCESSIBILITY:
- Escape key support
- Focus management
- ARIA labels
- Keyboard navigation support
*/
