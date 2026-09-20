<?php
/**
 * Developer Theme Snippets (functions.php additions)
 * Author: Siam (siamdev1)
 * Description: Production-grade WordPress theme optimization snippets.
 */

// 1. Remove WordPress head bloat & unnecessary generator tags
add_action('init', function() {
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);
    remove_action('wp_head', 'rest_output_link_wp_head', 10);
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
});

// 2. Disable XML-RPC for enhanced brute-force security
add_filter('xmlrpc_enabled', '__return_false');

// 3. Defer non-critical JavaScript execution
add_filter('script_loader_tag', function($tag, $handle, $src) {
    if (is_admin()) {
        return $tag;
    }
    // Exclude jQuery core from deferral
    if (strpos($handle, 'jquery-core') !== false) {
        return $tag;
    }
    return str_replace(' src', ' defer="defer" src', $tag);
}, 10, 3);

// 4. Custom Excerpt Length Controller
add_filter('excerpt_length', function($length) {
    return 25;
}, 999);

// 5. Add custom SVG upload support safely for Administrators
add_filter('upload_mimes', function($mimes) {
    if (current_user_can('administrator')) {
        $mimes['svg'] = 'image/svg+xml';
    }
    return $mimes;
});
