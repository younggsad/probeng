import DiceRollSimulator from '@/app/topics/dice-roll/DiceRollSimulator'

export default function DiceRollPage() {
  return (
    <div className="container">
      <div className="topic-page">
        {/* Теоретическая секция */}
        <section className="theory-section">
          <h1>Бросок игрального кубика</h1>
          
          <div className="description">
            <p>
              Бросок игрального кубика — пример <strong>дискретного равномерного распределения</strong> 
              с шестью равновероятными исходами.
            </p>
          </div>

          <div className="formulas">
            <div className="formula-card">
              <h3>Вероятность выпадения конкретной грани</h3>
              <div className="formula-latex">
                P(X = k) = 1/6, для k = 1, 2, 3, 4, 5, 6
              </div>
              <p>Для честного кубика все исходы равновероятны</p>
            </div>

            <div className="formula-card">
              <h3>Математическое ожидание</h3>
              <div className="formula-latex">
                E[X] = (1 + 2 + 3 + 4 + 5 + 6) / 6 = 3.5
              </div>
              <p>Среднее значение при большом количестве бросков</p>
            </div>

            <div className="formula-card">
              <h3>Дисперсия</h3>
              <div className="formula-latex">
                Var(X) = E[X²] - (E[X])² = 35/12 ≈ 2.917
              </div>
              <p>Мера разброса значений вокруг среднего</p>
            </div>
          </div>

          <div className="concepts">
            <h2>Ключевые понятия</h2>
            <div className="concepts-grid">
              <span className="concept-tag">Дискретное распределение</span>
              <span className="concept-tag">Равномерное распределение</span>
              <span className="concept-tag">Математическое ожидание</span>
              <span className="concept-tag">Дисперсия</span>
              <span className="concept-tag">Закон больших чисел</span>
              <span className="concept-tag">Пространство элементарных событий</span>
            </div>
          </div>
        </section>

        {/* Секция симулятора */}
        <section className="simulator-section">
          <h2>Интерактивный симулятор</h2>
          <DiceRollSimulator />
        </section>
      </div>
    </div>
  )
}