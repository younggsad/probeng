import BinomialDistributionSimulator from '@/app/topics/binomial-distribution/BinomialDistributionSimulator'

export default function BinomialDistributionPage() {
  return (
    <div className="container">
      <div className="topic-page">
        <section className="theory-section">
          <h1>Биномиальное распределение</h1>
          
          <div className="description">
            <p>
              Биномиальное распределение описывает число успехов в серии независимых 
              испытаний Бернулли с постоянной вероятностью успеха.
            </p>
          </div>

          <div className="formulas">
            <div className="formula-card">
              <h3>Формула Бернулли</h3>
              <div className="formula-latex">
                P(X = k) = C(n,k) × pᵏ × (1-p)ⁿ⁻ᵏ
              </div>
              <p>Вероятность получить ровно k успехов в n испытаниях</p>
            </div>

            <div className="formula-card">
              <h3>Математическое ожидание</h3>
              <div className="formula-latex">
                E[X] = n × p
              </div>
              <p>Среднее число успехов</p>
            </div>

            <div className="formula-card">
              <h3>Дисперсия</h3>
              <div className="formula-latex">
                Var(X) = n × p × (1-p)
              </div>
              <p>Мера разброса биномиальной величины</p>
            </div>

            <div className="formula-card">
              <h3>Число сочетаний</h3>
              <div className="formula-latex">
                C(n,k) = n! / [k! × (n-k)!]
              </div>
              <p>Количество способов выбрать k элементов из n</p>
            </div>
          </div>

          <div className="concepts">
            <h2>Ключевые понятия</h2>
            <div className="concepts-grid">
              <span className="concept-tag">Испытания Бернулли</span>
              <span className="concept-tag">Независимые события</span>
              <span className="concept-tag">Факториал</span>
              <span className="concept-tag">Сочетания</span>
              <span className="concept-tag">Бином Ньютона</span>
              <span className="concept-tag">Гистограмма распределения</span>
            </div>
          </div>
        </section>

        <section className="simulator-section">
          <h2>Интерактивный симулятор</h2>
          <BinomialDistributionSimulator />
        </section>
      </div>
    </div>
  )
}