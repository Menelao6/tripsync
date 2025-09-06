import AttractionDetail, { AttractionDetailData } from '../../../components/attraction/AttractionDetail';
import styles from './page.module.css';

// TODO: swap to real fetch from /api/places/details?placeId=...
async function getMock(placeId: string): Promise<AttractionDetailData> {
  return {
    place_id: placeId,
    name: 'National Museum of Art',
    city: 'Lisbon',
    address: 'Praça do Império',
    rating: 4.6,
    user_ratings_total: 1287,
    price_level: 2,
    photos: [
      '/images/tirana4.jpg',
      '/images/tirana5.jpg',
      '/images/tirana6.jpg',
      '/images/tirana7.jpg',
      '/images/tirana8.jpg',
      '/images/tirana9.jpg',
    ],
    overview: 'A landmark museum featuring classic and contemporary exhibitions with waterfront views. The museum houses an impressive collection spanning from ancient artifacts to modern masterpieces, with special attention to local artists and cultural heritage.',
    prices: 'Adults €10, Students €6, Children under 12 free. Guided tours available for an additional €5 per person.',
    reviews: [
      { author: 'Marta', rating: 5, text: 'Stunning collection and lovely café. The impressionist wing was particularly impressive with natural lighting that showcased the paintings beautifully.' },
      { author: 'Jon', rating: 4.5, text: 'Great curation; go early to avoid crowds. The temporary exhibition on contemporary sculpture was thought-provoking and well-presented.' },
    ],
    about: 'Open daily 10:00–18:00. Guided tours available on weekends at 11:00 and 15:00. The museum is wheelchair accessible and offers audio guides in multiple languages.',
  };
}

export default async function AttractionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getMock(id);
  const mockDates = [
    '2025-09-01','2025-09-02','2025-09-03','2025-09-04','2025-09-05',
  ];

  return (
    <main className={styles.page}>
      <AttractionDetail data={data} mockDates={mockDates} />
    </main>
  );
}