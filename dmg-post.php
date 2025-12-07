<?php
/**
 * Plugin Name:       DMG Post
 * Plugin URI:        localhost
 * Description:       This plugin allows you to add block with searchable posts and set one readmore post. Adds custom cli command to search posts that has the dmg block.
 * Version:           1.0.0
 * Tested up to: 	  6.9
 * Requires PHP:      7.4
 * Author:            amitpomu
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dmg
 *
 * @package DMG
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

if (!class_exists('DMG_Post')) {
	final class DMG_Post
	{

		protected static $instance = null;

		public static function get_instance()
		{
			if (is_null(self::$instance)) {
				self::$instance = new self;
			}
			return self::$instance;
		}

		public function __construct()
		{
			$this->constant();
			$this->core_init();
		}

		public function constant()
		{
			// defination of core paths
			define('DMG_BASE_PATH', dirname(__FILE__));
			define('DMG_URL_PATH', plugin_dir_url(__FILE__));
			define('DMG_PLUGIN_BASE_PATH', plugin_basename(__FILE__));
			define('DMG_PLUGIN_FILE_PATH', (__FILE__));
		}

		public function core_init()
		{
			include_once DMG_BASE_PATH . '/includes/core.php';
		}

	}
}

if (!function_exists('dmg_post_plugin')) {
	function dmg_post_plugin()
	{
		return DMG_Post::get_instance();
	}
	dmg_post_plugin();
}
