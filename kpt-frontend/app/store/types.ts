// 状態
interface SampleState {
  count: number;
}

// アクション
interface SampleActions {
  increment: () => void;
  decrement: () => void;
}

export type StoreState = SampleState & SampleActions;
