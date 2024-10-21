export interface DriveFile {
  [field: string]: any,
};

export interface SharepointFile {
  id: String;
  name: String;
  type: String;
  children?: SharepointFile[];
  downloadUrl?: String;
  itemId?: String;
  fields?: any;
  mimeType?: String;
};

export interface SiteColumn {
  [field: string]: any,
};

export interface GeminiFile {
  [field: string]: any,
};