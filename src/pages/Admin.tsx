import { useState, useEffect } from 'react';
import func2url from '../../backend/func2url.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const ADMIN_URL = func2url['admin-reviews'];

interface Review {
  id: number;
  author: string;
  company: string;
  role: string;
  text: string;
  stars: number;
  approved: boolean;
  created_at: string;
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async (pwd: string) => {
    setLoading(true);
    setError('');
    const res = await fetch(ADMIN_URL, {
      headers: { 'x-admin-password': pwd },
    });
    if (res.status === 403) {
      setError('Неверный пароль');
      setLoading(false);
      return;
    }
    const data = await res.json();
    setReviews(data.reviews || []);
    setAuthed(true);
    setLoading(false);
  };

  const action = async (id: number, act: 'approve' | 'reject' | 'delete') => {
    await fetch(ADMIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ id, action: act }),
    });
    load(password);
  };

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-2xl font-extrabold text-[#1E3A5F] mb-1" style={{ fontFamily: 'Montserrat' }}>
            Админ-панель
          </div>
          <div className="text-sm text-[#333]/50 mb-6">Управление отзывами</div>
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && load(password)}
            className="mb-3"
          />
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
          <Button
            className="w-full bg-[#1E3A5F] hover:bg-[#16304f] text-white"
            onClick={() => load(password)}
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1E3A5F]" style={{ fontFamily: 'Montserrat' }}>
              Админ-панель
            </h1>
            <p className="text-sm text-[#333]/50">Управление отзывами</p>
          </div>
          <Button variant="outline" onClick={() => { setAuthed(false); setPassword(''); }}>
            Выйти
          </Button>
        </div>

        {/* PENDING */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#1E3A5F] mb-4 flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">{pending.length}</span>
            Ожидают проверки
          </h2>
          {pending.length === 0 && (
            <div className="text-[#333]/40 text-sm bg-white rounded-xl p-4">Новых отзывов нет</div>
          )}
          <div className="space-y-3">
            {pending.map((r) => (
              <ReviewCard key={r.id} review={r} onAction={action} />
            ))}
          </div>
        </div>

        {/* APPROVED */}
        <div>
          <h2 className="text-lg font-bold text-[#1E3A5F] mb-4 flex items-center gap-2">
            <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded-full">{approved.length}</span>
            Опубликованные
          </h2>
          {approved.length === 0 && (
            <div className="text-[#333]/40 text-sm bg-white rounded-xl p-4">Нет опубликованных отзывов</div>
          )}
          <div className="space-y-3">
            {approved.map((r) => (
              <ReviewCard key={r.id} review={r} onAction={action} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review, onAction }: { review: Review; onAction: (id: number, act: 'approve' | 'reject' | 'delete') => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-start gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">{review.author[0]}</span>
          </div>
          <div>
            <div className="font-semibold text-[#333] text-sm">{review.author}</div>
            {review.company && <div className="text-xs text-[#333]/50">{review.role}{review.role && review.company ? ', ' : ''}{review.company}</div>}
          </div>
          <div className="flex gap-0.5 ml-2">
            {[1,2,3,4,5].map((s) => (
              <Icon key={s} name="Star" size={13} className={s <= review.stars ? 'text-[#E67E22] fill-[#E67E22]' : 'text-gray-200 fill-gray-200'} />
            ))}
          </div>
          <span className="text-xs text-[#333]/30 ml-auto">{review.created_at}</span>
        </div>
        <p className="text-sm text-[#333]/70 leading-relaxed mt-2">«{review.text}»</p>
      </div>
      <div className="flex sm:flex-col gap-2 flex-shrink-0">
        {!review.approved ? (
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs" onClick={() => onAction(review.id, 'approve')}>
            <Icon name="Check" size={14} />
            Одобрить
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="text-xs text-orange-600 border-orange-200 hover:bg-orange-50" onClick={() => onAction(review.id, 'reject')}>
            <Icon name="EyeOff" size={14} />
            Скрыть
          </Button>
        )}
        <Button size="sm" variant="outline" className="text-xs text-red-500 border-red-200 hover:bg-red-50" onClick={() => onAction(review.id, 'delete')}>
          <Icon name="Trash2" size={14} />
          Удалить
        </Button>
      </div>
    </div>
  );
}
