'use client'

import type { FormEvent } from 'react'
import { useState, useEffect, useRef } from 'react'

type Message = {
	id: number
	role: 'user' | 'bot'
	text: string
}

const seedMessages: Message[] = [
	{ id: 1, role: 'bot', text: 'Hello! This is your Notion Agent.' },
]

export default function ChatBox({ onOpenSettings }: { onOpenSettings: () => void }) {
	const [messages, setMessages] = useState<Message[]>(seedMessages)
	const [input, setInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const text = input.trim()
		if (!text) return

		const userMessage: Message = { id: Date.now(), role: 'user', text }
		setMessages((prev) => [...prev, userMessage])
		setInput('')
		setIsLoading(true)

		// Add loading bot message
		const loadingMessageId = Date.now() + 1
		setMessages((prev) => [
			...prev,
			{
				id: loadingMessageId,
				role: 'bot',
				text: 'loading',
			},
		])

		// Call chat API
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
		fetch(`${apiUrl}/api/v1/chat/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: text }),
		})
			.then((res) => res.json())
			.then((data) => {
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === loadingMessageId
							? { ...msg, text: data.answer || 'Error: No answer from API' }
							: msg
					)
				)
			})
			.catch((err) => {
				console.error('Chat API error:', err)
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === loadingMessageId
							? { ...msg, text: 'Error: Failed to fetch response' }
							: msg
					)
				)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<section className="w-full max-w-3xl bg-white rounded-xl shadow-xl flex flex-col gap-3 p-4 border border-gray-200">
			<ChatHeader onOpenSettings={onOpenSettings} />
			<MessageList messages={messages} />
			<ChatInput
				value={input}
				onChange={setInput}
				onSubmit={handleSubmit}
				disabled={isLoading}
			/>
		</section>
	)
}

function ChatHeader({ onOpenSettings }: { onOpenSettings: () => void }) {
	return (
		<div className="flex items-center justify-between">
			<header className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
				Your Notion Agent
			</header>
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
	const bottomRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

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
					<div className="flex items-center gap-2">
						{message.text === 'loading' ? (
							<div className="flex items-center gap-1">
								<span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
								<span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
								<span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
							</div>
						) : (
							message.text
						)}
					</div>
				</article>
			))}
			<div ref={bottomRef} />
		</div>
	)
}

function ChatInput({ 
	value, 
	onChange, 
	onSubmit,
	disabled = false
}: { 
	value: string
	onChange: (value: string) => void
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
	disabled?: boolean
}) {
	return (
		<form className="flex items-center gap-2" onSubmit={onSubmit}>
			<input
				className="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 outline-none text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
				placeholder="Message..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={disabled}
			/>
			<button
				className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				type="submit"
				disabled={!value.trim() || disabled}
			>
				send
			</button>
		</form>
	)
}
