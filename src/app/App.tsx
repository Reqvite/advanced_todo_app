import {AppRouter} from '@/app/providers/AppRouter/AppRouter';
import {Navbar} from '@/components/navbar';
import {Alert} from '@/shared/ui';

function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
      <Alert />
    </>
  );
}

export default App;
