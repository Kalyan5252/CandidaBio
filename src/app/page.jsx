import { Home } from '@/components/Home';
import defaultLayout from './defaultLayout';

export default function page() {
  return (
    <defaultLayout>
      <Home />
    </defaultLayout>
  );
}
