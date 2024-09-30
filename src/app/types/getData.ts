export type ApiFind = {
    map(arg0: ({ attributes, id }: { attributes: any; id: any; }) => import("react").JSX.Element): import("react").ReactNode;
    id: number;
    attributes: {
      blog: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      name: string;
      image: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string | null;
            caption: string | null;
            width: number;
            height: number;
            formats: {
              large: ImageFormat;
              small: ImageFormat;
              medium: ImageFormat;
              thumbnail: ImageFormat;
            };
            hash: string;
            ext: string;
            mime: string;
            size: number;
            url: string;
            previewUrl: string | null;
            provider: string;
            provider_metadata: any; // Assuming a generic object for provider metadata
            createdAt: string;
            updatedAt: string;
          };
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any;
        createdAt: string;
        updatedAt: string;
      };
    };
  }
  
  interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
  }
  
  interface ApiResponse {
    data: ApiFind[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }

  export type AirplaneImageFormat = {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
  }
  
  interface AirplaneImage {
    id: number;
    attributes: {
      name: string;
      alternativeText: null;
      caption: null;
      width: number;
      height: number;
      formats: {
        large: AirplaneImageFormat;
        small: AirplaneImageFormat;
        medium: AirplaneImageFormat;
        thumbnail: AirplaneImageFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: null;
      provider: string;
      provider_metadata: null;
      createdAt: string;
      updatedAt: string;
    };
  }
  
  interface AirplaneAttributes {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blog: string;
    image: AirplaneImage[];
  }
  
  interface Airplane {
    id: number;
    attributes: AirplaneAttributes;
  }
  
  interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  
  interface StrapiResponse {
    data: Airplane[];
    meta: {
      pagination: Pagination;
    };
  }