<?php 
/**
 * Elementor Template Library Plugin
 * 
 * @package           ElementorTemplateLibrary
 * @author            @Mike
 * @copyright         2025 Mike
 * @license           GPL-2.0-or-later
 * 
 * @wordpress-plugin
 * Plugin Name:       Elementor Template Library
 * Plugin URI:        #
 * Description:       A comprehensive template library for Elementor with advanced features
 * Version:           0.1.1
 * Requires at least: 5.2
 * Tested up to:      6.4
 * Requires PHP:      7.4
 * Author:            @Mike (Beplus)
 * Author URI:        #
 * Text Domain:       elementor-template-library
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Prevent direct access
if (!defined('ABSPATH')) {
  exit;
}

// Define plugin constants
define('ETL_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('ETL_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ETL_PLUGIN_VERSION', '0.1.1');
define('ETL_PLUGIN_BASENAME', plugin_basename(__FILE__));

// require wp plugin elementor
if (!is_plugin_active('elementor/elementor.php')) {
  add_action('admin_notices', 'etl_elementor_missing_notice');
  return;
}

function etl_elementor_missing_notice() {
  ?>
  <div class="notice notice-warning">
    <p><strong><?php _e('From: Elementor Template Library', 'elementor-template-library'); ?></p>
    <p><?php _e('Elementor Template Library requires Elementor to be installed and activated. Please install and activate Elementor to use Elementor Template Library.', 'elementor-template-library'); ?></p>
    <p><strong><?php _e('How to fix this:', 'elementor-template-library'); ?></strong></p>
    <ol>
        <li><?php _e('Go to Plugins > Add New in your WordPress admin', 'elementor-template-library'); ?></li>
        <li><?php _e('Search for "Elementor" and install the official Elementor plugin', 'elementor-template-library'); ?></li>
        <li><?php _e('Activate Elementor after installation', 'elementor-template-library'); ?></li>
        <li><?php _e('Refresh this page to continue using Elementor Template Library', 'elementor-template-library'); ?></li>
    </ol>
  </div>
  <?php
}

{
  /**
   * Include files
   */
  require_once(ETL_PLUGIN_DIR . 'inc/static.php');
  require_once(ETL_PLUGIN_DIR . 'inc/functions.php');
  require_once(ETL_PLUGIN_DIR . 'inc/hooks.php');
  require_once(ETL_PLUGIN_DIR . 'inc/ajax.php');

  /**
   * admin
   */
  require_once(ETL_PLUGIN_DIR . 'inc/admin/admin-page.php');
}