import WaitlistForm from '@/components/WaitlistForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            即将到来
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            我们正在打造一款令人兴奋的产品。留下您的邮箱，成为第一批体验者！
          </p>
        </div>

        <WaitlistForm />

        <div className="mt-12 text-sm text-gray-500">
          <p>我们会在产品发布时第一时间通知您</p>
          <p className="mt-2">承诺不会发送垃圾邮件</p>
        </div>
      </div>
    </div>
  );
}
