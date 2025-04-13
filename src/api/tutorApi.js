// src/api/tutorApi.js

// 모킹 데이터 임포트 (또는 직접 선언)
import mockTutors from '../mock/tutors.json'; // JSON 파일로 분리해도 OK

// 튜터 전체 목록 불러오기
export async function fetchTutorList() {
  // 👉 나중에 실제 API로 교체할 부분
  // return fetch('/api/tutors').then(res => res.json());

  return Promise.resolve(mockTutors); // 모킹 데이터 반환
}

// 특정 튜터 상세 정보 (id 기반)
export async function fetchTutorById(id) {
  // 👉 나중에 실제 API로 교체할 부분
  // return fetch(`/api/tutors/${id}`).then(res => res.json());

  const tutor = mockTutors.find(t => t.id === parseInt(id));
  return Promise.resolve(tutor);
}