import { useEffect } from 'react';
import { Taboola, TBLClassicPage } from '@taboola/react-native-plugin-4x';

/**
 * Custom hook to handle Taboola cleanup on component unmount
 * @param tblClassicPage - The Taboola classic page instance to clean up
 */
export function useTaboolaCleanup(tblClassicPage: TBLClassicPage): void {
  useEffect(() => {
    return () => {
      if (tblClassicPage.pageId) {
        Taboola.removeClassicPage(tblClassicPage.pageId);
      }
    };
  }, [tblClassicPage]);
}
