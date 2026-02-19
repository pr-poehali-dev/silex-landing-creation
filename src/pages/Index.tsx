import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const HERO_IMG = "https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/bucket/8897ef8f-c9f1-4baa-8f80-8c30691ace6c.jpeg";
const PROJECT_IMG = "https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/files/f58cf424-fa55-4a9a-b4e1-748eda347225.jpg";
const BLOCKS_IMG = "https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/files/0e364350-2f9f-43b4-ac89-786857994f60.jpg";
const WAREHOUSE_IMG = "https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/files/b0027a22-2ff1-4763-a903-80740aeb5c92.jpg";

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) {
      el.querySelectorAll('.scroll-animate').forEach((child) => observer.observe(child));
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function FlipCard({ frontImage, frontTitle, backTitle, backDescription, backImage }: {
  frontImage: string;
  frontTitle: string;
  backTitle: string;
  backDescription: string;
  backImage?: string;
}) {
  return (
    <div className="flip-card h-[320px] md:h-[360px] cursor-pointer">
      <div className="flip-card-inner">
        <div className="flip-card-front bg-white shadow-lg">
          <img src={frontImage} alt={frontTitle} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
            <h3 className="text-white font-bold text-lg">{frontTitle}</h3>
          </div>
        </div>
        <div className="flip-card-back shadow-lg" style={{
          backgroundImage: backImage ? `linear-gradient(rgba(30,58,95,0.85), rgba(30,58,95,0.92)), url(${backImage})` : undefined,
          backgroundColor: backImage ? undefined : '#1E3A5F',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="flex flex-col items-center justify-center h-full p-6 text-white text-center">
            <h3 className="font-bold text-xl mb-3">{backTitle}</h3>
            <p className="text-white/80 text-sm leading-relaxed">{backDescription}</p>
            <Button
              variant="outline"
              className="mt-4 border-white text-white hover:bg-white hover:text-[#1E3A5F] transition-colors"
              size="sm"
            >
              Подробнее
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const containerRef = useScrollAnimation();

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'О компании', id: 'trust' },
    { label: 'Товары', id: 'categories' },
    { label: 'Преимущества', id: 'why-vis' },
    { label: 'Услуги', id: 'services' },
    { label: 'Объекты', id: 'projects' },
    { label: 'Отзывы', id: 'reviews' },
    { label: 'Контакты', id: 'contacts' },
  ];

  const categories = [
    {
      frontImage: BLOCKS_IMG,
      frontTitle: 'Газобетонные блоки',
      backTitle: 'Газобетон',
      backDescription: 'Автоклавный газобетон D400–D600. Точная геометрия, минимальный расход клея. Идеально для стен и перегородок.',
      backImage: BLOCKS_IMG,
    },
    {
      frontImage: WAREHOUSE_IMG,
      frontTitle: 'Кирпич',
      backTitle: 'Кирпич строительный',
      backDescription: 'Керамический и силикатный кирпич для несущих стен, облицовки и внутренних перегородок.',
      backImage: WAREHOUSE_IMG,
    },
    {
      frontImage: HERO_IMG,
      frontTitle: 'Утеплители',
      backTitle: 'Теплоизоляция',
      backDescription: 'Минеральная вата, пенополистирол, XPS. Сохранение тепла и снижение расходов на отопление.',
      backImage: HERO_IMG,
    },
    {
      frontImage: PROJECT_IMG,
      frontTitle: 'Сухие смеси и ЖБИ',
      backTitle: 'Смеси и ЖБИ',
      backDescription: 'Штукатурные и кладочные смеси, железобетонные изделия. Всё для монолитного строительства.',
      backImage: PROJECT_IMG,
    },
  ];

  const services = [
    { icon: 'Train', title: 'Ж/Д тупик', description: 'Собственный железнодорожный тупик для приёмки вагонов и контейнеров' },
    { icon: 'Truck', title: 'Доставка', description: 'Доставка по Приморью и Дальнему Востоку' },
    { icon: 'Calculator', title: 'Расчёт материалов', description: 'Бесплатная помощь в расчёте необходимого количества материалов' },
    { icon: 'RefreshCw', title: 'Бесперебойная поставка', description: 'Стабильные поставки на объект по согласованному графику' },
  ];

  const projects = [
    {
      frontImage: PROJECT_IMG,
      frontTitle: 'ЖК «Гавань Резиденс»',
      backTitle: 'ЖК «Гавань Резиденс»',
      backDescription: 'Поставка газобетона, утеплителей и сухих смесей для жилого комплекса на 450 квартир.',
      backImage: HERO_IMG,
    },
    {
      frontImage: https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/bucket/191fdc37-1bd8-493c-a840-a55014dc05c6.jpgO_IMG,
      frontTitle: 'Магазин «Парус»',
      backTitle: 'ТЦ «Парус»',
      backDescription: 'Полное снабжение строительными материалами торгового центра площадью 12 000 м².',
      backImage: PROJECT_IMG,
    },
    {
      frontImage: BLOCKS_IMG,
      frontTitle: 'Складской комплекс',
      backTitle: 'Логистический центр',
      backDescription: 'Газобетон и металлоконструкции для складского комплекса класса А.',
      backImage: WAREHOUSE_IMG,
    },
    {
      frontImage: WAREHOUSE_IMG,
      frontTitle: 'Коттеджный посёлок',
      backTitle: 'КП «Новый берег»',
      backDescription: 'Поставка стеновых материалов и кровли для 80 индивидуальных домов.',
      backImage: BLOCKS_IMG,
    },
  ];

  const reviews = [
    { company: 'СтройИнвест', author: 'Александр Петров', role: 'Директор', text: 'Работаем с ВИС уже 5 лет. Стабильные поставки, адекватные цены и всегда в наличии нужный ассортимент.' },
    { company: 'ДВ-Строй', author: 'Марина Ким', role: 'Начальник снабжения', text: 'Отличная логистика и оперативность. Материалы приходят точно в срок, качество подтверждено сертификатами.' },
    { company: 'ПримСтрой', author: 'Олег Волков', role: 'Прораб', text: 'Газобетон от ВИС — идеальная геометрия блоков. Кладка идёт быстро, расход клея минимальный.' },
    { company: 'Тихоокеанская СК', author: 'Елена Сидорова', role: 'Менеджер проектов', text: 'Помогли с расчётом материалов для крупного объекта. Сэкономили нам и время, и бюджет.' },
    { company: 'Восток-Девелопмент', author: 'Дмитрий Ли', role: 'Генеральный директор', text: 'Надёжный партнёр для масштабных проектов. Гибкие условия оплаты и индивидуальный подход.' },
    { company: 'АртёмСтрой', author: 'Игорь Новиков', role: 'Руководитель', text: 'Ж/Д тупик и собственный склад — большой плюс. Можем забирать материалы в удобное время.' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F8F8]">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/bucket/b7e4dd2d-de05-4a2e-b0d5-bcf1064e0acc.png"
              alt="ВИС"
              className="h-12 md:h-14 w-auto"
            />
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-medium transition-colors hover:text-[#E67E22] ${headerScrolled ? 'text-[#333]' : 'text-white/90'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+74232448010"
              className={`hidden md:flex items-center gap-1.5 text-sm font-semibold transition-colors ${headerScrolled ? 'text-[#1E3A5F]' : 'text-white'}`}
            >
              <Icon name="Phone" size={16} />
              +7 (423) 244-80-10
            </a>
            <Button
              size="sm"
              className="bg-[#E67E22] hover:bg-[#d35400] text-white font-semibold hidden md:flex"
              onClick={() => scrollTo('callback')}
            >
              Получить расчёт
            </Button>
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={28} className={headerScrolled ? 'text-[#333]' : 'text-white'} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg border-t">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left text-[#333] font-medium py-2 hover:text-[#E67E22] transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <a href="tel:+74232448010" className="block text-[#1E3A5F] font-semibold py-2">
                +7 (423) 244-80-10
              </a>
              <Button className="w-full bg-[#E67E22] hover:bg-[#d35400] text-white" onClick={() => scrollTo('callback')}>
                Получить расчёт
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30,58,95,0.82) 0%, rgba(30,58,95,0.55) 100%), url('${HERO_IMG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center text-white py-32">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in" style={{ fontFamily: 'Montserrat' }}>
            Автоклавный газобетон.
            <br />
            <span className="text-[#E67E22]">Дом, который дышит и греет</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/85 max-w-3xl mx-auto mb-8 animate-fade-in-delay-1">
            Гарантия качества в каждом блоке
          </p>
          <div className="animate-fade-in-delay-2 max-w-4xl mx-auto w-full">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-10 min-h-[200px] md:min-h-[280px] flex items-center justify-center">
              <p className="https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/bucket/1c220569-b0f7-4a9f-897e-68107e37269a.jpg">Место для баннера — загрузите изображение</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-white/10 backdrop-blur-sm border-t border-white/20">
            <div className="max-w-[1200px] md:px-8 rounded-lg my-1 mx-0 px-0 py-[13px] bg-transparent">
              <div className="w-full overflow-hidden">
                <div className="flex gap-0 min-w-0 w-full">
                  {[
                    { emoji: '📦', text: 'Газобетон' },
                    { emoji: '🧱', text: 'Кирпич' },
                    { emoji: '🛡️', text: 'Утеплители' },
                    { emoji: '🏗️', text: 'Сухие смеси' },
                    { emoji: '⚙️', text: 'ЖБИ' },
                    { emoji: '🏭', text: 'Асбестоцементные изделия' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 flex-1 justify-center min-w-0 px-0 mx-0 py-0 my-0 rounded-0">
                      <span className="text-xl md:text-2xl flex-shrink-0">{item.emoji}</span>
                      <span className="text-white/90 md:text-sm font-medium truncate mx-0 my-0 px-0 text-xs">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST NUMBERS */}
      <section id="trust" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: 23, suffix: '+', label: 'Лет на рынке стройматериалов', icon: 'Calendar' },
              { number: 2000, suffix: '+', label: 'Объектов снабжено', icon: 'Building2' },
              { number: 5000, suffix: ' м²', label: 'Площадь складского комплекса', icon: 'Warehouse' },
              { number: 24, suffix: 'ч', label: 'От заявки до отгрузки', icon: 'Clock' },
            ].map((stat, i) => (
              <div key={i} className="scroll-animate text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#1E3A5F]/5 flex items-center justify-center group-hover:bg-[#E67E22]/10 transition-colors">
                  <Icon name={stat.icon} size={28} className="text-[#1E3A5F] group-hover:text-[#E67E22] transition-colors" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-[#1E3A5F] mb-2" style={{ fontFamily: 'Montserrat' }}>
                  {stat.number === 24 ? '< ' : ''}<AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-sm md:text-base text-[#333]/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="py-16 md:py-24 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="scroll-animate text-center mb-12 md:mb-16">
            <p className="text-[#E67E22] font-semibold text-sm uppercase tracking-widest mb-3">Каталог</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E3A5F]" style={{ fontFamily: 'Montserrat' }}>
              Категории товаров
            </h2>
            <p className="text-[#333]/60 mt-4 max-w-xl mx-auto">
              Наведите на карточку, чтобы узнать подробности
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="scroll-animate" style={{ transitionDelay: `${i * 0.1}s` }}>
                <FlipCard {...cat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY VIS */}
      <section id="why-vis" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="scroll-animate">
              <p className="text-[#E67E22] font-semibold text-sm uppercase tracking-widest mb-3">Почему ВИС</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A5F] mb-6" style={{ fontFamily: 'Montserrat' }}>
                Всё в одном месте
              </h2>
              <p className="text-lg text-[#333]/70 mb-6 leading-relaxed">
                Более 500 наименований строительных материалов на складе. Вы экономите время и деньги, заказывая всё у одного поставщика.
              </p>
              <div className="space-y-4">
                {[
                  'Комплексное снабжение объектов «под ключ»',
                  'Собственный склад 5 000 м² — всё в наличии',
                  'Индивидуальные цены для крупных заказчиков',
                  'Оперативная отгрузка — менее 24 часов',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#E67E22] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={14} className="text-white" />
                    </div>
                    <span className="text-[#333] font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Button
                className="mt-8 bg-[#1E3A5F] hover:bg-[#1E3A5F]/90 text-white font-semibold px-8"
                size="lg"
                onClick={() => scrollTo('callback')}
              >
                Узнать подробнее
              </Button>
            </div>
            <div className="scroll-animate relative">
              <img
                src={WAREHOUSE_IMG}
                alt="Складской комплекс ВИС"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#E67E22] text-white px-6 py-4 rounded-xl shadow-lg">
                <div className="text-2xl font-extrabold" style={{ fontFamily: 'Montserrat' }}>500+</div>
                <div className="text-sm text-white/90">наименований</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 md:py-24 bg-[#1E3A5F]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="scroll-animate text-center mb-12 md:mb-16">
            <p className="text-[#E67E22] font-semibold text-sm uppercase tracking-widest mb-3">Сервис</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white" style={{ fontFamily: 'Montserrat' }}>
              Наши услуги
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv, i) => (
              <div
                key={i}
                className="scroll-animate group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#E67E22]/20 flex items-center justify-center mb-5 group-hover:bg-[#E67E22]/30 transition-colors">
                  <Icon name={srv.icon} size={26} className="text-[#E67E22]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{srv.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{srv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-16 md:py-24 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="scroll-animate text-center mb-12 md:mb-16">
            <p className="text-[#E67E22] font-semibold text-sm uppercase tracking-widest mb-3">Портфолио</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E3A5F]" style={{ fontFamily: 'Montserrat' }}>
              Выполненные объекты
            </h2>
            <p className="text-[#333]/60 mt-4 max-w-xl mx-auto">
              Наведите на карточку, чтобы увидеть детали поставки
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((proj, i) => (
              <div key={i} className="scroll-animate" style={{ transitionDelay: `${i * 0.1}s` }}>
                <FlipCard {...proj} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="scroll-animate text-center mb-12 md:mb-16">
            <p className="text-[#E67E22] font-semibold text-sm uppercase tracking-widest mb-3">Отзывы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E3A5F]" style={{ fontFamily: 'Montserrat' }}>
              Нам доверяют застройщики
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <Card
                key={i}
                className="scroll-animate border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-[#F8F8F8]"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon key={s} name="Star" size={16} className="text-[#E67E22] fill-[#E67E22]" />
                    ))}
                  </div>
                  <p className="text-[#333]/80 leading-relaxed mb-5 text-sm">«{rev.text}»</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{rev.author[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#333] text-sm">{rev.author}</div>
                      <div className="text-xs text-[#333]/50">{rev.role}, {rev.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / CALLBACK FORM */}
      <section
        id="callback"
        className="py-16 md:py-24 relative"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30,58,95,0.95) 0%, rgba(30,58,95,0.85) 100%), url('${PROJECT_IMG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ fontFamily: 'Montserrat' }}>
                Получите расчёт
                <br />
                <span className="text-[#E67E22]">за 60 минут</span>
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Оставьте заявку — менеджер перезвонит, уточнит детали и подготовит индивидуальное коммерческое предложение.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'Clock', text: 'Ответ в течение 60 минут' },
                  { icon: 'FileText', text: 'Готовое КП с ценами и сроками' },
                  { icon: 'Percent', text: 'Скидка 5% на первый заказ' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E67E22]/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-[#E67E22]" />
                    </div>
                    <span className="text-white/90">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-animate">
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-6" style={{ fontFamily: 'Montserrat' }}>
                    Оставить заявку
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert('Спасибо! Мы перезвоним вам в течение 60 минут.');
                      setFormData({ name: '', phone: '', message: '' });
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <Input
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12 bg-[#F8F8F8] border-0 text-[#333] placeholder:text-[#333]/40"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Телефон"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-12 bg-[#F8F8F8] border-0 text-[#333] placeholder:text-[#333]/40"
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Что вам нужно? (материалы, объёмы, сроки)"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-[#F8F8F8] border-0 text-[#333] placeholder:text-[#333]/40 min-h-[100px]"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#E67E22] hover:bg-[#d35400] text-white font-bold text-lg h-14"
                    >
                      Получить расчёт за 60 минут
                    </Button>
                    <p className="text-xs text-center text-[#333]/40">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="scroll-animate text-center mb-12 md:mb-16">
            <p className="text-[#E67E22] font-semibold text-sm uppercase tracking-widest mb-3">Контакты</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E3A5F]" style={{ fontFamily: 'Montserrat' }}>
              Свяжитесь с нами
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="scroll-animate space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={22} className="text-[#1E3A5F]" />
                </div>
                <div>
                  <div className="font-semibold text-[#333] mb-1">Адрес</div>
                  <div className="text-[#333]/60">г. Артём, ул. Вокзальная 114</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={22} className="text-[#1E3A5F]" />
                </div>
                <div>
                  <div className="font-semibold text-[#333] mb-1">Телефоны</div>
                  <a href="tel:+74232448010" className="block text-[#1E3A5F] hover:text-[#E67E22] transition-colors font-medium">
                    +7 (423) 244-80-10
                  </a>
                  <a href="tel:+79147922784" className="block text-[#1E3A5F] hover:text-[#E67E22] transition-colors font-medium mt-1">
                    +7 (914) 792-27-84 <span className="text-[#333]/40 text-sm">(Max)</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={22} className="text-[#1E3A5F]" />
                </div>
                <div>
                  <div className="font-semibold text-[#333] mb-1">Email</div>
                  <a href="mailto:vostokinveststal@mail.ru" className="text-[#1E3A5F] hover:text-[#E67E22] transition-colors font-medium">
                    vostokinveststal@mail.ru
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={22} className="text-[#1E3A5F]" />
                </div>
                <div>
                  <div className="font-semibold text-[#333] mb-1">Режим работы</div>
                  <div className="text-[#333]/60">Пн–Пт: 8:00–17:00</div>
                  <div className="text-[#333]/60">Сб: 9:00–14:00</div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="https://t.me/+79147922784"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-[#0088cc]/10 flex items-center justify-center hover:bg-[#0088cc]/20 transition-colors group"
                >
                  <Icon name="Send" size={20} className="text-[#0088cc] group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="tel:+79147922784"
                  className="w-12 h-12 rounded-xl bg-[#E67E22]/10 flex items-center justify-center hover:bg-[#E67E22]/20 transition-colors group"
                >
                  <Icon name="PhoneCall" size={20} className="text-[#E67E22] group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            <div className="scroll-animate rounded-2xl overflow-hidden shadow-lg h-[400px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A60b1f8d3a5a4f9d8e3b1f8d3a5a4f9d8&amp;source=constructor&ll=132.183340%2C43.354430&z=16&pt=132.183340,43.354430,pm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1E3A5F] text-white py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img
                  src="https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/bucket/b7e4dd2d-de05-4a2e-b0d5-bcf1064e0acc.png"
                  alt="ВИС"
                  className="h-14 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Комплексное снабжение строительных объектов на Дальнем Востоке с 2003 года.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="block text-white/50 hover:text-[#E67E22] transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-white/50">
                <div>г. Артём, ул. Вокзальная 114</div>
                <a href="tel:+74232448010" className="block hover:text-[#E67E22] transition-colors">
                  +7 (423) 244-80-10
                </a>
                <a href="tel:+79147922784" className="block hover:text-[#E67E22] transition-colors">
                  +7 (914) 792-27-84
                </a>
                <a href="mailto:vostokinveststal@mail.ru" className="block hover:text-[#E67E22] transition-colors">
                  vostokinveststal@mail.ru
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">
              © 2003–2026 ВИС (Восток-ИнвестСталь). Все права защищены.
            </p>
            <button className="text-white/30 text-sm hover:text-white/50 transition-colors">
              Политика конфиденциальности
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;