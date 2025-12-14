export type Language = 'pt' | 'en';

export interface Translation {
  [key: string]: {
    pt: string;
    en: string;
  };
}

export interface NavItem {
  id: string;
  icon: any; // Using lucide-react icons which are components
  labelKey: string;
}

export interface GameIdea {
  title: string;
  genre: string;
  description: string;
}

export interface ScriptSnippet {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  type: 'asset' | 'script' | 'template';
}