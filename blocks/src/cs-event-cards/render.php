<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
    
require_once plugin_dir_path( __FILE__ ) . '../inc/class-cs-event-cards-renderer.php';


/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$wrapper_attributes = get_block_wrapper_attributes();
/* NOTE: We can use the sprintf here because all parameters are sanitized within the classes used by the render function */
echo sprintf( '<div %1$s>%2$s</div>', $wrapper_attributes, \amb_dev\b4cs\b4cs_event_cards_render( $attributes ) );
