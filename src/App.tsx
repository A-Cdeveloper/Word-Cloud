import TopicDetails from "./components/TopicDetails";
import { WordList } from "./components/WordList";

const App = () => {
  return (
    <div className="min-h-screen text-gray-900 max-w-screen-2xl mx-auto">
      <header className="p-4">
        <h1 className="text-4xl font-bold">Word Cloud Challenge</h1>
      </header>

      <main className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] p-4">
        <section className="md:w-2/3">
          <WordList />
        </section>

        <aside className="md:w-1/3">
          <TopicDetails />
        </aside>
      </main>
    </div>
  );
};

export default App;
