'use client'

import { useState, useEffect } from 'react'

interface Statistics {
  total: number
  counts: number[]
  probabilities: number[]
  average: number
}

export default function DiceRollSimulator() {
  const [result, setResult] = useState<number>(1)
  const [isRolling, setIsRolling] = useState(false)
  const [statistics, setStatistics] = useState<Statistics>({
    total: 0,
    counts: [0, 0, 0, 0, 0, 0],
    probabilities: [0, 0, 0, 0, 0, 0],
    average: 0
  })

  const rollDice = () => {
    if (isRolling) return
    
    setIsRolling(true)
    
    // Анимация длится 600ms
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * 6) + 1
      
      setResult(newResult)
      setIsRolling(false)
      
      // Обновляем статистику
      setStatistics(prev => {
        const newCounts = [...prev.counts]
        newCounts[newResult - 1] += 1
        const newTotal = prev.total + 1
        const newProbabilities = newCounts.map(count => count / newTotal)
        const newAverage = newCounts.reduce((sum, count, index) => 
          sum + (index + 1) * count, 0) / newTotal
        
        return {
          total: newTotal,
          counts: newCounts,
          probabilities: newProbabilities,
          average: newAverage
        }
      })
    }, 600)
  }

  const rollMultiple = (count: number) => {
    const newCounts = [...statistics.counts]
    let sum = 0
    
    for (let i = 0; i < count; i++) {
      const roll = Math.floor(Math.random() * 6) + 1
      newCounts[roll - 1] += 1
      sum += roll
    }
    
    setStatistics(prev => {
      const newTotal = prev.total + count
      const newProbabilities = newCounts.map(count => count / newTotal)
      const newAverage = (prev.average * prev.total + sum) / newTotal
      
      return {
        total: newTotal,
        counts: newCounts,
        probabilities: newProbabilities,
        average: newAverage
      }
    })
  }

  const resetStatistics = () => {
    setStatistics({
      total: 0,
      counts: [0, 0, 0, 0, 0, 0],
      probabilities: [0, 0, 0, 0, 0, 0],
      average: 0
    })
  }

  return (
    <div>
      <div className="simulator-controls">
        <button 
          className="btn btn-primary" 
          onClick={rollDice}
          disabled={isRolling}
        >
          {isRolling ? 'Кубик крутится...' : 'Бросить кубик'}
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={() => rollMultiple(10)}
          disabled={isRolling}
        >
          Бросить 10 раз
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={() => rollMultiple(100)}
          disabled={isRolling}
        >
          Бросить 100 раз
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={resetStatistics}
        >
          Сбросить статистику
        </button>
      </div>

      <div className="dice-container">
        <div className={`dice ${isRolling ? 'rolling' : ''}`}>
          {result}
        </div>
      </div>

      <div className="statistics-section">
        <h3>Статистика экспериментов</h3>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{statistics.total}</div>
            <div className="stat-label">Всего бросков</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{statistics.average.toFixed(2)}</div>
            <div className="stat-label">Среднее значение</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">3.50</div>
            <div className="stat-label">Теоретическое среднее</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {Math.abs(statistics.average - 3.5).toFixed(3)}
            </div>
            <div className="stat-label">Отклонение</div>
          </div>
        </div>

        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Распределение по граням:</h4>
        <div className="stats-grid">
          {[1, 2, 3, 4, 5, 6].map((number, index) => (
            <div key={number} className="stat-card">
              <div className="stat-value">{number}</div>
              <div className="stat-label">
                {statistics.counts[index]} раз
                <br />
                ({(statistics.probabilities[index] * 100).toFixed(1)}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}