// src/App.js

import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TutorListPage from './pages/TutorListPage'
import TutorDetailPage from './pages/TutorDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* "/" 로 접속하면 "/tutors" 로 이동 */}
        <Route path="/" element={<Navigate to="/tutors" replace />} />
        {/* 튜터 목록 페이지 */}
        <Route path="/tutors" element={<TutorListPage />} />
        {/* 튜터 상세 페이지 */}
        <Route path="/tutors/:id" element={<TutorDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}