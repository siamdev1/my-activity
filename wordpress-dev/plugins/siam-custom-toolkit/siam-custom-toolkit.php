<?php
/**
 * Plugin Name:       Siam Custom Developer Toolkit
 * Plugin URI:        https://github.com/siamdev1/my-activity
 * Description:       Enterprise-ready developer toolkit providing custom post types, REST API endpoints, and WooCommerce tweaks.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Author:            Siam (siamdev1)
 * Author URI:        https://github.com/siamdev1
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       siam-toolkit
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('SIAM_TOOLKIT_VERSION', '1.0.0');
define('SIAM_TOOLKIT_DIR', plugin_dir_path(__FILE__));
define('SIAM_TOOLKIT_URL', plugin_dir_url(__FILE__));

final class Siam_Custom_Toolkit {

    private static ?Siam_Custom_Toolkit $instance = null;

    public static function instance(): Siam_Custom_Toolkit {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        $this->load_dependencies();
        $this->init_hooks();
    }

    private function load_dependencies(): void {
        require_once SIAM_TOOLKIT_DIR . 'inc/custom-post-types.php';
        require_once SIAM_TOOLKIT_DIR . 'inc/rest-api-endpoints.php';
        require_once SIAM_TOOLKIT_DIR . 'inc/woocommerce-tweaks.php';
    }

    private function init_hooks(): void {
        add_action('plugins_loaded', [$this, 'on_plugins_loaded']);
    }

    public function on_plugins_loaded(): void {
        load_plugin_textdomain('siam-toolkit', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
}

// Initialize the plugin instance
function siam_custom_toolkit_init(): Siam_Custom_Toolkit {
    return Siam_Custom_Toolkit::instance();
}

siam_custom_toolkit_init();
