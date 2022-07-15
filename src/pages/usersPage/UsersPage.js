import React from "react";
import { useState, useEffect, useRef } from "react";
import Users from "../../components/users/Users";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [lastElement, setLastElement] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const avoider = useRef(
    new IntersectionObserver((elements) => {
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

    //cleanup function
    return () => {
      if (lastElement) {
        currentAvoider.unobserve(lastElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageNumber}/20`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers((prev) => [...prev, ...data.list]);
      });
  }, [pageNumber]);

  return (
    <div className="users-container">
      <Users setLastElement={setLastElement} userList={users} />
    </div>
  );
}
