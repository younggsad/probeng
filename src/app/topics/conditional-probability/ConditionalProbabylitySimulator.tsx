'use client'

import { useState } from 'react'

type ScenarioType = 'medical' | 'quality' | 'cards'

interface ScenarioConfig {
  name: string
  description: string
  pDisease?: number
  pPositiveGivenDisease?: number
  pPositiveGivenNoDisease?: number
  pDefect?: number
  pDetectGivenDefect?: number
  pDetectGivenNoDefect?: number
  pFirstRed?: number
  pSecondRedGivenFirstRed?: number
  pSecondRedGivenFirstBlack?: number
}

export default function ConditionalProbabilitySimulator() {
  const [scenario, setScenario] = useState<ScenarioType>('medical')
  const [trials, setTrials] = useState(1000)
  const [results, setResults] = useState<any>(null)

  const scenarios: Record<ScenarioType, ScenarioConfig> = {
    medical: {
      name: "Медицинский тест",
      description: "Вероятность болезни и точность теста",
      pDisease: 0.01,
      pPositiveGivenDisease: 0.99,
      pPositiveGivenNoDisease: 0.05
    },
    quality: {
      name: "Контроль качества",
      description: "Вероятность дефекта и работа контролёра", 
      pDefect: 0.02,
      pDetectGivenDefect: 0.95,
      pDetectGivenNoDefect: 0.01
    },
    cards: {
      name: "Игральные карты",
      description: "Вероятности в колоде карт",
      pFirstRed: 26/52,
      pSecondRedGivenFirstRed: 25/51,
      pSecondRedGivenFirstBlack: 26/51
    }
  }

  const runSimulation = () => {
    const config = scenarios[scenario]
    let countA = 0
    let countB = 0
    let countAB = 0

    for (let i = 0; i < trials; i++) {
      let eventA, eventB

      if (scenario === 'medical') {
        eventA = Math.random() < config.pDisease!
        eventB = eventA ? 
          (Math.random() < config.pPositiveGivenDisease!) : 
          (Math.random() < config.pPositiveGivenNoDisease!)
      } else if (scenario === 'quality') {
        eventA = Math.random() < config.pDefect!
        eventB = eventA ?
          (Math.random() < config.pDetectGivenDefect!) :
          (Math.random() < config.pDetectGivenNoDefect!)
      } else {
        eventA = Math.random() < config.pFirstRed!
        eventB = eventA ?
          (Math.random() < config.pSecondRedGivenFirstRed!) :
          (Math.random() < config.pSecondRedGivenFirstBlack!)
      }

      if (eventA) countA++
      if (eventB) countB++ 
      if (eventA && eventB) countAB++
    }

    const pA = countA / trials
    const pB = countB / trials
    const pAB = countAB / trials
    const pAgivenB = countAB / countB

    setResults({ pA, pB, pAB, pAgivenB, countA, countB, countAB })
  }

  return (
    <div>
      <div className="simulator-controls">
        <select 
          value={scenario} 
          onChange={(e) => setScenario(e.target.value as ScenarioType)}
          className="btn btn-secondary"
        >
          <option value="medical">Медицинский тест</option>
          <option value="quality">Контроль качества</option>
          <option value="cards">Игральные карты</option>
        </select>

        <input
          type="number"
          value={trials}
          onChange={(e) => setTrials(Number(e.target.value))}
          min="100"
          max="10000"
          className="btn btn-secondary"
          style={{ width: '120px' }}
        />

        <button className="btn btn-primary" onClick={runSimulation}>
          Запустить симуляцию
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Сценарий: {scenarios[scenario].name}</h4>
        <p>{scenarios[scenario].description}</p>
      </div>

      {results && (
        <div className="statistics-section">
          <h3>Результаты симуляции</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{(results.pA * 100).toFixed(1)}%</div>
              <div className="stat-label">P(A)</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{(results.pB * 100).toFixed(1)}%</div>
              <div className="stat-label">P(B)</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{(results.pAB * 100).toFixed(1)}%</div>
              <div className="stat-label">P(A ∩ B)</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{(results.pAgivenB * 100).toFixed(1)}%</div>
              <div className="stat-label">P(A|B)</div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
            <p>Формула проверки: P(A|B) = P(A ∩ B) / P(B) = {(results.pAB / results.pB).toFixed(3)}</p>
          </div>
        </div>
      )}
    </div>
  )
}