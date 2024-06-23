import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Employee = () => {

    let [data, setData] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searched, setSearched] = useState(false); 
    const [selectedCards, setSelectedCards] = useState([]); 
    // const [error, setError] = useState(null); 
    const navigate = useNavigate();
    
    async function fetchApi() {
        // let data = await fetch("https://api.github.com/users");
        let data = await fetch("https://dummy.restapiexample.com/api/v1/employees");

        console.log(data);
        let finalData = await data.json();
        console.log(finalData);
        setData(finalData.data);
      }

    // async function fetchApi(retryCount = 0)  {
    //     try {
    //       let response = await fetch("https://dummy.restapiexample.com/api/v1/employees");
    //       if (!response.ok) {
    //         if (response.status === 429 && retryCount < 3) {

    //           setTimeout(() => fetchApi(retryCount + 1), 5000);
    //         } else {
    //           throw new Error(`Error ${response.status}: ${response.statusText}`);
    //         }
    //       } else {
    //         let finalData = await response.json();
    //         console.log(finalData);
    //         setData(finalData.data);
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       setError(error.message);
    //     }
    // }

      useEffect(() => {
        fetchApi();
      }, []);


      const handleSearch = () => {
        if (searchId.trim() === '') {
          setSearched(false);
        } else {
          const result = data.find(employee => employee.id === parseInt(searchId));
          setSearchResult(result);
          setSearched(true); 
        }
      };    
    
      const handleInputChange = (event) => {
        setSearchId(event.target.value);
      };

      const handleCardClick = (id) => {
        navigate(`/employee/${id}`);
      };

      const handleDelete = (id) => {
        const updatedData = data.filter(employee => employee.id !== id);
        setData(updatedData);
      };

      const handleSelectCard = (id) => {
        setSelectedCards((prevSelected) =>
          prevSelected.includes(id)
            ? prevSelected.filter((cardId) => cardId !== id)
            : [...prevSelected, id]
        );
      };
    
      const handleDeleteSelected = () => {
        setData((prevData) => prevData.filter((employee) => !selectedCards.includes(employee.id)));
        setSelectedCards([]);
      };

      return (
        <div className='flex flex-wrap ml-[310px] w-full justify-around border-solid border-2 border-black'> 
         <div className='flex flex-col items-start m-4 w-full'>
           <h1 className='text-5xl font-bold'>Employees({data.length})</h1>
           <p className='text-gray-500 text-lg mt-2 font-semibold'>the number of employees and their data in the company </p>
           <div className='flex justify-between mt-[20px] w-full p-6'>
            <div className='flex justify-between w-[550px]'>
            <input value={searchId} onChange={handleInputChange}
            className='w-[450px] h-[40px] text-xl rounded-xl p-4 border-2 border-gray-200 focus:bg-[#efefef]' type="text" placeholder='Enter employee ID to search' />
            <button onClick={handleSearch}
            className='text-xl border w-[80px] h-[40px]  rounded-xl hover:bg-[#e2e2e2]'>search</button>
            </div>
          <div className='flex justify-center items-center gap-4 w-[440px]'>
          <p className='text-gray-500 text-lg font-semibold'>to select and delete muiltple cards</p>
          <button
            onClick={handleDeleteSelected}
            className='text-xl border w-[80px] h-[40px] rounded-xl hover:bg-[#e2e2e2] bg-red-500 text-white'
            disabled={selectedCards.length === 0} 
          >
            Delete
          </button>
          </div>
         </div>
        
         </div>
       
         <div className='flex flex-wrap justify-around mt-[-20px]' >

         {searched && searchResult && ( 
          <div onClick={() => handleCardClick(searchResult.id)}
          className='flex flex-col ml-[-600px] justify-between p-4 border border-solid border-2 bg-[#f4f4f4] m-[30px] h-[320px] w-[450px] hover:border-[#5e0e76] hover:border-4'>
               <input
              type="checkbox"
              className='w-[20px] h-[20px] relative left-[395px]'
              checked={selectedCards.includes(searchResult.id)}
              onChange={() => handleSelectCard(searchResult.id)}
              onClick={(e) => e.stopPropagation()}
            />
            <div className='flex items-center gap-[40px]' >
              <img 
                className='h-[160px] w-[160px] ml-4 rounded-full border-2 border-[#5e0e76] border-solid' 
                src={searchResult.profile_img} 
                alt={searchResult.profile_img} 
              />
              <div className='flex flex-col text-left gap-4'>
                <h1 className='font-bold'>Id: {searchResult.id}</h1>
                <h1>Name:  {searchResult.employee_name}</h1>
                <h1>Age:{searchResult.employee_age}</h1>
              <h1>salary:{searchResult.employee_salary}</h1>
              </div>
            </div>
            <div className='flex justify-around'>
            <button onClick={(e) => e.stopPropagation()}
            className="h-[40px] w-[80px] border border-solid border-2 bg-white hover:border-green-400 z-20">Edit</button>
            <button onClick={() => handleDelete(searchResult.id)} className="delete-button h-[40px] w-[80px] border border-solid border-2 bg-white hover:border-red-400">Delete</button>
            </div>
          </div>
          
        )}
           {searched && !searchResult && (
          <div className='text-2xl m-4 mt-[40px]'>No employees found.</div>
        )}
        {!searched && data.map((m) => {
            return(
                <>

               <div onClick={() => handleCardClick(m.id)}
               className='flex flex-col  justify-between p-4 border border-4 border-solid border-red bg-[#f4f4f4] m-[30px] h-[320px] w-[450px] hover:border-[#5e0e76] hover:border-4'>
                <div className='h-[5px] relative left-[200px]'>
                <input
              type="checkbox"
               className='w-[20px] h-[20px]'
              checked={selectedCards.includes(m.id)}
              onChange={() => handleSelectCard(m.id)}
              onClick={(e) => e.stopPropagation()} 
            />
                </div>
               <div className='flex items-center justify-start  gap-[40px]' >
               <img className='h-[160px] w-[160px] rounded-full ml-4 border-2 border-[#5e0e76] border-solid' src={m.profile_img} alt={m.profile_img} />
              <div className='flex flex-col text-left gap-4'>
              <h1 className='font-bold'>Id: {m.id}</h1>
              <h1>Name:  {m.employee_name}</h1>
              <h1>Age:{m.employee_age}</h1>
              <h1>salary:{m.employee_salary}</h1>
              </div>
               </div>

               <div className='flex justify-around'>
               <button onClick={(e) => e.stopPropagation()}
                className="h-[40px] w-[80px] border border-solid border-2 bg-white hover:border-green-400  z-20">Edit</button>
             <button onClick={(e) => {e.stopPropagation(); handleDelete(m.id);}} 
               className="delete-button h-[40px] w-[80px] border border-solid border-2 bg-white z-20 hover:border-red-400">Delete</button>
</div>
     
               </div>

                </>
            )
})}
 
         </div>
       
        </div>
      );
}

export default Employee