// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/users/register', formData);
//       localStorage.setItem('token', res.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
//       <h2>Register</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setFormData({...formData, name: e.target.value})} />
//         <input type="email" placeholder="Email Address" required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setFormData({...formData, email: e.target.value})} />
//         <input type="password" placeholder="Password" required style={{ width: '100%', padding: '10px', marginBottom: '15px' }} onChange={(e) => setFormData({...formData, password: e.target.value})} />
//         <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sign Up</button>
//       </form>
//       <p style={{ marginTop: '15px' }}>Already have an account? <Link to="/login">Login here</Link></p>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        <h2 className="mb-2 text-center text-3xl font-extrabold text-gray-800">Create Account</h2>
        <p className="mb-6 text-center text-sm text-gray-500">Sign up to start managing your notes smoothly</p>
        
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 p-3.5 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              placeholder="John Doe"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="example@mail.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white shadow-lg shadow-blue-200 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer mt-2"
          >
            Create Free Account
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:underline">Sign In here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

