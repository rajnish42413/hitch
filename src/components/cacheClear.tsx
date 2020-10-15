import React from 'react';
import { useClearCache } from 'react-clear-cache';
import { Alert, Button } from 'antd';

export default function CacheClear() {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  
  // useEffect(() => {
  //   if(!isLatestVersion){
  //     emptyCacheStorage();
  //   }
  // }, [emptyCacheStorage, isLatestVersion])

  return !isLatestVersion ? (
    <Alert
      message="Update Version"
      type="info"
      showIcon
      description={
        <Button
          type="link"
          size="small"
          onClick={(e) => {
            e.preventDefault();
            emptyCacheStorage();
          }}
        >
          update now
        </Button>
      }
    />
  ) : (
    <> </>
  );
}
