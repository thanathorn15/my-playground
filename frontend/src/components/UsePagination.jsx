import { useState, useEffect } from "react";
import axios from "axios";

const usePagination = (url, pageSize = 10) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}?_page=${page}&_limit=${pageSize}`)
      .then(response => setData(prev => [...prev, ...response.data]))
      .finally(() => setLoading(false));
  }, [page]);

  return { data, loading, nextPage: () => setPage(prev => prev + 1) };
};

export default usePagination;
