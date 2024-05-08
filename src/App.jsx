import React, { useState } from 'react';
import runchat from "./gemini";

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isDisable,setIsDisable]=useState(false);

  const handleClick = async () => {
    setIsDisable(true);
    const res = await runchat(prompt);
    setResponse(res);
    if(res.length>1){
      setIsDisable(false);
    }
    console.log(res);

  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <>
      <input type="text" placeholder='enter text' onChange={(e) => handleChange(e)} />
      <button onClick={handleClick} disabled={isDisable}>search</button>
      <p>Response: {response}</p>
    </>
  );
}

export default App;
