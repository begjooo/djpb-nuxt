export interface DriveFile {
  [field: string]: any,
};

export interface SharepointFile {
  id: string,
  name: string,
  type: string,
  itemId: string,
  children?: SharepointFile[],
  fields?: any,
};

export interface SiteColumn {
  [field: string]: any,
};

export interface GeminiFile {
  [field: string]: any,
};