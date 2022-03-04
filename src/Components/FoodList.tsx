import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FoodList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string>("");

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

  const temp = JSON.stringify(data)
  const temp2 = JSON.parse(temp);

  return <div>test</div>

}
