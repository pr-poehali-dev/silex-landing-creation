import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Index = () => {
  const [volume, setVolume] = useState<string>('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const vol = parseFloat(volume);
    if (isNaN(vol) || vol <= 0) return;
    
    const pricePerCube = vol >= 50 ? 3400 : 3500;
    const deliveryCost = 1500;
    const total = vol * pricePerCube + deliveryCost;
    
    setCalculatedPrice(total);
  };

  return (
    <div className="min-h-screen bg-white">
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/files/a97ff0d3-0017-42be-92a2-7349f60bfaca.jpg')`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Газобетон Силекс: строим надежно и теплоэкономно
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto">
            Прочность D500-D600, плотность 400-600 кг/м³, теплопроводность 0.10 Вт/м·К
          </p>
          <p className="text-lg md:text-xl mb-8">
            Доставка по Приморью от 1 паллеты. Скидка 10% на первый заказ
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Получить коммерческое предложение
          </Button>
          <div className="mt-12 text-2xl font-semibold">
            Уже построено 500+ объектов
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
            Почему Силекс лучше аналогов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'Feather',
                title: 'Легкий вес',
                description: 'Грузоподъемность до 30% ниже, экономия на фундаменте'
              },
              {
                icon: 'Leaf',
                title: 'Экологичность',
                description: 'Без вредных веществ, безопасен для здоровья'
              },
              {
                icon: 'Clock',
                title: 'Быстрая кладка',
                description: 'Экономия 20% времени строительства'
              },
              {
                icon: 'ThermometerSun',
                title: 'Теплоизоляция',
                description: 'Энергоэффективность класса A++'
              },
              {
                icon: 'Snowflake',
                title: 'Морозостойкость',
                description: 'F100+ циклов замораживания'
              },
              {
                icon: 'Shield',
                title: 'Долговечность',
                description: '100+ лет эксплуатации'
              }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <Icon name={item.icon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-center text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
            Сравнение с конкурентами
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Преимущество</TableHead>
                  <TableHead className="font-bold text-primary">Силекс</TableHead>
                  <TableHead className="font-bold">Керамзитоблок</TableHead>
                  <TableHead className="font-bold">Кирпич</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Вес (кг/м³)</TableCell>
                  <TableCell className="text-primary font-semibold">500</TableCell>
                  <TableCell>700</TableCell>
                  <TableCell>1800</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Теплопроводность (Вт/м·К)</TableCell>
                  <TableCell className="text-primary font-semibold">0.12</TableCell>
                  <TableCell>0.20</TableCell>
                  <TableCell>0.50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Цена (руб/м³)</TableCell>
                  <TableCell className="text-primary font-semibold">3500</TableCell>
                  <TableCell>4200</TableCell>
                  <TableCell>8000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Скорость кладки</TableCell>
                  <TableCell className="text-primary font-semibold">Высокая</TableCell>
                  <TableCell>Средняя</TableCell>
                  <TableCell>Низкая</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
            Технические характеристики
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                grade: 'D400',
                density: '400 кг/м³',
                strength: 'B2.5',
                size: '600×300×200 мм',
                thermal: '0.10 Вт/м·К'
              },
              {
                grade: 'D500',
                density: '500 кг/м³',
                strength: 'B3.5',
                size: '600×300×250 мм',
                thermal: '0.12 Вт/м·К'
              },
              {
                grade: 'D600',
                density: '600 кг/м³',
                strength: 'B5.0',
                size: '600×300×300 мм',
                thermal: '0.14 Вт/м·К'
              }
            ].map((spec, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-primary">{spec.grade}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Плотность:</span>
                    <span className="font-semibold">{spec.density}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Прочность:</span>
                    <span className="font-semibold">{spec.strength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Размер:</span>
                    <span className="font-semibold">{spec.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Теплопроводность:</span>
                    <span className="font-semibold">{spec.thermal}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
            Калькулятор стоимости
          </h2>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Рассчитайте стоимость вашего заказа</CardTitle>
              <CardDescription>
                Цена от 3400 руб/м³ при заказе от 50 м³. Доставка по Владивостоку — 1500 руб.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="volume">Объем (м³)</Label>
                <Input
                  id="volume"
                  type="number"
                  placeholder="Введите объем"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                />
              </div>
              <Button onClick={calculatePrice} className="w-full">
                Рассчитать
              </Button>
              {calculatedPrice !== null && (
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-2xl font-bold text-center text-primary">
                    Итого: {calculatedPrice.toLocaleString('ru-RU')} ₽
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Включая доставку
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
            Галерея проектов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/files/a97ff0d3-0017-42be-92a2-7349f60bfaca.jpg"
                alt="Газобетонные блоки Силекс"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/files/bb61f759-163f-40e7-8313-e4a1b641d3c8.jpg"
                alt="Строительство дома из Силекс"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://cdn.poehali.dev/projects/53d4eefc-24fa-41e9-b99a-3ee269a34aaf/files/c4258b6b-093c-48c1-96f2-367deb2e38c9.jpg"
                alt="Качество блоков Силекс"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
            Отзывы клиентов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Иван Петров',
                company: 'СтройМастер, Артем',
                text: 'Сэкономили 15% на фундаменте благодаря легкому весу блоков. Качество на высоте!'
              },
              {
                name: 'Сергей Ковалев',
                company: 'ДомСтрой, Владивосток',
                text: 'Работаем с Силексом уже 3 года. Клиенты довольны теплом и прочностью домов.'
              },
              {
                name: 'Михаил Соколов',
                company: 'ПримСтрой, Находка',
                text: 'Быстрая кладка и отличная геометрия блоков. Рекомендую всем подрядчикам!'
              },
              {
                name: 'Андрей Васильев',
                company: 'ЭкоДом, Уссурийск',
                text: 'Экологичный материал, важно для наших клиентов. Морозостойкость отличная.'
              },
              {
                name: 'Дмитрий Кузнецов',
                company: 'СтройТех, Артем',
                text: 'Оптовые цены очень конкурентные. Доставка всегда вовремя. Гарантия 5 лет!'
              }
            ].map((review, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                  <CardDescription>{review.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Заявка на расчет
          </h2>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Оставьте заявку</CardTitle>
              <CardDescription>
                Наш менеджер свяжется с вами в течение 15 минут
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Ваше имя" />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
              </div>
              <div>
                <Label htmlFor="order-volume">Объем заказа (м³)</Label>
                <Input id="order-volume" type="number" placeholder="Введите объем" />
              </div>
              <div>
                <Label htmlFor="city">Город доставки</Label>
                <Input id="city" placeholder="Владивосток, Артем..." />
              </div>
              <div>
                <Label htmlFor="message">Комментарий</Label>
                <Textarea id="message" placeholder="Дополнительная информация" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Отправить заявку
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Газобетон Силекс</h3>
              <p className="text-gray-300">
                Автоклавный газобетон премиум-класса для строительства в Приморском крае
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  <span>+7 (423) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  <span>info@silex-vl.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  <span>Владивосток, ул. Строительная, 1</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Режим работы</h4>
              <div className="text-gray-300 space-y-1">
                <p>Пн-Пт: 9:00 - 18:00</p>
                <p>Сб: 10:00 - 16:00</p>
                <p>Вс: выходной</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Газобетон Силекс. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
