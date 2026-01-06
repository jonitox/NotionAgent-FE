'use client'

import type { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SettingsModal from '@/components/SettingsModal'

type Message = {
	id: number
	role: 'user' | 'bot'
	text: string
}

type Settings = {
	openaiApiKey: string
	notionApiKey: string
	notionPageId: string
}

const seedMessages: Message[] = [
	{ id: 1, role: 'bot', text: 'Hello! This is your Notion Agent.' },
]

export default function ChatPage() {
	const router = useRouter()
	const [messages, setMessages] = useState<Message[]>(seedMessages)
	const [input, setInput] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [settings, setSettings] = useState<Settings>({
		openaiApiKey: '',
		notionApiKey: '',
		notionPageId: '',
	})

	useEffect(() => {
		const saved = localStorage.getItem('notionAgentSettings') // TODO: call BE API
		if (saved) {
			const parsedSettings = JSON.parse(saved)
			setSettings(parsedSettings)
		}
	}, [])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const text = input.trim()
		if (!text) return

		const userMessage: Message = { id: Date.now(), role: 'user', text }
		setMessages((prev) => [...prev, userMessage])
		setInput('')

		setTimeout(() => {
			setMessages((prev) => [
				...prev,
				{
					id: Date.now(),
					role: 'bot',
					text: `봇이 반복합니다: ${text}`,
				},
			])
		}, 300)
	}

	const handleOpenModal = () => {
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}

	const handleSaveSettings = (next: Settings) => {
		setSettings(next)
		localStorage.setItem('notionAgentSettings', JSON.stringify(next)) // TODO: call BE API
		setShowModal(false)
	}

	const handleLogout = () => {
		localStorage.removeItem('notionAgentSettings')
		router.replace('/login')
	}

	return (
		<main className="min-h-screen flex items-center justify-center bg-[#f4f6fb] p-6">
			<LogoutButton onLogout={handleLogout} />

			<section className="w-full max-w-3xl bg-white rounded-xl shadow-xl flex flex-col gap-3 p-4 border border-gray-200">
				<ChatHeader onOpenSettings={handleOpenModal} />
				<MessageList messages={messages} />
				<ChatInput
					value={input}
					onChange={(value) => setInput(value)}
					onSubmit={handleSubmit}
				/>
			</section>

			{showModal && (
				<SettingsModal
					initialSettings={settings}
					onClose={handleCloseModal}
					onSave={handleSaveSettings}
				/>
			)}
		</main>
	)
}

function LogoutButton({ onLogout }: { onLogout: () => void }) {
	return (
		<button
			onClick={onLogout}
			className="fixed top-6 right-6 text-sm font-semibold text-gray-700 underline hover:text-gray-900 focus:outline-none"
			title="Logout"
		>
			LOG OUT
		</button>
	)
}

function ChatHeader({ onOpenSettings }: { onOpenSettings: () => void }) {
	return (
		<div className="flex items-center justify-between">
			<header className="text-lg font-bold tracking-tight">Your Notion Agent</header>
			<button
				onClick={onOpenSettings}
				className="text-lg px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
			>
				⚙️
			</button>
		</div>
	)
}

function MessageList({ messages }: { messages: Message[] }) {
	return (
		<div className="h-[420px] overflow-y-auto p-1 flex flex-col space-y-2.5 bg-gray-50 border border-gray-100 rounded-lg">
			{messages.map((message) => (
				<article
					key={message.id}
					className={`max-w-[80%] px-3 py-2.5 rounded-lg leading-relaxed flex flex-col gap-1 break-words text-slate-900 border ${
						message.role === 'user'
							? 'self-end bg-sky-100 border-sky-200'
							: 'self-start bg-gray-100 border-gray-200'
					}`}
				>
					<div className="text-xs text-gray-500">{message.role === 'user' ? 'You' : 'Bot'}</div>
					<div>{message.text}</div>
				</article>
			))}
		</div>
	)
}

function ChatInput({ 
	value, 
	onChange, 
	onSubmit 
}: { 
	value: string
	onChange: (value: string) => void
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
	return (
		<form className="flex items-center gap-2" onSubmit={onSubmit}>
			<input
				className="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 outline-none text-sm focus:ring-2 focus:ring-blue-500"
				placeholder="Message..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<button
				className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				type="submit"
				disabled={!value.trim()}
			>
				send
			</button>
		</form>
	)
}