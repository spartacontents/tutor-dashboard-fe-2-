import React, { useState } from 'react'
import '../styles/Filter.css'

// 필터 컴포넌트
export default function Filter({
  selectedStacks,
  setSelectedStacks,
  selectedYears,
  setSelectedYears,
  onReset
}) {
  const [inputStack, setInputStack] = useState('')

  // 기술 스택 추가
  const handleAddStack = () => {
    const trimmed = inputStack.trim()
    if (trimmed && !selectedStacks.includes(trimmed)) {
      setSelectedStacks([...selectedStacks, trimmed])
      setInputStack('')
    }
  }

  // Enter 키 입력 시 스택 추가
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddStack()
    }
  }

  // 기술 스택 삭제
  const handleRemoveStack = stack => {
    setSelectedStacks(selectedStacks.filter(s => s !== stack))
  }

  // 연차 옵션 정의
  const yearOptions = [
    { label: '0~3년차', range: [0, 3] },
    { label: '4~6년차', range: [4, 6] },
    { label: '7~9년차', range: [7, 9] },
    { label: '10년차 이상', range: [10, 100] },
  ]

  // 연차 필터 토글
  const toggleYearFilter = option => {
    const exists = selectedYears.some(y => y.label === option.label)
    if (exists) {
      setSelectedYears(selectedYears.filter(y => y.label !== option.label))
    } else {
      setSelectedYears([...selectedYears, option])
    }
  }


  return (
    <div className="filter-panel">
      {/* 기술 스택 필터 */}
      <div className="filter-stack-group">
        <label className="filter-stack-label">기술 스택</label>
        <div className="filter-stack-row">
          <input
            type="text"
            className="filter-stack-input"
            placeholder="입력 후 Enter"
            value={inputStack}
            onChange={e => setInputStack(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="filter-add-button" onClick={handleAddStack}>추가</button>
        </div>

        {/* 선택된 기술 스택 태그 */}
        <div className="filter-tag-list">
          {selectedStacks.map((stack, index) => (
            <div key={index} className="filter-tag">
              {stack}
              <button className="filter-tag-remove" onClick={() => handleRemoveStack(stack)}>×</button>
            </div>
          ))}
        </div>
      </div>

      {/* 연차 필터 */}
      <div className="filter-year-group">
        <label className="filter-year-label">연차</label>
        <div>
          {yearOptions.map((option, index) => (
            <button
              key={index}
              className={`filter-year-button ${selectedYears.some(y => y.label === option.label) ? 'active' : ''}`}
              onClick={() => toggleYearFilter(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>


      {/* 초기화 버튼 */}
      <div className="filter-footer-buttons">
        <button className="filter-reset-button" onClick={onReset}>초기화</button>
      </div>
    </div>
  )
}