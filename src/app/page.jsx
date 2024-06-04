import { Home } from '@/components/Home';
import defaultLayout from './DefaultLayout';

export default function page() {
  return (
    <defaultLayout>
      <Home />
    </defaultLayout>
  );
}
