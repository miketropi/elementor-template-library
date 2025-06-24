import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LayoutTemplate, Settings, Bug, Book } from 'lucide-react';
import TemplateLib from './components/TemplateLib';
import ReportBug from './components/ReportBug';
import { useModal } from './components/Modal';
import Tab from './components/Tab';

export default function App({ appendButtonTo }) {
  if (!appendButtonTo) {
    return null;
  }

  const { openModal } = useModal();

  const funcInsertTemplateDemo = async () => {

    const response = await fetch(etl_data.ajax_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        action: 'etl_insert_template_callback',
        post_id: elementor.documents.getCurrent().id,
        nonce: etl_data.nonce,
      }),
    });

    if (response.ok) {
      window.location.reload();
    }
  }

  const tabs = [
    {
      id: 'template-lib',
      label: 'Template Library',
      content: <TemplateLib />,
      icon: <LayoutTemplate size={16} />
    },
    
    // report
    {
      id: 'report_bug',
      label: 'Report Bug',
      content: <ReportBug />,
      icon: <Bug size={16} />
    }
  ]

  return <>
    {/* <TemplateLibModal /> */}
    {
      createPortal(
        <button className="etl-my-button bg-blue-500 hover:bg-blue-600 text-white w-[40px] h-[40px] rounded-full transition-all duration-200 flex items-center justify-center hover:shadow-xl border-none cursor-pointer" onClick={() => {
          openModal('template-lib-modal', <>
            <Tab tabs={tabs} variant="minimal" />
          </>, {
            size: '7xl',
          });

          // funcInsertTemplateDemo()
        }}>
          <LayoutTemplate size={16} />
        </button> ,
        appendButtonTo
      )
    }
  </>;
}