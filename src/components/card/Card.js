import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/user/" + props.id)}
      className="user-card"
      style={{ width: "18rem" }}
    >
      <img className="" src={props.imgUrl} alt="" />
      <div className="user-card-body">
        <h3 className="">{props.fullName}</h3>
        <p className="">{props.title}</p>
      </div>
    </div>
  );
}
