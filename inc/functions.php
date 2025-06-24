<?php 
/**
 * functions.php
 */

/**
 * insert template to elementor editor
 * @param int $post_id
 * @param json_text $template_data
 * @return int $post_id
 */
function etl_insert_template($post_id, $template_data) {

  $import_data = wp_slash(json_decode($template_data, true));

  update_post_meta( $post_id, '_elementor_data', $import_data['content'] );
  update_post_meta( $post_id, '_elementor_edit_mode', 'builder' );
  update_post_meta( $post_id, '_elementor_template_type', 'section' ); // 'page' if is page template

  return $post_id;
}

function etl_get_templates() {
  
  $templates = apply_filters('etl_hook:get_templates', [
    [
      'id' => 1,
      'title' => 'Modern Landing Home',
      'category' => 'landing',
      'thumbnail' => 'https://cdn.dribbble.com/userupload/17232133/file/original-ad54a0ab81278ce45e8adb286cac0f7f.png?format=webp&resize=400x300&vertical=center',
      'description' => 'Clean and modern landing page design with hero section and call-to-action',
      'rating' => 4.8,
      'downloads' => 1247,
      'views' => 8923,
      'tags' => ['modern', 'responsive', 'landing', 'hero'],
      'featured' => true,
      'price' => 'free',
      'createdAt' => '2024-01-15',
      'preview_url' => 'https://elementor.com/templates/modern-landing-page/',
      'import_url' => ETL_PLUGIN_URL . 'template-json/modern-landing-page.json'
    ],
    [
      'id' => 2,
      'title' => 'E-commerce Store',
      'category' => 'ecommerce',
      'thumbnail' => 'https://cdn.dribbble.com/userupload/4257266/file/original-76b5b4c393dcca1f08676cf007f4e51d.png?format=webp&resize=400x300&vertical=center',
      'description' => 'Professional e-commerce template with product grid and shopping cart',
      'rating' => 4.6,
      'downloads' => 2156,
      'views' => 15678,
      'tags' => ['ecommerce', 'shop', 'products', 'responsive'],
      'featured' => false,
      'price' => 'premium',
      'createdAt' => '2024-01-20',
      'preview_url' => 'https://elementor.com/templates/ecommerce-store/',
      'import_url' => ''
    ],
    [
      'id' => 3,
      'title' => 'Portfolio Showcase',
      'category' => 'portfolio',
      'thumbnail' => 'https://cdn.dribbble.com/userupload/43215431/file/original-ece5a27519d0bd84af849788012a6bea.png?crop=0x0-3201x2401&format=webp&resize=400x300&vertical=center',
      'description' => 'Creative portfolio template perfect for designers and artists',
      'rating' => 4.9,
      'downloads' => 892,
      'views' => 5432,
      'tags' => ['portfolio', 'creative', 'showcase', 'design'],
      'featured' => true,
      'price' => 'free',
      'createdAt' => '2024-01-25',
      'preview_url' => 'https://elementor.com/templates/portfolio-showcase/',
      'import_url' => ''
    ],
    [
      'id' => 4,
      'title' => 'Business Corporate',
      'category' => 'business',
      'thumbnail' => 'https://cdn.dribbble.com/userupload/6518779/file/original-a419e25a12f791589c59a363ea60115b.png?format=webp&resize=400x300&vertical=center',
      'description' => 'Professional business website with corporate branding elements',
      'rating' => 4.7,
      'downloads' => 1678,
      'views' => 9876,
      'tags' => ['business', 'corporate', 'professional', 'branding'],
      'featured' => false,
      'price' => 'premium',
      'createdAt' => '2024-01-30',
      'preview_url' => 'https://elementor.com/templates/business-corporate/',
      'import_url' => ''
    ],
    [
      'id' => 5,
      'title' => 'Blog Magazine',
      'category' => 'blog',
      'thumbnail' => 'https://cdn.dribbble.com/userupload/4171124/file/original-345de0be93c3ac84e27f202fd13b7ee6.jpg?format=webp&resize=400x300&vertical=center',
      'description' => 'Modern blog template with magazine-style layout and typography',
      'rating' => 4.5,
      'downloads' => 1345,
      'views' => 7654,
      'tags' => ['blog', 'magazine', 'content', 'typography'],
      'featured' => false,
      'price' => 'free',
      'createdAt' => '2024-02-05',
      'preview_url' => 'https://elementor.com/templates/blog-magazine/',
      'import_url' => ''
    ],
    
  ]);

  return $templates;
}

// send rep
function etl_send_bug_report($data) {
  $admin_email = get_option('admin_email');
  $subject = '(Elementor Template Library) Bug Report from ' . $data['browser'] . ' on ' . $data['device'];
  // add message plugin version
  $message = '
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bug Report - Elementor Template Library</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">🐛 Bug Report</h1>
        <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Elementor Template Library</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 30px;">
        <!-- Bug Details Section -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Bug Details</h2>
          
          <div style="background-color: #f9fafb; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <span style="font-weight: 600; color: #374151;">Bug Type:</span>
              <span style="color: #6b7280; text-transform: capitalize;">' . ucfirst($data['bug_type']) . '</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <span style="font-weight: 600; color: #374151;">Priority:</span>
              <span style="color: #6b7280; text-transform: capitalize;">' . ucfirst($data['priority']) . '</span>
            </div>
            <div style="margin-bottom: 15px;">
              <div style="font-weight: 600; color: #374151; margin-bottom: 5px;">Title:</div>
              <div style="color: #1f2937; background-color: #ffffff; padding: 10px; border-radius: 4px; border: 1px solid #d1d5db;">' . htmlspecialchars($data['bug_title']) . '</div>
            </div>
            <div>
              <div style="font-weight: 600; color: #374151; margin-bottom: 5px;">Description:</div>
              <div style="color: #1f2937; background-color: #ffffff; padding: 15px; border-radius: 4px; border: 1px solid #d1d5db; white-space: pre-wrap; line-height: 1.5;">' . htmlspecialchars($data['bug_description']) . '</div>
            </div>
          </div>
        </div>
        
        <!-- System Information Section -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">System Information</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px;">
              <div style="font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 5px;">Browser</div>
              <div style="color: #6b7280;">' . htmlspecialchars($data['browser']) . '</div>
            </div>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px;">
              <div style="font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 5px;">Device</div>
              <div style="color: #6b7280;">' . htmlspecialchars($data['device']) . '</div>
            </div>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px;">
              <div style="font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 5px;">WordPress Version</div>
              <div style="color: #6b7280;">' . get_bloginfo('version') . '</div>
            </div>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px;">
              <div style="font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 5px;">Elementor Version</div>
              <div style="color: #6b7280;">' . ELEMENTOR_VERSION . '</div>
            </div>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px;">
              <div style="font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 5px;">Plugin Version</div>
              <div style="color: #6b7280;">' . ETL_PLUGIN_VERSION . '</div>
            </div>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px;">
              <div style="font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 5px;">IP Address</div>
              <div style="color: #6b7280;">' . $_SERVER['REMOTE_ADDR'] . '</div>
            </div>
          </div>
        </div>
        
        <!-- Contact Information -->
        ' . (!empty($data['contact_email']) ? '
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Contact Information</h2>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px;">
            <div style="font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 5px;">Contact Email</div>
            <div style="color: #6b7280;">' . htmlspecialchars($data['contact_email']) . '</div>
          </div>
        </div>
        ' : '') . '
        
        <!-- Footer -->
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Report submitted on ' . date('F j, Y \a\t g:i A') . '</p>
          <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">This is an automated bug report from the Elementor Template Library plugin.</p>
        </div>
      </div>
    </div>
  </body>
  </html>';

  $admin_email = 'mike.beplus@gmail.com';

  // header html
  $headers = ['Content-Type: text/html; charset=UTF-8'];

  // send email to admin
  $result = wp_mail($admin_email, $subject, $message, $headers);

  return $result;
}