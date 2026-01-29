type Translatable = {
  t: (key: string) => string;
};

interface IImage {
  imageUrl: string;
  alt?: string;
}

export interface IPopularProduct extends IImage {
  isNew: boolean;
  name: string;
  price: number;
  url: string;
}

export interface IPopularCategory extends IImage {
  id: number;
  name: string;
}

export interface ICategory extends IImage {
  id: number;
  name: string;
  url: string;
  altImage: string;
}

export interface IArticle extends IImage {
  id: string;
  label: string;
  url: string;
  imageAlt: string;
}

export interface HomeClientProps extends Translatable {
  popularProducts: IPopularProduct[];
  popularCategories: IPopularCategory[];
  articles: IArticle[];
}

export interface ArticlesSectionProps extends Translatable {
  articles: IArticle[];
}

export interface ProductSectionProps extends Translatable {
  popularProducts: IPopularProduct[];
}

export interface PixelPortfolioSectionProps extends Translatable {
  activeStep: number;
  setActiveStep: (index: number) => void;
}

export type CommonProps = Translatable;
export interface MenuReponsiveProps {
  categories: ICategory[];
}
