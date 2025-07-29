export enum FlatListItemType {
  NativePublisherContent = 'content',
  TaboolaFeed = 'taboolaFeed',
  TaboolaWidget = 'taboolaWidget',
}

export interface FlatListItem {
  id: string;
  type: FlatListItemType;
  text: string;
}
