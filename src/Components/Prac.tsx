import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Prac() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://us-central1-react-baemin.cloudfunctions.net/merchantInfo");
        setData(response.data);
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }
    fetchData();
  },[]);

  return <div>test</div>
}
