import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`https://dummy.restapiexample.com/api/v1/employees`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }
        const data = await response.json();

        const matchedEmployee = data.find(emp => emp.id === parseInt(id));
        setEmployee(matchedEmployee);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-start ml-[300px]'>
      <h1 className='text-3xl font-bold content-start ml-[30px] p-2 '>Employee Details</h1>
      <div className='flex flex-col justify-between p-2 border border-solid border-red m-[30px] h-[240px] w-screen hover:border-[#5e0e76] hover:border-4'>
        <div className='flex items-center gap-[65px]'>
          <img className='h-[222px] w-[222px] rounded' src={employee.profile_img} alt={employee.profile_img} />
          <div className='flex justify-between gap-[100px]'>
            <h1>Id: {employee.id}</h1>
            <h1>Name: {employee.employee_name}</h1>
            <h1>Age: {employee.employee_age}</h1>
            <h1>Salary: {employee.employee_salary}</h1>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeDetail;
