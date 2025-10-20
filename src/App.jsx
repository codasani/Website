import React, { useState } from 'react'
import EmployeeLogin from "./components/EmployeeLogin";
import AdminDashboard from "./components/AdminDashboard";
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'

export default function App() {
  const [view, setView] = useState('welcome')
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  function handleStart() { setView('login') }

  function handleLoggedIn(sess) { 
    setSession(sess); 
    setView(sess.role === 'teacher' ? 'teacher' : 'student') 
  }

  function handleAdmin() { setView('employee-login') }

  function handleEmployeeLoginSuccess() { 
    setIsAdmin(true); 
    setView('admin') 
  }

  function handleLogout() { 
    setSession(null); 
    setIsAdmin(false); 
    setView('login') 
  }

  return (
    <div className="app">
      <div className="card">
        {view === 'welcome' && <Welcome onStart={handleStart} />}
        {view === 'login' && <Login onLoggedIn={handleLoggedIn} onAdmin={handleAdmin} />}
        {view === 'employee-login' && <EmployeeLogin onSuccess={handleEmployeeLoginSuccess} />}
        {view === 'student' && session && <StudentDashboard session={session} onLogout={handleLogout} />}
        {view === 'teacher' && session && <TeacherDashboard session={session} onLogout={handleLogout} />}
        {view === 'admin' && <AdminDashboard onLogout={handleLogout} />}
      </div>
    </div>
  )
}
