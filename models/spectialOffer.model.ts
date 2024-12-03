export interface ISpecialOffer {
    id: string;
    title: string;
    detail:string;
    salePrice: number;
    originalPrice:number;
    savePrice:number;
    imageUrl: string;
    imageAlt: string;
    buyUrl: string;
    termsUrl:string;
}

export interface IOffer {
    id: string;
    categoryCode:string
    name: string;
    productDetail:string;
    salePrice: number;
    price:number;
    savePrice:number;
    image: string;
    imageAlt: string;
    buyUrl: string;
    termsUrl:string;
    seleLeft:string;
}