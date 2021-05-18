import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const AddTransaction = ({ group_id, user_id }) => {
  const [setlleUp, setSettleUp] = useState(false);
  const [payer, setPayer] = useState("");
  const [membersInvolved, setMembersInvolved] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [timeStamp, setTimeStamp] = useState("");

  const getSetParams = async () => {
    setPayer(user_id);
    setGroupId(group_id);
    //setTimeStamp(Date.now);
    const req = {
      groupId,
    };
    const res = await axios.post(
      "http://localhost:5000/api/user/createuser",
      req
    );
  };

  useEffect(() => {
    getSetParams();
  }, []);

  const onSubmit = async (e) => {
    // e.preventDefault();
    // const data = {
    //   email,
    //   password,
    //   name,
    // };
    // const result = await axios.post(
    //   "http://localhost:5000/api/user/createuser",
    //   data
    // );
    // console.log(result.data);
  };

  return (
    <div>
      <h2>Transaction add</h2>
      <form action="" onSubmit={onSubmit}>
        <div>
          <label htmlFor="">Description:</label>
          <input
            type="text"
            name=""
            id=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Email:</label>
          <input
            type="Amount"
            name=""
            id=""
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor="">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div> */}
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddTransaction;
