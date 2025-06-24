export const __request = async (url, options) => {
  const response = await fetch(url, options);
  return response.json();
}

export const __get_templates = async () => {
  const response = await __request(etl_data.ajax_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      action: 'etl_get_templates_callback',
      nonce: etl_data.nonce,
    }),
  });

  return response;
}

export const __import_template_to_elementor_editor = async (post_id, import_url) => {
  const response = await __request(etl_data.ajax_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      action: 'etl_import_template_to_elementor_editor_callback',
      nonce: etl_data.nonce,
      post_id: post_id,
      import_url: import_url,
    }),
  });

  return response;
}

export const __send_bug_report = async (data) => {
  const response = await __request(etl_data.ajax_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      action: 'etl_send_bug_report_callback',
      nonce: etl_data.nonce,
      ...data,
    }),
  });

  return response;
}