export enum LocationEnum {
  FEATURED = "FEATURED",
  HERO = "HERO",
}

export interface IAds {
  _id?: string;
  isActive?: boolean;
  title: string;
  description: string;
  hasCTA: boolean;
  ctaLink?: string;
  ctaText: string;
  exposureTime: string;
  expirationDuration: string;
  showBannerImgOnly: boolean;
  file: File | null;
}
