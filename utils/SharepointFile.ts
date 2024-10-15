export default interface SharepointFile {
    name: String;
    type: String;
    id: String;
    children?: SharepointFile[];
  }
  