// frontend/app/register/page.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    given_name: "",
    last_name: "",
    salary_per_day: "",
    employment_start_date: "",
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registration successful! You can now log in.");
        setForm({
          email: "",
          given_name: "",
          last_name: "",
          salary_per_day: "",
          employment_start_date: "",
          password: "",
        });
      } else {
        setErrors(data);
      }
    } catch (error: any) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
        <div className="w-1/2 h-screen">
          <img
            src="/blue-dreams.jpg"
            alt="Abstract Blue"
            className="object-cover w-full h-full"
          />
        </div>
 <div className="w-1/2 flex items-center justify-center bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-4xl font-bold text-center mb-8">SIGN UP</h2>
           {message && <div className="mb-2 text-green-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block">Email</label>
          <input
            className="border rounded w-full p-2"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>
        <div>
          <label className="block">Given Name</label>
          <input
            className="border rounded w-full p-2"
            type="text"
            name="given_name"
            value={form.given_name}
            onChange={handleChange}
            required
          />
          {errors.given_name && <div className="text-red-500 text-sm">{errors.given_name}</div>}
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            className="border rounded w-full p-2"
            type="text"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            required
          />
          {errors.last_name && <div className="text-red-500 text-sm">{errors.last_name}</div>}
        </div>
       
   
        <div>
          <label className="block">Password</label>
          <input
            className="border rounded w-full p-2"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
        </div>
        <button
                className="bg-blue-600 w-full text-white py-2 rounded hover:bg-blue-700 mt-4"
                type="submit"
              >
          Register
        </button>
      </form>
      <div className="flex justify-center p-2">
        <p>Already have an account? 
            <Link href="/login" className="text-blue-600 p-1 hover:underline">
      Sign in
    </Link>
            </p>
      </div>
          </div>
        </div>
      </div>
 

  );
}
    