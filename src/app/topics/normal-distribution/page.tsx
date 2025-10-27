import NormalDistributionSimulator from '@/app/topics/normal-distribution/NormalDistributionSimulator'

export default function NormalDistributionPage() {
  return (
    <div className="container">
      <div className="topic-page">
        <section className="theory-section">
          <h1>Нормальное распределение</h1>
          
          <div className="description">
            <p>
              Нормальное распределение (распределение Гаусса) — фундаментальное распределение 
              в теории вероятностей, описывающее многие природные явления.
            </p>
          </div>

          <div className="formulas">
            <div className="formula-card">
              <h3>Функция плотности</h3>
              <div className="formula-latex">
                f(x) = (1/σ√(2π)) × e^(-(x-μ)²/(2σ²))
              </div>
              <p>Формула кривой Гаусса</p>
            </div>

            <div className="formula-card">
              <h3>Правило 68-95-99.7</h3>
              <div className="formula-latex">
                P(μ-σ ≤ X ≤ μ+σ) ≈ 68%<br/>
                P(μ-2σ ≤ X ≤ μ+2σ) ≈ 95%<br/>
                P(μ-3σ ≤ X ≤ μ+3σ) ≈ 99.7%
              </div>
              <p>Правило трёх сигм</p>
            </div>

            <div className="formula-card">
              <h3>Z-показатель</h3>
              <div className="formula-latex">
                z = (x - μ) / σ
              </div>
              <p>Стандартизация нормальной величины</p>
            </div>
          </div>

          <div className="concepts">
            <h2>Ключевые понятия</h2>
            <div className="concepts-grid">
              <span className="concept-tag">Кривая Гаусса</span>
              <span className="concept-tag">Среднее значение (μ)</span>
              <span className="concept-tag">Стандартное отклонение (σ)</span>
              <span className="concept-tag">Z-показатель</span>
              <span className="concept-tag">Правило 3-х сигм</span>
              <span className="concept-tag">Стандартное нормальное распределение</span>
            </div>
          </div>
        </section>

        <section className="simulator-section">
          <h2>Интерактивный симулятор</h2>
          <NormalDistributionSimulator />
        </section>
      </div>
    </div>
  )
}