import React, { useEffect, useState } from 'react';
import TutorList from '../components/Tutor/TutorList';
import Filter from '../components/Filter';
import { fetchTutorList } from '../api/tutorApi';
import TutorModal from '../components/Tutor/TutorModal'; // 상단 import 추가
import '../styles/TutorListPage.css';

export default function TutorListPage() {
  // 전체 튜터 데이터
  const [tutors, setTutors] = useState([]);

  // 검색창 입력값 (실시간)
  const [searchInput, setSearchInput] = useState('');

  // 실제 검색 필터에 적용되는 값
  const [searchTerm, setSearchTerm] = useState('');

  // 필터 상태
  const [stackFilter, setStackFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState([]);
  const [duplicateCount, setDuplicateCount] = useState(0);

  // 필터링된 튜터 목록
  const [filteredTutors, setFilteredTutors] = useState([]);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 10;

  // 튜터 정보 모달
  const [selectedTutor, setSelectedTutor] = useState(null);

  // 튜터 데이터 불러오기
  useEffect(() => {
    fetchTutorList().then(data => setTutors(data));
  }, []);

  // 필터링 처리
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    // 검색어 매칭
    const filtered = tutors.filter(tutor => {
      const matchesSearch =
        !lowerSearch ||
        tutor.name.toLowerCase().includes(lowerSearch) ||
        tutor.skills.some(skill => skill.toLowerCase().includes(lowerSearch));
    // 기술 스택 필터
      const matchesStack =
        stackFilter.length === 0 ||
        stackFilter.every(f => tutor.skills.map(s => s.toLowerCase()).includes(f.toLowerCase()));
    // 연차 필터
      const matchesYear =
        yearFilter.length === 0 ||
        yearFilter.some(y => tutor.year >= y.range[0] && tutor.year <= y.range[1]);

      return matchesSearch && matchesStack && matchesYear;
    });

    setFilteredTutors(filtered);
    setCurrentPage(1); // 필터 변경 시 페이지 초기화


    // 동명이인 메시지 확인
    if (searchTerm.trim() !== '') {
      const matchName = tutors.filter(
        tutor => tutor.name.toLowerCase() === searchTerm.toLowerCase()
      );
      setDuplicateCount(matchName.length > 1 ? matchName.length : 0);
    } else {
      setDuplicateCount(0);
    }
  }, [searchTerm, tutors, stackFilter, yearFilter]);

  // 현재 페이지 튜터 목록
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = filteredTutors.slice(indexOfFirstTutor, indexOfLastTutor);

  // 페이지 수 계산
  const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);

  // 페이지 이동 핸들러
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // 검색 입력 처리
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === '') {
      setSearchTerm('');
    }
  };

  // 검색 버튼 또는 엔터 처리
  const handleSearchSubmit = () => {
    setSearchTerm(searchInput.trim());
  };


  // 필터 초기화
  const handleFilterReset = () => {
    setStackFilter([]);
    setYearFilter([]);
  };

  return (
    <div className="tutor-list-page">
      {/* 페이지 제목 */}
      <h2 className="page-title">튜터 목록</h2>

      {/* 검색창 및 필터버튼 */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="이름 또는 기술 스택 검색"
          value={searchInput}
          onChange={handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
        />
        <button className="search-button" onClick={handleSearchSubmit}>
          검색
        </button>

        {selectedTutor && (
          <TutorModal
            tutor={selectedTutor}
            onClose={() => setSelectedTutor(null)}
          />
        )}

      </div>

      {duplicateCount > 1 && (
        <p className="duplicate-message">
          "{searchTerm}"님이 {duplicateCount}명 검색되었습니다.
        </p>
      )}

      {/* 필터 패널 */}
        <Filter
          selectedStacks={stackFilter}
          setSelectedStacks={setStackFilter}
          selectedYears={yearFilter}
          setSelectedYears={setYearFilter}
          onReset={handleFilterReset}
        />

      {/* 튜터 리스트 */}
      <TutorList 
        tutors={currentTutors}
        onTutorClick={(tutor) => setSelectedTutor(tutor)}
      /> 

      {/* 페이지 네비게이션 */}
      <div className="pagination">
        <button className="page-btn" onClick={goToPreviousPage}>이전</button>
        <span className="current-page">{currentPage} / {totalPages}</span>
        <button className="page-btn" onClick={goToNextPage}>다음</button>
      </div>
    </div>
  );
}