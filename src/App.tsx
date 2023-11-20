import React, { useEffect, useState } from 'react'

type DataType = {
  name: string;
  age: number
}
const App = () => {

  const [data, setData] = useState<DataType>({} as DataType)

  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(ret => {
      setData(ret.data)
    })
  }, [])
  return <div onClick={() => alert(1)}>App {data.name}</div>
}

export default App
