import { useEffect } from 'react';
import { Taboola, TBLClassicPage } from '@taboola/react-native-plugin-4x';

/**
 * Custom hook to handle Taboola cleanup on component unmount
 * @param tblClassicPage - The Taboola classic page instance to clean up
 */
export function useTaboolaCleanup(tblClassicPage: TBLClassicPage): void {
  useEffect(() => {
    return () => {
      try {

        console.log('[TBLClassicPageScreen] Page reset completed');

        if (tblClassicPage.pageId) {
          Taboola.removeClassicPage(tblClassicPage.pageId);
          console.log(
            '[TBLClassicPageScreen] Page removed from pagesMap:',
            tblClassicPage.pageId
          );
        }

        console.log('[TBLClassicPageScreen] Cleanup completed successfully');
      } catch (error) {
        console.error('[TBLClassicPageScreen] Cleanup failed:', error);
      }
    };
  }, [tblClassicPage]);
}
