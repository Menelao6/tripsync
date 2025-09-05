'use client';

import { useState } from 'react';
import styles from './SearchFilters.module.css';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { FaSearch, FaPlus, FaMinus } from 'react-icons/fa';

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

  const handlePeopleChange = (value: number) => {
    if (value < 1) return;
    setPeople(value);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (people < 1) {
      alert("Number of people must be at least 1");
      setPeople(1);
      return;
    }
    onSubmit({ query, city, start, end, people });
  };

  return (
    <form className={styles.filters} onSubmit={submit} role="search" aria-label="Search attractions">
      <div className={styles.row}>
        <div className={styles.field}>
          <Input 
            placeholder="Eiffel Tower, beaches, museums..." 
            value={query} 
            onChange={e => setQuery(e.target.value)}
            label="What to explore"
          />
        </div>
        <div className={styles.field}>
          <Input 
            placeholder="Paris, Barcelona, Tokyo..." 
            value={city} 
            onChange={e => setCity(e.target.value)}
            label="Destination city"
          />
        </div>
        <div className={styles.field}>
          <Input 
            type="date" 
            value={start} 
            onChange={e => setStart(e.target.value)}
            label="Start date"
          />
        </div>
        <div className={styles.field}>
          <Input 
            type="date" 
            value={end} 
            onChange={e => setEnd(e.target.value)}
            label="End date"
          />
        </div>
        <div className={styles.peopleField}>
          <label className={styles.label}>Travelers</label>
          <div className={styles.peopleInput}>
            <button 
              type="button" 
              className={styles.peopleButton}
              onClick={() => handlePeopleChange(people - 1)}
              aria-label="Decrease number of people"
            >
              <FaMinus />
            </button>
            <input
              type="number"
              min="1"
              value={people}
              onChange={e => handlePeopleChange(parseInt(e.target.value) || 1)}
              className={styles.peopleCount}
              aria-label="Number of people"
            />
            <button 
              type="button" 
              className={styles.peopleButton}
              onClick={() => handlePeopleChange(people + 1)}
              aria-label="Increase number of people"
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className={styles.actions}>
          <Button variant="primary" size="large" type="submit" className={styles.searchButton}>
            <FaSearch />
            Explore Now
          </Button>
        </div>
      </div>
    </form>
  );
}