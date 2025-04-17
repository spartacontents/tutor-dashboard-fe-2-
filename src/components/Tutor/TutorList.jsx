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
          <th>분야</th>
          <th>기술 스택</th>
          <th>총 경력(년)</th>
        </tr>
      </thead>
      <tbody>
        {tutors.map(tutor => (
          <tr
            key={tutor.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onTutorClick(tutor)} // 여기서 모달 열림
          >
            <td>{tutor.id}</td>
            <td>{tutor.name}</td>
            <td>{getFieldsFromSkills(tutor.skills).join(' / ')}</td>
            <td>{tutor.skills?.join(', ')}</td>
            <td>{tutor.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

//기술 스택 기반 분야 매핑 함수
function getFieldsFromSkills(skills) {
  const fieldMap = {
    'React': '프론트엔드',
    'Vue': '프론트엔드',
    'JavaScript': '프론트엔드',
    'HTML': '프론트엔드',
    'CSS': '프론트엔드',
    'Next.js': '프론트엔드',
    'Java': '백엔드',
    'Node.js': '백엔드',
    'Spring': '백엔드',
    'Python': '백엔드',
    'Swift': '앱',
    'Kotlin': '앱',
    'Unity': '게임',
    'Unreal': '게임',
    'TensorFlow': 'AI',
    'PyTorch': 'AI',
    'ChatGPT': 'AI',
    'Photoshop': '비개발',
    'Illustrator': '비개발',
    'Figma': '비개발',
    'XD': '비개발',
    'Excel': '비개발',
    'Word': '비개발'
  };

  const fields = new Set();

  skills.forEach(skill => {
    const field = fieldMap[skill];
    if (field) fields.add(field);
  });

  return Array.from(fields);
}
