'use client'

import { useState, useEffect } from 'react'

type ProblemType = 'permutations' | 'combinations' | 'arrangements' | 'binomial'

export default function ProbabilityCombinationsSimulator() {
  const [problemType, setProblemType] = useState<ProblemType>('combinations')
  const [n, setN] = useState<number>(5)
  const [k, setK] = useState<number>(2)
  const [result, setResult] = useState<number>(0)
  const [explanation, setExplanation] = useState<string>('')

  // Функция для вычисления факториала
  const factorial = (num: number): number => {
    if (num <= 1) return 1
    return num * factorial(num - 1)
  }

  // Функция для вычисления числа сочетаний
  const combinations = (n: number, k: number): number => {
    if (k < 0 || k > n) return 0
    return factorial(n) / (factorial(k) * factorial(n - k))
  }

  // Функция для вычисления числа размещений
  const arrangements = (n: number, k: number): number => {
    if (k < 0 || k > n) return 0
    return factorial(n) / factorial(n - k)
  }

  // Обновление计算结果 при изменении параметров
  useEffect(() => {
    let calculation = 0
    let explanationText = ''

    switch (problemType) {
      case 'permutations':
        calculation = factorial(n)
        explanationText = `P(${n}) = ${n}! = ${calculation}`
        break

      case 'combinations':
        calculation = combinations(n, k)
        explanationText = `C(${n},${k}) = ${n}! / (${k}! × ${n-k}!) = ${calculation}`
        break

      case 'arrangements':
        calculation = arrangements(n, k)
        explanationText = `A(${n},${k}) = ${n}! / ${n-k}! = ${calculation}`
        break

      case 'binomial':
        // Вероятность ровно k успехов в n испытаниях Бернулли с p=0.5
        const p = 0.5
        calculation = combinations(n, k) * Math.pow(p, k) * Math.pow(1-p, n-k)
        explanationText = `P(X=${k}) = C(${n},${k}) × ${p}^${k} × ${1-p}^${n-k} = ${calculation.toFixed(4)}`
        break
    }

    setResult(calculation)
    setExplanation(explanationText)
  }, [problemType, n, k])

  // Генерация примеров задач
  const generateExamples = () => {
    const examples = {
      permutations: [
        "Сколькими способами можно расставить 5 книг на полке?",
        "Сколько различных слов можно составить из букв слова 'МАТЕМАТИКА'?",
        "Сколькими способами 8 человек могут встать в очередь?"
      ],
      combinations: [
        "Сколькими способами можно выбрать 2 книги из 5?",
        "Сколько существует способов выбрать комитет из 3 человек из 10?",
        "Сколькими способами можно выбрать 4 карты из колоды в 36 карт?"
      ],
      arrangements: [
        "Сколькими способами можно выбрать 1-е, 2-е и 3-е места из 5 участников?",
        "Сколько различных кодов из 4 цифр можно составить из 6 цифр?",
        "Сколькими способами можно распределить 3 приза между 7 участниками?"
      ],
      binomial: [
        "Какова вероятность выпадения ровно 2 орлов при 5 бросках монеты?",
        "Какова вероятность ровно 3 успехов в 10 испытаниях Бернулли?",
        "Какова вероятность ровно 4 попаданий при 6 выстрелах?"
      ]
    }

    return examples[problemType]
  }

  const examples = generateExamples()

  return (
    <div>
      <div className="simulator-controls">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label>Тип задачи: </label>
            <select 
              value={problemType} 
              onChange={(e) => setProblemType(e.target.value as ProblemType)}
              className="btn btn-secondary"
            >
              <option value="permutations">Перестановки</option>
              <option value="combinations">Сочетания</option>
              <option value="arrangements">Размещения</option>
              <option value="binomial">Биномиальная вероятность</option>
            </select>
          </div>
          
          <div>
            <label>n = </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(Math.max(0, Number(e.target.value)))}
              min="0"
              max="20"
              className="btn btn-secondary"
              style={{ width: '80px' }}
            />
          </div>
          
          {(problemType === 'combinations' || problemType === 'arrangements' || problemType === 'binomial') && (
            <div>
              <label>k = </label>
              <input
                type="number"
                value={k}
                onChange={(e) => setK(Math.max(0, Math.min(n, Number(e.target.value))))}
                min="0"
                max={n}
                className="btn btn-secondary"
                style={{ width: '80px' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Результат */}
      <div className="statistics-section">
        <h3>Результат</h3>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '1rem' }}>
            {typeof result === 'number' && result > 1000000 
              ? result.toExponential(4) 
              : Number.isInteger(result) ? result : result.toFixed(4)}
          </div>
          <div style={{ fontSize: '1.2rem', color: '#6b7280' }}>
            {explanation}
          </div>
        </div>
      </div>

      {/* Примеры задач */}
      <div className="statistics-section">
        <h3>Примеры задач</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {examples.map((example, index) => (
            <div 
              key={index}
              style={{
                padding: '1rem',
                background: '#f8fafc',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              onClick={() => {
                // Автоподстановка параметров для примера
                if (problemType === 'permutations') {
                  setN(5 + index)
                } else {
                  setN(5 + index)
                  setK(2 + index)
                }
              }}
            >
              {example}
            </div>
          ))}
        </div>
      </div>

      {/* Треугольник Паскаля (для сочетаний) */}
      {(problemType === 'combinations' || problemType === 'binomial') && (
        <div className="statistics-section">
          <h3>Треугольник Паскаля (первые 7 строк)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            {[0, 1, 2, 3, 4, 5, 6].map(row => (
              <div key={row} style={{ display: 'flex', gap: '1rem' }}>
                {Array.from({ length: row + 1 }, (_, col) => {
                  const value = combinations(row, col)
                  const isCurrent = row === n && col === k
                  return (
                    <div
                      key={col}
                      style={{
                        padding: '0.5rem',
                        background: isCurrent ? '#3b82f6' : '#f8fafc',
                        color: isCurrent ? 'white' : '#1f2937',
                        border: `1px solid ${isCurrent ? '#3b82f6' : '#e5e7eb'}`,
                        borderRadius: '4px',
                        minWidth: '40px',
                        textAlign: 'center',
                        fontWeight: isCurrent ? 'bold' : 'normal'
                      }}
                    >
                      {value}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          {n <= 6 && (
            <div style={{ textAlign: 'center', marginTop: '1rem', color: '#6b7280' }}>
              C({n},{k}) = {result} (выделено синим)
            </div>
          )}
        </div>
      )}
    </div>
  )
}