import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Layout from './Layout';
import StartMenuScreen from './screens/StartMenu';

function App() {
  return (
    <MantineProvider>
      <Layout>
        <StartMenuScreen />
      </Layout>
    </MantineProvider>
  );
}

export default App;
