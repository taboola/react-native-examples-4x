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
}

export interface TaboolaApiActions {
  setPublisher: (value: string) => void;
  setPageType: (value: string) => void;
  setTargetType: (value: string) => void;
  setPageUrl: (value: string) => void;
  setSerialFetchTimeout: (value: string) => void;
  setExtraPropertiesKey: (value: string) => void;
  setExtraPropertiesValue: (value: string) => void;
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



  const state: TaboolaApiState = {
    publisher,
    pageType,
    targetType,
    pageUrl,
    serialFetchTimeout,
    extraPropertiesKey,
    extraPropertiesValue,
  };

  const actions: TaboolaApiActions = {
    setPublisher,
    setPageType,
    setTargetType,
    setPageUrl,
    setSerialFetchTimeout,
    setExtraPropertiesKey,
    setExtraPropertiesValue,
  };

  return [state, actions];
};
