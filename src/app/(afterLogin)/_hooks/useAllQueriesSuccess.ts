import { useEffect, useState } from 'react';

const useAllQueriesSuccess = (searchResults: any[]) => {
  const [isSearchSuccess, setSearchSuccess] = useState(false);

  useEffect(() => {
    if (searchResults.length === 0) return;

    const allQueriesSuccessful = searchResults.every((result) => {
      if (!result) return false;
      return result.isSuccess === true;
    });

    if (allQueriesSuccessful) {
      setSearchSuccess(true);
    } else {
      setSearchSuccess(false);
    }
  }, [searchResults]);

  return isSearchSuccess;
};

export default useAllQueriesSuccess;
