import { useEffect, useState, useRef } from "react"
// useEffect, useState, useRef are HOOKS from react language
import "./styles.css"
import Trash from "../../assets/trash.svg"
import api from "../../services/api"

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  async function getUsers() {
    const usersFromApi = await api.get("/users")

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/users',{
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)
    // important to use ` ` so we can concatenate endpoints and variables with this function 

  }

  useEffect(() => {
    getUsers()
  })


  // start of HTML code

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de usuários</h1>
        <input name="Name" type="text" placeholder="Name" autoComplete="off" ref={inputName}/>
        <input name="Age" type="age" placeholder="Age" autoComplete="off" ref={inputAge}/>
        <input name="Email" type="email" placeholder="Email" autoComplete="off" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Name: <span>{user.name}</span>
            </p>
            <p>
              Age: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home
