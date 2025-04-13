// src/components/Tutor/TutorDetail.jsx

import React from 'react'
import TutorContracts from './TutorContracts'
import '../../styles/TutorDetailPage.css'

export default function TutorDetail({ tutor }) {
  return (
    <div className="container">
      {/* 기본 정보 박스 */}
      <div className="info-box">
        <p><span>이름</span> {tutor.name}</p>
        <p><span>기술 스택</span> {tutor.techStack.join(', ')|| '정보 없음'}</p>
        <p><span>경력</span> {tutor.career}</p>
        <p><span>총 년차</span> {tutor.totalYears}년차</p>
        <p><span>활동 가능 시간</span> {tutor.availableTime}</p>

        {/* 교육 이력은 리스트로 표시 */}
        <div className="education-box">
          <span>교육 이력</span>
          <ul>
            {tutor.education && tutor.education.length > 0 ? (
              tutor.education.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))
            ) : (
              <li>교육 이력이 없습니다.</li>
            )}
          </ul>
        </div>
      </div>

      {/* 계약 정보 박스 */}
      <div className="section-box">
        <p className="section-title">계약 목록</p>
        <TutorContracts contracts={tutor.contracts} />
      </div>
    </div>
  )
}