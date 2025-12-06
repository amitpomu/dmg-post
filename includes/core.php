<?php
/**
 * @package dmg
 * @category Core
 * @author amitpomu
 */
namespace DMG;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Core
{

    protected static $instance = null;

    public static function get_instance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct()
    {
        self::init();
        self::register();
    }

    public function register()
    {
        include_once DMG_BASE_PATH . '/includes/cli.php';
    }

    public function init()
    {
        // register block categories
        add_filter('block_categories_all', array($this, 'register_block_category'), 10, 2);

        //register blocks
        add_action('init', array($this, 'blocks_init'));
    }

    /*
     * register block categories
     */
    public function register_block_category($block_categories)
    {
        array_unshift(
            $block_categories,
            array(
                'slug' => 'dmg',
                'title' => __('DMG', 'dmg')
            )
        );
        return $block_categories;
    }

    /*
     * register block names
     */
    public static function get_blocks_names()
    {
        $blocks = array(
            'post',
        );
        return $blocks;
    }

    // register blocks
    public function blocks_init()
    {
        foreach (self::get_blocks_names() as $block_name) {
            register_block_type(DMG_BASE_PATH . '/blocks/build/' . $block_name);
        }
    }
}

// Initialize
Core::get_instance();
