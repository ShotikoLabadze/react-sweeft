import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

import "./Details.css";

export default function Details(props) {
  const { id } = useParams();
  const [userAdress, setUserAdress] = useState({});
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        const fullName = `${data.prefix} ${data.name} ${data.lastName}`;

        props.setUserHistory((previous) => {
          if (previous.some((user) => user.id === id)) {
            return previous;
          }
          return [...previous, { fullName, id }];
        });

        const userInfo = {
          image: `${data.imageUrl}?q=${id}`,
          fullName,
          title: data.title,
          email: data.email,
          ipAddress: data.ip,
          jobArea: data.jobArea,
          jobType: data.jobType,
        };

        const userAddress = {
          companyName: data.company.name,
          city: data.address.city,
          country: data.address.country,
          state: data.address.state,
          streetAddress: data.address.streetAddress,
          zip: data.address.zipCode,
        };

        setUserInfo(userInfo);
        setUserAdress(userAddress);
      });
  }, [id]);

  return (
    <div className="details">
      <div>
        <img className="image" alt="" src={userInfo.image} />
      </div>

      <fieldset className="info">
        <legend>Info</legend>
        <div>
          <strong>{userInfo.fullName}</strong>
        </div>
        <div>
          <i>{userInfo.title}</i>
        </div>
        <br />
        <div>
          <span>Email</span>: {userInfo.email}
        </div>
        <div>
          <span>Ip Address</span>: {userInfo.ipAddress}
        </div>
        <div>
          <span>Job Area</span>: {userInfo.jobArea}
        </div>
        <div>
          <span>Job Type</span>: {userInfo.jobType}
        </div>
      </fieldset>

      <fieldset className="address">
        <legend>Address</legend>
        <div>
          <strong>{userAdress.companyName}</strong>
        </div>
        <div>
          <span>City</span>: {userAdress.city}
        </div>
        <div>
          <span>Country</span>: {userAdress.country}
        </div>
        <div>
          <span>State</span>: {userAdress.state}
        </div>
        <div>
          <span>Street Address</span>: {userAdress.streetAddress}
        </div>
        <div>
          <span>ZIP</span>: {userAdress.zip}
        </div>
      </fieldset>
    </div>
  );
}
