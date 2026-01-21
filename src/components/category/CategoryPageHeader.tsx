
import React from 'react';
import Header from '@/components/Header';
import CategoryHeader from '@/components/category/CategoryHeader';

interface Provider {
  id: string;
  navn: string;
  logo_url: string | null;
  kategori: string;
}

interface CategoryPageHeaderProps {
  categoryName: string;
  onBackClick: () => void;
  onMeldPaClick: () => void;
  providers?: Provider[];
  offerCount?: number;
  onProviderClick?: (provider: Provider) => void;
}

const CategoryPageHeader = ({ 
  categoryName, 
  onBackClick, 
  onMeldPaClick,
  providers,
  offerCount,
  onProviderClick
}: CategoryPageHeaderProps) => {
  return (
    <>
      <Header onMeldPaClick={onMeldPaClick} />
      <main className="pt-20">
        <CategoryHeader 
          categoryName={categoryName}
          onBackClick={onBackClick}
          providers={providers}
          offerCount={offerCount}
          onProviderClick={onProviderClick}
        />
      </main>
    </>
  );
};

export default CategoryPageHeader;
