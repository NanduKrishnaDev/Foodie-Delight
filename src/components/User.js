import { useState, useEffect } from "react";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();

      setUsers(data);
    };

    getUsers();
  }, []);


  if (users.length == 0) return <div>loading</div>

  return users.map((user) => (
    <>
      <div>{user.id}</div>
      <h1>{user.title}</h1>
      <p>{user.body}</p>
    </>
  ));
};

export default User;
