import CoinFlipSimulator from '@/app/topics/coin-flip/CoinFlipSimulator'

export default function CoinFlipPage() {
  return (
    <div className="container">
      <div className="topic-page">
        {/* Теоретическая секция */}
        <section className="theory-section">
          <h1>Бросок монеты</h1>
          
          <div className="description">
            <p>
              Бросок монеты — это классический пример <strong>бернуллиевского испытания</strong> 
              с двумя возможными исходами: орёл или решка.
            </p>
          </div>

          <div className="formulas">
            <div className="formula-card">
              <h3>Формула вероятности</h3>
              <div className="formula-latex">
                P(A) = число благоприятных исходов / общее число исходов
              </div>
              <p>Для честной монеты: P(орёл) = P(решка) = 1/2 = 0.5</p>
            </div>

            <div className="formula-card">
              <h3>Формула Бернулли</h3>
              <div className="formula-latex">
                P(k успехов в n испытаниях) = C(n,k) × pᵏ × (1-p)ⁿ⁻ᵏ
              </div>
              <p>где C(n,k) - число сочетаний из n по k</p>
            </div>
          </div>

          <div className="concepts">
            <h2>Ключевые понятия</h2>
            <div className="concepts-grid">
              <span className="concept-tag">Дискретная случайная величина</span>
              <span className="concept-tag">Независимые события</span>
              <span className="concept-tag">Равновероятные исходы</span>
              <span className="concept-tag">Бернуллиевские испытания</span>
              <span className="concept-tag">Вероятность 0.5</span>
            </div>
          </div>
        </section>

        {/* Секция симулятора */}
        <section className="simulator-section">
          <h2>Интерактивный симулятор</h2>
          <CoinFlipSimulator />
        </section>
      </div>
    </div>
  )
}