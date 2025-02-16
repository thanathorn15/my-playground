import { useState, useEffect } from "react";
import axios from "axios";

const usePagination = (apiUrl, pageSize = 10) => {
  const [data, setData] = useState([]);  // ข้อมูลที่โหลดมา
  const [currentPage, setCurrentPage] = useState(1); // หน้าปัจจุบัน
  const [totalPages, setTotalPages] = useState(1); // จำนวนหน้าทั้งหมด
  const [loading, setLoading] = useState(false); // สถานะโหลด
  const [error, setError] = useState(null); // สถานะ error

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}?_page=${currentPage}&_limit=${pageSize}`);
        setData(response.data);
        const totalItems = response.headers["x-total-count"] || 100; // เช็ค API มี Header "X-Total-Count" หรือไม่
        setTotalPages(Math.ceil(totalItems / pageSize)); // คำนวณจำนวนหน้า
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, currentPage, pageSize]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return { data, currentPage, totalPages, nextPage, prevPage, goToPage, loading, error };
};

export default usePagination;
