/**
 * EmmetBlocks WordPress Plugin
 *
 * This plugin allows users to generate WordPress block layouts using Emmet syntax
 * through the WordPress command palette. It converts Emmet abbreviations into
 * HTML, then parses the HTML to create corresponding WordPress blocks.
 *
 * @package EmmetBlocks
 * @since 0.1.0
 */

import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { code } from '@wordpress/icons';
import { useCommand } from '@wordpress/commands';
import { Modal, TextControl, Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { registerPlugin } from '@wordpress/plugins';
import expand from 'emmet';

/**
 * Mapping of HTML element tags to WordPress block types.
 *
 * This object defines which WordPress core blocks should be created
 * for each HTML element when converting Emmet syntax to blocks.
 *
 * @type {Object.<string, string>}
 */
const tagToBlock = {
	// Basic layout elements
	div: 'core/group',
	section: 'core/group',
	article: 'core/group',
	header: 'core/group',
	main: 'core/group',
	footer: 'core/group',
	aside: 'core/group',

	// Text elements
	p: 'core/paragraph',
	span: 'core/paragraph',
	h1: 'core/heading',
	h2: 'core/heading',
	h3: 'core/heading',
	h4: 'core/heading',
	h5: 'core/heading',
	h6: 'core/heading',

	// Media elements
	img: 'core/image',
	video: 'core/video',

	// List elements
	ul: 'core/list',
	ol: 'core/list',
	li: 'core/list',

	// Other elements
	code: 'core/code',
	blockquote: 'core/quote',
	quote: 'core/quote',

	// Layout components (custom mappings)
	col: 'core/column',
	cols: 'core/columns',
	row: 'core/group', // Will be configured with horizontal flex layout
	stack: 'core/group', // Will be configured with vertical flex layout
	sep: 'core/separator',
	separator: 'core/separator',
	sp: 'core/spacer',
	spacer: 'core/spacer',
};

/**
 * Parses HTML string into WordPress blocks.
 *
 * Takes HTML generated from Emmet syntax and converts each top-level
 * element into corresponding WordPress blocks using the htmlToBlock function.
 *
 * @param {string} html - The HTML string to parse
 * @returns {Array} Array of WordPress block objects
 */
const parseHTMLToBlocks = ( html ) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString( html, 'text/html' );
	return Array.from( doc.body.children ).map( htmlToBlock );
};

/**
 * Converts an HTML element to a WordPress block.
 *
 * Recursively processes an HTML element and its children to create
 * the appropriate WordPress block structure. Handles special cases
 * for different element types and their specific block requirements.
 *
 * @param {Element} element - The HTML element to convert
 * @returns {Object} WordPress block object with type, attributes, and innerBlocks
 */
const htmlToBlock = ( element ) => {
	const tag = element.tagName.toLowerCase();
	const blockType = tagToBlock[ tag ] || 'core/group';
	const attributes = {};

	// Handle CSS classes and IDs
	if ( element.className ) {
		attributes.className = element.className;
	}
	if ( element.id ) {
		attributes.anchor = element.id;
	}

	// Special handling for Group blocks with semantic HTML elements
	if ( blockType === 'core/group' ) {
		if (
			[
				'header',
				'main',
				'footer',
				'section',
				'aside',
				'article',
			].includes( tag )
		) {
			// Use semantic HTML tag for these elements
			attributes.tagName = tag;
		} else if ( tag === 'row' ) {
			// Configure horizontal flex layout for row elements
			attributes.layout = { type: 'flex', orientation: 'horizontal' };
		} else if ( tag === 'stack' ) {
			// Configure vertical flex layout for stack elements
			attributes.layout = { type: 'flex', orientation: 'vertical' };
		}
	}

	// Special handling for List blocks
	if ( blockType === 'core/list' ) {
		if ( tag === 'ol' ) {
			// Mark as ordered list
			attributes.ordered = true;
		}

		// For ul/ol elements, collect all li children and create a single list block
		const liChildren = Array.from( element.children ).filter(
			( child ) => child.tagName.toLowerCase() === 'li'
		);
		if ( liChildren.length > 0 ) {
			attributes.values = liChildren
				.map( ( li ) => `<li>${ li.textContent || '' }</li>` )
				.join( '' );
			return createBlock( blockType, attributes, [] );
		}
	}

	// Handle text content for text-based blocks
	const textContent = element.textContent.trim();
	if (
		textContent &&
		[ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code' ].includes( tag )
	) {
		attributes.content = textContent;
	}

	// Recursively process child elements
	const innerBlocks = Array.from( element.children ).map( htmlToBlock );

	return createBlock( blockType, attributes, innerBlocks );
};

/**
 * Main EmmetBlocks React component.
 *
 * Provides the user interface for Emmet syntax input and handles
 * the conversion process from Emmet to WordPress blocks. Integrates
 * with the WordPress command palette and block editor.
 *
 * @returns {JSX.Element|null} Modal component or null when closed
 */
const EmmetBlocks = () => {
	// Modal state management
	const [ isOpen, setIsOpen ] = useState( false );
	const [ emmetInput, setEmmetInput ] = useState( '' );

	// WordPress block editor integration
	const { insertBlocks } = useDispatch( blockEditorStore );

	// Register command palette integration
	useCommand( {
		name: 'emmetblocks/emmet',
		label: __( 'EmmetBlocks' ),
		icon: code,
		callback: ( { close } ) => {
			setIsOpen( true );
			close();
		},
		context: 'site-editor',
	} );

	/**
	 * Handles form submission and Emmet processing.
	 *
	 * Converts Emmet syntax to HTML, then to WordPress blocks,
	 * and inserts them into the editor.
	 */
	const handleSubmit = () => {
		if ( ! emmetInput.trim() ) return;

		try {
			// Convert Emmet syntax to HTML using the Emmet library
			const html = expand( emmetInput );

			// Parse HTML and convert to WordPress blocks
			const blocks = parseHTMLToBlocks( html );

			// Insert blocks into the editor if any were created
			if ( blocks.length > 0 ) {
				insertBlocks( blocks );
			}
		} catch ( error ) {
			console.error( 'Emmet parsing error:', error );
		}

		// Reset modal state
		setIsOpen( false );
		setEmmetInput( '' );
	};

	// Don't render anything if modal is closed
	if ( ! isOpen ) return null;

	return (
		<Modal
			title={ __( 'EmmetBlocks' ) }
			onRequestClose={ () => setIsOpen( false ) }
		>
			<TextControl
				label={ __( 'Emmet Syntax' ) }
				value={ emmetInput }
				onChange={ setEmmetInput }
				placeholder="div.container>p.hello+ul>li*3"
			/>
			<Button isPrimary onClick={ handleSubmit }>
				{ __( 'Generate Blocks' ) }
			</Button>
		</Modal>
	);
};

// Register the plugin with WordPress
// This makes the EmmetBlocks component available in the block editor
registerPlugin( 'emmetblocks', {
	render: EmmetBlocks,
} );

export default EmmetBlocks;
