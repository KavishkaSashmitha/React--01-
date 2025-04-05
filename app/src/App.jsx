
import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Box, Button, Grid, GridItem, Switch } from '@chakra-ui/react';
import { ThemeContext } from '@emotion/react';

function App() {
  const[tasks,setTasks]= useState([])
  const[newTask,setNewTask]=useState('');
  const[isInitialized,setInitialized]= useState(false);
  const {theme,toggleTheme} = useContext(ThemeContext);

  //fetch tasks from localstorage
  useEffect(()=>{
    const storedTasks= JSON.parse(localStorage.getItem("tasks"))||[]
      setTasks(storedTasks);
      setInitialized(true)
  },[])

  //Store task in localstorage
  useEffect(()=>{
    if(isInitialized){
      localStorage.setItem("tasks",JSON.stringify(tasks))  
    }
  },[tasks,isInitialized])

  //handle form
  const handleAdd=(()=>{
      if(newTask.trim()==="")return;
      setTasks([...tasks,{id:Date.now(),text:newTask,completed:false}]);
      setNewTask("");

  })

  //handle deletes
  const handleDelete=((id)=>{
    const updatedTasks = tasks.filter((task)=>task.id !==id);
    setTasks(updatedTasks);
    console.log(updatedTasks);

  })

  //handle Complete
  const handleComplete=((id)=>{
     const taskComplete = tasks.map(task=>
        task.id == id ? {...task,completed:!task.completed}:task
     )
     setTasks(taskComplete)
  })

  
  
  return (
    <>
   <Grid templateColumns="repeat(3, 1fr)" gap={4} p={6}>
   <Switch.Root>
  <Switch.HiddenInput />
  <Switch.Control onChange={toggleTheme} >
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Label />
  <h1>Theme is :{theme}</h1>
</Switch.Root>
  <GridItem colSpan={2}>
  <Box bg={theme === "dark" ? "gray.700" : "white"} p={6} borderRadius="xl">
      <h1 style={{ color: theme === "dark" ? "white" : "black" }}>Task Manager APP [NO GPT]</h1>

      <input
        name="enterTask"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task"
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />
     <Button colorPalette={{ color: theme === "dark" ? "white" : "black" }} variant="outline" onClick={handleAdd}>Add</Button>

      <ul style={{ marginTop: "1rem" }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "gray" : theme === "dark" ? "white" : "black",
              marginBottom: "0.5rem"
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(task.id)}
            />{" "}
            {task.text}
            <Button
              size="sm"
              variant="outline"
              ml={4}
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Box>
  </GridItem>
</Grid>
    </>
  )
}

export default App
