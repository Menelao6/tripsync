'use client';

import { useState } from 'react';
import styles from './SearchFilters.module.css';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { FaSearch } from 'react-icons/fa';

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
  const [query, setQuery] = useState(defaultValues?.query ?? '');
  const [city, setCity] = useState(defaultValues?.city ?? '');
  const [start, setStart] = useState(defaultValues?.start ?? '');
  const [end, setEnd] = useState(defaultValues?.end ?? '');
  const [people, setPeople] = useState(defaultValues?.people ?? 2);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ query, city, start, end, people });
  };

  return (
    <form className={styles.filters} onSubmit={submit} role="search" aria-label="Search attractions">
      <div className={styles.row}>
        <div className={styles.field}>
          <Input 
            placeholder="Search attractions or cities..." 
            value={query} 
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <Input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
        </div>
        <div className={styles.field}>
          <Input type="date" value={start} onChange={e => setStart(e.target.value)} />
        </div>
        <div className={styles.field}>
          <Input type="date" value={end} onChange={e => setEnd(e.target.value)} />
        </div>
        <div className={styles.field}>
          <Input 
            type="number" 
            min={1} 
            value={people} 
            onChange={e => setPeople(parseInt(e.target.value || '1', 10))}
            label="People"
          />
        </div>
        <div className={styles.actions}>
          <Button variant="primary" size="large" type="submit">
            <FaSearch />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}