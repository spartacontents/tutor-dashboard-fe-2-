// src/components/Tutor/TutorModal.jsx

import React from 'react';
import '../../styles/TutorModal.css';

export default function TutorModal({ tutor, onClose }) {
  // tutor 데이터가 없으면 아무 것도 렌더링하지 않음
  if (!tutor) return null;

  // 오버레이 영역 클릭 시 모달 닫기
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        {/* 우측 상단 닫기 버튼 */}
        <button className="modal-close-button" onClick={onClose}>닫기</button>

        {/* ✅ 튜터 기본 정보 테이블 */}
        <table className="modal-info-table">
          <tbody>
            <tr>
              <th>튜터명</th>
              <td>{tutor.name}</td>
            </tr>

            <tr>
              <th>기술 스택</th>
              <td>{tutor.skills?.join(', ') || '-'}</td>
            </tr>

            {/* 경력 정보: 문자열 또는 배열 모두 처리 */}
            <tr>
              <th>경력</th>
              <td>
                {tutor.career
                  ? Array.isArray(tutor.career)
                    // 배열로 전달된 경우
                    ? tutor.career.map((c, i) => <p key={i}>{c}</p>)
                    // 문자열인 경우, \n로 분리 (없어도 1개짜리 배열로 처리)
                    : tutor.career.split('\n').map((line, i) => <p key={i}>{line}</p>)
                  : '-'}
              </td>
            </tr>

            <tr>
              <th>년차</th>
              <td>{tutor.year ? `${tutor.year}년차` : '-'}</td>
            </tr>

            <tr>
              <th>활동 가능 시간</th>
              <td>{tutor.availableTime || '-'}</td>
            </tr>

            {/* 교육 경력: 문자열 또는 배열 모두 처리 */}
            <tr>
              <th>교육 관련 경력</th>
              <td>
                {tutor.education
                  ? Array.isArray(tutor.education)
                    ? tutor.education.map((edu, i) => (
                        <div key={i}>{edu}</div>
                      ))
                    : tutor.education
                        .split('\n')
                        .map((line, i) => (
                          <div key={i}>{line}</div>
                        ))
                  : '-'}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ✅ 계약 정보 섹션 */}
        <div className="modal-contract-section">
          {/* 계약 수 표시 */}
          <p className="contract-title">
            진행 활동(계약) 검색 결과 {tutor.contracts?.length || 0}건
          </p>

          {/* 계약 데이터가 있으면 테이블 표시, 없으면 메시지 표시 */}
          {Array.isArray(tutor.contracts) && tutor.contracts.length > 0 ? (
            <table className="modal-contract-table">
              <thead>
                <tr>
                  <th>활동(계약)</th>
                  <th>시작일자</th>
                  <th>종료일자</th>
                  <th>협업 팀</th>
                  <th>추천도</th>
                </tr>
              </thead>
              <tbody>
                {tutor.contracts.map((c, i) => (
                  <tr key={i}>
                    <td>{c.title || '-'}</td>
                    <td>{c.startDate || '-'}</td>
                    <td>{c.endDate || '-'}</td>
                    <td>{c.team || '-'}</td>
                    <td>
                      {typeof c.rating === 'number' ? `⭐ ${c.rating.toFixed(1)}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // 계약이 없을 경우 메시지 출력
            <p className="no-contract-message">계약 정보가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}