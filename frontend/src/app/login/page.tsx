"use client";

import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setErrors({});
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        setForm({
          email: "",
          password: "",
        });
        // TODO: Redirect to dashboard or home
      } else {
        setErrors(data);
      }
    } catch (error: any) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
   <div className="min-h-screen flex">
     
        {/* LEFT: Abstract Blue Background */}
         <div className="w-1/2 h-screen">
          <img
            src="/blue-dreams.jpg"
            alt="Abstract Blue"
            className="object-cover w-full h-full"
          />
        </div>

        {/* RIGHT: Login Form */}
        <div className="w-1/2 flex items-center justify-center bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-4xl font-bold text-center mb-8">SIGN IN</h2>
            {message && <div className="mb-2 text-green-600">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  className="border rounded w-full p-2 focus:outline-blue-500"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  className="border rounded w-full p-2 focus:outline-blue-500"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <div className="text-red-500 text-xs">{errors.password}</div>}
              </div>
              <button
                className="bg-blue-600 w-full text-white py-2 rounded hover:bg-blue-700 mt-4"
                type="submit"
              >
                Sign in
              </button>
              
               
            </form>
          </div>
        </div>
      </div>
 
  );
}
