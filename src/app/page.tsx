import Link from 'next/link'

const topics = [
  {
    title: "Бросок монеты",
    description: "Бернуллиевские испытания, вероятность 0.5, независимые события",
    href: "/topics/coin-flip",
    icon: "🎯",
    color: "#f59e0b",
    difficulty: "beginner"
  },
  {
    title: "Бросок кубика", 
    description: "Равномерное распределение, 6 равновероятных исходов, дискретные величины",
    href: "/topics/dice-roll",
    icon: "🎲",
    color: "#10b981",
    difficulty: "beginner"
  },
  {
    title: "Условная вероятность",
    description: "Формула Байеса, зависимые события, дерево вероятностей",
    href: "/topics/conditional-probability", 
    icon: "🔄",
    color: "#8b5cf6",
    difficulty: "intermediate"
  },
  {
    title: "Биномиальное распределение",
    description: "Формула Бернулли, множественные испытания, бином Ньютона",
    href: "/topics/binomial-distribution",
    icon: "📊",
    color: "#ec4899", 
    difficulty: "intermediate"
  },
  {
    title: "Комбинаторика",
    description: "Сочетания, размещения, перестановки в вероятностных задачах",
    href: "/topics/probability-combinations",
    icon: "🧩", 
    color: "#06b6d4",
    difficulty: "intermediate"
  },
  {
    title: "Нормальное распределение",
    description: "Кривая Гаусса, правило 3-х сигм, Z-показатели",
    href: "/topics/normal-distribution",
    icon: "📈",
    color: "#3b82f6",
    difficulty: "advanced"
  },
  {
    title: "Центральная предельная теорема", 
    description: "Распределение выборочных средних, сходимость к нормальности",
    href: "/topics/central-limit-theorem",
    icon: "⚖️",
    color: "#f97316",
    difficulty: "advanced"
  },
]

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Теория вероятностей</h1>
          <p>Интерактивное обучение через визуализацию и эксперименты</p>
        </div>
      </section>

      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Разделы обучения</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem' }}>
          Выберите тему для изучения теории и проведения экспериментов
        </p>

        <div className="topics-grid">
          {topics.map((topic) => (
            <Link key={topic.href} href={topic.href} className="topic-card">
              <div className="topic-icon" style={{ color: topic.color }}>
                {topic.icon}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h2>{topic.title}</h2>
                <span className={`difficulty-badge difficulty-${topic.difficulty}`}>
                  {topic.difficulty === 'beginner' ? 'Начальный' : 
                   topic.difficulty === 'intermediate' ? 'Средний' : 'Продвинутый'}
                </span>
              </div>
              <p>{topic.description}</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}