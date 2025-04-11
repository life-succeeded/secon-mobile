import { useState } from 'react'
import { TChildren } from '../../../utils/types'
import { twMerge } from 'tailwind-merge'

interface Tab {
    id: string
    label: string
    content: TChildren
}

interface TabsProps {
    tabs: Tab[]
    defaultTab?: string
    className?: string
}

export const Tabs = ({ tabs, defaultTab, className }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

    if (!tabs.length) return null

    return (
        <div className={twMerge('flex flex-col', className)}>
            {/* Tab headers */}
            <div className="border-white-3 flex border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`relative px-4 py-2 text-sm font-medium focus:outline-none ${
                            activeTab === tab.id ? 'text-black-1' : 'text-grey-3 hover:text-black-2'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                        {/* Подчеркивание для активной вкладки */}
                        {activeTab === tab.id && (
                            <div className="bg-black-1 absolute right-0 bottom-0 left-0 h-0.5"></div>
                        )}
                    </button>
                ))}
            </div>

            <div className="py-4">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
        </div>
    )
}
