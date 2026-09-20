<?php
if (!defined('ABSPATH')) {
    exit;
}

class Siam_REST_Endpoints {

    private string $namespace = 'siam/v1';

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes(): void {
        register_rest_route($this->namespace, '/activity', [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => [$this, 'get_activity_telemetry'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($this->namespace, '/portfolio', [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => [$this, 'get_portfolio_items'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function get_activity_telemetry(WP_REST_Request $request): WP_REST_Response {
        $portfolio_count = wp_count_posts('siam_project')->publish ?? 0;
        $posts_count = wp_count_posts('post')->publish ?? 0;

        $response_data = [
            'status'         => 'success',
            'developer'      => 'Siam (siamdev1)',
            'plugin_version' => SIAM_TOOLKIT_VERSION,
            'metrics'        => [
                'total_projects'  => (int) $portfolio_count,
                'published_posts' => (int) $posts_count,
                'wp_version'      => get_bloginfo('version'),
                'php_version'     => phpversion(),
            ],
            'timestamp'      => current_time('mysql', true)
        ];

        return new WP_REST_Response($response_data, 200);
    }

    public function get_portfolio_items(WP_REST_Request $request): WP_REST_Response {
        $query = new WP_Query([
            'post_type'      => 'siam_project',
            'posts_per_page' => 10,
            'post_status'    => 'publish'
        ]);

        $items = [];
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $items[] = [
                    'id'        => get_the_ID(),
                    'title'     => get_the_title(),
                    'permalink' => get_permalink(),
                    'excerpt'   => get_the_excerpt(),
                    'thumbnail' => get_the_post_thumbnail_url(get_the_ID(), 'medium'),
                ];
            }
            wp_reset_postdata();
        }

        return new WP_REST_Response(['status' => 'success', 'data' => $items], 200);
    }
}

new Siam_REST_Endpoints();
