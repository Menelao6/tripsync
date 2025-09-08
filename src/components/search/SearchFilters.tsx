'use client';

import { useState } from 'react';
import styles from './SearchFilters.module.css';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { FaSearch, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import CreateSpacePrompt, { CreateSpacePayload } from '../search/CreateSpacePrompt';

type SearchFormData = {
  query: string;
  city: string;
  start: string;
  end: string;
  people: number;
};

type Props = {
  defaultValues?: SearchFormData;
  onSubmit: (data: SearchFormData) => void;
};

export default function SearchFilters({ defaultValues, onSubmit }: Props) {
  const [q, setQ] = useState(defaultValues?.query ?? '');
  const [start, setStart] = useState(defaultValues?.start ?? '');
  const [end, setEnd] = useState(defaultValues?.end ?? '');
  const [openCreate, setOpenCreate] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ query: q, city: '', start, end, people: defaultValues?.people ?? 2 });
  };

  const openCreateSpace = () => setOpenCreate(true);
  const confirmCreateSpace = (payload: CreateSpacePayload) => {
    setOpenCreate(false);
    console.log('Create Space payload', payload);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStart(e.target.value);
    // If end date is before start date, clear end date
    if (end && e.target.value > end) {
      setEnd('');
    }
  };

  return (
    <>
      <form className={styles.filters} onSubmit={submit} role="search" aria-label="Search attractions">
        {/* top row: single smart bar + Explore + Plan Together */}
        <div className={styles.topRow}>
          <div className={styles.searchBar}>
            <Input
              label="Search places or cities"
              placeholder="Try 'Paris' or 'museums in Rome'…"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>

          <div className={styles.primaryActions}>
            <Button variant="primary" size="large" type="submit" className={styles.searchBtn}>
              <FaSearch /> Explore
            </Button>
            <Button variant="secondary" size="large" type="button" onClick={openCreateSpace} className={styles.planBtn}>
              <FaUsers /> Plan together
            </Button>
          </div>
        </div>

        {/* chip row: light filters (dates for now) */}
        <div className={styles.chipsRow} aria-label="Filters">
          <div className={styles.dateInputsContainer}>
            <div className={styles.dateInputGroup}>
              <label htmlFor="start-date" className={styles.dateLabel}>
                <FaCalendarAlt className={styles.labelIcon} />
                Check-in
              </label>
              <div className={styles.dateInputWrapper}>
                <input
                  id="start-date"
                  type="date"
                  value={start}
                  onChange={handleStartDateChange}
                  aria-label="Start date"
                  className={styles.dateInput}
                  placeholder=" "
                />
                {!start && <span className={styles.inputPlaceholder}>Select date</span>}
              </div>
            </div>

            <span className={styles.dateArrow}>→</span>

            <div className={styles.dateInputGroup}>
              <label htmlFor="end-date" className={styles.dateLabel}>
                <FaCalendarAlt className={styles.labelIcon} />
                Check-out
              </label>
              <div className={styles.dateInputWrapper}>
                <input
                  id="end-date"
                  type="date"
                  value={end}
                  onChange={e => setEnd(e.target.value)}
                  aria-label="End date"
                  className={styles.dateInput}
                  placeholder=" "
                  min={start || undefined}
                />
                {!end && <span className={styles.inputPlaceholder}>Select date</span>}
              </div>
            </div>
          </div>

          {/* Future chips you can enable later:
          <button type="button" className={styles.chip}>Category</button>
          <button type="button" className={styles.chip}>Price</button>
          <button type="button" className={styles.chip}>Rating</button>
          */}
        </div>
      </form>

      {/* Plan Together popup */}
      <CreateSpacePrompt
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onConfirm={confirmCreateSpace}
        defaults={{
          name: buildDefaultName(q, start, end),
          city: q,
          start,
          end,
          visibility: 'friends',
          people: 2,
        }}
      />
    </>
  );
}

function buildDefaultName(q: string, start?: string, end?: string) {
  const trimmed = q.trim();
  const range = start && end ? `${start} → ${end}` : '';
  if (trimmed && range) return `${trimmed} — ${range}`;
  if (trimmed) return `${trimmed} trip`;
  return 'My Trip';
}