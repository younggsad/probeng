'use client'

import { useState, useEffect } from 'react'

type DistributionType = 'uniform' | 'exponential' | 'binomial' | 'custom'

export default function CentralLimitTheoremSimulator() {
  const [distribution, setDistribution] = useState<DistributionType>('uniform')
  const [sampleSize, setSampleSize] = useState<number>(5)
  const [numSamples, setNumSamples] = useState<number>(1000)
  const [populationData, setPopulationData] = useState<number[]>([])
  const [sampleMeans, setSampleMeans] = useState<number[]>([])

  // Генерация данных популяции
  const generatePopulationData = (type: DistributionType, size: number = 10000): number[] => {
    const data: number[] = []
    
    switch (type) {
      case 'uniform':
        for (let i = 0; i < size; i++) {
          data.push(Math.random() * 100) // Равномерное от 0 до 100
        }
        break
        
      case 'exponential':
        for (let i = 0; i < size; i++) {
          data.push(-Math.log(1 - Math.random()) * 20) // Экспоненциальное с λ=0.05
        }
        break
        
      case 'binomial':
        for (let i = 0; i < size; i++) {
          let successes = 0
          for (let j = 0; j < 10; j++) {
            if (Math.random() < 0.3) successes++
          }
          data.push(successes)
        }
        break
        
      case 'custom':
        // Бимодальное распределение
        for (let i = 0; i < size; i++) {
          if (Math.random() < 0.5) {
            data.push(30 + Math.random() * 20) // Мода вокруг 40
          } else {
            data.push(70 + Math.random() * 20) // Мода вокруг 80
          }
        }
        break
    }
    
    return data
  }

  // Генерация выборочных средних
  const generateSampleMeans = () => {
    const means: number[] = []
    
    for (let i = 0; i < numSamples; i++) {
      // Выбираем случайную выборку
      const sample: number[] = []
      for (let j = 0; j < sampleSize; j++) {
        const randomIndex = Math.floor(Math.random() * populationData.length)
        sample.push(populationData[randomIndex])
      }
      
      // Вычисляем среднее
      const mean = sample.reduce((sum, value) => sum + value, 0) / sampleSize
      means.push(mean)
    }
    
    setSampleMeans(means)
  }

  useEffect(() => {
    const newPopulationData = generatePopulationData(distribution)
    setPopulationData(newPopulationData)
  }, [distribution])

  useEffect(() => {
    if (populationData.length > 0) {
      generateSampleMeans()
    }
  }, [populationData, sampleSize, numSamples])

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

  const populationHistogram = computeHistogram(populationData)
  const meansHistogram = computeHistogram(sampleMeans)

  const maxPopulationCount = Math.max(...populationHistogram.histogram)
  const maxMeansCount = Math.max(...meansHistogram.histogram)

  // Статистика
  const populationMean = populationData.reduce((a, b) => a + b, 0) / populationData.length
  const populationVariance = populationData.reduce((a, b) => a + Math.pow(b - populationMean, 2), 0) / populationData.length
  const populationStdDev = Math.sqrt(populationVariance)

  const sampleMean = sampleMeans.reduce((a, b) => a + b, 0) / sampleMeans.length
  const sampleVariance = sampleMeans.reduce((a, b) => a + Math.pow(b - sampleMean, 2), 0) / sampleMeans.length
  const sampleStdDev = Math.sqrt(sampleVariance)

  const theoreticalStdError = populationStdDev / Math.sqrt(sampleSize)

  return (
    <div>
      <div className="simulator-controls">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label>Распределение: </label>
            <select 
              value={distribution} 
              onChange={(e) => setDistribution(e.target.value as DistributionType)}
              className="btn btn-secondary"
            >
              <option value="uniform">Равномерное</option>
              <option value="exponential">Экспоненциальное</option>
              <option value="binomial">Биномиальное</option>
              <option value="custom">Бимодальное</option>
            </select>
          </div>
          
          <div>
            <label>Размер выборки (n): </label>
            <input
              type="number"
              value={sampleSize}
              onChange={(e) => setSampleSize(Math.max(1, Number(e.target.value)))}
              min="1"
              max="100"
              className="btn btn-secondary"
              style={{ width: '80px' }}
            />
          </div>
          
          <div>
            <label>Количество выборок: </label>
            <input
              type="number"
              value={numSamples}
              onChange={(e) => setNumSamples(Math.max(100, Number(e.target.value)))}
              min="100"
              max="10000"
              className="btn btn-secondary"
              style={{ width: '100px' }}
            />
          </div>
          
          <button className="btn btn-primary" onClick={generateSampleMeans}>
            Обновить
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Распределение популяции */}
        <div className="statistics-section">
          <h3>Распределение популяции</h3>
          <div style={{ 
            height: '200px', 
            display: 'flex', 
            alignItems: 'end', 
            gap: '2px', 
            padding: '1rem',
            borderBottom: '1px solid #e5e7eb'
          }}>
            {populationHistogram.histogram.map((count, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1 
              }}>
                <div
                  style={{
                    height: `${(count / maxPopulationCount) * 150}px`,
                    width: '90%',
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    borderRadius: '4px 4px 0 0'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Распределение выборочных средних */}
        <div className="statistics-section">
          <h3>Распределение выборочных средних</h3>
          <div style={{ 
            height: '200px', 
            display: 'flex', 
            alignItems: 'end', 
            gap: '2px', 
            padding: '1rem',
            borderBottom: '1px solid #e5e7eb'
          }}>
            {meansHistogram.histogram.map((count, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1 
              }}>
                <div
                  style={{
                    height: `${(count / maxMeansCount) * 150}px`,
                    width: '90%',
                    background: 'linear-gradient(135deg, #ec4899, #db2777)',
                    borderRadius: '4px 4px 0 0'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="statistics-section">
        <h3>Статистика ЦПТ</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{populationMean.toFixed(2)}</div>
            <div className="stat-label">Среднее популяции (μ)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{populationStdDev.toFixed(2)}</div>
            <div className="stat-label">Ст. отклонение популяции (σ)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{sampleMean.toFixed(2)}</div>
            <div className="stat-label">Среднее выборочных средних</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{sampleStdDev.toFixed(2)}</div>
            <div className="stat-label">Ст. отклонение выборочных средних</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{theoreticalStdError.toFixed(2)}</div>
            <div className="stat-label">Теоретическая ст. ошибка (σ/√n)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{sampleSize}</div>
            <div className="stat-label">Размер выборки (n)</div>
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#f0f9ff', 
        padding: '1rem', 
        borderRadius: '8px', 
        border: '1px solid #bae6fd',
        marginTop: '1rem'
      }}>
        <h4>Наблюдение ЦПТ:</h4>
        <p>
          При увеличении размера выборки (n) распределение выборочных средних становится более нормальным, 
          а стандартное отклонение уменьшается согласно формуле σ/√n.
        </p>
      </div>
    </div>
  )
}