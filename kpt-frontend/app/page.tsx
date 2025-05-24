import React from "react";
import FeatureCard from "@/components/ui/FeatureCard";
import {
  EasyReflectionIcon,
  RealTimeSyncIcon,
  ProgressManagementIcon,
} from "@/components/ui/icons/FeatureIcons";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <main className="pt-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              個人開発の振り返りを
              <br />
              もっと効果的に
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              KPT Connectは、個人開発者のための振り返りプラットフォームです。
              一人でも継続的な改善と成長をサポートし、開発スキルの向上を促進します。
            </p>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <header className="text-3xl font-extrabold text-gray-900">
                主な特徴
              </header>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<EasyReflectionIcon />}
                title="簡単な振り返り"
                description="直感的なインターフェースで、個人開発プロジェクトの振り返りを簡単に記録できます。"
              />
              <FeatureCard
                icon={<RealTimeSyncIcon />}
                title="プロジェクト同期"
                description="複数のプロジェクトを管理し、開発の進捗と学びを一元化して追跡できます。"
              />
              <FeatureCard
                icon={<ProgressManagementIcon />}
                title="成長の可視化"
                description="個人の開発スキルと成果を可視化し、継続的なスキルアップをサポートします。"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
