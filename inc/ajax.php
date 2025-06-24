<?php 
/**
 * ajax.php
 */

add_action( 'wp_ajax_etl_insert_template_callback', 'etl_insert_template_callback' );

function etl_insert_template_callback() {
  // wp_send_json_success($_POST);

  $post_id = $_POST['post_id'];

  // template elemtentor demo
  $template_data = [
    [
      'id' => '1234',
      'elType' => 'section',
      'settings' => [
        'background_color' => '#f8f9fa',
        'padding' => [
          'unit' => 'px',
          'top' => '80',
          'right' => '0',
          'bottom' => '80',
          'left' => '0',
          'isLinked' => false
        ]
      ],
      'elements' => [
        [
          'id' => '5678',
          'elType' => 'column',
          'settings' => [
            '_column_size' => 100
          ],
          'elements' => [
            [
              'id' => '9012',
              'elType' => 'widget',
              'widgetType' => 'heading',
              'settings' => [
                'title' => 'Ready to Get Started?',
                'typography_typography' => 'custom',
                'typography_font_size' => [
                  'unit' => 'px',
                  'size' => '48',
                  'sizes' => []
                ],
                'typography_font_weight' => '600',
                'align' => 'center',
                'margin' => [
                  'unit' => 'px',
                  'top' => '0',
                  'right' => '0',
                  'bottom' => '20',
                  'left' => '0',
                  'isLinked' => false
                ]
              ]
            ],
            [
              'id' => '3456',
              'elType' => 'widget',
              'widgetType' => 'text-editor',
              'settings' => [
                'editor' => 'Join thousands of satisfied customers and take your business to the next level.',
                'typography_typography' => 'custom',
                'typography_font_size' => [
                  'unit' => 'px',
                  'size' => '18',
                  'sizes' => []
                ],
                'typography_color' => '#6c757d',
                'align' => 'center',
                'margin' => [
                  'unit' => 'px',
                  'top' => '0',
                  'right' => '0',
                  'bottom' => '40',
                  'left' => '0',
                  'isLinked' => false
                ]
              ]
            ],
            [
              'id' => '7890',
              'elType' => 'widget',
              'widgetType' => 'button',
              'settings' => [
                'text' => 'Get Started Now',
                'link' => [
                  'url' => '#',
                  'is_external' => false,
                  'nofollow' => false,
                  'custom_attributes' => ''
                ],
                'button_type' => 'filled',
                'background_color' => '#007bff',
                'hover_background_color' => '#0056b3',
                'text_color' => '#ffffff',
                'hover_text_color' => '#ffffff',
                'typography_typography' => 'custom',
                'typography_font_size' => [
                  'unit' => 'px',
                  'size' => '16',
                  'sizes' => []
                ],
                'typography_font_weight' => '600',
                'border_radius' => [
                  'unit' => 'px',
                  'top' => '8',
                  'right' => '8',
                  'bottom' => '8',
                  'left' => '8',
                  'isLinked' => true
                ],
                'padding' => [
                  'unit' => 'px',
                  'top' => '15',
                  'right' => '30',
                  'bottom' => '15',
                  'left' => '30',
                  'isLinked' => false
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ];

  etl_insert_template($post_id, $template_data);

  wp_send_json_success();
}   

// ajax get templates
add_action( 'wp_ajax_etl_get_templates_callback', 'etl_get_templates_callback' );

function etl_get_templates_callback() {
  // check_ajax_referer 
  check_ajax_referer('etl_nonce', 'nonce');

  $templates = etl_get_templates();
  
  // Filter templates by category and format the data
  $category_data = [
    // all for default
    'all' => [
      'id' => 'all',
      'name' => 'All',
      'count' => count($templates),
      'templates' => $templates
    ]
  ];
  
  foreach ($templates as $template) {
    $category = $template['category'];
    
    if (!isset($category_data[$category])) {
      $category_data[$category] = [
        'id' => $category,
        'name' => ucfirst($category),
        'count' => 0,
        // 'templates' => []
      ];
    }
    
    $category_data[$category]['count']++;
    // $category_data[$category]['templates'][] = $template;
  }
  
  // Convert to indexed array format
  $formatted_categories = array_values($category_data);

  wp_send_json_success([
    'templates' => $templates,
    'categories' => $formatted_categories
  ]);
}

// import template to elementor editor
add_action( 'wp_ajax_etl_import_template_to_elementor_editor_callback', 'etl_import_template_to_elementor_editor_callback' );

function etl_import_template_to_elementor_editor_callback() {
  // check_ajax_referer 
  check_ajax_referer('etl_nonce', 'nonce');

  // wp_send_json_success($_POST);

  $import_url = $_POST['import_url'];
  $post_id = $_POST['post_id'];

  // get template data from import url
  $template_data = file_get_contents($import_url);

  // validate $template_data is json content
  if (json_decode($template_data) == null) {
    wp_send_json_error('Invalid template data');
  }

  // insert template to elementor editor
  $result = etl_insert_template($post_id, $template_data);

  // if insert template failed, return error
  if ($result == false) {
    wp_send_json_error('Failed to insert template');
  }

  wp_send_json_success(true);
}

// ajax etl_send_bug_report
add_action( 'wp_ajax_etl_send_bug_report_callback', 'etl_send_bug_report_callback' );

function etl_send_bug_report_callback() {
  // check_ajax_referer 
  check_ajax_referer('etl_nonce', 'nonce');

  $data = $_POST;

  // send bug report
  $result = etl_send_bug_report($data);
  
  // check wp_error
  if (is_wp_error($result)) {
    wp_send_json_error($result->get_error_message());
  }

  wp_send_json_success($result);
}
