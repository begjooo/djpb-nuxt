interface SharepointFields {
  BatasTriwulan: string,
};

export interface SharepointItem {
  id: string,
  name: string,
  type: string,
  itemId: string,
  children?: SharepointItem[],
  fields?: any,
};