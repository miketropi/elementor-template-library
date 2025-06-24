# Elementor Template Library

A comprehensive template library for Elementor with advanced features, modern UI, and extensible architecture.

![Preview](https://github.com/miketropi/elementor-template-library/blob/master/images/pewview.jpeg?raw=true)

## 📋 Overview

Elementor Template Library is a powerful WordPress plugin that extends Elementor's capabilities by providing a curated collection of professional templates, advanced filtering, and seamless integration with the Elementor editor.

## ✨ Features

- **Modern UI/UX**: Built with React and Tailwind CSS for a smooth, responsive interface
- **Template Categories**: Organized templates by category (landing, ecommerce, portfolio, blog, business)
- **Advanced Filtering**: Filter by category, price, rating, and tags
- **Template Preview**: Live preview functionality for all templates
- **One-Click Import**: Seamless template import directly into Elementor editor
- **Bug Reporting System**: Built-in bug reporting with detailed system information
- **Extensible Architecture**: Custom hooks and filters for developers
- **Responsive Design**: Mobile-first approach with modern design patterns

## 🚀 Installation

### Requirements

- WordPress 5.2 or higher
- PHP 7.4 or higher
- Elementor plugin (free or pro) installed and activated

### Installation Steps

1. **Download the Plugin**
   ```bash
   # Clone or download the plugin to your WordPress plugins directory
   wp-content/plugins/elementor-template-library/
   ```

2. **Install Dependencies**
   ```bash
   cd wp-content/plugins/elementor-template-library/
   npm install
   ```

3. **Build Assets**
   ```bash
   # For development (with watch mode)
   npm run dev
   
   # For production
   npm run build
   ```

4. **Activate Plugin**
   - Go to WordPress Admin → Plugins
   - Find "Elementor Template Library" and click "Activate"

## 🎯 Usage

### For End Users

1. **Access Template Library**
   - Open any page/post in Elementor editor
   - Look for the "Template Library" button in the editor interface
   - Click to open the template library modal

2. **Browse Templates**
   - Use category filters to find specific template types
   - Preview templates by clicking on them
   - View template details including ratings, downloads, and descriptions

3. **Import Templates**
   - Click "Import" on any template
   - The template will be imported directly into your current page
   - Customize the imported template as needed

### For Developers

#### Customizing Templates with `etl_hook:get_templates`

The plugin provides a powerful filter hook that allows you to customize, add, or modify templates programmatically.

##### Basic Usage

```php
/**
 * Add custom templates to the library
 */
add_filter('etl_hook:get_templates', function($templates) {
    // Add your custom template
    $templates[] = [
        'id' => 999,
        'title' => 'My Custom Template',
        'category' => 'custom',
        'thumbnail' => 'https://example.com/thumbnail.jpg',
        'description' => 'A custom template for my website',
        'rating' => 5.0,
        'downloads' => 0,
        'views' => 0,
        'tags' => ['custom', 'unique'],
        'featured' => false,
        'price' => 'free',
        'createdAt' => date('Y-m-d'),
        'preview_url' => 'https://example.com/preview',
        'import_url' => 'https://example.com/template.json'
    ];
    
    return $templates;
});
```

##### Template Structure

Each template should follow this structure:

```php
[
    'id' => int,                    // Unique template ID
    'title' => string,              // Template name
    'category' => string,           // Category (landing, ecommerce, portfolio, blog, business, custom)
    'thumbnail' => string,          // Thumbnail image URL (400x300px recommended)
    'description' => string,        // Template description
    'rating' => float,              // Rating (0.0 to 5.0)
    'downloads' => int,             // Download count
    'views' => int,                 // View count
    'tags' => array,                // Array of tags
    'featured' => boolean,          // Whether template is featured
    'price' => string,              // 'free' or 'premium'
    'createdAt' => string,          // Creation date (Y-m-d format)
    'preview_url' => string,        // Preview URL
    'import_url' => string          // JSON import URL (empty string for premium templates)
]
```

##### Advanced Examples

**Filter Templates by Category**
```php
add_filter('etl_hook:get_templates', function($templates) {
    // Only show free templates
    $templates = array_filter($templates, function($template) {
        return $template['price'] === 'free';
    });
    
    return $templates;
});
```

**Add Custom Category Icons**
```php
add_filter('etl_hook:category_icons', function($icons) {
    $icons['custom'] = '🎨';
    return $icons;
});
```

**Modify Existing Templates**
```php
add_filter('etl_hook:get_templates', function($templates) {
    // Modify existing template
    foreach ($templates as &$template) {
        if ($template['id'] === 1) {
            $template['title'] = 'Modified Template Title';
            $template['featured'] = true;
        }
    }
    
    return $templates;
});
```

**Add Templates from External API**
```php
add_filter('etl_hook:get_templates', function($templates) {
    // Fetch templates from external API
    $api_templates = wp_remote_get('https://api.example.com/templates');
    
    if (!is_wp_error($api_templates)) {
        $api_data = json_decode(wp_remote_retrieve_body($api_templates), true);
        
        foreach ($api_data as $api_template) {
            $templates[] = [
                'id' => $api_template['id'],
                'title' => $api_template['name'],
                'category' => $api_template['category'],
                'thumbnail' => $api_template['image_url'],
                'description' => $api_template['description'],
                'rating' => $api_template['rating'],
                'downloads' => $api_template['downloads'],
                'views' => $api_template['views'],
                'tags' => $api_template['tags'],
                'featured' => $api_template['featured'],
                'price' => $api_template['price'],
                'createdAt' => $api_template['created_at'],
                'preview_url' => $api_template['preview_url'],
                'import_url' => $api_template['import_url']
            ];
        }
    }
    
    return $templates;
});
```

#### Available Hooks

| Hook | Description | Parameters | Return |
|------|-------------|------------|---------|
| `etl_hook:get_templates` | Modify template list | `$templates` (array) | Array of templates |
| `etl_hook:category_icons` | Customize category icons | `$icons` (array) | Array of icon mappings |

## 🛠 Development

### Project Structure

```
elementor-template-library/
├── dist/                    # Built assets
├── inc/                     # PHP includes
│   ├── admin/              # Admin functionality
│   ├── ajax.php            # AJAX handlers
│   ├── functions.php       # Core functions
│   ├── hooks.php           # WordPress hooks
│   └── static.php          # Asset enqueuing
├── src/                     # Source files
├── template-json/           # Template JSON files
├── templates/               # Template assets
├── elementor-template-library.php  # Main plugin file
├── package.json            # NPM dependencies
├── tailwind.config.js      # Tailwind configuration
└── webpack.mix.js          # Laravel Mix configuration
```

### Build Commands

```bash
# Development (with watch mode)
npm run dev

# Build for production
npm run build

# Build CSS only
npm run tailwind

# Build JS only
npm run js
```

### Technology Stack

- **Frontend**: React 19, Tailwind CSS 4
- **Build Tools**: Laravel Mix, PostCSS
- **Icons**: Lucide React
- **Backend**: PHP 7.4+, WordPress Hooks API

## 🐛 Bug Reporting

The plugin includes a comprehensive bug reporting system that automatically collects:

- Browser and device information
- WordPress and Elementor versions
- Plugin version
- IP address
- Detailed bug description

Bug reports are sent to the administrator email with a professional HTML template.

## 📄 License

This plugin is licensed under the GPL v2 or later.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🔄 Changelog

### Version 0.1.1
- Initial release
- Modern React-based UI
- Template library functionality
- Bug reporting system
- Extensible hook system

---

**Built with ❤️ for the WordPress and Elementor community**
