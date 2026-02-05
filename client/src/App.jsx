import { gql } from "@apollo/client";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      email
      age
      isActive
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $age: Int) {
    createUser(name: $name, email: $email, age: $age) {
      id
      name
      email
      isActive
    }
  }
`;

function App() {
  const [input, setInput] = useState({ name: "", email: "" });

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(GET_USERS);

  const [
    getUserById,
    { data: userData, loading: userLoading, error: userError },
  ] = useLazyQuery(GET_USER_BY_ID);

  const [createUserMutation, { loading: creating, error: createError }] = useMutation(CREATE_USER, {
    refetchQueries: [GET_USERS],
  });

  const handleUserDetail = (id) => {
    getUserById({ variables: { id } });
  };

  const handleCreateUser = async () => {
    try {
      await createUserMutation({
        variables: input
      });

      setInput({ name: "", email: "" });
    } catch (err) {
      console.error(err);
    }
  };


  if (usersLoading) return <h2>Users loading...</h2>;
  if (usersError) return <h2>Error: {usersError.message}</h2>;

  return (
    <>
      <h3>Create User</h3>
      <div style={{ padding: "10px", border: "1px solid #ccc" }}>
        <input type="text" placeholder="Name" onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))} />
        <input type="email" placeholder="Email" onChange={(e) => setInput((prev) => ({ ...prev, email: e.target.value }))} />
        <button onClick={handleCreateUser}>Create User</button>
      </div>

      <h3>Selected User</h3>
      {userLoading && <p>Loading user...</p>}
      {userError && <p>Error: {userError.message}</p>}
      {userData && (
        <pre>{JSON.stringify(userData.getUserById, null, 2)}</pre>
      )}

      <h3>Users</h3>
      <div>
        {usersData.getUsers.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleUserDetail(user.id)}
          >
            Name: {user.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
