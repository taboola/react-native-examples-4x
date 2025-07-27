import { useState } from 'react';

export interface TaboolaApiState {
  // TBLClassicPage API states
  publisher: string;
  pageType: string;
  targetType: string;
  pageUrl: string;
  serialFetchTimeout: string;
  extraPropertiesKey: string;
  extraPropertiesValue: string;

  // Template JS states
  queryKey: string;
  queryValue: string;
  requestCampaigns: number[];
  disableTRCCache: boolean;
  requestGeo: string;
  specificTRCServer: string;
  videoCampaignFormat: string;
}

export interface TaboolaApiActions {
  setPublisher: (value: string) => void;
  setPageType: (value: string) => void;
  setTargetType: (value: string) => void;
  setPageUrl: (value: string) => void;
  setSerialFetchTimeout: (value: string) => void;
  setExtraPropertiesKey: (value: string) => void;
  setExtraPropertiesValue: (value: string) => void;
  setQueryKey: (value: string) => void;
  setQueryValue: (value: string) => void;
  setRequestCampaigns: (value: number[]) => void;
  setDisableTRCCache: (value: boolean) => void;
  setRequestGeo: (value: string) => void;
  setSpecificTRCServer: (value: string) => void;
  setVideoCampaignFormat: (value: string) => void;
  toggleTRCCache: () => void;
}

export const useTaboolaApiState = (): [TaboolaApiState, TaboolaApiActions] => {
  // TBLClassicPage API states
  const [publisher, setPublisher] = useState('');
  const [pageType, setPageType] = useState('');
  const [targetType, setTargetType] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [serialFetchTimeout, setSerialFetchTimeout] = useState('');
  const [extraPropertiesKey, setExtraPropertiesKey] = useState('');
  const [extraPropertiesValue, setExtraPropertiesValue] = useState('');

  // Template JS states
  const [queryKey, setQueryKey] = useState('');
  const [queryValue, setQueryValue] = useState('');
  const [requestCampaigns, setRequestCampaigns] = useState<number[]>([]);
  const [disableTRCCache, setDisableTRCCache] = useState(false);
  const [requestGeo, setRequestGeo] = useState('');
  const [specificTRCServer, setSpecificTRCServer] = useState('');
  const [videoCampaignFormat, setVideoCampaignFormat] = useState<string>('');

  const toggleTRCCache = () => {
    setDisableTRCCache((previous) => !previous);
  };

  const state: TaboolaApiState = {
    publisher,
    pageType,
    targetType,
    pageUrl,
    serialFetchTimeout,
    extraPropertiesKey,
    extraPropertiesValue,
    queryKey,
    queryValue,
    requestCampaigns,
    disableTRCCache,
    requestGeo,
    specificTRCServer,
    videoCampaignFormat,
  };

  const actions: TaboolaApiActions = {
    setPublisher,
    setPageType,
    setTargetType,
    setPageUrl,
    setSerialFetchTimeout,
    setExtraPropertiesKey,
    setExtraPropertiesValue,
    setQueryKey,
    setQueryValue,
    setRequestCampaigns,
    setDisableTRCCache,
    setRequestGeo,
    setSpecificTRCServer,
    setVideoCampaignFormat,
    toggleTRCCache,
  };

  return [state, actions];
};
