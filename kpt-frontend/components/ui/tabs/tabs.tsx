/**
 * @file tabs.tsx
 * @description タブコンポーネント
 * 
 * タブナビゲーションを実装するためのコンポーネントです。
 * 複数のコンテンツを切り替えて表示できます。
 * 
 * @param defaultValue - デフォルトで選択されるタブの値
 * @param className - 追加のCSSクラス
 * @param children - 子要素
 */

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

/**
 * タブのルートコンポーネント
 */
const Tabs = ({ defaultValue, value, onValueChange, className, children }: TabsProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  
  const currentValue = value !== undefined ? value : internalValue;
  const handleValueChange = onValueChange || setInternalValue;

  // 子要素に現在の値と変更ハンドラーを渡す
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        currentValue,
        onValueChange: handleValueChange,
      } as any);
    }
    return child;
  });

  return (
    <div className={cn("w-full", className)}>
      {childrenWithProps}
    </div>
  );
};

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
  currentValue?: string;
  onValueChange?: (value: string) => void;
}

/**
 * タブのリストコンポーネント
 */
const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, currentValue, onValueChange, ...props }, ref) => {
    // 子要素にcurrentValueとonValueChangeを渡す
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child.props,
          currentValue,
          onValueChange,
        } as any);
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
          className
        )}
        {...props}
      >
        {childrenWithProps}
      </div>
    );
  }
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
  currentValue?: string;
  onValueChange?: (value: string) => void;
}

/**
 * タブのトリガー（ボタン）コンポーネント
 */
const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, currentValue, onValueChange, ...props }, ref) => {
    const isActive = currentValue === value;

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive ? "bg-background text-foreground shadow-sm" : "",
          className
        )}
        onClick={() => onValueChange?.(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
  currentValue?: string;
}

/**
 * タブのコンテンツコンポーネント
 */
const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, currentValue, ...props }, ref) => {
    if (currentValue !== value) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent }; 