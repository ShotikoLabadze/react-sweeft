import React from "react";
import Users from "../../components/users/Users";
import Details from "../../components/details/Details";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import FollowSequence from "../../components/FollowSequence";

import "./UserPage.css";

export default function SingleUserPage(props) {
  const { id } = useParams();
  const [userFriends, setUserFriends] = useState([]);
  const [userHistory, setUserHistory] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [lastElement, setLastElement] = useState(null);

  const avoider = useRef(
    new IntersectionObserver((elements) => {
      console.log("here");
      if (elements[0].isIntersecting) {
        setPageNumber((prev) => prev + 1);
      }
    })
  );

  useEffect(() => {
    const currentAvoider = avoider.current;
    if (lastElement) {
      currentAvoider.observe(lastElement);
    }

    //cleanup
    return () => {
      if (lastElement) {
        currentAvoider.unobserve(lastElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    setUserFriends([]);
    setPageNumber(1);
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/1/20`
    )
      .then((result) => result.json())
      .then((data) => {
        setUserFriends(data.list);
      });
  }, [id]);

  useEffect(() => {
    if (pageNumber !== 1) {
      fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${pageNumber}/20`
      )
        .then((result) => result.json())
        .then((data) => {
          setUserFriends((prev) => [...prev, ...data.list]);
        });
    }
  }, [pageNumber, id]);

  return (
    <div className="container">
      <Details setUserHistory={setUserHistory} />
      <FollowSequence userHistory={userHistory} />
      <h2>Friends:</h2>
      <Users setLastElement={setLastElement} userList={userFriends} />
    </div>
  );
}
