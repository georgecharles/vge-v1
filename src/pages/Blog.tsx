import { PropertyHero } from '@/components/PropertyHero';
    import { Card } from '@/components/ui/card';
    import { Link } from 'react-router-dom';

    export const BLOG_POSTS = [
      {
        id: 1,
        title: "AI Revolution in Property Investment: A New Era of Market Analysis",
        excerpt: "Discover how artificial intelligence is transforming property investment decisions through advanced market analysis and predictive modeling.",
        date: "February 15, 2024",
        category: "Technology",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
        readTime: "5 min read",
        author: {
          name: "George Charles",
          role: "Head of Research",
          avatar: "https://bird.co.uk/wp-content/uploads/2024/05/georgec-photo.jpg"
        },
        content: `
          <h2 class="text-2xl font-light text-white mb-4">The AI Revolution in Property Investment</h2>
          <p class="text-gray-400 leading-relaxed mb-6">The property investment landscape is undergoing a revolutionary transformation, driven by advances in artificial intelligence and machine learning. These technologies are fundamentally changing how investors analyze markets, evaluate properties, and make investment decisions.</p>
          
          <h2 class="text-2xl font-light text-white mb-4">Advanced Market Analysis</h2>
          <p class="text-gray-400 leading-relaxed mb-6">AI-powered systems can now process vast amounts of data points simultaneously, analyzing everything from local market trends and economic indicators to social demographics and infrastructure developments. This comprehensive analysis provides investors with unprecedented insights into market dynamics and future growth potential.</p>
          
          <h2 class="text-2xl font-light text-white mb-4">Predictive Analytics in Action</h2>
          <p class="text-gray-400 leading-relaxed mb-6">Modern AI systems are achieving remarkable accuracy in predicting property value trends, with some models showing success rates of over 85% in forecasting price movements up to 12 months ahead. This capability is particularly valuable in identifying emerging market opportunities before they become widely recognized.</p>
          
          <h2 class="text-2xl font-light text-white mb-4">Impact on Investment Strategy</h2>
          <p class="text-gray-400 leading-relaxed mb-6">The integration of AI in property investment is democratizing access to sophisticated market analysis tools that were previously available only to large institutional investors. This is creating new opportunities for individual investors to make more informed decisions and optimize their investment strategies.</p>
          
          <h2 class="text-2xl font-light text-white mb-4">Looking Ahead</h2>
          <p class="text-gray-400 leading-relaxed mb-6">As AI technology continues to evolve, we can expect even more sophisticated applications in property investment. From automated valuation models to predictive maintenance systems, the future of property investment will be increasingly data-driven and technologically enhanced.</p>
        `
      },
      {
        id: 2,
        title: "UK Property Market Trends 2024: Regional Growth Hotspots",
        excerpt: "An in-depth analysis of emerging property investment opportunities across UK regions, with focus on high-growth areas and market predictions.",
        date: "February 12, 2024",
        category: "Market Analysis",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        readTime: "8 min read",
        author: {
          name: "George Charles",
          role: "Head of Research",
          avatar: "https://bird.co.uk/wp-content/uploads/2024/05/georgec-photo.jpg"
        },
        content: `
          <h2 class="text-2xl font-light text-white mb-4">Regional Market Overview 2024</h2>
          <p class="text-gray-400 leading-relaxed mb-6">The UK property market continues to show remarkable resilience and diversity, with distinct regional patterns emerging in 2024. Our analysis reveals several key growth areas that offer particularly promising investment opportunities.</p>
          
          <h2 class="text-2xl font-light text-white mb-4">Northern Powerhouse Growth</h2>
          <p class="text-gray-400 leading-relaxed mb-6">Cities across the Northern Powerhouse are experiencing significant growth, driven by substantial infrastructure investment and business relocations. Manchester, Leeds, and Liverpool are leading this trend, with average property price increases outpacing the national average.</p>
          
          <h2 class="text-2xl font-light text-white mb-4">Emerging Regional Hotspots</h2>
          <p class="text-gray-400 leading-relaxed mb-6">Several regions are emerging as particularly promising investment locations, characterized by strong economic fundamentals, improving infrastructure, and growing demand. Notable areas include:</p>
          <ul class="list-disc text-gray-400 ml-6 mb-6">
            <li>Birmingham and the West Midlands</li>
            <li>Newcastle and the North East</li>
            <li>Bristol and the South West</li>
          </ul>
          
          <h2 class="text-2xl font-light text-white mb-4">Market Drivers</h2>
          <p class="text-gray-400 leading-relaxed mb-6">Key factors driving regional growth include:</p>
          <ul class="list-disc text-gray-400 ml-6 mb-6">
            <li>Infrastructure improvements</li>
            <li>Business relocations</li>
            <li>Population shifts</li>
            <li>Urban regeneration projects</li>
          </ul>
          
          <h2 class="text-2xl font-light text-white mb-4">Investment Implications</h2>
          <p class="text-gray-400 leading-relaxed mb-6">These regional trends present significant opportunities for investors who can identify and act on emerging growth areas before they become widely recognized. Early movers in these markets often benefit from both capital appreciation and strong rental yields.</p>
        `
      },
      {
        id: 3,
        title: "Buy-to-Let Strategy: Maximizing Returns in Today's Market",
        excerpt: "Expert insights on optimizing buy-to-let investments, including location selection, tenant management, and financial planning strategies.",
        date: "February 8, 2024",
        category: "Investment Strategy",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
        readTime: "6 min read",
        author: {
          name: "George Charles",
          role: "Head of Research",
          avatar: "https://bird.co.uk/wp-content/uploads/2024/05/georgec-photo.jpg"
        },
        content: `
          <h2 class="text-2xl font-light text-white mb-4">Optimizing Buy-to-Let Investments in 2024</h2>
          <p class="text-gray-400 leading-relaxed mb-6">The buy-to-let market continues to evolve, requiring investors to adapt their strategies to changing market conditions and tenant preferences. This comprehensive guide explores key strategies for maximizing returns in today's market.</p>
          
          <h2 class="text-2xl font-light text-white mb-4">Location Selection Strategy</h2>
          <p class="text-gray-400 leading-relaxed mb-6">Choosing the right location remains crucial for BTL success. Key factors to consider include:</p>
          <ul class="list-disc text-gray-400 ml-6 mb-6">
            <li>Local employment markets</li>
            <li>Transport links</li>
            <li>Educational facilities</li>
            <li>Urban regeneration plans</li>
            <li>Rental demand patterns</li>
          </ul>
          
          <h2 class="text-2xl font-light text-white mb-4">Understanding Tenant Demographics</h2>
          <p class="text-gray-400 leading-relaxed mb-6">Modern tenants have evolving preferences and requirements. Successful landlords are those who understand and cater to these changing needs:</p>
          <ul class="list-disc text-gray-400 ml-6 mb-6">
            <li>Remote working spaces</li>
            <li>High-speed internet connectivity</li>
            <li>Energy efficiency</li>
            <li>Pet-friendly properties</li>
          </ul>
          
          <h2 class="text-2xl font-light text-white mb-4">Financial Optimization</h2>
          <p class="text-gray-400 leading-relaxed mb-6">Maximizing returns requires careful financial planning and management:</p>
          <ul class="list-disc text-gray-400 ml-6 mb-6">
            <li>Mortgage strategy optimization</li>
            <li>Tax efficiency planning</li>
            <li>Maintenance cost management</li>
            <li>Rental price optimization</li>
          </ul>
          
          <h2 class="text-2xl font-light text-white mb-4">Risk Management</h2>
          <p class="text-gray-400 leading-relaxed mb-6">Protecting your investment through proper risk management is essential:</p>
          <ul class="list-disc text-gray-400 ml-6 mb-6">
            <li>Comprehensive insurance coverage</li>
            <li>Tenant screening processes</li>
            <li>Regular property maintenance</li>
            <li>Legal compliance measures</li>
          </ul>
        `
      }
    ];

    export function Blog() {
      return (
        <div>
          <PropertyHero
            title="Property Investment Blog"
            subtitle="Expert insights, market analysis, and investment strategies"
            imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
          />

          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                <Link to={`/blog/${post.id}`} key={post.id}>
                  <Card className="overflow-hidden bg-navy-800/50 border-gold-500/20 hover:border-gold-500/40 transition-all duration-300">
                    <div className="aspect-[16/9] relative">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-4 left-4 bg-gold-500 text-navy-950 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">{post.title}</h3>
                      <p className="text-gray-400 line-clamp-3">{post.excerpt}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }
