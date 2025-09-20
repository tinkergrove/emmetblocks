<?php
/**
 * Plugin Name: EmmetBlocks
 * Plugin URI: https://tinkergrove.com/emmetblocks
 * Description: Generate WordPress block layouts using Emmet syntax via command palette.
 * Version: 0.1.0
 * Author: TinkerGrove
 * Author URI: https://tinkergrove.com
 * Text Domain: emmetblocks
 * Domain Path: /languages
 * Requires at least: 6.3
 * Tested up to: 6.8.2
 * Requires PHP: 7.4
 * License: GPL v3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package EmmetBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'enqueue_block_editor_assets',
	function () {
		if ( ! file_exists( __DIR__ . '/build/index.asset.php' ) ) {
			return;
		}
		$asset = include __DIR__ . '/build/index.asset.php';
		wp_enqueue_script(
			'emmetblocks-editor',
			plugins_url( 'build/index.js', __FILE__ ),
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}
);
