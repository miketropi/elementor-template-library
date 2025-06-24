/**
 * Tab Component
 * 
 * A clean, modern, and responsive tab component built with Tailwind CSS.
 * 
 * USAGE:
 * 
 * Basic usage:
 * <Tab
 *   tabs={[
 *     { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
 *     { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> }
 *   ]}
 * />
 * 
 * With icons:
 * <Tab
 *   tabs={[
 *     { id: 'tab1', label: 'Home', icon: '🏠', content: <div>Home content</div> },
 *     { id: 'tab2', label: 'Settings', icon: '⚙️', content: <div>Settings content</div> },
 *     { id: 'tab3', label: 'Profile', icon: '👤', content: <div>Profile content</div> }
 *   ]}
 * />
 * 
 * With custom active tab:
 * <Tab
 *   tabs={tabsArray}
 *   activeTab="tab2"
 *   onTabChange={(tabId) => console.log('Active tab:', tabId)}
 * />
 * 
 * With custom styling:
 * <Tab
 *   tabs={tabsArray}
 *   variant="pills" // or "underline", "cards", "classic", "minimal", "segmented", "icon-only"
 *   size="lg" // or "sm", "md"
 *   className="custom-tab-wrapper"
 * />
 * 
 * PROPS:
 * - tabs: Array of tab objects with { id, label, content, icon?, disabled? }
 * - activeTab: String - ID of the initially active tab
 * - onTabChange: Function - Callback when tab changes
 * - variant: String - "underline" (default), "pills", "cards", "classic", "minimal", "segmented", "icon-only"
 * - size: String - "sm", "md" (default), "lg"
 * - className: String - Additional CSS classes
 * - disabled: Boolean - Disable all tabs
 */

import React, { useState, useEffect } from 'react';

const Tab = ({
  tabs = [],
  activeTab,
  onTabChange,
  variant = 'underline',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab || (tabs.length > 0 ? tabs[0].id : null));

  useEffect(() => {
    if (activeTab && activeTab !== currentTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    if (disabled) return;
    
    const tab = tabs.find(t => t.id === tabId);
    if (tab && tab.disabled) return;
    
    setCurrentTab(tabId);
    onTabChange?.(tabId);
  };

  const getVariantStyles = () => {
    const baseStyles = {
      container: '',
      tabList: '',
      tab: '',
      activeTab: '',
      inactiveTab: ''
    };

    switch (variant) {
      case 'pills':
        baseStyles.container = 'bg-gray-50 rounded-2xl p-1';
        baseStyles.tabList = 'flex gap-1';
        baseStyles.tab = 'flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer text-center min-h-[44px] flex items-center justify-center';
        baseStyles.activeTab = 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200';
        baseStyles.inactiveTab = 'text-gray-600 hover:text-gray-900 hover:bg-white/60';
        break;
      
      case 'cards':
        baseStyles.container = 'bg-white';
        baseStyles.tabList = 'grid grid-cols-2 gap-2 mb-4';
        baseStyles.tab = 'px-4 py-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border-2 min-h-[60px] flex items-center justify-center text-center';
        baseStyles.activeTab = 'text-blue-600 bg-blue-50 border-blue-200 shadow-sm';
        baseStyles.inactiveTab = 'text-gray-500 border-gray-100 hover:text-blue-600 hover:bg-blue-50/50 hover:border-blue-100';
        break;
      
      case 'classic':
        baseStyles.container = 'bg-white border-b border-gray-200';
        baseStyles.tabList = 'flex overflow-x-auto scrollbar-hide';
        baseStyles.tab = 'px-6 py-4 text-sm font-medium transition-all duration-200 cursor-pointer border-b-2 border-transparent whitespace-nowrap min-w-[120px] text-center flex-shrink-0';
        baseStyles.activeTab = 'text-blue-600 border-blue-600';
        baseStyles.inactiveTab = 'text-gray-500 hover:text-gray-700 hover:border-gray-300';
        break;
      
      case 'minimal':
        baseStyles.container = 'bg-white';
        baseStyles.tabList = 'flex flex-wrap gap-4';
        baseStyles.tab = 'px-1 py-3 text-sm font-medium transition-all duration-200 cursor-pointer relative min-h-[44px] flex items-center';
        baseStyles.activeTab = 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900 after:rounded-full';
        baseStyles.inactiveTab = 'text-gray-400 hover:text-gray-600';
        break;
      
      case 'segmented':
        baseStyles.container = 'bg-gray-100 rounded-2xl p-1';
        baseStyles.tabList = 'flex';
        baseStyles.tab = 'flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer text-center rounded-xl min-h-[44px] flex items-center justify-center';
        baseStyles.activeTab = 'bg-white text-gray-900 shadow-sm';
        baseStyles.inactiveTab = 'text-gray-600 hover:text-gray-900';
        break;
      
      case 'icon-only':
        baseStyles.container = 'bg-white border-b border-gray-200';
        baseStyles.tabList = 'flex overflow-x-auto scrollbar-hide';
        baseStyles.tab = 'px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer border-b-2 border-transparent whitespace-nowrap min-w-[60px] text-center flex-shrink-0 min-h-[48px] flex flex-col items-center justify-center gap-1';
        baseStyles.activeTab = 'text-blue-600 border-blue-600';
        baseStyles.inactiveTab = 'text-gray-500 hover:text-gray-700 hover:border-gray-300';
        break;
      
      case 'underline':
      default:
        baseStyles.container = 'bg-white';
        baseStyles.tabList = 'flex overflow-x-auto scrollbar-hide border-b border-gray-100';
        baseStyles.tab = 'px-6 py-4 text-sm font-medium transition-all duration-200 cursor-pointer border-b-2 border-transparent whitespace-nowrap min-w-[100px] text-center flex-shrink-0 min-h-[48px] flex items-center justify-center';
        baseStyles.activeTab = 'text-gray-900 border-gray-900';
        baseStyles.inactiveTab = 'text-gray-500 hover:text-gray-700 hover:border-gray-300';
        break;
    }

    return baseStyles;
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          tab: 'px-3 py-2 text-xs',
          content: 'p-0'
        };
      case 'lg':
        return {
          tab: 'px-6 py-4 text-base',
          content: 'p-0'
        };
      case 'md':
      default:
        return {
          tab: 'px-4 py-3 text-sm',
          content: 'p-0'
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  if (!tabs || tabs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tabs available
      </div>
    );
  }

  const activeTabData = tabs.find(tab => tab.id === currentTab);

  return (
    <div className={`tab-component ${className}`}>
      {/* Tab Navigation */}
      <div className={`${variantStyles.container} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className={`${variantStyles.tabList} overflow-x-auto scrollbar-hide`}>
          {tabs.map((tab) => {
            const isActive = tab.id === currentTab;
            const isDisabled = disabled || tab.disabled;
            
            return (
              <button
                style={{
                  boxShadow: 'none !important'
                }}
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                disabled={isDisabled}
                className={`
                  ${variantStyles.tab}
                  ${sizeStyles.tab}
                  ${isActive ? variantStyles.activeTab : variantStyles.inactiveTab}
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                  whitespace-nowrap
                  
                  transition-all duration-200 ease-in-out
                `}
                aria-selected={isActive}
                role="tab"
              >
                {tab.icon && (
                  <span className={`${variant === 'icon-only' ? 'text-lg' : 'mr-2 text-base'} leading-none`}>
                    {tab.icon}
                  </span>
                )}
                <span className={variant === 'icon-only' ? 'text-xs' : ''}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div 
        className={`${sizeStyles.content} bg-white`}
        role="tabpanel"
        aria-labelledby={`tab-${currentTab}`}
      >
        {activeTabData ? (
          <div className="animate-fadeIn">
            {activeTabData.content}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No content available
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx="true">{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .tab-component .tab-list {
            scroll-snap-type: x mandatory;
          }
          
          .tab-component .tab-list button {
            scroll-snap-align: start;
            min-width: max-content;
          }
        }
      `}</style>
    </div>
  );
};

export default Tab;
