'use client'

import { useState, useEffect } from 'react'

export default function NormalDistributionSimulator() {
  const [mean, setMean] = useState<number>(0)
  const [stdDev, setStdDev] = useState<number>(1)
  const [samples, setSamples] = useState<number>(1000)
  const [data, setData] = useState<number[]>([])

  // Генерация нормально распределенных чисел (Бокс-Мюллер)
  const generateNormalData = (mean: number, stdDev: number, count: number): number[] => {
    const result: number[] = []
    for (let i = 0; i < count; i++) {
      let u = 0, v = 0
      while (u === 0) u = Math.random()
      while (v === 0) v = Math.random()
      const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
      result.push(z * stdDev + mean)
    }
    return result
  }

  useEffect(() => {
    setData(generateNormalData(mean, stdDev, samples))
  }, [mean, stdDev, samples])

  const generateNewData = () => {
    setData(generateNormalData(mean, stdDev, samples))
  }

  // Вычисление гистограммы
  const computeHistogram = (data: number[], bins: number = 20) => {
    const min = Math.min(...data)
    const max = Math.max(...data)
    const binWidth = (max - min) / bins
    const histogram = new Array(bins).fill(0)

    data.forEach(value => {
      const binIndex = Math.min(bins - 1, Math.floor((value - min) / binWidth))
      histogram[binIndex]++
    })

    return { histogram, min, max, binWidth }
  }

  const { histogram, min, max, binWidth } = computeHistogram(data)
  const maxCount = Math.max(...histogram)

  // Статистика
  const calculatedMean = data.reduce((a, b) => a + b, 0) / data.length
  const variance = data.reduce((a, b) => a + Math.pow(b - calculatedMean, 2), 0) / data.length
  const calculatedStdDev = Math.sqrt(variance)

  // Подсчет данных в пределах сигм
  const withinOneSigma = data.filter(x => 
    Math.abs(x - calculatedMean) <= calculatedStdDev
  ).length

  const withinTwoSigma = data.filter(x => 
    Math.abs(x - calculatedMean) <= 2 * calculatedStdDev
  ).length

  const withinThreeSigma = data.filter(x => 
    Math.abs(x - calculatedMean) <= 3 * calculatedStdDev
  ).length

  return (
    <div>
      <div className="simulator-controls">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label>Среднее (μ): </label>
            <input
              type="number"
              value={mean}
              onChange={(e) => setMean(Number(e.target.value))}
              className="btn btn-secondary"
              style={{ width: '80px' }}
            />
          </div>
          
          <div>
            <label>Стандартное отклонение (σ): </label>
            <input
              type="number"
              value={stdDev}
              onChange={(e) => setStdDev(Math.max(0.1, Number(e.target.value)))}
              min="0.1"
              className="btn btn-secondary"
              style={{ width: '80px' }}
            />
          </div>
          
          <div>
            <label>Количество точек: </label>
            <input
              type="number"
              value={samples}
              onChange={(e) => setSamples(Math.max(100, Number(e.target.value)))}
              min="100"
              className="btn btn-secondary"
              style={{ width: '100px' }}
            />
          </div>
          
          <button className="btn btn-primary" onClick={generateNewData}>
            Сгенерировать данные
          </button>
        </div>
      </div>

      {/* Гистограмма */}
      <div className="statistics-section">
        <h3>Гистограмма распределения</h3>
        <div style={{ 
          height: '300px', 
          display: 'flex', 
          alignItems: 'end', 
          gap: '2px', 
          padding: '1rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          {histogram.map((count, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              flex: 1 
            }}>
              <div
                style={{
                  height: `${(count / maxCount) * 250}px`,
                  width: '90%',
                  background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                  borderRadius: '4px 4px 0 0'
                }}
                title={`${count} точек`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Статистика */}
      <div className="statistics-section">
        <h3>Статистика данных</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{calculatedMean.toFixed(2)}</div>
            <div className="stat-label">Выборочное среднее</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{calculatedStdDev.toFixed(2)}</div>
            <div className="stat-label">Выборочное σ</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{min.toFixed(2)}</div>
            <div className="stat-label">Минимум</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{max.toFixed(2)}</div>
            <div className="stat-label">Максимум</div>
          </div>
        </div>
      </div>

      {/* Правило 3-х сигм */}
      <div className="statistics-section">
        <h3>Проверка правила 68-95-99.7</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{(withinOneSigma / samples * 100).toFixed(1)}%</div>
            <div className="stat-label">В пределах 1σ (ожидается 68%)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{(withinTwoSigma / samples * 100).toFixed(1)}%</div>
            <div className="stat-label">В пределах 2σ (ожидается 95%)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{(withinThreeSigma / samples * 100).toFixed(1)}%</div>
            <div className="stat-label">В пределах 3σ (ожидается 99.7%)</div>
          </div>
        </div>
      </div>
    </div>
  )
}