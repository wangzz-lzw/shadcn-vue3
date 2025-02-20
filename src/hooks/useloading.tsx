
const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <div className="mt-4 text-lg font-semibold text-blue-500">加载中...</div>
    </div>
  );
};

export default LoadingPage;