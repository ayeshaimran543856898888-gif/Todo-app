import { useState }  from "react";
import { useNavigate } from "react-router-dom";


const Loginform = () => {
     const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:3000/auth/login",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData)
            }
        );
        const result = await response.json();
        alert(result.message);
        if(response.ok){
            navigate("/Todo");
        }
    } catch (error) {
      console.log("Login error:",error)  
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="mb-2 text-center text-3xl font-bold text-[#9999e8]">
            Login
          </h1>

          <p className="mb-6 text-center text-[#9999e8]">Welcome back!</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-[#8282d3] py-3 font-semibold text-white transition hover:bg-[#7070c5]"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="font-semibold text-purple-600 hover:text-purple-800"
            >
              Signup
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Loginform;
