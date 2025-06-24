<?php 
/**
 * static
 */

// enqueue script
function etl_enqueue_scripts() {
  # google font "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
  wp_enqueue_style('google-font-space-mono', 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap', array(), ETL_PLUGIN_VERSION);

  # style
  wp_enqueue_style('elementor-template-library', ETL_PLUGIN_URL . 'dist/elementor-template-library.build.css', array(), ETL_PLUGIN_VERSION);

  # script
  wp_enqueue_script('elementor-template-library', ETL_PLUGIN_URL . 'dist/elementor-template-library.build.js', array('jquery', 'elementor-editor'), ETL_PLUGIN_VERSION, true);

  # localize script
  wp_localize_script('elementor-template-library', 'etl_data', array(
    'ajax_url' => admin_url('admin-ajax.php'),
    'nonce' => wp_create_nonce('etl_nonce'),
    'category_icons' => apply_filters('etl_hook:category_icons', array(
      'all' => '📋',
      'landing' => '🚀',
      'ecommerce' => '🛒',
      'portfolio' => '💼',
      'blog' => '📝',
      'business' => '🏢'
    )),
  ));

  ?>
  <div id="ETL-ROOT-TEMPLATE-LIBRARY" class="etl-tailwind-scope etl-tailwind-scope--reset-all font-space-mono">
    <!-- template library -->
  </div>
  <?php
}
add_action('elementor/editor/after_enqueue_scripts', 'etl_enqueue_scripts');

function etl_enqueue_preview_styles() {
  # style
  wp_enqueue_style('elementor-template-library-preview', ETL_PLUGIN_URL . 'dist/elementor-template-library.build.css', array(), ETL_PLUGIN_VERSION);
}
add_action( 'elementor/preview/enqueue_styles', 'etl_enqueue_preview_styles' );
