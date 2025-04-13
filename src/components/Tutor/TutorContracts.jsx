// src/components/Tutor/TutorContracts.jsx

import React from 'react'
import '../../styles/TutorDetailPage.css'

// 계약 목록을 테이블로 출력하는 컴포넌트
export default function TutorContracts({ contracts }) {
  // 계약이 없을 경우
  if (!contracts || contracts.length === 0) {
    return <p className="no-contract">계약 이력이 없습니다.</p>
  }

  return (
    <table className="contract-table">
      <thead>
        <tr>
          <th>활동명</th>
          <th>시작일</th>
          <th>종료일</th>
          <th>협업 팀</th>
          <th>추천도</th>
        </tr>
      </thead>
      <tbody>
        {contracts.map((contract, index) => (
          <tr key={index}>
            <td>{contract.title}</td>
            <td>{contract.startDate}</td>
            <td>{contract.endDate}</td>
            <td>{contract.team}</td>
            <td>{contract.recommendation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}