interface AssetMetadata {
  lastUpdated?: string;
  pagesNo?: number;
  type?: string;
  used?: number;
}

interface Asset {
  assetType: AssetType;
  description: string;
  id: number;
  isFavorite: boolean;
  name: string;
  category?: string;
  businessQuestions?: string[];
  details?: string;
  metadata?: AssetMetadata;
  image?: string;
  section?: string;
  tags?: string[];
}

interface SectionType {
  title: string;
  subtitle: string;
  items: Asset[];
  featured?: boolean;
}
