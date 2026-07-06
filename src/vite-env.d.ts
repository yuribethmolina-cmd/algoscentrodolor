/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

declare module "*&as=picture" {
  const picture: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default picture;
}

declare module "*&url" {
  const src: string;
  export default src;
}

declare module "*.jpg?*" {
  const value: string;
  export default value;
}

declare module "*.jpeg?*" {
  const value: string;
  export default value;
}

declare module "*.png?*" {
  const value: string;
  export default value;
}

declare module "*.webp?*" {
  const value: string;
  export default value;
}

declare module "*.avif?*" {
  const value: string;
  export default value;
}
