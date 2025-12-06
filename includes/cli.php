<?php
/**
 * @package dmg
 * @category CLI
 * @author amitpomu
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

if (!class_exists('WP_CLI')) {
    return;
}

class DMG_Read_More_CLI
{

    /**
     * Search posts/pages for a specific Gutenberg block within a date range.
     *
     * ## OPTIONS
     *
     * [--block=<block_name>]
     * : Gutenberg block name to search for. Example: dmg/post
     *
     * [--date-after=<YYYY-MM-DD>]
     * : Start date. Defaults to 30 days ago if omitted.
     *
     * [--date-before=<YYYY-MM-DD>]
     * : End date. Defaults to today if omitted.
     *
     * ## EXAMPLES
     *
     *     wp dmg-read-more search --block=dmg/post
     *     wp dmg-read-more search --block=dmg/post --date-after=2025-11-01 --date-before=2025-11-30
     *
     * @when after_wp_load
     */
    public function search($args, $assoc_args)
    {
        $block_name = isset($assoc_args['block']) ? $assoc_args['block'] : 'dmg/post';
        $date_before = isset($assoc_args['date-before']) ? $assoc_args['date-before'] : date('Y-m-d');
        $date_after = isset($assoc_args['date-after']) ? $assoc_args['date-after'] : date('Y-m-d', strtotime('-30 days'));

        // Fetch posts
        $posts = get_posts([
            'post_type' => ['post', 'page'],
            'post_status' => 'publish',
            'ignore_sticky_posts' => true,
            'date_query' => [
                [
                    'after' => $date_after,
                    'before' => $date_before,
                    'inclusive' => true,
                ],
            ],
            'fields' => 'ids',
            'posts_per_page' => -1,
        ]);

        if (empty($posts)) {
            WP_CLI::warning("No posts found in the given date range.");
            return;
        }

        $found = false;

        foreach ( $posts as $post_id ) {
                $content = get_post_field('post_content', $post_id);

                if ( strpos($content, '<!-- wp:' . $block_name) !== false ) {
                    WP_CLI::log($post_id);
                    $found = true;
                }
            }

            // foreach ($posts as $post) {
            //     if (has_block($block_name, get_post($post))) {
            //         WP_CLI::log($post);
            //         $found = true;
            //     }
            // }

        if (!$found) {
            WP_CLI::warning("No posts found containing the block '{$block_name}' in the given date range.");
        }
        wp_reset_postdata();
    }
}

WP_CLI::add_command('dmg-read-more', 'DMG_Read_More_CLI');
