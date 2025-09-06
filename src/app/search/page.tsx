'use client';

import { useState, useMemo } from 'react';
import styles from './page.module.css';
import SearchFilters from '../../components/search/SearchFilters';
import SearchResults from '../../components/search/SearchResults';
import CityStrip from '../../components/search/CityStrip';

type Attraction = {
  id: string;
  place_id: string;
  name: string;
  city: string;
  rating: number;
  price_level?: number;
  photos: string[];
};

type SearchFormData = { 
  query: string; 
  city: string; 
  start: string; 
  end: string; 
  people: number; 
};

const MOCK: Attraction[] = Array.from({ length: 42 }).map((_, i) => ({
  id: `a_${i + 1}`,
  place_id: `pl_${i + 1}`,
  name: ['City Museum', 'Old Town Square', 'Botanical Garden', 'Art Gallery'][i % 4] + ` ${i + 1}`,
  city: ['Barcelona', 'Lisbon', 'Prague', 'Athens'][i % 4],
  rating: 3.8 + ((i * 7) % 12) / 10,
  price_level: (i % 4) + 1,
  photos: ['/images/placeholder-attraction.jpg'],
}));

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [people, setPeople] = useState(2);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  

  const pageSizeDesktop = 30;
  const pageSizeMobile = 15;

  // simple breakpoint check (client only)
  const isMobile = typeof window !== 'undefined' && window.matchMedia?.('(max-width: 768px)').matches;
  const pageSize = isMobile ? pageSizeMobile : pageSizeDesktop;

  const results = useMemo(() => {
    // pretend "search": filter by city or name
    const q = (query || '').toLowerCase();
    const c = (city || '').toLowerCase();
    return MOCK.filter(
      a =>
        (!q || a.name.toLowerCase().includes(q)) &&
        (!c || a.city.toLowerCase().includes(c))
    );
  }, [query, city]);

  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  const paged = results.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch = async (form: SearchFormData) => {
    setLoading(true);
    setQuery(form.query);
    setCity(form.city);
    setStart(form.start);
    setEnd(form.end);
    setPeople(form.people);
    setPage(1);
    // simulate latency
    await new Promise(r => setTimeout(r, 350));
    setLoading(false);
  };

  // Create default values object
  const defaultValues: SearchFormData = {
    query,
    city,
    start,
    end,
    people
  };

const handleCityPick = (cityName: string | null) => {
  if (cityName) {
    handleSearch({
      query,
      city: cityName,
      start,
      end,
      people,
    });
  }
};


  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Explore attractions</h1>
            <p className={styles.subtitle}>
              Search cities or specific places, then add picks to your shared trip.
            </p>
            <SearchFilters
              defaultValues={defaultValues}
              onSubmit={handleSearch}
            />
          </div>
        </div>
      </section>

      <CityStrip onPick={handleCityPick} />
      <section className={styles.resultsSection}>
        <div className={styles.container}>
          <SearchResults
            items={paged}
            loading={loading}
            page={page}
            totalPages={totalPages}
            total={results.length}
            onPageChange={setPage}
          />
        </div>
      </section>
    </main>
  );
}