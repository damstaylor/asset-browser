// Generic section component which has a title, a subtitle and a content (passed via 'children' prop)
"use client";

import { ReactNode } from "react";

interface SectionProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, children }) => {
  const handleOpenItem = (idx: number) => {
    alert(idx);
  };
  return (
    <div className="mt-8">
      <h2>{title}</h2>
      <h3 className="mb-8">{subtitle}</h3>
      {children}
    </div>
  );
};

export default Section;
