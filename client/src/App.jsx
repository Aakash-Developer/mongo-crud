import axios from "axios";
import React, { use, useEffect, useState } from "react";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    salary: "",
    _id: "",
  });

  const getEmployees = () => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setEmployees(data.employees);
      });
  };

  const handleChange = (e) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:8000/user", fromData)
      .then((data) => {
        getEmployees();
        setFromData({
          name: "",
          email: "",
          phone: "",
          age: "",
          salary: "",
          _id: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/user/${id}`)
      .then((data) => {
        getEmployees();
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className=" h-screen  overflow-hidden grid grid-cols-[400px_1fr] gap-2 bg-slate-950">
      <div className=" p-6">
        <div className=" p-6  text-white grid grid-cols-1 gap-4">
          {fromData?._id && <h1>EMP ID : {fromData?._id}</h1>}
          <input onChange={handleChange} name="name" value={fromData.name} placeholder="Enter Name" className=" p-5 rounded-full bg-slate-700 w-full" />
          <input onChange={handleChange} name="email" value={fromData.email} placeholder="Enter Email" className=" p-5 rounded-full bg-slate-700 w-full" />
          <input onChange={handleChange} name="phone" value={fromData.phone} placeholder="Enter Phone" className=" p-5 rounded-full bg-slate-700 w-full" />
          <input onChange={handleChange} name="age" value={fromData.age} placeholder="Enter Age in number" className=" p-5 rounded-full bg-slate-700 w-full" />
          <input onChange={handleChange} name="salary" value={fromData.salary} placeholder="Enter Salary in Number" className=" p-5 rounded-full bg-slate-700 w-full" />
          <button onClick={onSubmit} className=" cursor-pointer  active:scale-90 transition-all duration-300 ease-in bg-green-500  py-3.5 px-4 rounded-full font-bold">
            Add Employee
          </button>
        </div>
      </div>
      <div className=" bg-white rounded-s-[50px]  h-full overflow-x-auto  ">
        <div>
          <div className=" py-1.5  sticky top-0 bg-white">
            <h1 className=" text-center text-2xl font-semibold text-green-700 pb-2 border-b-2 border-dashed uppercase">Employ Data</h1>
          </div>

          <div className="p-6">
            <table className=" w-full">
              <thead>
                <tr className=" border-b border-dashed">
                  <th className=" text-start py-2">ID</th>
                  <th className=" text-start py-2">Name</th>
                  <th className=" text-start py-2">Email</th>
                  <th className=" text-start py-2">Age</th>
                  <th className=" text-start py-2">Salary</th>
                  <th className=" text-center py-2">Action</th>
                </tr>
              </thead>
              {employees.length > 0 ? (
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={index} className=" border-b border-dashed">
                      <td className=" text-start py-2">{employee._id}</td>
                      <td className=" text-start py-2">{employee.name}</td>
                      <td className=" text-start py-2">{employee.email}</td>
                      <td className=" text-start py-2">{employee.age}</td>
                      <td className=" text-start py-2">{employee.salary}</td>
                      <td className=" text-center py-2 flex items-center  justify-center">
                        <div className=" flex items-center gap-2">
                          <button onClick={() => setFromData(employee)} className=" font-semibold text-white rounded-full py-1.5 px-3 bg-green-600 text-sm active:scale-90 transition-all duration-200 ease-linear">
                            Edit
                          </button>
                          <button onClick={() => deleteUser(employee._id)} className=" font-semibold text-white rounded-full py-1.5 px-3 bg-red-600 text-sm active:scale-90 transition-all duration-200 ease-linear">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <p className=" text-red-600">No Data Found</p>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
