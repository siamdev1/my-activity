<?php
if (!defined('ABSPATH')) {
    exit;
}

class Siam_CPT_Manager {

    public function __construct() {
        add_action('init', [$this, 'register_portfolio_cpt']);
        add_action('init', [$this, 'register_portfolio_taxonomy']);
    }

    public function register_portfolio_cpt(): void {
        $labels = [
            'name'                  => _x('Projects', 'Post type general name', 'siam-toolkit'),
            'singular_name'         => _x('Project', 'Post type singular name', 'siam-toolkit'),
            'menu_name'             => _x('Portfolio', 'Admin Menu text', 'siam-toolkit'),
            'name_admin_bar'        => _x('Project', 'Add New on Toolbar', 'siam-toolkit'),
            'add_new'               => __('Add New Project', 'siam-toolkit'),
            'add_new_item'          => __('Add New Project', 'siam-toolkit'),
            'new_item'              => __('New Project', 'siam-toolkit'),
            'edit_item'             => __('Edit Project', 'siam-toolkit'),
            'view_item'             => __('View Project', 'siam-toolkit'),
            'all_items'             => __('All Projects', 'siam-toolkit'),
            'search_items'          => __('Search Projects', 'siam-toolkit'),
        ];

        $args = [
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'show_in_rest'       => true, // Enables Gutenberg & REST API
            'query_var'          => true,
            'rewrite'            => ['slug' => 'portfolio'],
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => 5,
            'menu_icon'          => 'dashicons-portfolio',
            'supports'           => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        ];

        register_post_type('siam_project', $args);
    }

    public function register_portfolio_taxonomy(): void {
        $labels = [
            'name'              => _x('Tech Stacks', 'taxonomy general name', 'siam-toolkit'),
            'singular_name'     => _x('Tech Stack', 'taxonomy singular name', 'siam-toolkit'),
            'search_items'      => __('Search Tech Stacks', 'siam-toolkit'),
            'all_items'         => __('All Tech Stacks', 'siam-toolkit'),
            'edit_item'         => __('Edit Tech Stack', 'siam-toolkit'),
            'update_item'       => __('Update Tech Stack', 'siam-toolkit'),
            'add_new_item'      => __('Add New Tech Stack', 'siam-toolkit'),
            'new_item_name'     => __('New Tech Stack Name', 'siam-toolkit'),
            'menu_name'         => __('Tech Stacks', 'siam-toolkit'),
        ];

        $args = [
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'show_in_rest'      => true,
            'query_var'         => true,
            'rewrite'           => ['slug' => 'tech-stack'],
        ];

        register_taxonomy('siam_tech_stack', ['siam_project'], $args);
    }
}

new Siam_CPT_Manager();
