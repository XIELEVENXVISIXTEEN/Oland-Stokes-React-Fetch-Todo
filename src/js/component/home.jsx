import React, { useEffect, useState } from "react";
import honeyDo from "../../img/honeyDo.png";
import Starbucks from "../../img/Starbucks.png";

//create your first component
const Home = () => {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);
  console.log("task", task);
  console.log("list", list);

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/olandstokes', {
      method: "POST",
      body: JSON.stringify(list),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
        //here is where your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch(error => {
        //error handling
        console.log(error);
      });
  }, [list])



  const newItem = (task) => {
    return {
      label: task,
      done: false,


    }
  }
  console.log(newItem);

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = newItem(task);
    setList([item, ...list])
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.trim() !== '') {
        setTask([...list, inputValue.trim()]);
        setInputValue('');
      }
    }
    post(list)

  };
  const handleDeleteTask = (index) => {
    const updatedTasks = [...list];
    const filteredTasks = updatedTasks.filter((item, idx) => idx !== index);
    setList(filteredTasks);
  };


  useEffect(() => {
    fetch('')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setList(data);
        console.log(data);
      })
  }, [])


  return (
    <div className="container">
      <div className="todoList">

      <img src={honeyDo} class="" alt="honey-head" />
        <form onSubmit={handleSubmit}>

          <input type="text"
            required
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

        </form>
        <ul>
          {list.map((task, index) => {
            return (
              <li
                key={index}>
                {task.label}
               
    <div class="card">
	<img src={Starbucks} class="card-img-top" alt="short" />
      <div class="card-body">
        <h5 class="card-title">Starbucks gift card</h5>
        <a href="#" class="btn btn-primary">Purchase</a>
      </div>
    </div>
  
                <button className="delete-button"
                  onClick={() => handleDeleteTask(index)}>
                  x
                </button>
              </li>
            )
          })}


          <p>{list.length} items left</p>

        </ul>



      </div>
    </div>


  );
};




export default Home;
