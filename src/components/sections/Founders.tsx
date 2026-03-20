const founders = [
  {
    name: "Алексей Петров",
    role: "Основатель & Главный редактор",
    bio: "Киновед с 15-летним стажем. Выпускник ВГИКа, автор статей в «Искусстве кино» и «Сеансе». Верит, что кино — это зеркало человеческой души.",
    initials: "АП",
    color: "from-amber-500 to-yellow-600",
  },
  {
    name: "Мария Соколова",
    role: "Сооснователь & Куратор контента",
    bio: "Кинокритик и организатор кинофестивалей. Окончила СПбГИКиТ. Специализируется на авторском и независимом кино. Лауреат премии «Белый слон».",
    initials: "МС",
    color: "from-rose-500 to-red-600",
  },
  {
    name: "Дмитрий Волков",
    role: "Сооснователь & Технический директор",
    bio: "Разработчик и киноман. Бывший инженер Яндекса. Создаёт технологическую платформу для сообщества. Считает, что технология и искусство неразделимы.",
    initials: "ДВ",
    color: "from-indigo-500 to-blue-600",
  },
];

export function Founders() {
  return (
    <section id="founders" className="py-24 bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-500/80 text-sm tracking-[0.2em] uppercase font-medium">
            Команда
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Основатели проекта
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Люди, которые объединили страсть к кино и стремление создать пространство
            для настоящих ценителей киноискусства
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="group relative bg-neutral-800/50 rounded-2xl p-8 border border-neutral-700/50 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-amber-500 to-yellow-600" />

              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${founder.color} flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg`}>
                {founder.initials}
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{founder.name}</h3>
              <p className="text-amber-500/80 text-sm font-medium mb-4">{founder.role}</p>
              <p className="text-neutral-400 text-sm leading-relaxed">{founder.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
