import ConditionalProbabilitySimulator from '@/app/topics/conditional-probability/ConditionalProbabylitySimulator'

export default function ConditionalProbabilityPage() {
  return (
    <div className="container">
      <div className="topic-page">
        <section className="theory-section">
          <h1>Условная вероятность</h1>
          
          <div className="description">
            <p>
              Условная вероятность — вероятность наступления события A при условии, 
              что событие B уже произошло. Основывается на формуле Байеса.
            </p>
          </div>

          <div className="formulas">
            <div className="formula-card">
              <h3>Формула условной вероятности</h3>
              <div className="formula-latex">
                P(A|B) = P(A ∩ B) / P(B)
              </div>
              <p>Вероятность A при условии B равна вероятности их пересечения, деленной на вероятность B</p>
            </div>

            <div className="formula-card">
              <h3>Формула Байеса</h3>
              <div className="formula-latex">
                P(A|B) = [P(B|A) × P(A)] / P(B)
              </div>
              <p>Позволяет "переворачивать" условные вероятности</p>
            </div>

            <div className="formula-card">
              <h3>Теорема умножения</h3>
              <div className="formula-latex">
                P(A ∩ B) = P(A) × P(B|A) = P(B) × P(A|B)
              </div>
              <p>Вероятность совместного наступления двух событий</p>
            </div>
          </div>

          <div className="concepts">
            <h2>Ключевые понятия</h2>
            <div className="concepts-grid">
              <span className="concept-tag">Зависимые события</span>
              <span className="concept-tag">Априорная вероятность</span>
              <span className="concept-tag">Апостериорная вероятность</span>
              <span className="concept-tag">Теорема Байеса</span>
              <span className="concept-tag">Дерево вероятностей</span>
              <span className="concept-tag">Независимость событий</span>
            </div>
          </div>
        </section>

        <section className="simulator-section">
          <h2>Интерактивный симулятор</h2>
          <ConditionalProbabilitySimulator />
        </section>
      </div>
    </div>
  )
}