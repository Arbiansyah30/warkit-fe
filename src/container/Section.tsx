import React from 'react';
import useResponsive from '@hooks/useResponsive';

export interface SectionTypes {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

const Section = ({ children, as: Component = "div", className }: SectionTypes) => {
  const { isTablet } = useResponsive();
  return (
    <Component style ={{ paddingInline: isTablet ? "2rem" : "6rem" }} className={className}>{children}</Component>
  );
};

export default Section;
