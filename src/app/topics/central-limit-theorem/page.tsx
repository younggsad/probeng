import CentralLimitTheoremSimulator from '@/app/topics/central-limit-theorem/CentralLimitTheoremSimulator'

export default function CentralLimitTheoremPage() {
  return (
    <div className="container">
      <div className="topic-page">
        <section className="theory-section">
          <h1>Центральная предельная теорема</h1>
          
          <div className="description">
            <p>
              Центральная предельная теорема утверждает, что распределение выборочного среднего 
              стремится к нормальному распределению при увеличении объема выборки, независимо от 
              формы исходного распределения.
            </p>
          </div>

          <div className="formulas">
            <div className="formula-card">
              <h3>Формулировка ЦПТ</h3>
              <div className="formula-latex">
                √n × (X̄ - μ) / σ → N(0,1)
              </div>
              <p>Стандартизованное выборочное среднее сходится к стандартному нормальному распределению</p>
            </div>

            <div className="formula-card">
              <h3>Распределение выборочного среднего</h3>
              <div className="formula-latex">
                X̄ ~ N(μ, σ²/n)
              </div>
              <p>Выборочное среднее имеет нормальное распределение с дисперсией σ²/n</p>
            </div>

            <div className="formula-card">
              <h3>Z-статистика</h3>
              <div className="formula-latex">
                Z = (X̄ - μ) / (σ/√n)
              </div>
              <p>Стандартизованное отклонение выборочного среднего</p>
            </div>
          </div>

          <div className="concepts">
            <h2>Ключевые понятия</h2>
            <div className="concepts-grid">
              <span className="concept-tag">Выборочное среднее</span>
              <span className="concept-tag">Сходимость по распределению</span>
              <span className="concept-tag">Стандартная ошибка</span>
              <span className="concept-tag">Закон больших чисел</span>
              <span className="concept-tag">Распределение совокупности</span>
              <span className="concept-tag">Асимптотическая нормальность</span>
            </div>
          </div>
        </section>

        <section className="simulator-section">
          <h2>Интерактивный симулятор</h2>
          <CentralLimitTheoremSimulator />
        </section>
      </div>
    </div>
  )
}