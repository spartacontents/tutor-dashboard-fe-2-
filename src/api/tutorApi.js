
// 모킹 데이터 임포트 (또는 직접 선언)
//import mockTutors from '../mock/tutors.json';

// 튜터 전체 목록 불러오기
export async function fetchTutorList() {
  //👉 Mockoon 서버의 엔드포인트 호출
    return fetch('http://localhost:5555/newTest')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch tutor list');
      return res.json();
    });
}

// 특정 튜터 상세 정보 (id 기반)
export async function fetchTutorById(id) {
  // 실제 API 호출이 필요하다면 여기도 수정 가능
  // 예: return fetch(`http://localhost:5555/tutors/${id}`)...

  // 일단은 전체 리스트 불러와서 필터링
  const list = await fetchTutorList();
  const tutor = list.find(t => t.id === parseInt(id));
  return tutor;
}