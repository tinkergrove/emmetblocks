# EmmetBlocks

[![WordPress Plugin](https://img.shields.io/badge/WordPress-Plugin-blue.svg)](https://wordpress.org/plugins/)
[![PHP Version](https://img.shields.io/badge/PHP-7.4+-8892BF.svg)](https://php.net/)
[![WordPress Version](https://img.shields.io/badge/WordPress-6.3+-21759B.svg)](https://wordpress.org/)
[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg)](https://buymeacoffee.com/tinkergrove)

Generate WordPress block layouts using Emmet syntax via command palette.

## ✨ Features

- **Command Palette Integration** - Access via `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
- **Full Emmet Syntax Support** - Use all standard Emmet abbreviations
- **Block Hierarchy Creation** - Generate nested block structures instantly
- **Class and ID Support** - Add CSS classes and IDs to blocks
- **Layout Blocks** - Support for rows, stacks, columns, and more
- **List Generation** - Create ordered and unordered lists with items

## 🚀 Installation

### Method 1: WordPress Admin (Recommended)

1. Download the latest release ZIP file from the [Releases](https://github.com/tinkergrove/emmetblocks/releases) page
2. Log in to your WordPress admin dashboard
3. Navigate to **Plugins > Add New**
4. Click **Upload Plugin** at the top
5. Choose the downloaded ZIP file
6. Click **Install Now**
7. After installation, click **Activate** to enable the plugin

### Method 2: Manual Installation

1. Download the latest release ZIP file from the [Releases](https://github.com/tinkergrove/emmetblocks/releases) page
2. Extract the ZIP file to your computer
3. Upload the `emmetblocks` folder to `/wp-content/plugins/` directory
4. Log in to your WordPress admin dashboard
5. Navigate to **Plugins** and find "EmmetBlocks"
6. Click **Activate** to enable the plugin

### Method 3: Development Installation

For developers who want to contribute or modify the plugin:

```bash
# Clone the repository
git clone https://github.com/tinkergrove/emmetblocks.git
cd emmetblocks

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Build the assets
npm run build

# The plugin is now ready to be activated in WordPress
```

## 📖 Usage

1. Open any WordPress post or page in the block editor
2. Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to open the command palette
3. Type "emmet" to find the EmmetBlocks command
4. Select "EmmetBlocks" from the list
5. Enter your Emmet syntax in the modal that appears
6. Click "Generate Blocks" to create your layout

### Example Emmet Syntax

- `div.container>p.hello+h2{Title}` - Creates a container with paragraph and heading
- `ul.nav>li*5>a{Menu Item $}` - Creates a navigation menu with 5 items
- `row>col*3>p{Lorem ipsum}` - Creates a 3-column row layout
- `section.hero>h1{Welcome}+p{Description}` - Creates a hero section

## 📋 Requirements

- **WordPress**: 6.3 or higher
- **PHP**: 7.4 or higher
- **Modern Browser**: For the block editor interface

## 🛠️ Development

### Building Assets

```bash
# Development build with watch
npm run start

# Production build
npm run build
```

### Code Quality

The plugin follows WordPress Coding Standards. To check code quality:

```bash
# Check PHP code standards
composer run phpcs

# Fix PHP code standards automatically
composer run phpcbf
```

### Testing

```bash
# Run PHP tests (if implemented)
composer run test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow WordPress Coding Standards
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the GPL v3 or later.

## 🙏 Credits

- Built for [WordPress](https://wordpress.org/)
- Uses the [Emmet](https://emmet.io/) library for syntax parsing
- Follows [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/)

## 📞 Support

If you find a bug or have a feature request, please [open an issue](https://github.com/tinkergrove/emmetblocks/issues) on GitHub.

For general questions or discussions, feel free to start a discussion in the [Discussions](https://github.com/tinkergrove/emmetblocks/discussions) section.

## ☕ Support Development

If you find EmmetBlocks useful and would like to support its continued development, consider buying me a coffee!

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?style=for-the-badge)](https://buymeacoffee.com/tinkergrove)

Your support helps maintain and improve this plugin. Thank you! 🙏