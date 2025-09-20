=== EmmetBlocks ===

Contributors: tinkergrove
Tags: emmet, blocks, gutenberg, command-palette, layout
Requires at least: 6.3
Tested up to: 6.8.2
Requires PHP: 7.4
Stable tag: 0.1.0
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Generate WordPress block layouts using Emmet syntax via command palette.

== Description ==

EmmetBlocks allows you to quickly generate complex WordPress block layouts using familiar Emmet syntax. Instead of manually creating each block, you can type Emmet abbreviations to scaffold entire layouts in seconds.

**Features:**

* Command palette integration - Access via Cmd+K (Mac) or Ctrl+K (Windows/Linux). Type "Emmet" to access.
* Full Emmet syntax support - Use all standard Emmet abbreviations
* Block hierarchy creation - Generate nested block structures
* Class and ID support - Add CSS classes and IDs to blocks
* Layout blocks - Support for rows, stacks, columns, and more
* List generation - Create ordered and unordered lists with items

**Example Emmet syntax:**
* `div.container>p.hello+h2{Title}` - Creates a container with paragraph and heading
* `ul.nav>li*5>a{Menu Item $}` - Creates a navigation menu with 5 items
* `row>col*3>p{Lorem ipsum}` - Creates a 3-column row layout

== Installation ==

1. Upload the `emmetblocks` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Open the block editor and use Cmd+K (Mac) or Ctrl+K (Windows/Linux) to open the command palette
4. Type "emmet" to find the EmmetBlocks command
5. Click to open the modal and enter your Emmet syntax

== Frequently Asked Questions ==

= What is Emmet? =

Emmet is a web-developer toolkit that provides abbreviations for HTML and CSS. For example, `div>p*3` expands to `<div><p></p><p></p><p></p></div>`.

= Which WordPress blocks are supported? =

EmmetBlocks supports all core WordPress blocks including:
- Paragraphs, Headings, Lists
- Groups, Columns, Rows
- Images, Videos, Quotes
- And many more...

= Can I use custom classes and IDs? =

Yes! Use standard Emmet syntax: `div.my-class#my-id` will create a group block with class "my-class" and ID "my-id".

= Does it work with custom blocks? =

Currently, EmmetBlocks focuses on core WordPress blocks. Support for custom blocks may be added in future versions.

== Screenshots ==

1. Command palette showing EmmetBlocks command
2. Modal interface for entering Emmet syntax
3. Generated block layout from Emmet input

== Changelog ==

= 0.1.0 =
* Initial release
* Command palette integration
* Basic Emmet syntax support
* Support for core WordPress blocks
* Class and ID assignment

== Upgrade Notice ==

= 0.1.0 =
Initial release - no upgrade needed.