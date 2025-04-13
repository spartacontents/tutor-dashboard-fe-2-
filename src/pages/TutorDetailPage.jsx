// src/pages/TutorDetailPage.jsx

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTutorById } from '../api/tutorApi'
import TutorDetail from '../components/Tutor/TutorDetail'
import '../styles/TutorDetailPage.css'

export default function TutorDetailPage() {
  // URL에서 id 가져오기
  const { id } = useParams()
  const [tutor, setTutor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 튜터 정보 불러오기
  useEffect(() => {
    fetchTutorById(Number(id))
      .then(data => {
        if (!data) {
          throw new Error('튜터를 찾을 수 없습니다.')
        }

        // 백엔드 응답을 프론트에 맞게 가공
        const formattedTutor = {
          name: data.name,
          skills: data.skills,
          career: data.career,
          year: Number(data.year),
          availableTime: data.availableTime,
          education: data.education,
          contracts: data.contracts
        }

        setTutor(formattedTutor)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || '에러가 발생했습니다.')
        setLoading(false)
      })
  }, [id])

  // 로딩 중
  if (loading) return <p className="status">로딩 중...</p>
  // 에러
  if (error) return <p className="status error">{error}</p>
  // 데이터 없는 경우
  if (!tutor) return null

  return (
    <div className="detail-page">
      <TutorDetail tutor={tutor} />
    </div>
  )
}