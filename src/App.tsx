import TopicDetails from "./components/TopicDetails";
import WordList from "./components/WordList";
import { useFetchTopics } from "./hooks/useFetchTopics";

const App = () => {
  useFetchTopics();

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto">
      <header className="p-4 border-b">
        <h1 className="text-4xl font-bold text-center" data-testid="app-title">
          Word Cloud Challenge
        </h1>
      </header>

      <main className="flex flex-col md:flex-row">
        <section className="md:w-2/3 py-10">
          <WordList />
        </section>

        <aside className="w-full md:w-1/3 border-t boreder-l-0 md:border-l md:border-t-0 px-5 h-screen pt-10">
          <TopicDetails />
        </aside>
      </main>
    </div>
  );
};

export default App;
