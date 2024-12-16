import React, { useEffect, useState } from 'react'

const CounterComp = () => {

    const [first, setfirst] = useState(0)

    useEffect(() => { 
        console.log("called")
    })


    const handleInc = (v:any) => { 
        setfirst((prev)=>prev + v)
    }

  return (
    <div>
      <div>{first}</div>
      <button onClick={()=>handleInc(1)}>inc</button>
      <button onClick={()=>handleInc(-1)}>dec</button>
    </div>
  );
}

export default CounterComp