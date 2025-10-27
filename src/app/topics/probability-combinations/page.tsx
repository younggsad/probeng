import ProbabilityCombinationsSimulator from '@/app/topics/probability-combinations/ProbabilityCombinationsSimulator'

export default function ProbabilityCombinationsPage() {
  return (
    <div className="container">
      <div className="topic-page">
        <section className="theory-section">
          <h1>Комбинаторика и вероятности</h1>
          
          <div className="description">
            <p>
              Комбинаторика изучает способы подсчета количества различных комбинаций объектов. 
              Эти методы широко применяются в теории вероятностей для вычисления вероятностей сложных событий.
            </p>
          </div>

          <div className="formulas">
            <div className="formula-card">
              <h3>Перестановки</h3>
              <div className="formula-latex">
                P(n) = n!
              </div>
              <p>Количество способов упорядочить n различных объектов</p>
            </div>

            <div className="formula-card">
              <h3>Размещения</h3>
              <div className="formula-latex">
                A(n,k) = n! / (n-k)!
              </div>
              <p>Количество способов выбрать k элементов из n с учетом порядка</p>
            </div>

            <div className="formula-card">
              <h3>Сочетания</h3>
              <div className="formula-latex">
                C(n,k) = n! / [k! × (n-k)!]
              </div>
              <p>Количество способов выбрать k элементов из n без учета порядка</p>
            </div>

            <div className="formula-card">
              <h3>Бином Ньютона</h3>
              <div className="formula-latex">
                (a+b)ⁿ = Σ C(n,k) × aᵏ × bⁿ⁻ᵏ
              </div>
              <p>Связь сочетаний с биномиальным разложением</p>
            </div>
          </div>

          <div className="concepts">
            <h2>Ключевые понятия</h2>
            <div className="concepts-grid">
              <span className="concept-tag">Факториал</span>
              <span className="concept-tag">Перестановки</span>
              <span className="concept-tag">Размещения</span>
              <span className="concept-tag">Сочетания</span>
              <span className="concept-tag">Биномиальные коэффициенты</span>
              <span className="concept-tag">Треугольник Паскаля</span>
              <span className="concept-tag">Принцип умножения</span>
              <span className="concept-tag">Принцип сложения</span>
            </div>
          </div>
        </section>

        <section className="simulator-section">
          <h2>Интерактивный симулятор</h2>
          <ProbabilityCombinationsSimulator />
        </section>
      </div>
    </div>
  )
}