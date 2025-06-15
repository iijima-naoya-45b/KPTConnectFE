import Image from "next/image"

const GitHubIntegrationSection = () => {
  return (
    <section className='mx-8 py-10 flex justify-center bg-gradient-to-b from-indigo-50 to-white'>
    <div className='rounded-lg flex flex-col lg:flex-row items-center gap-10 w-full max-w-[70%]'>
      {/* 左：テキスト */}
      <div className='flex-1 min-w-0'>
        <h3 className='text-2xl font-bold text-gray-900 mb-4'>GitHub連携でタスクとKPTを一元管理</h3>
        <p className='text-gray-700 mb-4'>
          GitHubと連携することで、KPTのKeep/Problem/TryやTodoを実際のIssueやPull Requestと紐付けて管理できます。
          開発の進捗や課題、改善アクションをGitHub上のタスクと一元化し、より実践的な振り返りが可能です。
        </p>
        <ul className='list-disc pl-5 text-gray-700 mb-4'>
          <li>Issue・Pull Request・Branch・CommitとKPTを紐付け</li>
          <li>進捗・課題・改善アクションの可視化</li>
          <li>GitHubタスクとKPTの一元管理</li>
        </ul>
        <div className='bg-indigo-100 rounded p-4'>
          <div className='font-semibold text-indigo-700 mb-2'>使い方の流れ</div>
          <ol className='list-decimal pl-5 text-gray-700 text-sm flex flex-col gap-2'>
            <li>GitHub認証で連携開始</li>
            <li>リポジトリを選択</li>
            <li>IssueやPull RequestとKPTを紐付けて管理</li>
          </ol>
        </div>
      </div>
      {/* 右：ダミー画像 */}
      <div className='flex-1 flex justify-center items-center min-w-[220px]'>
        <Image
          src='/images/github-connect.png'
          alt='GitHub連携イメージ'
          width={320}
          height={220}
          className='rounded shadow object-contain bg-gray-50'
        />
      </div>
    </div>
  </section>
  )
}

export default GitHubIntegrationSection
