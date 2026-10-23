import react, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signupform = () => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const response = await fetch("http://localhost:3000/auth/signup",
            {
             method: "POST" ,
             headers: {
                "Content-Type": "application/json"
             },
             body: JSON.stringify(formdata)
            }
        )
        const result = await response.json();
        alert(result.message);
        console.log("Signup status:",response.status);
        console.log("Signup result:",result);
        if(response.ok){
            navigate("/Loginform");
        }
    }catch (error){
        console.log("Signup error:",error)
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="mb-2 text-center text-3xl font-bold text-[#9999e8]">
            Signup
          </h1>

          <p className="mb-6 text-center text-[#9999e8]">Create your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="username"
              value={formdata.username}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-[#8282d3] py-3 font-semibold text-white transition hover:bg-[#8484e0]"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signupform;
