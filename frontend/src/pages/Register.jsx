import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Register = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const navigate = useNavigate(); // ✅ ใช้ navigate เพื่อเปลี่ยนหน้า
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // ดึงผู้ใช้ที่มีอยู่แล้วจาก LocalStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ตรวจสอบว่าอีเมลนี้ถูกใช้ไปแล้วหรือยัง
    const emailExists = users.some(user => user.email === data.email);
    if (emailExists) {
      alert("🚨 Email นี้ถูกใช้ไปแล้ว!");
      return;
    }

    // บันทึกผู้ใช้ใหม่
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    alert("✅ Registration Successful!");

    // ✅ Redirect ไปหน้า Login หลังจากลงทะเบียนสำเร็จ
    navigate("/login");
  };

  return (
    <div className={`w-screen h-screen flex justify-center items-start pt-20 p-6 transition-colors duration-300 
                     ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className={`w-full max-w-md p-6 rounded-lg shadow-lg transition-colors 
                      ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <h2 className="text-3xl font-bold text-center mb-6">
          📝 <span className={darkMode ? "text-yellow-400" : "text-blue-500"}>Register</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-lg font-medium">First Name</label>
            <input type="text" {...register("firstName", { required: "First name is required" })}
              className={`w-full p-3 border rounded-md focus:outline-none 
                          ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`} />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium">Last Name</label>
            <input type="text" {...register("lastName", { required: "Last name is required" })}
              className={`w-full p-3 border rounded-md focus:outline-none 
                          ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`} />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium">Email</label>
            <input type="email" {...register("email", { required: "Email is required" })}
              className={`w-full p-3 border rounded-md focus:outline-none 
                          ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium">Password</label>
            <input type="password" {...register("password", { required: "Password is required", minLength: 6 })}
              className={`w-full p-3 border rounded-md focus:outline-none 
                          ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button type="submit" className={`w-full py-3 text-lg font-semibold rounded-md transition-colors 
                        ${darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
            ✅ Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
