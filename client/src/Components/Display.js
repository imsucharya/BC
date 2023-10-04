import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      //  console.log(str);
       console.log(str_array)
      const file = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank" rel="noreferrer">
            <embed key={i} className="image-list" src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} width="300px" height="250px" />
            {/* <iframe key={i} class="image-list" width="200px" height="200px" src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} frameborder="0"></iframe> */}
          </a>
        );
      });
      setData(file);
    } else {
    alert("No File to display"  );
}
  };
return (
  <>
    <div className="image-list">{data}</div>
    <input
      type="text"
      placeholder="Enter Address"
      className="address"
    ></input>
    <button className="center button" onClick={getdata}>
      Get Data
    </button>
  </>
);
};
export default Display;