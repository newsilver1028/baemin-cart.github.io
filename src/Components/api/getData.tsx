import axios from 'axios';

export default async function getData() {
  try {
    const response = await axios.get("https://us-central1-react-baemin.cloudfunctions.net/merchantInfo");
  } catch (error) {
    console.log(error);
  }
}
