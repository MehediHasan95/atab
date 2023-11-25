import { useState, useEffect } from "react";
import axios from "axios";
import DownloadExcel from "./DownloadExcel";
import DownloadPDF from "./DownloadPDF";

function Shop() {
  const [downloadData, setDownloadData] = useState([]);
  const [from, setFrom] = useState(false);
  const [to, setTo] = useState(false);

  useEffect(() => {
    let url: string = "https://fakestoreapi.com/users";

    if (from && to) {
      url = "https://fakestoreapi.com/users/5";
    } else if (from) {
      alert("please select to");
    } else if (to) {
      alert("please select from");
    }

    axios.get(url).then(async ({ data }) => {
      setDownloadData(data);
    });
  }, [from, to]);

  return (
    <div>
      <nav className="p-3 bg-[#0B2136] text-white flex justify-between items-center">
        <h1>ATAB DASHBOARD</h1>
        <ul className="flex items-center space-x-3">
          <input type="checkbox" onClick={() => setFrom(true)} />
          <input type="checkbox" onClick={() => setTo(true)} />

          <li>
            <DownloadExcel downloadData={downloadData} />
          </li>
          <li>
            <DownloadPDF downloadData={downloadData} />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Shop;
