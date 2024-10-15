export default interface SharepointFile {
    name: String;
    type: String;
    id: String;
    children?: SharepointFile[];
    downloadUrl?: String;
    itemId?: String;
    fields?: any;
    mimeType?: String;
  }
  