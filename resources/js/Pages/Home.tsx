// pages/index.tsx
import Layout from '../Layouts/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="What's happening?"
          rows={3}
        />
        <div className="text-right mt-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Tweet
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
        <h2 className="font-bold">John Doe</h2>
        <p>Just posted a new project on GitHub! Check it out #NextJS #TypeScript</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="font-bold">Jane Smith</h2>
        <p>Loving the new features in React 18! 🎉 #React #JavaScript</p>
      </div>
    </Layout>
  );
};

export default HomePage;
