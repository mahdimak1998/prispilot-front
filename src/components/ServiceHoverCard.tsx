
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceFilter {
  value: string;
  label: string;
  description: string;
  nested?: ServiceFilter[];
}

interface ServiceHoverCardProps {
  children: React.ReactNode;
  serviceName: string;
  serviceSlug: string;
  filters: ServiceFilter[];
}

const ServiceHoverCard: React.FC<ServiceHoverCardProps> = ({
  children,
  serviceName,
  serviceSlug,
  filters
}) => {
  const navigate = useNavigate();
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleFilterClick = (filterValue: string, parentValue?: string) => {
    if (filterValue === 'all') {
      // Navigate to the main category page without any filters
      navigate(`/${serviceSlug}`, { replace: true });
    } else if (parentValue === 'fixed') {
      // For fastpris sub-categories, use fixed-6, fixed-12, etc.
      navigate(`/${serviceSlug}?type=fixed-${filterValue}`, { replace: true });
    } else if (parentValue) {
      // For other nested filters, use both parent and child
      navigate(`/${serviceSlug}?type=${parentValue}&duration=${filterValue}`, { replace: true });
    } else {
      // For regular filters, use the type parameter
      navigate(`/${serviceSlug}?type=${filterValue}`, { replace: true });
    }
  };

  const toggleExpanded = (filterValue: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedFilter(expandedFilter === filterValue ? null : filterValue);
  };

  const renderFilter = (filter: ServiceFilter, parentValue?: string) => {
    const hasNested = filter.nested && filter.nested.length > 0;
    const isExpanded = expandedFilter === filter.value;

    return (
      <div key={filter.value}>
        <button
          onClick={(e) => {
            if (hasNested) {
              toggleExpanded(filter.value, e);
            } else {
              handleFilterClick(filter.value, parentValue);
            }
          }}
          className="w-full text-left group hover:bg-accent/50 rounded-md p-2 transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-card-foreground group-hover:text-primary">
              {t(filter.label)}
            </span>
            {hasNested ? (
              <ChevronDown 
                className={`w-4 h-4 text-muted-foreground group-hover:text-primary transition-all ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
              />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </div>
          <p className="text-sm text-muted-foreground italic mt-1">
            {t(filter.description)}
          </p>
        </button>
        
        {hasNested && isExpanded && (
          <div className="ml-4 mt-2 space-y-1 border-l-2 border-border pl-3">
            {filter.nested!.map((nestedFilter) => (
              <button
                key={nestedFilter.value}
                onClick={() => handleFilterClick(nestedFilter.value, filter.value)}
                className="w-full text-left group hover:bg-accent/30 rounded-md p-2 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-card-foreground group-hover:text-primary">
                    {t(nestedFilter.label)}
                  </span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground italic mt-1">
                  {t(nestedFilter.description)}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 p-0 bg-card/95 backdrop-blur-sm border border-border shadow-xl rounded-lg overflow-hidden z-50"
        align="start"
        sideOffset={8}
      >
        <div className="p-4">
          <h3 className="font-semibold text-lg text-card-foreground mb-3 border-b border-border pb-2">
            {serviceName}
          </h3>
          <ul className="space-y-2">
            {filters.map((filter) => (
              <li key={filter.value}>
                {renderFilter(filter)}
              </li>
            ))}
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ServiceHoverCard;
