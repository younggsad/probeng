'use client'

import { useState, useEffect } from 'react'

interface BinomialData {
  k: number
  probability: number
  count: number
}

export default function BinomialDistributionSimulator() {
  const [n, setN] = useState<number>(10)
  const [p, setP] = useState<number>(0.5)
  const [trials, setTrials] = useState<number>(1000)
  const [data, setData] = useState<BinomialData[]>([])
  const [experimentalData, setExperimentalData] = useState<number[]>([])

  // Вычисление теоретического биномиального распределения
  const calculateBinomial = (n: number, p: number): BinomialData[] => {
    const results: BinomialData[] = []
    
    for (let k = 0; k <= n; k++) {
      // Вычисление C(n,k)
      const combination = factorial(n) / (factorial(k) * factorial(n - k))
      // Формула Бернулли
      const probability = combination * Math.pow(p, k) * Math.pow(1 - p, n - k)
      
      results.push({
        k,
        probability,
        count: probability * trials
      })
    }
    
    return results
  }

  const factorial = (num: number): number => {
    if (num <= 1) return 1
    return num * factorial(num - 1)
  }

  // Экспериментальное моделирование
  const runExperiment = () => {
    const experimentalCounts = new Array(n + 1).fill(0)
    
    for (let i = 0; i < trials; i++) {
      let successes = 0
      for (let j = 0; j < n; j++) {
        if (Math.random() < p) {
          successes++
        }
      }
      experimentalCounts[successes]++
    }
    
    setExperimentalData(experimentalCounts)
  }

  useEffect(() => {
    setData(calculateBinomial(n, p))
    runExperiment()
  }, [n, p, trials])

  const maxProbability = Math.max(...data.map(d => d.probability))
  const maxExperimental = Math.max(...experimentalData) / trials

  return (
    <div>
      <div className="simulator-controls">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label>Число испытаний (n): </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(Math.max(1, Math.min(50, Number(e.target.value))))}
              min="1"
              max="50"
              className="btn btn-secondary"
              style={{ width: '80px' }}
            />
          </div>
          
          <div>
            <label>Вероятность успеха (p): </label>
            <input
              type="number"
              value={p}
              onChange={(e) => setP(Math.max(0, Math.min(1, Number(e.target.value))))}
              min="0"
              max="1"
              step="0.1"
              className="btn btn-secondary"
              style={{ width: '100px' }}
            />
          </div>
          
          <div>
            <label>Количество симуляций: </label>
            <input
              type="number"
              value={trials}
              onChange={(e) => setTrials(Math.max(100, Math.min(100000, Number(e.target.value))))}
              min="100"
              max="100000"
              className="btn btn-secondary"
              style={{ width: '120px' }}
            />
          </div>
          
          <button className="btn btn-primary" onClick={runExperiment}>
            Запустить эксперимент
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Теоретическое распределение */}
        <div className="statistics-section">
          <h3>Теоретическое распределение</h3>
          <div style={{ height: '300px', display: 'flex', alignItems: 'end', gap: '4px', padding: '1rem' }}>
            {data.map((item, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1 
              }}>
                <div
                  style={{
                    height: `${(item.probability / maxProbability) * 200}px`,
                    width: '80%',
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    borderRadius: '4px 4px 0 0'
                  }}
                />
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{item.k}</div>
                <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                  {(item.probability * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Экспериментальное распределение */}
        <div className="statistics-section">
          <h3>Экспериментальные результаты</h3>
          <div style={{ height: '300px', display: 'flex', alignItems: 'end', gap: '4px', padding: '1rem' }}>
            {experimentalData.map((count, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1 
              }}>
                <div
                  style={{
                    height: `${((count / trials) / maxExperimental) * 200}px`,
                    width: '80%',
                    background: 'linear-gradient(135deg, #ec4899, #db2777)',
                    borderRadius: '4px 4px 0 0'
                  }}
                />
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{index}</div>
                <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="statistics-section">
        <h3>Статистика</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{n}</div>
            <div className="stat-label">Число испытаний (n)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{p.toFixed(2)}</div>
            <div className="stat-label">Вероятность успеха (p)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{(n * p).toFixed(2)}</div>
            <div className="stat-label">Математическое ожидание</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{(n * p * (1 - p)).toFixed(2)}</div>
            <div className="stat-label">Дисперсия</div>
          </div>
        </div>
      </div>
    </div>
  )
}