import { Home } from '@/components/Home';
import DefaultLayout from './defaultLayout';

export default function page() {
  return (
    <DefaultLayout>
      <Home />
    </DefaultLayout>
  );
}
