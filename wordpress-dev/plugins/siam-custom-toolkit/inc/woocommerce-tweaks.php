<?php
if (!defined('ABSPATH')) {
    exit;
}

class Siam_WooCommerce_Tweaks {

    public function __construct() {
        // Check if WooCommerce is active
        if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
            $this->init_tweaks();
        }
    }

    private function init_tweaks(): void {
        // Add custom badge to high-value products
        add_action('woocommerce_before_shop_loop_item_title', [$this, 'display_featured_developer_badge'], 15);

        // Customize checkout fields
        add_filter('woocommerce_checkout_fields', [$this, 'optimize_checkout_fields']);

        // Save custom order metadata
        add_action('woocommerce_checkout_update_order_meta', [$this, 'save_custom_order_meta']);
    }

    public function display_featured_developer_badge(): void {
        global $product;
        if ($product && $product->get_price() > 100) {
            echo '<span class="siam-pro-badge" style="position: absolute; top: 10px; right: 10px; background: #6366f1; color: #fff; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; z-index: 10;">PREMIUM</span>';
        }
    }

    public function optimize_checkout_fields(array $fields): array {
        // Optimize address2 placeholder
        if (isset($fields['billing']['billing_address_2'])) {
            $fields['billing']['billing_address_2']['placeholder'] = __('Apartment, suite, unit, etc. (optional)', 'siam-toolkit');
        }
        return $fields;
    }

    public function save_custom_order_meta(int $order_id): void {
        update_post_meta($order_id, '_siam_processed_via', 'Siam Custom Toolkit v' . SIAM_TOOLKIT_VERSION);
    }
}

new Siam_WooCommerce_Tweaks();
