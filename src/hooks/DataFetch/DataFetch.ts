import { useState, useEffect } from 'react';

const DataFetch = (url: string): Promise<object> => {
  const [jsonData, setJsonData] = useState<object>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const options: RequestInit = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(url, options);
        const json = await response.json();
        setJsonData(json);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [url]);

  return jsonData as Promise<object>;
};

export default DataFetch;