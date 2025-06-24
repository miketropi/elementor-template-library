import React, { useState, useEffect, useCallback } from 'react';
import { __get_templates, __import_template_to_elementor_editor } from '../until/libs';
import { useModal } from './Modal';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Heart,
  Eye,
  Download,
  Star,
  X,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Clock,
  Tag,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Building,
  BarChart3,
  FileText,
  ShoppingCart,
  FileDown,
} from 'lucide-react';

const TemplateLib = () => {
  const { openModal, closeModal } = useModal();
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categories, setCategories] = useState([]);

  // Sample template data
  // const sampleTemplates = [
  //   {
  //     id: 1,
  //     title: 'Modern Landing Page',
  //     category: 'landing',
  //     thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  //     description: 'Clean and modern landing page design with hero section and call-to-action',
  //     rating: 4.8,
  //     downloads: 1247,
  //     views: 8923,
  //     tags: ['modern', 'responsive', 'landing', 'hero'],
  //     featured: true,
  //     price: 'free',
  //     createdAt: '2024-01-15'
  //   },
  //   {
  //     id: 2,
  //     title: 'E-commerce Store',
  //     category: 'ecommerce',
  //     thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
  //     description: 'Complete e-commerce solution with product catalog and checkout',
  //     rating: 4.9,
  //     downloads: 2156,
  //     views: 15678,
  //     tags: ['ecommerce', 'shop', 'responsive', 'checkout'],
  //     featured: true,
  //     price: 'premium',
  //     createdAt: '2024-01-10'
  //   },
  //   {
  //     id: 3,
  //     title: 'Portfolio Showcase',
  //     category: 'portfolio',
  //     thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
  //     description: 'Professional portfolio template with project gallery',
  //     rating: 4.7,
  //     downloads: 892,
  //     views: 5432,
  //     tags: ['portfolio', 'creative', 'professional', 'gallery'],
  //     featured: false,
  //     price: 'free',
  //     createdAt: '2024-01-20'
  //   },
  //   {
  //     id: 4,
  //     title: 'Blog Magazine',
  //     category: 'blog',
  //     thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
  //     description: 'Modern blog and magazine layout with article grid',
  //     rating: 4.6,
  //     downloads: 1567,
  //     views: 9876,
  //     tags: ['blog', 'magazine', 'content', 'articles'],
  //     featured: false,
  //     price: 'premium',
  //     createdAt: '2024-01-05'
  //   },
  //   {
  //     id: 5,
  //     title: 'Restaurant Website',
  //     category: 'business',
  //     thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
  //     description: 'Elegant restaurant website with menu and reservations',
  //     rating: 4.5,
  //     downloads: 743,
  //     views: 4321,
  //     tags: ['restaurant', 'food', 'elegant', 'menu'],
  //     featured: false,
  //     price: 'free',
  //     createdAt: '2024-01-25'
  //   },
  //   {
  //     id: 6,
  //     title: 'Agency Dashboard',
  //     category: 'dashboard',
  //     thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  //     description: 'Professional agency dashboard with analytics',
  //     rating: 4.8,
  //     downloads: 1892,
  //     views: 12345,
  //     tags: ['dashboard', 'agency', 'professional', 'analytics'],
  //     featured: true,
  //     price: 'premium',
  //     createdAt: '2024-01-12'
  //   }
  // ];

  // const categories = [
  //   { id: 'all', name: 'All Templates', count: sampleTemplates.length, icon: Grid3X3 },
  //   { id: 'landing', name: 'Landing Pages', count: sampleTemplates.filter(t => t.category === 'landing').length, icon: TrendingUp },
  //   { id: 'ecommerce', name: 'E-commerce', count: sampleTemplates.filter(t => t.category === 'ecommerce').length, icon: ShoppingCart },
  //   { id: 'portfolio', name: 'Portfolio', count: sampleTemplates.filter(t => t.category === 'portfolio').length, icon: Briefcase },
  //   { id: 'blog', name: 'Blog & Magazine', count: sampleTemplates.filter(t => t.category === 'blog').length, icon: FileText },
  //   { id: 'business', name: 'Business', count: sampleTemplates.filter(t => t.category === 'business').length, icon: Building },
  //   { id: 'dashboard', name: 'Dashboard', count: sampleTemplates.filter(t => t.category === 'dashboard').length, icon: BarChart3 }
  // ];

  // const allTags = [...new Set(sampleTemplates.flatMap(t => t.tags))];
  const sortOptions = [
    { id: 'newest', name: 'Newest First', icon: Clock },
    { id: 'popular', name: 'Most Popular', icon: TrendingUp },
    { id: 'rating', name: 'Highest Rated', icon: Star },
    { id: 'downloads', name: 'Most Downloaded', icon: Download }
  ];

  const getTemplates = useCallback(async () => {
    const response = await __get_templates();
    
    if (response.success == true) {
      const { templates, categories } = response.data;
      setTemplates(templates);
      setFilteredTemplates(templates);
      setCategories(categories);
      setLoading(false);
    } else {
      // load template failed
    }
  }, []);

  useEffect(() => {
    // Simulate loading
    // setTimeout(() => {
    //   setTemplates(sampleTemplates);
    //   setFilteredTemplates(sampleTemplates);
    //   setLoading(false);
    // }, 1000);
    getTemplates();
  }, []);

  useEffect(() => {
    let filtered = templates;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(template =>
        selectedTags.some(tag => template.tags.includes(tag))
      );
    }

    // Filter by price
    if (priceFilter !== 'all') {
      filtered = filtered.filter(template => template.price === priceFilter);
    }

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'popular':
          return b.views - a.views;
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });

    setFilteredTemplates(filtered);
  }, [searchTerm, selectedCategory, selectedTags, priceFilter, sortBy, templates]);

  const toggleFavorite = (templateId) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleImport = async (template) => {
    console.log('Importing template:', template);
    const post_id = elementor.documents.getCurrent().id;
    const import_url = template?.import_url || '';

    // check import_url is not empty
    if (import_url == '') {
      console.log('Import URL is empty');
      // alert('Import URL is empty');

      // modal with title 'Import URL is empty' and message 'Please try again'
      openModal('import_url_empty', (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <X size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Import Unavailable</h2>
          <p className="text-gray-600 mb-4 max-w-sm mx-auto">
            This template is currently not available for import. Please check back later or try a different template.
          </p>
        </div>
      ));

      return;
    }

    openModal('import_template', (
      <div className="text-center py-8">
        <div className="mx-auto w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
          <FileDown size={32} className="text-yellow-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Confirm Template Import</h2>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          This action will replace all content on the current page. Are you sure you want to continue?
        </p>
        <div className="flex gap-3 justify-center">
          <button 
            onClick={() => closeModal('import_template')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={ async () => {

              const response = await __import_template_to_elementor_editor(post_id, import_url);

              if (response.success == true) {
                // import template success
                console.log('Import template success');
                
                // reload page 
                window.location.reload();
              } else {
                // import template failed
                console.log('Import template failed');
                alert('Import template failed, please try again');
              }

              closeModal('import_template');
              // Continue with import logic here
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Yes, Import Template
          </button>
        </div>
      </div>
    ));
  };

  const handlePreview = (template) => {
    window.open(template.preview_url, '_blank');
    // console.log('Previewing template:', template.title);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} bg-gray-50 border-r border-gray-200 transition-all duration-300 flex-shrink-0`}>
        <div className="p-4">
          {/* Sidebar Toggle */}
          <div className="flex items-center justify-between mb-6">
            {sidebarOpen && <h2 className="text-lg font-semibold text-gray-900">Filters</h2>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SlidersHorizontal size={20} className="text-gray-600" />
            </button>
          </div>

          {sidebarOpen && (
            <>
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        {/* <category.icon size={16} className="mr-2" /> */}
                        {etl_data?.category_icons?.[category.id] ? (
                          <span className="mr-2 text-gray-600">{etl_data.category_icons[category.id]}</span>
                        ) : (
                          <Grid3X3 size={16} className="mr-2 text-gray-600" />
                        )}
                        <span>{category.name}</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price</h3>
                <div className="space-y-2">
                  {[
                    { id: 'all', name: 'All', count: templates.length },
                    { id: 'free', name: 'Free', count: templates.filter(t => t.price === 'free').length },
                    { id: 'premium', name: 'Premium', count: templates.filter(t => t.price === 'premium').length }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setPriceFilter(option.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        priceFilter === option.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{option.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {/* <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 8).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Sort Options */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Sort By</h3>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                        sortBy === option.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <option.icon size={16} className="mr-2" />
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Template Library</h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredTemplates.length} of {templates.length} templates
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {filteredTemplates.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isFavorite={favorites.includes(template.id)}
                    onToggleFavorite={toggleFavorite}
                    onImport={handleImport}
                    onPreview={handlePreview}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTemplates.map((template) => (
                  <TemplateListItem
                    key={template.id}
                    template={template}
                    isFavorite={favorites.includes(template.id)}
                    onToggleFavorite={toggleFavorite}
                    onImport={handleImport}
                    onPreview={handlePreview}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                <Search size={96} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Template Card Component (Grid View)
const TemplateCard = ({ template, isFavorite, onToggleFavorite, onImport, onPreview }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={template.thumbnail}
          alt={template.title}
          className="w-full h-48 object-cover"
        />
        {template.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-sm">
              <Sparkles size={12} className="mr-1" />
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            template.price === 'premium' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
              : 'bg-green-100 text-green-800'
          }`}>
            {template.price === 'premium' ? 'Premium' : 'Free'}
          </span>
        </div>
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
            <button
              onClick={() => onPreview(template)}
              className="p-3 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-lg"
            >
              <Eye size={18} />
            </button>
            <button
              onClick={() => onImport(template)}
              className="p-3 bg-white rounded-full text-gray-700 hover:text-green-600 transition-colors shadow-lg"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-md font-semibold text-gray-900">
            {template.title}
          </h3>
          <button
            onClick={() => onToggleFavorite(template.id)}
            className={`p-1 rounded-full transition-colors ${
              isFavorite
                ? 'text-red-500 hover:text-red-600'
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {template.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
            >
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 mr-1 fill-current" />
            <span>{template.rating}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Download size={12} className="mr-1" />
              {template.downloads}
            </span>
            <span className="flex items-center">
              <Eye size={12} className="mr-1" />
              {template.views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Template List Item Component (List View)
const TemplateListItem = ({ template, isFavorite, onToggleFavorite, onImport, onPreview }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0">
          <img
            src={template.thumbnail}
            alt={template.title}
            className="w-full sm:w-32 h-24 object-cover rounded-lg"
          />
          {template.featured && (
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <Sparkles size={10} className="mr-1" />
                Featured
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              template.price === 'premium' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-green-100 text-green-800'
            }`}>
              {template.price === 'premium' ? 'Premium' : 'Free'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {template.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {template.description}
              </p>
              
              {/* Tags */}
              <div className="mt-2 flex flex-wrap gap-1">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    <Tag size={10} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Star size={14} className="text-yellow-400 mr-1 fill-current" />
                <span>{template.rating}</span>
              </div>
              <span className="flex items-center">
                <Download size={12} className="mr-1" />
                {template.downloads} downloads
              </span>
              <span className="flex items-center">
                <Eye size={12} className="mr-1" />
                {template.views} views
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleFavorite(template.id)}
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? 'text-red-500 hover:text-red-600'
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => onPreview(template)}
            className="p-2 text-gray-400 hover:text-blue-600 rounded-full transition-colors"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => onImport(template)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Download size={16} className="mr-1" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateLib;
