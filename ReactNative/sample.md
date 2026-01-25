
write code next year coundown in react native 
recat native useeffect inside that settimput and call funtion
recat native arrow funtion with code 







const usePrivousState () {
     const [prevCount,setPrevCount] = useState(0)
       const [count,setCount] = useState(0)
     
     useEffect(()=>{
         setPrevCount((prev)=> prev)
        
     },[count])
     
     const counter = ()=>{
         setCount((prev)=> prev+1)
     }
     
     return {
         prevCount,
         count,
         counter
     }
     
 }

 write a code that will show old value for counter and new as well