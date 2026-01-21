
import React from 'react';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

const Blog = () => {
  const { t } = useLanguage();
  
  const blogPosts = [
    {
      id: 1,
      title: "Slik sparer du penger på strømregningen i 2024",
      excerpt: "Få tips og triks for å redusere strømforbruket og velge riktig strømleverandør.",
      date: "15. januar 2024",
      readTime: "5 min lesing",
      category: "Strøm"
    },
    {
      id: 2,
      title: "Sammenlign internett-abonnement: Alt du trenger å vite",
      excerpt: "En komplett guide til å velge riktig internett-abonnement for ditt behov.",
      date: "10. januar 2024",
      readTime: "7 min lesing",
      category: "Internett"
    },
    {
      id: 3,
      title: "Mobilabonnement 2024: Hva bør du se etter?",
      excerpt: "Utforsk de nyeste mobilabonnementene og finn det som passer best for deg.",
      date: "5. januar 2024",
      readTime: "4 min lesing",
      category: "Mobil"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-card rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-border"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground text-sm">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">{post.date}</span>
                    <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                      Les mer →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 text-center">
            <div className="bg-card rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-border">
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                Hold deg oppdatert
              </h3>
              <p className="text-muted-foreground mb-6">
                Få de nyeste artiklene og sparetipsene direkte i innboksen din.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Din e-postadresse"
                  className="flex-1 px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                />
                <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                  Abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
