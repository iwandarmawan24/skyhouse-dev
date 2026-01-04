import React from 'react';
import { Head } from '@inertiajs/react';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';

/**
 * Components Showcase Page
 * Displays all component variants and props
 */
export default function ComponentsShowcase() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <>
      <Head title="Components Showcase" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Skyhouse Components Showcase
            </h1>
            <p className="text-lg text-gray-600">
              Fully styled with Tailwind CSS - Brand colors and components
            </p>
          </div>

          {/* Color Palette Section */}
          <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              Skyhouse Brand Colors
            </h2>
            <p className="text-gray-600 mb-6">
              Our unique color palette - defined in Tailwind configuration to avoid conflicts with admin panel.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Ocean Blue */}
              <div className="space-y-3">
                <div className="bg-skyhouse-ocean h-32 rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Ocean</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Skyhouse Ocean</h3>
                  <p className="text-sm text-gray-600">#1E3A8A - Deep Blue</p>
                  <p className="text-xs text-gray-500 mt-1">Main brand color</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    bg-skyhouse-ocean
                  </code>
                </div>
              </div>

              {/* Sunshine Yellow */}
              <div className="space-y-3">
                <div className="bg-skyhouse-sunshine h-32 rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-skyhouse-ocean font-bold text-lg">Sunshine</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Skyhouse Sunshine</h3>
                  <p className="text-sm text-gray-600">#F5D87F - Soft Yellow</p>
                  <p className="text-xs text-gray-500 mt-1">Warm accent color</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    bg-skyhouse-sunshine
                  </code>
                </div>
              </div>

              {/* Terracota */}
              <div className="space-y-3">
                <div className="bg-skyhouse-terracota h-32 rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Terracota</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Skyhouse Terracota</h3>
                  <p className="text-sm text-gray-600">#C85A3E - Warm Red</p>
                  <p className="text-xs text-gray-500 mt-1">Energy & warmth</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    bg-skyhouse-terracota
                  </code>
                </div>
              </div>

              {/* Forest Green */}
              <div className="space-y-3">
                <div className="bg-skyhouse-forest h-32 rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Forest</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Skyhouse Forest</h3>
                  <p className="text-sm text-gray-600">#2F4538 - Dark Green</p>
                  <p className="text-xs text-gray-500 mt-1">Nature & growth</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    bg-skyhouse-forest
                  </code>
                </div>
              </div>

              {/* Slate */}
              <div className="space-y-3">
                <div className="bg-skyhouse-slate h-32 rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Slate</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Skyhouse Slate</h3>
                  <p className="text-sm text-gray-600">#2C3E50 - Dark Blue Gray</p>
                  <p className="text-xs text-gray-500 mt-1">Professional tone</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    bg-skyhouse-slate
                  </code>
                </div>
              </div>

              {/* Cream */}
              <div className="space-y-3">
                <div className="bg-skyhouse-cream h-32 rounded-lg shadow-md border border-gray-200 flex items-center justify-center">
                  <span className="text-skyhouse-ocean font-bold text-lg">Cream</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Skyhouse Cream</h3>
                  <p className="text-sm text-gray-600">#E8E6F2 - Lavender Cream</p>
                  <p className="text-xs text-gray-500 mt-1">Soft backgrounds</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    bg-skyhouse-cream
                  </code>
                </div>
              </div>

              {/* Ivory */}
              <div className="space-y-3">
                <div className="bg-skyhouse-ivory h-32 rounded-lg shadow-md border border-gray-200 flex items-center justify-center">
                  <span className="text-skyhouse-ocean font-bold text-lg">Ivory</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Skyhouse Ivory</h3>
                  <p className="text-sm text-gray-600">#FDFEF0 - Warm White</p>
                  <p className="text-xs text-gray-500 mt-1">Main background</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    bg-skyhouse-ivory
                  </code>
                </div>
              </div>

              {/* Mist */}
              <div className="space-y-3">
                <div className="bg-skyhouse-mist h-32 rounded-lg shadow-md border border-gray-200 flex items-center justify-center">
                  <span className="text-skyhouse-ocean font-bold text-lg">Mist</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Skyhouse Mist</h3>
                  <p className="text-sm text-gray-600">#F8F9FA - Light Gray</p>
                  <p className="text-xs text-gray-500 mt-1">Subtle sections</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    bg-skyhouse-mist
                  </code>
                </div>
              </div>

              {/* Charcoal */}
              <div className="space-y-3">
                <div className="bg-skyhouse-charcoal h-32 rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Charcoal</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Skyhouse Charcoal</h3>
                  <p className="text-sm text-gray-600">#4A5568 - Medium Gray</p>
                  <p className="text-xs text-gray-500 mt-1">Secondary text</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    text-skyhouse-charcoal
                  </code>
                </div>
              </div>

              {/* Silver */}
              <div className="space-y-3">
                <div className="bg-skyhouse-silver h-32 rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Silver</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Skyhouse Silver</h3>
                  <p className="text-sm text-gray-600">#718096 - Light Gray</p>
                  <p className="text-xs text-gray-500 mt-1">Muted text</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    text-skyhouse-silver
                  </code>
                </div>
              </div>
            </div>
          </section>

          {/* Typography Section */}
          <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              Typography System
            </h2>
            <p className="text-gray-600 mb-6">
              Responsive typography components with consistent spacing and hierarchy
            </p>

            {/* Headings */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Headings</h3>
              <div className="space-y-6 bg-gradient-to-br from-skyhouse-ivory to-skyhouse-mist p-6 rounded-xl">
                <div className="space-y-2">
                  <Heading as="h1" variant="display" color="ocean">
                    Display Heading
                  </Heading>
                  <code className="text-xs text-gray-600">variant="display" - text-5xl md:text-6xl lg:text-7xl</code>
                </div>

                <div className="space-y-2">
                  <Heading as="h2" variant="hero" color="ocean">
                    Hero Heading - Perfect for Landing Pages
                  </Heading>
                  <code className="text-xs text-gray-600">variant="hero" - text-4xl md:text-5xl lg:text-6xl</code>
                </div>

                <div className="space-y-2">
                  <Heading as="h3" variant="section" color="ocean">
                    Section Heading - Main Content Sections
                  </Heading>
                  <code className="text-xs text-gray-600">variant="section" - text-3xl md:text-4xl lg:text-5xl</code>
                </div>

                <div className="space-y-2">
                  <Heading as="h4" variant="subsection" color="ocean">
                    Subsection Heading - Content Blocks
                  </Heading>
                  <code className="text-xs text-gray-600">variant="subsection" - text-2xl md:text-3xl lg:text-4xl</code>
                </div>

                <div className="space-y-2">
                  <Heading as="h5" variant="card" color="ocean">
                    Card Heading - Small Components
                  </Heading>
                  <code className="text-xs text-gray-600">variant="card" - text-xl md:text-2xl lg:text-3xl</code>
                </div>
              </div>
            </div>

            {/* Heading Colors */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Heading Colors</h3>
              <div className="space-y-4">
                <Heading variant="section" color="ocean">Ocean Blue Heading</Heading>
                <Heading variant="section" color="terracota">Terracota Heading</Heading>
                <Heading variant="section" color="forest">Forest Green Heading</Heading>
                <Heading variant="section" color="charcoal">Charcoal Gray Heading</Heading>
                <div className="bg-skyhouse-ocean p-4 rounded-lg">
                  <Heading variant="section" color="white">White Heading on Dark</Heading>
                </div>
              </div>
            </div>

            {/* Bodoni Font */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Bodoni Font (Elegant)</h3>
              <div className="bg-skyhouse-cream p-6 rounded-xl space-y-4">
                <Heading variant="hero" color="ocean" bodoni>
                  Luxury Living Spaces
                </Heading>
                <Heading variant="section" color="terracota" bodoni>
                  Experience Elegance
                </Heading>
                <Text size="lg" bodoni>
                  The Bodoni Moda font adds a touch of sophistication and elegance to your headings and special text.
                </Text>
              </div>
            </div>

            {/* Text Component - Sizes */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Text Sizes</h3>
              <div className="space-y-3 bg-gradient-to-br from-white to-skyhouse-mist p-6 rounded-xl">
                <div className="flex items-baseline gap-4">
                  <Text size="xs" color="charcoal">Extra Small (xs) - 0.75rem</Text>
                  <code className="text-xs text-gray-500">size="xs"</code>
                </div>
                <div className="flex items-baseline gap-4">
                  <Text size="sm" color="charcoal">Small (sm) - 0.875rem</Text>
                  <code className="text-xs text-gray-500">size="sm"</code>
                </div>
                <div className="flex items-baseline gap-4">
                  <Text size="base" color="charcoal">Base (default) - 1rem</Text>
                  <code className="text-xs text-gray-500">size="base"</code>
                </div>
                <div className="flex items-baseline gap-4">
                  <Text size="lg" color="charcoal">Large (lg) - 1.125rem</Text>
                  <code className="text-xs text-gray-500">size="lg"</code>
                </div>
                <div className="flex items-baseline gap-4">
                  <Text size="xl" color="charcoal">Extra Large (xl) - 1.25rem</Text>
                  <code className="text-xs text-gray-500">size="xl"</code>
                </div>
                <div className="flex items-baseline gap-4">
                  <Text size="2xl" color="charcoal">2X Large (2xl) - 1.5rem</Text>
                  <code className="text-xs text-gray-500">size="2xl"</code>
                </div>
                <div className="flex items-baseline gap-4">
                  <Text size="3xl" color="charcoal">3X Large (3xl) - 1.75rem</Text>
                  <code className="text-xs text-gray-500">size="3xl"</code>
                </div>
              </div>
            </div>

            {/* Text Weights */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Font Weights</h3>
              <div className="space-y-3 bg-gradient-to-br from-white to-skyhouse-mist p-6 rounded-xl">
                <Text size="lg" weight="light" color="charcoal">Light Weight - 300</Text>
                <Text size="lg" weight="normal" color="charcoal">Normal Weight - 400</Text>
                <Text size="lg" weight="medium" color="charcoal">Medium Weight - 500</Text>
                <Text size="lg" weight="semibold" color="charcoal">Semibold Weight - 600</Text>
                <Text size="lg" weight="bold" color="charcoal">Bold Weight - 700</Text>
              </div>
            </div>

            {/* Text Colors */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Text Colors</h3>
              <div className="space-y-3">
                <Text size="lg" color="ocean">Ocean Blue Text</Text>
                <Text size="lg" color="sunshine">Sunshine Yellow Text</Text>
                <Text size="lg" color="terracota">Terracota Text</Text>
                <Text size="lg" color="forest">Forest Green Text</Text>
                <Text size="lg" color="slate">Slate Gray Text</Text>
                <Text size="lg" color="charcoal">Charcoal Text (Body Copy)</Text>
                <Text size="lg" color="silver">Silver Text (Muted)</Text>
                <div className="bg-skyhouse-ocean p-4 rounded-lg">
                  <Text size="lg" color="white">White Text on Dark Background</Text>
                </div>
              </div>
            </div>

            {/* Muted Text */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Muted Text</h3>
              <div className="space-y-2 bg-white p-6 rounded-xl border">
                <Text size="lg" color="charcoal">Regular text for primary content</Text>
                <Text size="base" muted>Muted text for secondary information and captions</Text>
                <Text size="sm" muted>Small muted text for timestamps and metadata</Text>
              </div>
            </div>

            {/* Text Alignment */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Text Alignment</h3>
              <div className="space-y-4 bg-gradient-to-br from-white to-skyhouse-mist p-6 rounded-xl">
                <div className="border-b pb-3">
                  <Text size="lg" align="left" color="charcoal">Left aligned text (default)</Text>
                  <Text size="sm" muted>align="left"</Text>
                </div>
                <div className="border-b pb-3">
                  <Text size="lg" align="center" color="charcoal">Center aligned text</Text>
                  <Text size="sm" muted align="center">align="center"</Text>
                </div>
                <div className="border-b pb-3">
                  <Text size="lg" align="right" color="charcoal">Right aligned text</Text>
                  <Text size="sm" muted align="right">align="right"</Text>
                </div>
                <div>
                  <Text size="base" align="justify" color="charcoal">
                    Justified text that stretches across the full width. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </Text>
                  <Text size="sm" muted>align="justify"</Text>
                </div>
              </div>
            </div>

            {/* Real-World Examples */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Real-World Examples</h3>
              
              {/* Article Header */}
              <div className="bg-gradient-to-br from-skyhouse-ivory to-white p-8 rounded-xl mb-6 border border-skyhouse-cream">
                <Text size="sm" weight="semibold" color="terracota" className="uppercase tracking-wide mb-2">
                  Property News
                </Text>
                <Heading variant="hero" color="ocean" className="mb-4">
                  Discover Your Dream Home at Skyhouse Alam Sutera
                </Heading>
                <div className="flex items-center gap-4 mb-4">
                  <Text size="sm" color="charcoal">By John Doe</Text>
                  <Text size="sm" muted>•</Text>
                  <Text size="sm" muted>January 4, 2026</Text>
                </div>
                <Text size="lg" color="charcoal" className="mb-4">
                  Experience luxury living in the heart of Alam Sutera. Our latest development offers modern amenities and stunning views.
                </Text>
                <Button variant="primary">Read More</Button>
              </div>

              {/* Feature Card */}
              <div className="bg-white border-2 border-skyhouse-ocean/10 p-6 rounded-xl mb-6 hover:border-skyhouse-ocean/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-skyhouse-sunshine p-3 rounded-lg">
                    <svg className="w-6 h-6 text-skyhouse-ocean" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Heading variant="card" color="ocean" className="mb-2">
                      Premium Facilities
                    </Heading>
                    <Text size="base" color="charcoal" className="mb-3">
                      Access to world-class amenities including swimming pool, gym, and garden.
                    </Text>
                    <Text size="sm" weight="semibold" color="terracota" className="hover:underline cursor-pointer">
                      Learn more →
                    </Text>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-br from-skyhouse-ocean to-skyhouse-slate p-8 rounded-xl text-white">
                <Heading variant="subsection" color="white" className="mb-4">
                  What Our Clients Say
                </Heading>
                <Text size="xl" color="white" className="mb-6 italic">
                  "Living at Skyhouse has been an absolute dream. The location, the facilities, and the community make it the perfect place to call home."
                </Text>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-skyhouse-sunshine rounded-full flex items-center justify-center">
                    <Text size="lg" weight="bold" color="ocean">JD</Text>
                  </div>
                  <div>
                    <Text size="base" weight="semibold" color="white">Jane Doe</Text>
                    <Text size="sm" className="text-skyhouse-sunshine">Resident since 2024</Text>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Variants Section */}
          <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              Button Variants
            </h2>
            
            <div className="space-y-8">
              {/* Primary (Ocean) */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Primary (Ocean Blue)</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" onClick={handleClick}>
                    Primary Button
                  </Button>
                  <Button variant="primary" squash onClick={handleClick}>
                    Primary with Squash
                  </Button>
                  <Button variant="primary" disabled>
                    Primary Disabled
                  </Button>
                  <Button variant="primary" href="/contact-us">
                    Primary Link
                  </Button>
                </div>
              </div>

              {/* Sunshine */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Sunshine (Yellow)</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="sunshine" onClick={handleClick}>
                    Sunshine Button
                  </Button>
                  <Button variant="sunshine" squash onClick={handleClick}>
                    Sunshine with Squash
                  </Button>
                  <Button variant="sunshine" disabled>
                    Sunshine Disabled
                  </Button>
                </div>
              </div>

              {/* Terracota */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Terracota (Warm Red)</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="terracota" onClick={handleClick}>
                    Terracota Button
                  </Button>
                  <Button variant="terracota" squash onClick={handleClick}>
                    Terracota with Squash
                  </Button>
                  <Button variant="terracota" disabled>
                    Terracota Disabled
                  </Button>
                </div>
              </div>

              {/* Forest */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Forest (Green)</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="forest" onClick={handleClick}>
                    Forest Button
                  </Button>
                  <Button variant="forest" squash onClick={handleClick}>
                    Forest with Squash
                  </Button>
                  <Button variant="forest" disabled>
                    Forest Disabled
                  </Button>
                </div>
              </div>

              {/* Slate */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Slate (Dark Gray)</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="slate" onClick={handleClick}>
                    Slate Button
                  </Button>
                  <Button variant="slate" squash onClick={handleClick}>
                    Slate with Squash
                  </Button>
                  <Button variant="slate" disabled>
                    Slate Disabled
                  </Button>
                </div>
              </div>

              {/* Outline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Outline</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" onClick={handleClick}>
                    Outline Button
                  </Button>
                  <Button variant="outline" squash onClick={handleClick}>
                    Outline with Squash
                  </Button>
                  <Button variant="outline" disabled>
                    Outline Disabled
                  </Button>
                </div>
              </div>

              {/* Ghost */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Ghost</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="ghost" onClick={handleClick}>
                    Ghost Button
                  </Button>
                  <Button variant="ghost" squash onClick={handleClick}>
                    Ghost with Squash
                  </Button>
                  <Button variant="ghost" disabled>
                    Ghost Disabled
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Sizes Section */}
          <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              Button Sizes
            </h2>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="md">
                Medium (Default)
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
              <Button variant="primary" size="xl">
                Extra Large
              </Button>
            </div>
          </section>

          {/* With Icons Section */}
          <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              Buttons with Icons
            </h2>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Item
              </Button>
              
              <Button variant="sunshine" icon onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                </svg>
                Download
              </Button>
              
              <Button variant="terracota" icon onClick={handleClick}>
                Explore More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>

              <Button variant="forest" icon onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Learn More
              </Button>
            </div>
          </section>

          {/* Squash Effect Section */}
          <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              Squash Hover Effect
            </h2>
            <p className="text-gray-600 mb-4">
              The squash effect provides tactile feedback by scaling down on hover and click
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" squash onClick={handleClick}>
                Squash Primary
              </Button>
              <Button variant="sunshine" squash onClick={handleClick}>
                Squash Sunshine
              </Button>
              <Button variant="terracota" squash onClick={handleClick}>
                Squash Terracota
              </Button>
              <Button variant="forest" squash onClick={handleClick}>
                Squash Forest
              </Button>
              <Button variant="slate" squash onClick={handleClick}>
                Squash Slate
              </Button>
              <Button variant="outline" squash onClick={handleClick}>
                Squash Outline
              </Button>
            </div>
          </section>

          {/* Full Width Section */}
          <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              Full Width Buttons
            </h2>
            
            <div className="space-y-4 max-w-md">
              <Button variant="primary" fullWidth onClick={handleClick}>
                Full Width Primary
              </Button>
              <Button variant="sunshine" fullWidth onClick={handleClick}>
                Full Width Sunshine
              </Button>
              <Button variant="terracota" fullWidth onClick={handleClick}>
                Full Width Terracota
              </Button>
              <Button variant="outline" fullWidth onClick={handleClick}>
                Full Width Outline
              </Button>
            </div>
          </section>

          {/* Combinations Section */}
          <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              Common Combinations
            </h2>
            
            <div className="space-y-6">
              {/* CTA Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Call to Action</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button variant="primary" size="lg" squash href="/project">
                    View Projects
                  </Button>
                  <Button variant="outline" size="lg" squash href="/contact-us">
                    Contact Us
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Navigation Bar</h3>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Home</Button>
                    <Button variant="ghost" size="sm">About</Button>
                    <Button variant="ghost" size="sm">Services</Button>
                  </div>
                  <Button variant="primary" size="sm" squash>
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Form Actions</h3>
                <div className="flex gap-4 justify-end">
                  <Button variant="outline" onClick={handleClick}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleClick}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Code Example */}
          <section className="bg-gray-900 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">
              Usage Examples
            </h2>
            
            {/* Typography Examples */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Typography</h3>
              <pre className="bg-gray-800 p-6 rounded-lg overflow-x-auto text-sm">
                <code>{`import { Heading, Text } from '@/Components/Frontend/atoms';

// Headings
<Heading variant="hero" color="ocean">
  Welcome to Skyhouse
</Heading>

<Heading variant="section" color="terracota" bodoni>
  Luxury Living Spaces
</Heading>

// Text
<Text size="lg" color="charcoal">
  Experience the finest living at Alam Sutera
</Text>

<Text size="sm" muted>
  Posted on January 4, 2026
</Text>

// Different tags
<Text as="span" size="sm" weight="semibold" color="ocean">
  Limited Offer
</Text>

<Text as="label" size="base" weight="medium">
  Email Address
</Text>`}</code>
              </pre>
            </div>

            {/* Button Examples */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Buttons</h3>
              <pre className="bg-gray-800 p-6 rounded-lg overflow-x-auto text-sm">
                <code>{`import { Button } from '@/Components/Frontend/atoms';

// Basic usage
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

// Different color variants
<Button variant="sunshine">Sunshine Button</Button>
<Button variant="terracota">Terracota Button</Button>
<Button variant="forest">Forest Button</Button>
<Button variant="slate">Slate Button</Button>

// With icon and squash effect
<Button variant="terracota" icon squash href="/project">
  <svg>...</svg>
  Explore Projects
</Button>

// Full width button
<Button variant="sunshine" size="lg" fullWidth>
  Full Width Button
</Button>

// Link button
<Button variant="outline" href="/contact-us" target="_blank">
  Contact Us
</Button>`}</code>
              </pre>
            </div>
          </section>

          {/* Typography Props Documentation */}
          <section className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              Typography Props Documentation
            </h2>
            
            {/* Heading Props */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Heading Component</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">as</td>
                      <td className="px-6 py-4 text-sm text-gray-500">string</td>
                      <td className="px-6 py-4 text-sm text-gray-500">'h2'</td>
                      <td className="px-6 py-4 text-sm text-gray-500">h1 | h2 | h3 | h4 | h5 | h6</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">variant</td>
                      <td className="px-6 py-4 text-sm text-gray-500">string</td>
                      <td className="px-6 py-4 text-sm text-gray-500">'section'</td>
                      <td className="px-6 py-4 text-sm text-gray-500">display | hero | section | subsection | card</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">color</td>
                      <td className="px-6 py-4 text-sm text-gray-500">string</td>
                      <td className="px-6 py-4 text-sm text-gray-500">'ocean'</td>
                      <td className="px-6 py-4 text-sm text-gray-500">ocean | sunshine | terracota | forest | slate | charcoal | white</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">bodoni</td>
                      <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                      <td className="px-6 py-4 text-sm text-gray-500">false</td>
                      <td className="px-6 py-4 text-sm text-gray-500">Use Bodoni Moda font</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">align</td>
                      <td className="px-6 py-4 text-sm text-gray-500">string</td>
                      <td className="px-6 py-4 text-sm text-gray-500">'left'</td>
                      <td className="px-6 py-4 text-sm text-gray-500">left | center | right</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Text Props */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Text Component</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">as</td>
                      <td className="px-6 py-4 text-sm text-gray-500">string</td>
                      <td className="px-6 py-4 text-sm text-gray-500">'p'</td>
                      <td className="px-6 py-4 text-sm text-gray-500">p | span | div | label | small</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">size</td>
                      <td className="px-6 py-4 text-sm text-gray-500">string</td>
                      <td className="px-6 py-4 text-sm text-gray-500">'base'</td>
                      <td className="px-6 py-4 text-sm text-gray-500">xs | sm | base | lg | xl | 2xl | 3xl</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">weight</td>
                      <td className="px-6 py-4 text-sm text-gray-500">string</td>
                      <td className="px-6 py-4 text-sm text-gray-500">'normal'</td>
                      <td className="px-6 py-4 text-sm text-gray-500">light | normal | medium | semibold | bold</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">color</td>
                      <td className="px-6 py-4 text-sm text-gray-500">string</td>
                      <td className="px-6 py-4 text-sm text-gray-500">undefined</td>
                      <td className="px-6 py-4 text-sm text-gray-500">ocean | sunshine | terracota | forest | slate | charcoal | silver | white</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">align</td>
                      <td className="px-6 py-4 text-sm text-gray-500">string</td>
                      <td className="px-6 py-4 text-sm text-gray-500">'left'</td>
                      <td className="px-6 py-4 text-sm text-gray-500">left | center | right | justify</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">bodoni</td>
                      <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                      <td className="px-6 py-4 text-sm text-gray-500">false</td>
                      <td className="px-6 py-4 text-sm text-gray-500">Use Bodoni Moda font</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">muted</td>
                      <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                      <td className="px-6 py-4 text-sm text-gray-500">false</td>
                      <td className="px-6 py-4 text-sm text-gray-500">Apply muted/silver color</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Button Props Documentation */}
          <section className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              Props Documentation
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">variant</td>
                    <td className="px-6 py-4 text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 text-sm text-gray-500">'primary'</td>
                    <td className="px-6 py-4 text-sm text-gray-500">primary | sunshine | terracota | forest | slate | outline | ghost</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">size</td>
                    <td className="px-6 py-4 text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 text-sm text-gray-500">'md'</td>
                    <td className="px-6 py-4 text-sm text-gray-500">sm | md | lg | xl</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">squash</td>
                    <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                    <td className="px-6 py-4 text-sm text-gray-500">false</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Enable squash hover effect</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">icon</td>
                    <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                    <td className="px-6 py-4 text-sm text-gray-500">false</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Optimize spacing for icons</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">fullWidth</td>
                    <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                    <td className="px-6 py-4 text-sm text-gray-500">false</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Make button full width</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">disabled</td>
                    <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                    <td className="px-6 py-4 text-sm text-gray-500">false</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Disable button interactions</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">href</td>
                    <td className="px-6 py-4 text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 text-sm text-gray-500">undefined</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Render as link instead of button</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">onClick</td>
                    <td className="px-6 py-4 text-sm text-gray-500">function</td>
                    <td className="px-6 py-4 text-sm text-gray-500">undefined</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Click handler function</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">className</td>
                    <td className="px-6 py-4 text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 text-sm text-gray-500">undefined</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
