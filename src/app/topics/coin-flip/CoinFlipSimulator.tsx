'use client'

import { useState, useEffect } from 'react'

type CoinResult = 'heads' | 'tails'

interface Statistics {
  total: number
  heads: number
  tails: number
  headsProbability: number
  tailsProbability: number
}

export default function CoinFlipSimulator() {
  const [result, setResult] = useState<CoinResult>('heads')
  const [isFlipping, setIsFlipping] = useState(false)
  const [statistics, setStatistics] = useState<Statistics>({
    total: 0,
    heads: 0,
    tails: 0,
    headsProbability: 0,
    tailsProbability: 0
  })

  const flipCoin = () => {
    if (isFlipping) return
    
    setIsFlipping(true)
    
    // Анимация длится 600ms
    setTimeout(() => {
      const random = Math.random()
      const newResult: CoinResult = random < 0.5 ? 'heads' : 'tails'
      
      setResult(newResult)
      setIsFlipping(false)
      
      // Обновляем статистику
      setStatistics(prev => {
        const newHeads = newResult === 'heads' ? prev.heads + 1 : prev.heads
        const newTails = newResult === 'tails' ? prev.tails + 1 : prev.tails
        const newTotal = prev.total + 1
        
        return {
          total: newTotal,
          heads: newHeads,
          tails: newTails,
          headsProbability: newHeads / newTotal,
          tailsProbability: newTails / newTotal
        }
      })
    }, 600)
  }

  const flipMultiple = (count: number) => {
    let headsCount = 0
    let tailsCount = 0
    
    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.5) {
        headsCount++
      } else {
        tailsCount++
      }
    }
    
    setStatistics(prev => {
      const newTotal = prev.total + count
      const newHeads = prev.heads + headsCount
      const newTails = prev.tails + tailsCount
      
      return {
        total: newTotal,
        heads: newHeads,
        tails: newTails,
        headsProbability: newHeads / newTotal,
        tailsProbability: newTails / newTotal
      }
    })
  }

  const resetStatistics = () => {
    setStatistics({
      total: 0,
      heads: 0,
      tails: 0,
      headsProbability: 0,
      tailsProbability: 0
    })
  }

  return (
    <div>
      <div className="simulator-controls">
        <button 
          className="btn btn-primary" 
          onClick={flipCoin}
          disabled={isFlipping}
        >
          {isFlipping ? 'Монета летит...' : 'Бросить монету'}
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={() => flipMultiple(10)}
          disabled={isFlipping}
        >
          Бросить 10 раз
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={() => flipMultiple(100)}
          disabled={isFlipping}
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

      <div className="coin-container">
        <div className={`coin ${isFlipping ? 'flipping' : ''}`}>
          {result === 'heads' ? 'ОРЁЛ' : 'РЕШКА'}
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
            <div className="stat-value">{statistics.heads}</div>
            <div className="stat-label">Орлов</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{statistics.tails}</div>
            <div className="stat-label">Решек</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {(statistics.headsProbability * 100).toFixed(1)}%
            </div>
            <div className="stat-label">Вероятность орла</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {(statistics.tailsProbability * 100).toFixed(1)}%
            </div>
            <div className="stat-label">Вероятность решки</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {Math.abs(statistics.headsProbability - 0.5).toFixed(3)}
            </div>
            <div className="stat-label">Отклонение от 0.5</div>
          </div>
        </div>
      </div>
    </div>
  )
}