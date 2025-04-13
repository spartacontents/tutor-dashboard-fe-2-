// src/components/Tutor/TutorList.jsx

import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/TutorList.css'

export default function TutorList({ tutors, onTutorClick }) {
  if (!tutors || tutors.length === 0) {
    return <p className="no-result">검색 결과가 없습니다.</p>;
  }

  return (
    <table className="tutor-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>기술 스택</th>
          <th>총 경력(년)</th>
        </tr>
      </thead>
      <tbody>
        {tutors.map(tutor => (
          <tr
            key={tutor.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onTutorClick(tutor)} // 🔥 여기서 모달 열림
          >
            <td>{tutor.id}</td>
            <td>{tutor.name}</td>
            <td>{tutor.skills?.join(', ')}</td>
            <td>{tutor.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}