'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CreateSpacePrompt.module.css';

export type CreateSpacePayload = {
  name: string;
  visibility: 'private' | 'friends' | 'public';
  people: number;
  start?: string;
  end?: string;
  city?: string;
};

export default function CreateSpacePrompt({
  open, onClose, onConfirm, defaults,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (payload: CreateSpacePayload) => void;
  defaults?: Partial<CreateSpacePayload>;
}) {
  const [people, setPeople] = useState<number>(defaults?.people ?? 2);
  const [visibility, setVisibility] = useState<CreateSpacePayload['visibility']>(defaults?.visibility ?? 'friends');
  const [name, setName] = useState<string>(defaults?.name ?? buildDefaultName(defaults));

  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const onDown = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('keydown', onEsc);
    document.addEventListener('mousedown', onDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEsc);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!defaults?.name) setName(buildDefaultName(defaults));
  }, [defaults?.city, defaults?.start, defaults?.end]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="cs-title">
      <div className={styles.wrap} ref={wrapRef}>
        <div className={styles.header}>
          <h3 id="cs-title">Create Space</h3>
          <button className={styles.close} onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className={styles.body}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="cs-name">Trip name</label>
            <input
              id="cs-name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Paris — 2025-09-10 → 2025-09-14"
            />
          </div>

          <div className={styles.rowGrid}>
            <div className={styles.col}>
              <label className={styles.label} htmlFor="cs-start">Start</label>
              <input id="cs-start" type="date" className={styles.input}
                     defaultValue={defaults?.start || ''} />
            </div>
            <div className={styles.col}>
              <label className={styles.label} htmlFor="cs-end">End</label>
              <input id="cs-end" type="date" className={styles.input}
                     defaultValue={defaults?.end || ''} />
            </div>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Visibility</span>
            <div className={styles.segment}>
              <label className={styles.segItem}>
                <input type="radio" name="visibility" value="private"
                       checked={visibility === 'private'}
                       onChange={() => setVisibility('private')} />
                <span>Private</span>
              </label>
              <label className={styles.segItem}>
                <input type="radio" name="visibility" value="friends"
                       checked={visibility === 'friends'}
                       onChange={() => setVisibility('friends')} />
                <span>Friends-only</span>
              </label>
              <label className={styles.segItem}>
                <input type="radio" name="visibility" value="public"
                       checked={visibility === 'public'}
                       onChange={() => setVisibility('public')} />
                <span>Public</span>
              </label>
            </div>
            <p className={styles.help}>
              <strong>Private:</strong> only you can see and plan. &nbsp;
              <strong>Friends-only:</strong> listed, join with a code. &nbsp;
              <strong>Public:</strong> anyone can join.
            </p>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Travelers</span>
            <div className={styles.stepper}>
              <button type="button" onClick={() => setPeople((p) => Math.max(1, p - 1))} aria-label="Decrease">−</button>
              <input
                type="number" min={1} value={people}
                onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value || '1', 10)))}
              />
              <button type="button" onClick={() => setPeople((p) => p + 1)} aria-label="Increase">+</button>
            </div>
          </div>

          {defaults?.city && (
            <div className={styles.hint}>Planning context: <strong>{defaults.city}</strong></div>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.ghost} onClick={onClose}>Cancel</button>
          <button
            className={styles.primary}
            onClick={() => {
              const startEl = (document.getElementById('cs-start') as HTMLInputElement | null);
              const endEl   = (document.getElementById('cs-end') as HTMLInputElement | null);
              onConfirm({
                name: name.trim() || buildDefaultName(defaults),
                visibility,
                people,
                start: startEl?.value || defaults?.start,
                end: endEl?.value || defaults?.end,
                city: defaults?.city,
              });
            }}
          >
            Create Space
          </button>
        </div>
      </div>
    </div>
  );
}

function buildDefaultName(d?: Partial<CreateSpacePayload>) {
  const city = d?.city?.trim();
  const range = d?.start && d?.end ? `${d.start} → ${d.end}` : '';
  if (city && range) return `${city} — ${range}`;
  if (city) return `${city} trip`;
  return 'My Trip';
}
