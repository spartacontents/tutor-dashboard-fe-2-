// ✅ src/components/Filter.jsx

import React, { useState, useEffect, useRef } from 'react'
import '../styles/Filter.css'

export default function Filter({
  selectedStacks,
  setSelectedStacks,
  selectedYears,
  setSelectedYears,
  onApply,
  onReset,
  onClose
}) {
  const [inputStack, setInputStack] = useState('')
  const panelRef = useRef(null)

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = e => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const yearOptions = [
    { label: '0~3년차', range: [0, 3] },
    { label: '4~6년차', range: [4, 6] },
    { label: '7~9년차', range: [7, 9] },
    { label: '10년차 이상', range: [10, 100] },
  ]

  const handleAddStack = () => {
    const trimmed = inputStack.trim()
    if (trimmed && !selectedStacks.includes(trimmed)) {
      setSelectedStacks([...selectedStacks, trimmed])
      setInputStack('')
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddStack()
    }
  }

  const removeStack = stack => {
    setSelectedStacks(selectedStacks.filter(s => s !== stack))
  }

  const toggleYear = option => {
    const exists = selectedYears.some(
      y => y.range[0] === option.range[0] && y.range[1] === option.range[1]
    )
    if (exists) {
      setSelectedYears(
        selectedYears.filter(
          y => !(y.range[0] === option.range[0] && y.range[1] === option.range[1])
        )
      )
    } else {
      setSelectedYears([...selectedYears, option])
    }
  }

  return (
    <div className="filter-panel" ref={panelRef}>
      {/* 기술 스택 입력 라벨 */}
      <div className="filter-stack-group">
        <label className="filter-stack-label">기술 스택</label>
        <div className="filter-stack-row">
          <input
            type="text"
            className="filter-stack-input"
            placeholder="기술 스택 입력"
            value={inputStack}
            onChange={e => setInputStack(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="filter-add-button" onClick={handleAddStack}>추가</button>
        </div>
      </div>

      {/* 선택된 스택 리스트 */}
      <div className="filter-tag-list">
        {selectedStacks.map((stack, i) => (
          <span key={i} className="filter-tag">
            {stack}
            <button className="filter-tag-remove" onClick={() => removeStack(stack)}>
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* 년차 필터 */}
      <div className="filter-year-group">
        <span className="filter-year-label">년차</span>
        {yearOptions.map(option => {
          const isActive = selectedYears.some(
            y => y.range[0] === option.range[0] && y.range[1] === option.range[1]
          )
          return (
            <button
              key={option.label}
              className={`filter-year-button ${isActive ? 'active' : ''}`}
              onClick={() => toggleYear(option)}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      {/* 하단 버튼 */}
      <div className="filter-footer-buttons">
        <button className="filter-reset-button" onClick={onReset}>초기화</button>
      </div>
    </div>
  )
}
