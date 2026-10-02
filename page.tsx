'use client';
import { useCallback, useEffect, useState } from 'react';
import { t } from './messages';

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1';

async function call(path: string, body?: unknown) {
  try {
    const r = await fetch(API + path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : undefined);
    const j = await r.json();
    if (!j.success) throw new Error(j.error.message);
    return j.data;
  } catch (e) {
    throw e instanceof TypeError ? new Error(t.loadError) : e;
  }
}

type Item = { id: string; name: string; unit: string };
type Row = { itemId: string; name: string; unit: string; opening: number; in: number; out: number; closing: number };
type Mv = { id: string; itemId: string; type: 'IN' | 'OUT'; quantity: number; date: string; party?: string; note?: string };

const box = { background: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, boxShadow: '0 1px 3px #0001' } as const;
const inp = { padding: 8, margin: 4, border: '1px solid #ccc', borderRadius: 6 } as const;

export default function Page() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [items, setItems] = useState<Item[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [mvs, setMvs] = useState<Mv[]>([]);
  const [err, setErr] = useState('');
  const [ni, setNi] = useState({ name: '', unit: '' });
  const [mv, setMv] = useState({ type: 'IN', itemId: '', quantity: '', date: new Date().toISOString().slice(0, 10), party: '', note: '' });

  const load = useCallback(async () => {
    try {
      const [i, r, m] = await Promise.all([call('/inventory/items'), call(`/inventory/report?year=${year}`), call(`/inventory/movements?year=${year}`)]);
      setItems(i); setRows(r); setMvs(m); setErr('');
    } catch (e) { setErr((e as Error).message); }
  }, [year]);
  useEffect(() => { load(); }, [load]);

  const run = async (fn: () => Promise<unknown>) => { try { await fn(); setErr(''); await load(); } catch (e) { setErr((e as Error).message); } };
  const name = (id: string) => items.find((i) => i.id === id)?.name ?? '';

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <h1>{t.title}</h1>
      {err && <p role="alert" style={{ color: '#b00020' }}>{err}</p>}
      <label>{t.year}: <input style={inp} type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} /></label>

      <section style={box}>
        <h2>{t.newItem}</h2>
        <input style={inp} placeholder={t.name} value={ni.name} onChange={(e) => setNi({ ...ni, name: e.target.value })} />
        <input style={inp} placeholder={t.unit} value={ni.unit} onChange={(e) => setNi({ ...ni, unit: e.target.value })} />
        <button style={inp} onClick={() => run(async () => { await call('/inventory/items', ni); setNi({ name: '', unit: '' }); })}>{t.add}</button>
      </section>

      <section style={box}>
        <h2>{t.entry}</h2>
        <select style={inp} value={mv.type} onChange={(e) => setMv({ ...mv, type: e.target.value })}>
          <option value="IN">{t.in}</option><option value="OUT">{t.out}</option>
        </select>
        <select style={inp} value={mv.itemId} onChange={(e) => setMv({ ...mv, itemId: e.target.value })}>
          <option value="">{t.select}</option>
          {items.map((i) => <option key={i.id} value={i.id}>{i.name} ({i.unit})</option>)}
        </select>
        <input style={inp} type="number" min="0" placeholder={t.qty} value={mv.quantity} onChange={(e) => setMv({ ...mv, quantity: e.target.value })} />
        <input style={inp} type="date" value={mv.date} onChange={(e) => setMv({ ...mv, date: e.target.value })} />
        {mv.type === 'OUT' && <input style={inp} placeholder={t.party} value={mv.party} onChange={(e) => setMv({ ...mv, party: e.target.value })} />}
        <input style={inp} placeholder={t.note} value={mv.note} onChange={(e) => setMv({ ...mv, note: e.target.value })} />
        <button style={inp} onClick={() => run(() => call('/inventory/movements', { ...mv, quantity: Number(mv.quantity) }))}>{t.save}</button>
      </section>

      <section style={{ ...box, overflowX: 'auto' }}>
        <h2>{t.report} {year}</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{[t.item, t.opening, t.inCol, t.outCol, t.closing].map((h) => <th key={h} style={{ textAlign: 'left', borderBottom: '2px solid #ddd', padding: 6 }}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.itemId}><td style={{ padding: 6 }}>{r.name} ({r.unit})</td><td>{r.opening}</td><td>{r.in}</td><td>{r.out}</td><td><b>{r.closing}</b></td></tr>
          ))}</tbody>
        </table>
      </section>

      <section style={{ ...box, overflowX: 'auto' }}>
        <h2>{t.history}</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>{mvs.map((m) => (
            <tr key={m.id}><td style={{ padding: 6 }}>{m.date}</td><td>{m.type === 'IN' ? t.in : t.out}</td><td>{name(m.itemId)}</td><td>{m.quantity}</td><td>{m.party}</td><td>{m.note}</td></tr>
          ))}</tbody>
        </table>
      </section>
    </main>
  );
}
